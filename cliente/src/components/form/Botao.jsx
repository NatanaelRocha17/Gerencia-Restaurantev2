import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function Botao({rota, valor, icon, onClick}){

    return(
        <>
             <Link to={rota}>
                <button onClick={onClick} >{<FontAwesomeIcon icon={icon}/>} {valor}</button></Link>
             <div className="menu">
          
        </div>
        </>
    )

}

export default Botao