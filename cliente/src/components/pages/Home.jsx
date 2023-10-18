
import Menu from "../Menu";
import styles from "./Home.module.css"

function Home(){
    return(
        <>
        <Menu/>
         <div className={styles.welcome}>
            <h1>Seja bem-vindo ao sistema de gerenciamento do Restaurante da Docha!</h1>
            <p>Navegue no menu e gerencie todo o seu restaurante de uma forma fácil, ágil e intuitiva!</p>
         </div>
        </>
    )
}

export default Home;
