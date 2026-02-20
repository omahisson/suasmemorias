export function criarClienteHttp({ getToken } = {}) {
  async function postJson(url, body) {
    const headers = {
      "Content-Type": "application/json",
    };

    if (getToken) {
      const token = getToken();
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    }

    const resposta = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    if (!resposta.ok) {
      const texto = await resposta.text().catch(() => "");
      throw new Error(texto || `Erro HTTP ${resposta.status}`);
    }

    return resposta.json();
  }

  async function getJson(url) {
    const headers = {};

    if (getToken) {
      const token = getToken();
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    }

    const resposta = await fetch(url, {
      method: "GET",
      headers,
    });

    if (!resposta.ok) {
      const texto = await resposta.text().catch(() => "");
      throw new Error(texto || `Erro HTTP ${resposta.status}`);
    }

    return resposta.json();
  }

  return {
    postJson,
    getJson,
  };
}

export async function postJson(url, body) {
  const cliente = criarClienteHttp();
  return cliente.postJson(url, body);
}