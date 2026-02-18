const CHAVE = "suas_memorias_sessao";

export function salvarSessao({ token, user }) {
  localStorage.setItem(CHAVE, JSON.stringify({ token, user }));
}

export function lerSessao() {
  const raw = localStorage.getItem(CHAVE);
  return raw ? JSON.parse(raw) : null;
}

export function limparSessao() {
  localStorage.removeItem(CHAVE);
}
