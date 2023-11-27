import { NavLink } from "react-router-dom";
import styles from "./Menu.module.css";
import logo from "./../imagens/logo.png";

function Menu() {

  
  return (
    <header>
      <div className={`${styles.logo}`}>
        <NavLink  to="/">
          <img src={logo} alt="" />
        </NavLink>
      </div>
      <div className={`${styles.links}`}>
        <nav>
          <ul>
            <li>
              <NavLink to="/produtos" className={styles.link}>
                Produto
              </NavLink>
            </li>
            <li>
              <NavLink to="/estoque" className={styles.link}>
                Estoque
              </NavLink>
            </li>
            <li>
              <NavLink to="/clientes" className={styles.link}> 
               Cliente
              </NavLink>
            </li>
            <li>
              <NavLink to="/fornecedores" className={styles.link}>
                Fornecedor
              </NavLink>
            </li>
            <li>
              <NavLink to="/refeicoes" className={styles.link}>
              Refeição
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Menu;