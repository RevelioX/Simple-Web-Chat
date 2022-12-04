
import React, {useState} from 'react';
import './App.css';

function App() {
  const [userName,setUserName] = useState("")

  function iniciarSesion(e){
    console.log("Click")
  }
  
  function actualizarInput(e){
    setUserName(e.target.value)
    console.log(userName)
  }
  
 return (
    <div className="login_form">
      <img className="login_form_image" src="images/generico-usuario.jpg"></img>
      <input className="login_form_input" type="text" placeholder="Nombre Usuario" onChange={e => actualizarInput(e)}></input>
      <button className="login_form_button" onClick={e => iniciarSesion(e)}>Inciar Sesión</button>
    </div>
  );
}

export default App;
