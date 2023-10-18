import React, { useState } from "react";
import styles from './Select.module.css'

function Select({ text, itens, name }) {
  const [opcaoSelecionada, setOpcaoSelecionada] = useState("");

  const handleChange = (e) => {
    console.log("Opção selecionada: " + e.target.value)
    setOpcaoSelecionada(e.target.value);
    console.log(opcaoSelecionada)
  };

  console.log(itens)
  return (
    <div className={styles.form_control}>
      <label htmlFor="opcoes">{text}</label>
      <select id="opcoes" name={name} value={opcaoSelecionada} onChange={handleChange}>
        <option value="">Selecione um produto...</option>
        {itens.map((iten) => (
          <option key={iten.idproduto} value={iten.idproduto}>
          {iten.nome} - {iten.medida}{iten.unidade}  - {iten.marca}
        </option>
        
        ))}
      </select>
    </div>
  );
}

export default Select;
