import Titulo from "../../../../../compartilhado/componentes/Tipografia/Titulo.jsx";
import PastaAberta from "../../../../../compartilhado/componentes/Icones/PastaAberta.jsx";

export default function NomeMateria({ onToggleMenu, nomeMateria, temMaterias }) {
  const textoExibido = nomeMateria || (temMaterias ? "Selecione uma matéria" : "Crie uma matéria");

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
      <div
        onClick={onToggleMenu}
        style={{
          width: "40px",
          height: "40px",
          backgroundColor: "rgba(88, 204, 2, 0.1)",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          cursor: "pointer",
          transition: "background-color 200ms ease-linear"
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = "rgba(88, 204, 2, 0.2)"}
        onMouseLeave={(e) => e.target.style.backgroundColor = "rgba(88, 204, 2, 0.1)"}
      >
        <PastaAberta width={20} height={20} cor="#58CC02" />
      </div>
      <Titulo style={{ letterSpacing: "0", marginBottom: "0" }}>
        {textoExibido}
      </Titulo>
    </div>
  );
}