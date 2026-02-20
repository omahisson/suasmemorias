import { Routes, Route, Navigate } from "react-router-dom";
import PaginaLogin from "./aplicacao/rotas/Login/PaginaLogin.jsx";
import PaginaNovaSenha from "./aplicacao/rotas/NovaSenha/PaginaNovaSenha.jsx";
import PaginaHome from "./aplicacao/rotas/Home/PaginaHome.jsx";
import RotaProtegida from "./aplicacao/RotaProtegida.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<PaginaLogin />} />
      <Route path="/nova-senha" element={<PaginaNovaSenha />} />

      <Route
        path="/home"
        element={
          <RotaProtegida>
            <PaginaHome />
          </RotaProtegida>
        }
      />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}