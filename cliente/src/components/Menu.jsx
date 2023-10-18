import { Link } from "react-router-dom";
import styles from "./Menu.module.css";
import logo from "./../imagens/logo.png";

function Menu() {
  return (
    <header>
      <div className={`${styles.logo}`}>
        <Link activeClassName="active-button" to="/">
          <img src={logo} alt="" />
        </Link>
      </div>
      <div className={`${styles.links}`}>
        <nav>
          <ul>
            <li>
              <Link to="/produtos" >
                Produto
              </Link>
            </li>
            <li>
              <Link to="/estoque" >
                Estoque
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Menu;
