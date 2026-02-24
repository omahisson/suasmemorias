import ItemMateria from "./ItemMateria.jsx";
import FormularioMateria from "./FormularioMateria.jsx";

export default function ListaMaterias({ 
  materias, 
  hoverMateria, 
  materiaSelecionadaId,
  editandoMateria,
  nomeMateria,
  onNomeMateriaChange,
  onSalvarMateria,
  onCancelarFormulario,
  inputEditarRef,
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
        const isEditando = editandoMateria === materia.id;

        if (isEditando) {
          return (
            <div
              key={materia.id}
              style={{
                margin: "0 8px 0 24px",
                marginBottom: "4px",
              }}
            >
              <FormularioMateria
                valor={nomeMateria}
                onChange={onNomeMateriaChange}
                onSalvar={onSalvarMateria}
                onCancelar={onCancelarFormulario}
                dataAttribute={`input-editar-materia-${materia.id}`}
                inputRef={inputEditarRef}
              />
            </div>
          );
        }

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