import React, {useState} from 'react';
import './Chat.css';
import { useCookies } from 'react-cookie';
import { redirect } from 'react-router';

export default function Chat(){
    const [cookies, setCookie] = useCookies(['userName']);

    redirect("/");
    

    function borrarUserName(e){
        setCookie("userName","",{path: "/"});
    }

    return(
        <div>
        <h2>{cookies.userName && "Soy el chat" + cookies.userName}</h2>
        <button onClick={borrarUserName}>Borrar Nombre</button>
        </div>
    )
}