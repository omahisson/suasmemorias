export async function postJson(url, body) {
    const resposta = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  
    if (!resposta.ok) {
      const texto = await resposta.text().catch(() => "");
      throw new Error(texto || `Erro HTTP ${resposta.status}`);
    }
  
    return resposta.json();
  }
  