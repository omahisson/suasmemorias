import { useNavigate } from "react-router-dom";
import Titulo from "../../../compartilhado/componentes/Tipografia/Titulo.jsx";
import Subtitulo from "../../../compartilhado/componentes/Tipografia/Subtitulo.jsx";
import CampoTexto from "../../../compartilhado/componentes/CampoTexto/CampoTexto.jsx";
import Botao from "../../../compartilhado/componentes/Botao/Botao.jsx";
import Card from "../../../compartilhado/componentes/Card/Card.jsx";
import { useLogin } from "../../../funcionalidades/autenticacao/hooks/useLogin.js";

export default function PaginaLogin() {
  const navigate = useNavigate();
  const { email, setEmail, senha, setSenha, carregando, erro, entrar } = useLogin();

  async function onSubmit(e) {
    e.preventDefault();
    const r = await entrar();
    if (r) {
      navigate("/home");
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 16 }}>
      <Card>
        <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px", flex: 1 }}>
          <div>
          <Titulo>Acesse suas memorias</Titulo>
          <Subtitulo>Digite suas credenciais para continuar</Subtitulo>
        </div>

        <CampoTexto
          rotulo="E-mail"
          valor={email}
          onChange={setEmail}
          placeholder="seu@email.com"
          disabled={carregando}
        />

        <CampoTexto
          rotulo="Senha"
          valor={senha}
          onChange={setSenha}
          tipo="password"
          placeholder="Digite sua senha"
          disabled={carregando}
        />

        {erro ? <Subtitulo><div style={{ color: "crimson", fontSize: 15 }}>{erro}</div></Subtitulo> : null}

        <Botao type="submit" disabled={carregando}>
          {carregando ? "Entrando..." : "Entrar"}
        </Botao>

        <Botao
          variante="link"
          onClick={() => navigate("/nova-senha")}
          disabled={carregando}
        >
          Esqueci minha senha
          </Botao>
        </form>
      </Card>
    </div>
  );
}