import { useState } from "react";
import { login as loginApi } from "../api/autenticacao.api.js";
import { salvarSessao } from "../estado/sessao.js";

export function useLogin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  async function entrar() {
    setErro("");
    setCarregando(true);
    try {
      const resultado = await loginApi({ email, senha });
      salvarSessao(resultado);
      return resultado;
    } catch (e) {
      setErro(e?.message || "Falha no login");
      return null;
    } finally {
      setCarregando(false);
    }
  }

  return {
    email,
    setEmail,
    senha,
    setSenha,
    carregando,
    erro,
    entrar,
  };
}
