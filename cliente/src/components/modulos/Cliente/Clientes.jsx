import React, { useState, useEffect } from "react";
import axios from "axios";
import Menu from "./../../Menu";
import Busca from "./../../search/Busca";
import ExibirDados from "../Produto/ExibirDados";
import styles from "./../Cliente/Clientes.module.css"; // Modifique o caminho conforme necessário
import ExibirDadosClientes from "./ExibirDadosClientes";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [pesquisa, setPesquisa] = useState("");

  useEffect(() => {
    const getClientes = async () => {
      try {
        const response = await axios.get("http://localhost:3002/getClientes"); // Atualize a URL para a rota correta de clientes
        const savedData = response.data;
        console.log(savedData);
        setClientes(savedData);
      } catch (error) {
        console.error("Erro ao recuperar os dados:", error);
      }
    };

    getClientes();
  }, []);

  const renderClientes = () => {
    const clientesFiltrados = clientes.filter(
      (cliente) =>
        cliente.nome &&
        cliente.nome.toLowerCase().includes(pesquisa.toLowerCase())
    );

    if (clientesFiltrados.length === 0) {
      return <h1>Nenhum cliente encontrado</h1>;
    }

    return (
      <div>
        <div className={styles.paiItem}>
          <div className={styles.item}>
            <div>
              <h5>Nome do cliente</h5>
            </div>
            <div>
              <h5>Telefone</h5>
            </div>
            <div>
              <h5>CPF</h5>
            </div>
            
            
          </div>
        </div>

        {clientesFiltrados.map((cliente) => (
          <ExibirDadosClientes
            key={cliente.idcliente}
            id={cliente.idcliente}
            dados={cliente}
            listDados={clientes}
            setListDados={setClientes}
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      <Menu />
      <Busca
        rota="/cadastrarCliente" // Atualize a rota para o cadastro de clientes
        onChange={(e) => setPesquisa(e.target.value)}
        tipo="Cliente"
      />
      {clientes.length === 0 ? (
        <h3>Nenhum cliente encontrado</h3>
      ) : (
        renderClientes()
      )}
    </div>
  );
};

export default Clientes;
