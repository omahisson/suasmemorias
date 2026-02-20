import Edit from "../Icones/Edit.jsx";
import Trash from "../Icones/Trash.jsx";

export default function BotoesAcaoMateria({ onEditar, onExcluir }) {
  return (
    <div style={{ display: "flex", gap: "4px" }}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onEditar();
        }}
        style={{
          padding: "4px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "transparent",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          transition: "background-color 200ms ease-linear",
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = "#E5E5E5"}
        onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
      >
        <Edit width={16} height={16} cor="#777777" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onExcluir();
        }}
        style={{
          padding: "4px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "transparent",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          transition: "background-color 200ms ease-linear",
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = "#FFE5E5"}
        onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
      >
        <Trash width={16} height={16} cor="#FF4B4B" />
      </button>
    </div>
  );
}