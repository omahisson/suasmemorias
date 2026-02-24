export function criarClienteHttp({ getToken, on401 } = {}) {
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

      if (resposta.status === 401 || resposta.status === 403) {
          if (on401) {
              on401();
          }
          const texto = await resposta.text().catch(() => "");
          throw new Error(texto || `Erro HTTP ${resposta.status}`);
      }

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

      if (resposta.status === 401 || resposta.status === 403) {
          if (on401) {
              on401();
          }
          const texto = await resposta.text().catch(() => "");
          throw new Error(texto || `Erro HTTP ${resposta.status}`);
      }

      if (!resposta.ok) {
          const texto = await resposta.text().catch(() => "");
          throw new Error(texto || `Erro HTTP ${resposta.status}`);
      }

      return resposta.json();
  }

  async function putJson(url, body) {
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
          method: "PUT",
          headers,
          body: JSON.stringify(body),
      });

      if (resposta.status === 401 || resposta.status === 403) {
          if (on401) {
              on401();
          }
          const texto = await resposta.text().catch(() => "");
          throw new Error(texto || `Erro HTTP ${resposta.status}`);
      }

      if (!resposta.ok) {
          const texto = await resposta.text().catch(() => "");
          throw new Error(texto || `Erro HTTP ${resposta.status}`);
      }

      return resposta.json();
  }

  async function deleteJson(url) {
    const headers = {};

    if (getToken) {
      const token = getToken();
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    }

    const resposta = await fetch(url, {
      method: "DELETE",
      headers,
    });

    if (resposta.status === 401 || resposta.status === 403) {
      if (on401) {
        on401();
      }
      const texto = await resposta.text().catch(() => "");
      throw new Error(texto || `Erro HTTP ${resposta.status}`);
    }

    if (!resposta.ok) {
      const texto = await resposta.text().catch(() => "");
      throw new Error(texto || `Erro HTTP ${resposta.status}`);
    }

    if (resposta.status === 204 || resposta.status === 204) {
      return null;
    }

    const contentType = resposta.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const texto = await resposta.text();
      return texto ? JSON.parse(texto) : null;
    }

    return null;
  }

  return {
      postJson,
      getJson,
      putJson,
      deleteJson,
  };
}

export async function postJson(url, body) {
  const cliente = criarClienteHttp();
  return cliente.postJson(url, body);
}