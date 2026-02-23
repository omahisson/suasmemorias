import ItemMateria from "./ItemMateria.jsx";

export default function ListaMaterias({ 
  materias, 
  hoverMateria, 
  materiaSelecionadaId,
  onSelecionar,
  onMouseEnter,
  onMouseLeave,
  onEditar,
  onExcluir
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", rowGap: "4px", lineHeight: "20px", tabSize: 4 }}>
      {materias.map((materia) => {
        const isSelecionada = materia.id === materiaSelecionadaId;
        const isHover = hoverMateria === materia.id;

        return (
          <ItemMateria
            key={materia.id}
            materia={materia}
            isSelecionada={isSelecionada}
            isHover={isHover}
            onSelecionar={onSelecionar}
            onMouseEnter={() => onMouseEnter(materia.id)}
            onMouseLeave={onMouseLeave}
            onEditar={() => onEditar(materia.id)}
            onExcluir={() => onExcluir(materia.id)}
          />
        );
      })}
    </div>
  );
}