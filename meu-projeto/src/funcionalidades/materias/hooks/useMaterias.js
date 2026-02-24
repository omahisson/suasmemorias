import { useState, useEffect, useCallback } from "react";
import { buscarMaterias, criarMateria, atualizarMateria, excluirMateria } from "../api/materias.api.js";

export function useMaterias() {
  const [materias, setMaterias] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [materiaSelecionadaId, setMateriaSelecionadaId] = useState(null);

  const carregar = useCallback(async () => {
    try {
      setCarregando(true);
      const materiasData = await buscarMaterias();
      setMaterias(materiasData);
    } catch (erro) {
      console.error("Erro ao carregar matérias:", erro);
      throw erro;
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  const criar = useCallback(async (nome) => {
    try {
      const materiaCriada = await criarMateria(nome.trim());
      await carregar();
      return materiaCriada;
    } catch (erro) {
      console.error("Erro ao criar matéria:", erro);
      throw erro;
    }
  }, [carregar]);

  const editar = useCallback(async (id, nome) => {
    try {
      await atualizarMateria(id, nome.trim());
      await carregar();
    } catch (erro) {
      console.error("Erro ao editar matéria:", erro);
      throw erro;
    }
  }, [carregar]);

  const excluir = useCallback(async (id) => {
    try {
      await excluirMateria(id);
      if (materiaSelecionadaId === id) {
        setMateriaSelecionadaId(null);
      }
      await carregar();
    } catch (erro) {
      console.error("Erro ao excluir matéria:", erro);
      throw erro;
    }
  }, [materiaSelecionadaId, carregar]);

  const selecionar = useCallback((id) => {
    setMateriaSelecionadaId(id);
  }, []);

  const materiaSelecionada = materias.find(m => m.id === materiaSelecionadaId) || null;

  return {
    materias,
    carregando,
    materiaSelecionada,
    materiaSelecionadaId,
    criar,
    editar,
    excluir,
    selecionar,
    recarregar: carregar,
  };
}