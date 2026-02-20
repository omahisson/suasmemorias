import { useNavigate } from "react-router-dom";
import Titulo from "../../../compartilhado/componentes/Tipografia/Titulo.jsx";
import Subtitulo from "../../../compartilhado/componentes/Tipografia/Subtitulo.jsx";
import CampoTexto from "../../../compartilhado/componentes/CampoTexto/CampoTexto.jsx";
import Botao from "../../../compartilhado/componentes/Botao/Botao.jsx";
import Card from "../../../compartilhado/componentes/Card/Card.jsx";
import SetaEsquerda from "../../../compartilhado/componentes/Icones/SetaEsquerda.jsx";
import { useRecuperarSenha } from "../../../funcionalidades/autenticacao/hooks/useRecuperarSenha.js";

export default function PaginaNovaSenha() {
  const navigate = useNavigate();
  const { email, setEmail, carregando, erro, sucesso, enviar } = useRecuperarSenha();

  async function onSubmit(e) {
    e.preventDefault();
    await enviar();
  }

  if (sucesso) {
    return (
      <div style={{ height: "100vh", display: "grid", placeItems: "center", overflow: "hidden" }}>
        <Card>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px", textAlign: "center" }}>
            <Titulo>Email enviado!</Titulo>
            <Subtitulo>
              Enviamos um link de recuperação para {email}. Verifique sua caixa de entrada.
            </Subtitulo>
            <Botao onClick={() => navigate("/login")}>
              <span style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center" }}>
                <SetaEsquerda width={16} height={16} cor="rgb(255, 255, 255)" />
                Voltar para o login
              </span>
            </Botao>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ height: "100vh", display: "grid", placeItems: "center", overflow: "hidden" }}>
      <Card>
        <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div>
            <Titulo>Recuperar senha</Titulo>
            <Subtitulo>Digite seu e-mail para receber o link de recuperação</Subtitulo>
          </div>

          <CampoTexto
            rotulo="E-mail"
            valor={email}
            onChange={setEmail}
            placeholder="seu@email.com"
            disabled={carregando}
            tipo="email"
          />

          {erro ? <Subtitulo><div style={{ color: "crimson", fontSize: 15 }}>{erro}</div></Subtitulo> : null}

          <Botao type="submit" disabled={carregando}>
            {carregando ? "Enviando..." : "Enviar link de recuperação"}
          </Botao>

          <Botao
            variante="link"
            onClick={() => navigate("/login")}
            disabled={carregando}
          >
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <SetaEsquerda width={16} height={16} cor="rgb(88, 204, 2)" />
              Voltar para o login
            </span>
          </Botao>
        </form>
      </Card>
    </div>
  );
}