import { Navigate } from "react-router-dom";
import { lerSessao } from "../funcionalidades/autenticacao/estado/sessao.js";

export default function RotaProtegida({ children }) {
  const sessao = lerSessao();

  if (!sessao?.token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}