import React, { useState, useEffect } from "react";
import axios from "axios";
import Menu from "./../../Menu";
import Busca from "./../../search/Busca";
import ExibirDadosClientes from "./ExibirDadosClientes";
import styles from "./../Cliente/Clientes.module.css";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const getClientes = async () => {
      try {
        const response = await axios.get("http://localhost:3002/getClientes");
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

    const endIndex = startIndex + 10;
    const clientesExibidos = clientesFiltrados.slice(startIndex, endIndex);

    if (clientesExibidos.length === 0) {
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

        {clientesExibidos.map((cliente) => (
          <ExibirDadosClientes
            key={cliente.idcliente}
            id={cliente.idcliente}
            dados={cliente}
            listDados={clientes}
            setListDados={setClientes}
          />
        ))}

        <div className={styles.navegacao}>
          <div className={styles.anterior}>
            {startIndex > 0 && (
              <button
                onClick={() => setStartIndex(Math.max(startIndex - 10, 0))}
              >
                Anteriores
              </button>
            )}
          </div>
          <div className={styles.proximo}>
            {clientesFiltrados.length > endIndex && (
              <button onClick={() => setStartIndex(startIndex + 10)}>
                Próximos
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Menu />
      <Busca
        rota="/cadastrarCliente"
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
