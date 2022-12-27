import React, {useState} from 'react';
import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router';

export default function Login(){
    
    const [userName,setUserName] = useState("")
    const [errors,setErrors] = useState("");
    const [cookies, setCookies,removeCookies] = useCookies(['userName']);
    const [moveToChat,setMoveToChat] = useState(false);
  
    function iniciarSesion(e){
        let error = false
        setErrors("");
        if(userName.length > 20){
            setErrors(errors => errors + "-El nombre de usuario no debe superar 20 caracteres\n");
            error = true;
        }
        if(userName == ""){
            setErrors(errors => errors + "-El campo no puede estar vacio");
            error = true;
        }
        if(userName && userName.length <= 20){
            setErrors("");
        }
        if(error){
            return
        }
        setCookies('userName',userName,{path:'/'});
        setMoveToChat(true);

    }
    
    function actualizarInput(e){
      setUserName(e.target.value)
      console.log(userName)
    }

    function iniciarSesionEnter(e){
        if(e.key === 'Enter'){
            iniciarSesion(e);
        }
    }

    return(
    <div>
    {(moveToChat||cookies.userName) && <Navigate to="/chat"></Navigate>}
    <div className="login_form">
      <img className="login_form_image" src="images/generico-usuario.jpg"></img>
      <input className="login_form_input" type="text" placeholder="Nombre Usuario" onChange={e => actualizarInput(e)} onKeyPress={e => iniciarSesionEnter(e)}></input>
      <button type="button" className="login_form_button" onClick={e => iniciarSesion(e)}>Iniciar Sesión</button>
    </div>
    <div className="error">
        {errors && <p className="error-message">{errors}</p>}
    </div>
    </div>
  )
  }