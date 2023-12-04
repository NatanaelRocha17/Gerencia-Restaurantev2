import React, { useRef, useState } from "react";
import axios from "axios";
import Menu from "../../Menu";
import Input from "../../form/Input";
import SubmitButton from "../../form/SubmitButton";
import styles from "./CadastrarRefeicao.module.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function CadastrarRefeicao() {
  const formRef = useRef();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    valor: "",
  });


function cadastrarRefeicao(e) {
    e.preventDefault();
    console.log(formData)
    axios
      .post("http://localhost:3002/registerRefeicao", formData)
      .then((response) => {
        console.log(response.data);
        toast.success(response.data);
        setFormData({
          nome: "",
          valor: "",
        });
        navigate('/refeicoes');
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.status === 400) {
          toast.warning(error.response.data.message);
        } else {
          toast.warning("Não foi possível conectar ao banco de dados, tente novamente mais tarde");
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
      <div className={styles.meal}>
        <div className={styles.formulario}>
          <h3>Cadastre a refeição</h3>
          <p>Cadastre a sua Refeição Aqui!</p>
          <form onSubmit={cadastrarRefeicao} ref={formRef}>
            <div>
              <Input
                type="text"
                name="nome"
                id="nome"
                text="Nome da refeição* "
                placeholder="Digite o nome da refeição"
                requerido={true}
                value={formData.nome}
                onChange={handleInputChange}
              />
           
            </div>

            <div>
              <Input
                type="number"
                step="0.01"
                placeholder="10,00"
                name="valor"
                id="valor"
                requerido={true}
                text="Valor da refeição R$* "
                value={formData.valor}
                onChange={handleInputChange}
              />
            
            </div>

            <SubmitButton
              type="submit"
              text="Cadastrar"
            />
          </form>
        </div>
      </div>
    </>
  );
}
