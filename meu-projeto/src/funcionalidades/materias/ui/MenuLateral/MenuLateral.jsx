import { useState, useEffect, useRef } from "react";
import { useMaterias } from "../../hooks/useMaterias.js";
import { useClickFora } from "../../../../bibliotecas/hooks/useClickFora.js";
import { useAtalhoTeclado } from "../../../../bibliotecas/hooks/useAtalhoTeclado.js";
import FolderPlus from "../../../../compartilhado/componentes/Icones/FolderPlus.jsx";
import FormularioMateria from "./FormularioMateria.jsx";
import ListaMaterias from "./ListaMaterias.jsx";

export default function MenuLateral({ onToggle, toggleRef, onMateriaSelecionada }) {
  const [expandido, setExpandido] = useState(true);
  const [criandoMateria, setCriandoMateria] = useState(false);
  const [editandoMateria, setEditandoMateria] = useState(null);
  const [nomeMateria, setNomeMateria] = useState("");
  const [hoverMateria, setHoverMateria] = useState(null);
  
  const { 
    materias, 
    carregando, 
    materiaSelecionada, 
    materiaSelecionadaId,
    criar, 
    editar, 
    excluir, 
    selecionar 
  } = useMaterias();

  const inputCriarRef = useRef(null);
  const inputEditarRef = useRef(null);

  useAtalhoTeclado("ctrl+b", () => toggleExpandir());

  const formRef = useClickFora(() => {
    if (criandoMateria || editandoMateria) {
      cancelarFormulario();
    }
  });

  useEffect(() => {
    if (criandoMateria && inputCriarRef.current) {
      setTimeout(() => inputCriarRef.current?.focus(), 0);
    }
    if (editandoMateria && inputEditarRef.current) {
      setTimeout(() => {
        inputEditarRef.current?.focus();
        inputEditarRef.current?.select();
      }, 0);
    }
  }, [criandoMateria, editandoMateria]);

  useEffect(() => {
    if (onMateriaSelecionada) {
      onMateriaSelecionada({ 
        materia: materiaSelecionada, 
        temMaterias: materias.length > 0 
      });
    }
  }, [materiaSelecionada, materias.length, onMateriaSelecionada]);

  useEffect(() => {
    if (toggleRef) {
      toggleRef.current = toggleExpandir;
    }
  }, [toggleRef]);

  function toggleExpandir() {
    const novoEstado = !expandido;
    setExpandido(novoEstado);
    if (onToggle) {
      onToggle(novoEstado);
    }
  }

  function iniciarCriarMateria() {
    setCriandoMateria(true);
    setEditandoMateria(null);
    setNomeMateria("");
  }

  function cancelarFormulario() {
    setCriandoMateria(false);
    setEditandoMateria(null);
    setNomeMateria("");
  }

  async function salvarMateria() {
    if (!nomeMateria.trim()) return;

    try {
      if (editandoMateria) {
        await editar(editandoMateria, nomeMateria.trim());
      } else {
        const materiaCriada = await criar(nomeMateria.trim());
        if (!materiaSelecionadaId) {
          selecionar(materiaCriada.id);
        }
      }
      cancelarFormulario();
    } catch (erro) {
      console.error("Erro ao salvar matéria:", erro);
      alert("Erro ao salvar matéria. Tente novamente.");
    }
  }

  function iniciarEditarMateria(id) {
    const materia = materias.find(m => m.id === id);
    if (materia) {
      setEditandoMateria(id);
      setCriandoMateria(false);
      setNomeMateria(materia.nome);
    }
  }

  async function confirmarExcluirMateria(id) {
    if (confirm("Deseja excluir esta matéria?")) {
      try {
        await excluir(id);
      } catch (erro) {
        console.error("Erro ao excluir matéria:", erro);
        alert("Erro ao excluir matéria. Tente novamente.");
      }
    }
  }

  function selecionarMateria(id) {
    if (editandoMateria === id) return;
    selecionar(id);
  }

  const largura = expandido ? "256px" : "0px";
  const larguraMobile = "288px";
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <>
      {expandido && isMobile && (
        <div
          onClick={toggleExpandir}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 40,
          }}
        />
      )}

      <aside
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          height: "100vh",
          width: expandido ? (isMobile ? larguraMobile : largura) : "0px",
          backgroundColor: "rgba(201, 234, 180, 0.98)",
          borderRight: expandido ? "1px solid oklch(0.922 0 0)" : "none",
          overflow: "hidden",
          transition: "width 200ms ease-linear",
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {expandido && (
          <div ref={formRef} style={{ padding: "8px 40px 8px 8px", overflowY: "auto", flex: 1 }}>
            <h2
              style={{
                fontSize: "16px",
                fontWeight: 700,
                color: "#3C3C3C",
                lineHeight: "24px",
                tabSize: 4,
                margin: 0,
                fontFamily: "Nunito",
                padding: "16px",
              }}
            >
              Memorias
            </h2>

            {criandoMateria ? (
              <FormularioMateria
                valor={nomeMateria}
                onChange={setNomeMateria}
                onSalvar={salvarMateria}
                onCancelar={cancelarFormulario}
                dataAttribute="input-nova-materia"
                inputRef={inputCriarRef}
              />
            ) : editandoMateria ? (
              <FormularioMateria
                valor={nomeMateria}
                onChange={setNomeMateria}
                onSalvar={salvarMateria}
                onCancelar={cancelarFormulario}
                dataAttribute={`input-editar-materia-${editandoMateria}`}
                inputRef={inputEditarRef}
              />
            ) : (
              <button
                onClick={iniciarCriarMateria}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 16px",
                  margin: "0px 8px 4px 8px",
                  borderRadius: "12px",
                  border: "none",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                  fontFamily: "Nunito",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#3C3C3C",
                  transition: "background-color 200ms ease-linear",
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = "white"}
                onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
              >
                <FolderPlus width={20} height={20} cor="#58CC02" />
                <span style={{ lineHeight: "20px", tabSize: 4 }}>Nova matéria</span>
              </button>
            )}

            {carregando ? (
              <div style={{ padding: "16px", textAlign: "center", color: "#3C3C3C", fontFamily: "Nunito" }}>
                Carregando...
              </div>
            ) : (
              <ListaMaterias
                materias={materias}
                hoverMateria={hoverMateria}
                materiaSelecionadaId={materiaSelecionadaId}
                onSelecionar={selecionarMateria}
                onMouseEnter={setHoverMateria}
                onMouseLeave={() => setHoverMateria(null)}
                onEditar={iniciarEditarMateria}
                onExcluir={confirmarExcluirMateria}
              />
            )}
          </div>
        )}
      </aside>
    </>
  );
}