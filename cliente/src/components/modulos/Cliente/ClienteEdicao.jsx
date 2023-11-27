import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton";
import styles from "./ClienteEdicao.module.css"; // Atualize o nome do arquivo de estilos se necessário
import { useParams, useNavigate } from "react-router-dom";
import Menu from "../Menu";

function ClienteEdicao() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cliente, setCliente] = useState({
    nome: "",
    telefone: "",
    cpf: "",
    email: "",
    endereco: "",
  });

  useEffect(() => {
    const getCliente = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/clientes/${id}`);
        const clienteData = response.data;
        setCliente(clienteData);
      } catch (error) {
        console.error("Erro ao recuperar os dados:", error);
      }
    };

    getCliente();
  }, [id]);

  const atualizarCliente = async () => {
    try {
      await axios.put(`http://localhost:3002/clientes/${id}`, cliente);
      navigate(`/clientes/${id}`);
    } catch (error) {
      console.error("Erro ao atualizar o cliente:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCliente({
      ...cliente,
      [name]: value,
    });
  };

  return (
    <>
      <Menu />
      <div className={styles.client}>
        <div className={styles.formulario}>
          <div className={styles.caixa}>
            <h2>Editar Cliente</h2>
            <form onSubmit={atualizarCliente}>
              <div>
                <Input
                  type="text"
                  name="nome"
                  id="nome"
                  text="Nome do cliente"
                  placeholder="Digite o nome do cliente"
                  value={cliente.nome}
                  onChange={handleInputChange}
                  required
                />

                <Input
                  type="tel"
                  name="telefone"
                  id="telefone"
                  text="Telefone"
                  placeholder="Digite o telefone"
                  value={cliente.telefone}
                  onChange={handleInputChange}
                />

                <Input
                  type="text"
                  text="CPF"
                  name="cpf"
                  id="cpf"
                  placeholder="Digite o CPF"
                  value={cliente.cpf}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Input
                  type="email"
                  text="E-mail"
                  name="email"
                  id="email"
                  placeholder="Digite o e-mail"
                  value={cliente.email}
                  onChange={handleInputChange}
                />

                <Input
                  type="text"
                  text="Endereço"
                  name="endereco"
                  id="endereco"
                  placeholder="Digite o endereço"
                  value={cliente.endereco}
                  onChange={handleInputChange}
                />
              </div>

              <SubmitButton type="submit" text="Salvar" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClienteEdicao;
