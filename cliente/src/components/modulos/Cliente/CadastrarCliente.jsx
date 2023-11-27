// CadastrarCliente.js
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Menu from "./../../Menu";
import Input from "./../../form/Input";
import SubmitButton from "./../../form/SubmitButton";
import styles from "./cadastrarCliente.module.css"; // Importe ou crie estilos específicos se necessário
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function CadastrarCliente() {
  const FormRef = useRef();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    cpf: "",
    email: "",
  });

  useEffect(() => {
    console.log("Form data changed:", formData);
  }, [formData]);

  async function cadastrarCliente(e) {
    e.preventDefault();
    console.log(formData);

    axios
      .post("http://localhost:3002/registerCliente", formData) // Adapte o endpoint para o seu backend
      .then((response) => {
        console.log(response.data);
        toast.success(response.data);
        setFormData({
          nome: "",
          telefone: "",
          cpf: "",
          email: "",
  
        });
        navigate("/clientes");
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 400) {
          toast.warning(error.response.data.message);
        } else {
          toast.warning(error.response.data.message);
        }
      });
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <Menu />
      <div className={styles.client}>
        <div className={styles.formulario}>
          <h3>Cadastre o cliente</h3>
          <p>Preencha os dados do cliente abaixo:</p>
          <form onSubmit={cadastrarCliente} ref={FormRef}>
            <div className={styles.inputs}>
              <div>
              <Input
                type="text"
                name="nome"
                id="nome"
                text="Nome do cliente"
                placeholder="Digite o nome do cliente"
                requerido={true}
                value={formData.nome}
                onChange={handleInputChange}
              />

              <Input
                type="tel"
                name="telefone"
                id="telefone"
                requerido={true}
                text="Telefone"
                placeholder="Digite o telefone"
                required
                value={formData.telefone}
                onChange={handleInputChange}
              />
              </div>
              
            <div>
            <Input
                type="text"
                name="cpf"
                id="cpf"
                text="CPF"
                placeholder="Digite o CPF"
                requerido={true}
                value={formData.cpf}
                onChange={handleInputChange}
              />

              <Input
                type="email"
                name="email"
                id="email"
                text="E-mail"
                placeholder="Digite o e-mail"
                required
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
             

            </div>

            <SubmitButton type="submit" text="Cadastrar" subm="Cliente cadastrado!" />
          </form>
        </div>
      </div>
    </>
  );
}

export default CadastrarCliente;
