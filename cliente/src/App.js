import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import Rotas from "./Rotas"


function App() {

  document.title = 'Gerencia Restaurante';
  

  return (

    <div className="App">
    
      <Rotas/>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
    </div>
  );
}

export default App;
