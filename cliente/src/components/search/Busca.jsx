import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Busca.module.css'

const SearchComponent = ({ tipo, rota, value, onChange }) => {
  return (
    <>
    
    <div className={styles.pesquisa}>
    
      <form className={styles.formulario}>
        <input type="text" name="" placeholder={`Busque por um ${tipo}...`} value={value} onChange={onChange} />
        <div>
          <Link to={rota}><button> Cadastrar {tipo}</button></Link>
        </div>
      </form>
    </div>
    </>
  );
};

export default SearchComponent;
