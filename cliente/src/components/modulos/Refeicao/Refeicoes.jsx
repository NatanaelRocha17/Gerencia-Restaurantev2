import React, { useState, useEffect } from "react";
import axios from "axios";
import Menu from "./../../Menu";
import Busca from "./../../search/Busca";
import ExibirDados from "./ExibirDados";
import styles from "./Refeicoes.module.css";

const Refeicoes = () => {
  const [refeicoes, setRefeicoes] = useState([]);
  const [pesquisa, setPesquisa] = useState("");

  useEffect(() => {
    const getRefeicoes = async () => {
      try {
        const response = await axios.get("http://localhost:3002/getRefeicoes");
        const savedData = response.data;
        console.log(savedData);
        setRefeicoes(savedData);
      } catch (error) {
        console.error("Erro ao recuperar os dados:", error);
      }
    };

    getRefeicoes();
  }, []);

  const renderRefeicoes = () => {
    const refeicoesFiltradas = refeicoes.filter(
      (refeicao) =>
        refeicao.nome &&
        refeicao.nome.toLowerCase().includes(pesquisa.toLowerCase())
    );

    if (refeicoesFiltradas.length === 0) {
      return <h1>Nenhuma refeição encontrada</h1>;
    }

    return (
      <div>
        <div className={styles.paiItem}>
          <div className={styles.item}>
            <div>
              <h5>Nome da refeição</h5>
            </div>
            <div>
              <h5>Valor</h5>
            </div>
          </div>
        </div>

        {refeicoesFiltradas.map((refeicao) => (
          <ExibirDados
            key={refeicao.idRefeicao}
            id={refeicao.idRefeicao}
            dados={refeicao}
            listDados={refeicoes}
            setListDados={setRefeicoes}
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      <Menu />
      <Busca
        rota="/cadastrarRefeicao"
        onChange={(e) => setPesquisa(e.target.value)}
        tipo="Refeição"
      />
      {refeicoes.length === 0 ? (
        <h1>Nenhuma refeição encontrada, cadastre a</h1>
      ) : (
        renderRefeicoes()
      )}
    </div>
  );
};

export default Refeicoes;
