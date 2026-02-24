import Folder from "../../../../compartilhado/componentes/Icones/Folder.jsx";
import BotoesAcaoMateria from "./BotoesAcaoMateria.jsx";

export default function ItemMateria({ 
  materia, 
  isSelecionada, 
  isHover, 
  onSelecionar, 
  onMouseEnter, 
  onMouseLeave,
  onEditar,
  onExcluir
}) {
  return (
    <>
      <style>{`
        .item-materia {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          margin: 0 8px 0 24px;
          border-radius: 12px;
          background-color: transparent;
          cursor: pointer;
          transition: background-color 200ms ease-linear;
          gap: 8px;
        }
        .item-materia:hover,
        .item-materia.selecionada {
          background-color: white;
        }
      `}</style>
      <div
        className={`item-materia ${isSelecionada ? "selecionada" : ""}`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={() => onSelecionar(materia.id)}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1 }}>
          {!isSelecionada && (
            <Folder width={20} height={20} cor="#3C3C3C" />
          )}
          {(isHover && isSelecionada) && (
            <BotoesAcaoMateria
              onEditar={onEditar}
              onExcluir={onExcluir}
            />
          )}
          <span
            style={{
              fontFamily: "Nunito",
              fontSize: "14px",
              fontWeight: 600,
              color: isSelecionada ? "#58CC02" : "#3C3C3C",
            }}
          >
            {materia.nome}
          </span>
        </div>

        {(isHover && !isSelecionada) && (
          <BotoesAcaoMateria
            onEditar={onEditar}
            onExcluir={onExcluir}
          />
        )}
      </div>
    </>
  );
}