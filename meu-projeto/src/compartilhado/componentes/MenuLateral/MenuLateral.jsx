import { useState, useEffect, useRef } from "react";
import Folder from "../Icones/Folder.jsx";
import FolderPlus from "../Icones/FolderPlus.jsx";
import BotoesAcaoMateria from "./BotoesAcaoMateria.jsx";
import Botao from "../Botao/Botao.jsx";
import CampoTexto from "../CampoTexto/CampoTexto.jsx";
import { buscarMaterias, criarMateria, atualizarMateria, excluirMateria } from "../../../funcionalidades/materias/api/materias.api.js";


export default function MenuLateral({ onToggle, toggleRef, onMateriaSelecionada }) {
    const [expandido, setExpandido] = useState(true);
    const [criandoMateria, setCriandoMateria] = useState(false);
    const [editandoMateria, setEditandoMateria] = useState(null);
    const [nomeMateria, setNomeMateria] = useState("");
    const [materias, setMaterias] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [hoverMateria, setHoverMateria] = useState(null);
    const [materiaSelecionadaId, setMateriaSelecionadaId] = useState(null);
    const inputRef = useRef(null);

    useEffect(() => {
        carregarMaterias();
    }, []);

    useEffect(() => {
        if (criandoMateria) {
            setTimeout(() => {
                const input = document.querySelector('[data-input-nova-materia] input');
                if (input) {
                    input.focus();
                }
            }, 0);
        }
        if (editandoMateria) {
            setTimeout(() => {
                const input = document.querySelector(`[data-input-editar-materia="${editandoMateria}"] input`);
                if (input) {
                    input.focus();
                    input.select();
                }
            }, 0);
        }
    }, [criandoMateria, editandoMateria]);

    async function carregarMaterias() {
        try {
            setCarregando(true);
            const materiasData = await buscarMaterias();
            setMaterias(materiasData.map(m => ({
                ...m,
                selecionada: m.id === materiaSelecionadaId
            })));
        } catch (erro) {
            console.error("Erro ao carregar matérias:", erro);
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        function handleKeyDown(e) {
            if ((e.ctrlKey || e.metaKey) && e.key === "b") {
                e.preventDefault();
                toggleExpandir();
            }
        }
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [expandido]);

    useEffect(() => {
        if (!criandoMateria && !editandoMateria) return;

        function handleClickOutside(e) {
            const inputNovaMateria = document.querySelector('[data-input-nova-materia]');
            const inputEditarMateria = document.querySelector(`[data-input-editar-materia="${editandoMateria}"]`);

            const isClickInside =
                (inputNovaMateria && inputNovaMateria.contains(e.target)) ||
                (inputEditarMateria && inputEditarMateria.contains(e.target));

            if (!isClickInside) {
                cancelarCriarMateria();
            }
        }

        const timeoutId = setTimeout(() => {
            document.addEventListener("mousedown", handleClickOutside);
        }, 100);

        return () => {
            clearTimeout(timeoutId);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [criandoMateria, editandoMateria]);

    function toggleExpandir() {
        const novoEstado = !expandido;
        setExpandido(novoEstado);
        if (onToggle) {
            onToggle(novoEstado);
        }
    }

    useEffect(() => {
        if (toggleRef) {
            toggleRef.current = toggleExpandir;
        }
    }, [toggleRef, expandido]);

    function iniciarCriarMateria() {
        setCriandoMateria(true);
        setEditandoMateria(null);
        setNomeMateria("");
    }

    function cancelarCriarMateria() {
        setCriandoMateria(false);
        setEditandoMateria(null);
        setNomeMateria("");
    }

    async function salvarMateria() {
        if (!nomeMateria.trim()) return;

        try {
            if (editandoMateria) {
                await atualizarMateria(editandoMateria, nomeMateria.trim());
                await carregarMaterias();
            } else {
                const materiaCriada = await criarMateria(nomeMateria.trim());
                const novaMateriaSelecionadaId = !materiaSelecionadaId ? materiaCriada.id : materiaSelecionadaId;
                setMateriaSelecionadaId(novaMateriaSelecionadaId);
                await carregarMaterias();
                if (!materiaSelecionadaId) {
                    setMaterias(prevMaterias => 
                        prevMaterias.map(m => ({ 
                            ...m, 
                            selecionada: m.id === materiaCriada.id 
                        }))
                    );
                }
            }
            cancelarCriarMateria();
        } catch (erro) {
            console.error("Erro ao salvar matéria:", erro);
            alert("Erro ao salvar matéria. Tente novamente.");
        }
    }

    function selecionarMateria(id) {
        if (editandoMateria === id) return;
        setMateriaSelecionadaId(id);
        setMaterias(materias.map(m => ({ ...m, selecionada: m.id === id })));
    }

    useEffect(() => {
        if (onMateriaSelecionada) {
            const temMaterias = materias.length > 0;
            if (materiaSelecionadaId) {
                const materia = materias.find(m => m.id === materiaSelecionadaId);
                if (materia) {
                    onMateriaSelecionada({ materia, temMaterias });
                } else {
                    onMateriaSelecionada({ materia: null, temMaterias });
                }
            } else {
                onMateriaSelecionada({ materia: null, temMaterias });
            }
        }
    }, [materias, materiaSelecionadaId, onMateriaSelecionada]);

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
                await excluirMateria(id);
                if (materiaSelecionadaId === id) {
                    setMateriaSelecionadaId(null);
                }
                await carregarMaterias();
            } catch (erro) {
                console.error("Erro ao excluir matéria:", erro);
                alert("Erro ao excluir matéria. Tente novamente.");
            }
        }
    }

    const largura = expandido ? "256px" : "0px";
    const larguraMobile = "288px";

    return (
        <>
            {expandido && (
                <div
                    onClick={toggleExpandir}
                    style={{
                        display: window.innerWidth < 768 ? "block" : "none",
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
                    width: expandido ? (window.innerWidth < 768 ? larguraMobile : largura) : "0px",
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
                    <div style={{ padding: "8px 40px 8px 8px", overflowY: "auto", flex: 1 }}>
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
                            <div data-input-nova-materia style={{ margin: "0 8px", marginBottom: "4px" }}>
                                <div style={{ display: "flex", gap: "8px", alignItems: "flex-end" }}>
                                    <div style={{ flex: 1 }}>
                                        <CampoTexto
                                            semRotulo
                                            valor={nomeMateria}
                                            onChange={setNomeMateria}
                                            placeholder="Nome da pasta"
                                            style={{
                                                height: "40px",
                                                width: "16ch",
                                                padding: "0 16px",
                                                fontSize: "14px",
                                                borderRadius: "12px",
                                                color: "#3C3C3C",
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") salvarMateria();
                                                if (e.key === "Escape") cancelarCriarMateria();
                                            }}
                                        />
                                    </div>
                                    <Botao
                                        variante="ok"
                                        onClick={salvarMateria}
                                        disabled={!nomeMateria.trim()}
                                    >
                                        OK
                                    </Botao>
                                </div>
                            </div>
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
                            <div style={{ padding: "16px", textAlign: "center", color: "#3C3C3C" }}>
                                Carregando...
                            </div>
                        ) : (
                            <div style={{ display: "flex", flexDirection: "column", rowGap: "4px", lineHeight: "20px", tabSize: 4 }}>
                                {materias.map((materia) => {
                                    const isSelecionada = materia.selecionada;
                                    const isHover = hoverMateria === materia.id;
                                    const isEditando = editandoMateria === materia.id;

                                    if (isEditando) {
                                        return (
                                            <div
                                                key={materia.id}
                                                data-input-editar-materia={materia.id}
                                                style={{
                                                    margin: "0 8px 0 24px",
                                                    marginBottom: "4px",
                                                }}
                                            >
                                                <div style={{ display: "flex", gap: "8px", alignItems: "flex-end" }}>
                                                    <div style={{ flex: 1 }}>
                                                        <CampoTexto
                                                            semRotulo
                                                            valor={nomeMateria}
                                                            onChange={setNomeMateria}
                                                            placeholder="Nome da pasta"
                                                            style={{
                                                                height: "40px",
                                                                padding: "0 16px",
                                                                fontSize: "14px",
                                                                borderRadius: "12px",
                                                                color: "#3C3C3C",
                                                            }}
                                                            onKeyDown={(e) => {
                                                                if (e.key === "Enter") salvarMateria();
                                                                if (e.key === "Escape") cancelarCriarMateria();
                                                            }}
                                                        />
                                                    </div>
                                                    <Botao
                                                        variante="ok"
                                                        onClick={salvarMateria}
                                                        disabled={!nomeMateria.trim()}
                                                    >
                                                        OK
                                                    </Botao>
                                                </div>
                                            </div>
                                        );
                                    }

                                    return (
                                        <div
                                            key={materia.id}
                                            onMouseEnter={() => setHoverMateria(materia.id)}
                                            onMouseLeave={() => setHoverMateria(null)}
                                            onClick={() => selecionarMateria(materia.id)}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                padding: "12px 16px",
                                                margin: "0 8px 0 24px",
                                                borderRadius: "12px",
                                                backgroundColor: isSelecionada || isHover ? "white" : "transparent",
                                                cursor: "pointer",
                                                transition: "background-color 200ms ease-linear",
                                                gap: "8px",
                                            }}
                                        >
                                            <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1 }}>
                                                {!isSelecionada && (
                                                    <Folder width={20} height={20} cor="#3C3C3C" />
                                                )}
                                                {(isHover && isSelecionada) && (
                                                    <BotoesAcaoMateria
                                                        onEditar={() => iniciarEditarMateria(materia.id)}
                                                        onExcluir={() => confirmarExcluirMateria(materia.id)}
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
                                                    onEditar={() => iniciarEditarMateria(materia.id)}
                                                    onExcluir={() => confirmarExcluirMateria(materia.id)}
                                                />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}
            </aside>
        </>
    );
}