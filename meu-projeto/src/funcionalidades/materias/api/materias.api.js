const API_URL = "http://localhost:3031";

export async function buscarMaterias() {
  const resposta = await fetch(`${API_URL}/materias`);
  if (!resposta.ok) {
    throw new Error("Erro ao buscar matérias");
  }
  return resposta.json();
}

export async function criarMateria(nome) {
  const resposta = await fetch(`${API_URL}/materias`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nome }),
  });
  if (!resposta.ok) {
    throw new Error("Erro ao criar matéria");
  }
  return resposta.json();
}

export async function atualizarMateria(id, nome) {
  const resposta = await fetch(`${API_URL}/materias/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nome }),
  });
  if (!resposta.ok) {
    throw new Error("Erro ao atualizar matéria");
  }
  return resposta.json();
}

export async function excluirMateria(id) {
  const resposta = await fetch(`${API_URL}/materias/${id}`, {
    method: "DELETE",
  });
  if (!resposta.ok) {
    throw new Error("Erro ao excluir matéria");
  }
  return resposta.json();
}