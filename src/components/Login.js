import React, {useState} from 'react';

export default function Login(){
    const [userName,setUserName] = useState("")
    const [errors,setErrors] = useState("");
  
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
        console.log("Funciona");
    }
    
    function actualizarInput(e){
      setUserName(e.target.value)
      console.log(userName)
    }

    return(
    <div>
    <div className="login_form">
      <img className="login_form_image" src="images/generico-usuario.jpg"></img>
      <input className="login_form_input" type="text" placeholder="Nombre Usuario" onChange={e => actualizarInput(e)}></input>
      <button className="login_form_button" onClick={e => iniciarSesion(e)}>Iniciar Sesión</button>
    </div>
    <div className="error">
        {errors && <p className="error-message">{errors}</p>}
    </div>
    </div>
  )
  }