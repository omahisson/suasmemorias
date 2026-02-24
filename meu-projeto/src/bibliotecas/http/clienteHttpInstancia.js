import { criarClienteHttp } from "./clienteHttp.js";
import { lerSessao, limparSessao } from "../../funcionalidades/autenticacao/estado/sessao.js";

export const clienteHttp = criarClienteHttp({
  getToken: () => {
    const sessao = lerSessao();
    return sessao?.token || null;
  },
  on401: () => {
    limparSessao();
    window.location.href = "/login";
  },
});