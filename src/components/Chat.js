import React, {useState} from 'react';
import './Chat.css';
import { useCookies } from 'react-cookie';
import { useNavigate, Navigate, redirect, useLocation } from 'react-router';

export default function Chat(){
    const [cookies, setCookie,removeCookies] = useCookies(['userName']);   
    const location = useLocation();
    function borrarUserName(e){
        removeCookies("userName");
    }

    return(
        <div>
        {cookies.userName ? <h2>{"Soy el chat" + cookies.userName}</h2> : <Navigate to="/"></Navigate>}
        <button onClick={borrarUserName}>Borrar Nombre</button>
        </div>
    )
}