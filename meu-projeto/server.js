import express from "express";
import jsonServer from "json-server";
import fs from "fs";

const app = express();
const PORT = 3031;

function lerDB() {
  const data = fs.readFileSync("db.json", "utf8");
  return JSON.parse(data);
}

function validarToken(req, res, next) {
  if (req.path.startsWith("/login") || req.path.startsWith("/recuperar-senha")) {
    return next();
  }

  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ erro: "Token não fornecido" });
  }

  const token = authHeader.substring(7);

  if (token === "token-dev" || token.startsWith("token-")) {
    const userId = token.includes("-") ? parseInt(token.split("-")[1]) || 1 : 1;
    req.user = { id: userId, email: `user${userId}@test.com` };
    return next();
  }

  return res.status(401).json({ erro: "Token inválido ou expirado" });
}

function validarAutorizacao(req, res, next) {
  if (req.path.startsWith("/login") || req.path.startsWith("/recuperar-senha")) {
    return next();
  }

  if (req.method === "GET" && req.path === "/materias") {
    return next();
  }

  if ((req.method === "DELETE" || req.method === "PUT" || req.method === "PATCH") && req.path.startsWith("/materias/")) {
    const materiaId = parseInt(req.path.split("/")[2]);
    const db = lerDB();
    const materia = db.materias?.find(m => m.id === materiaId);

    if (!materia) {
      return res.status(404).json({ erro: "Matéria não encontrada" });
    }

    const materiaUserId = materia.id % 2 === 0 ? 1 : 2;
    
    if (materiaUserId !== req.user.id) {
      return res.status(403).json({ erro: "Você não tem permissão para acessar esta matéria" });
    }
  }

  if (req.method === "POST" && req.path === "/materias") {
    if (req.body && !req.body.userId) {
      req.body.userId = req.user.id; 
    }
  }

  return next();
}

app.use(express.json());
app.use(validarToken);
app.use(validarAutorizacao);

app.get("/materias", (req, res, next) => {
  const originalJson = res.json.bind(res);
  res.json = function(data) {
    const userId = req.user.id;
    const materiasFiltradas = Array.isArray(data) 
      ? data.filter(m => {
          const materiaUserId = m.id % 2 === 0 ? 1 : 2;
          return materiaUserId === userId;
        })
      : data;
    return originalJson(materiasFiltradas);
  };
  next();
});

const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

app.use(middlewares);
app.use(router);

app.listen(PORT, () => {
  console.log(`servidor rodando em http://localhost:${PORT}`);
});