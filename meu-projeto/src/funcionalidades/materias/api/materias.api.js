import { clienteHttp } from "../../../bibliotecas/http/clienteHttpInstancia.js";

const API_URL = "http://localhost:3031";

export async function buscarMaterias() {
  return clienteHttp.getJson(`${API_URL}/materias`);
}

export async function criarMateria(nome) {
  return clienteHttp.postJson(`${API_URL}/materias`, { nome });
}

export async function atualizarMateria(id, nome) {
  return clienteHttp.putJson(`${API_URL}/materias/${id}`, { nome });
}

export async function excluirMateria(id) {
  return clienteHttp.deleteJson(`${API_URL}/materias/${id}`);
}