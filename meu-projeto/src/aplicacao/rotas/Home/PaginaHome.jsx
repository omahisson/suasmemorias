import { useState, useRef } from "react";
import Continue from "../../../compartilhado/componentes/Continue/Continue.jsx";
import NomeMateria from "../../../compartilhado/componentes/NomeMateria/NomeMateria.jsx";
import Baralhos from "../../../compartilhado/componentes/Baralhos/Baralhos.jsx";
import MenuLateral from "../../../compartilhado/componentes/MenuLateral/MenuLateral.jsx";
import { lerSessao } from "../../../funcionalidades/autenticacao/estado/sessao.js";

export default function PaginaHome() {
  const [menuExpandido, setMenuExpandido] = useState(true);
  const [materiaSelecionada, setMateriaSelecionada] = useState(null);
  const [temMaterias, setTemMaterias] = useState(false);
  const sessao = lerSessao();
  const menuToggleRef = useRef(null);

  function toggleMenu() {
    if (menuToggleRef.current) {
      menuToggleRef.current();
    }
  }

  function handleMateriaSelecionada({ materia, temMaterias: tem }) {
    setMateriaSelecionada(materia);
    setTemMaterias(tem);
  }

  return (
    <>
      <MenuLateral 
        onToggle={setMenuExpandido} 
        toggleRef={menuToggleRef}
        onMateriaSelecionada={handleMateriaSelecionada}
      />
      <div 
        style={{ 
          padding: "32px", 
          minHeight: "100vh",
          marginLeft: menuExpandido ? "256px" : "0px",
          transition: "margin-left 200ms ease-linear"
        }}
      >
        <Continue />
        <NomeMateria 
          onToggleMenu={toggleMenu} 
          nomeMateria={materiaSelecionada?.nome}
          temMaterias={temMaterias}
        />
        {materiaSelecionada && <Baralhos />}
      </div>
    </>
  );
}