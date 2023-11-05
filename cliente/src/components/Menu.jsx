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
              <NavLink to="/produtos">
                Produto
              </NavLink>
            </li>
            <li>
              <NavLink to="/estoque" >
                Estoque
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Menu;