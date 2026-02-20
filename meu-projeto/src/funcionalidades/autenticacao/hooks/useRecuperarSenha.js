import { useState } from "react";
import { recuperarSenha as recuperarSenhaApi } from "../api/autenticacao.api.js";

export function useRecuperarSenha() {
  const [email, setEmail] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);

  async function enviar() {
    setErro("");
    setCarregando(true);
    setSucesso(false);
    try {
      await recuperarSenhaApi({ email });
      setSucesso(true);
      return true;
    } catch (e) {
      setErro(e?.message || "Falha ao enviar email de recuperação");
      return false;
    } finally {
      setCarregando(false);
    }
  }

  return {
    email,
    setEmail,
    carregando,
    erro,
    sucesso,
    enviar,
  };
}