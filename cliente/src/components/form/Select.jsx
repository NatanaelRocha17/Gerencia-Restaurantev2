import React, { useState } from "react";
import styles from './Select.module.css'

function Select({ text, itens, name, value, onChange }) {
  return (
    <div className={styles.form_control}>
      <label htmlFor="opcoes">{text}</label>
      <select id="opcoes" name={name} value={value} onChange={onChange}>
        
        {itens.map((iten) => (
          <option className={styles.option}  key={iten.idproduto} value={iten.idproduto}>
          {iten.nome} - {iten.medida}{iten.unidade}  - {iten.marca} - {iten.fornecedor}
        </option>
        
        ))}
      </select>
    </div>
  );
}

export default Select;
