export async function login({ email, senha }) {
  await new Promise((r) => setTimeout(r, 400));

  if (!email || !senha) throw new Error("Preencha e-mail e senha.");
  if (senha.length < 3) throw new Error("Senha inválida.");

  return {
    token: "token-dev",
    user: { id: "1", nome: "Dev", email },
  };
}

export async function recuperarSenha({ email }) {
  await new Promise((r) => setTimeout(r, 1500));

  if (!email) throw new Error("Preencha o e-mail.");
  if (!email.includes("@")) throw new Error("E-mail inválido.");

  return { ok: true };
}