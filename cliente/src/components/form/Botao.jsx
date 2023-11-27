import { Link } from 'react-router-dom';

function Botao({rota, valor, icon, onClick}){

    return(
        <>
             <Link to={rota}>
                <button onClick={onClick} >{valor}</button></Link>
             <div className="menu">
          
        </div>
        </>
    )

}

export default Botao