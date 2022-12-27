import React, {useState,useEffect} from 'react';
import './Chat.css';
import { useCookies } from 'react-cookie';
import { useNavigate, Navigate, redirect, useLocation } from 'react-router';

export default function Chat(){
    const usuarios = ["Pedrito","Juanito","Robertoide","Anastasioide"]
    const [connectedUsers,setConnectedUsers] = useState(usuarios.map( (user,index) => <p id={index}>{user}</p>));
    const [chatMessages,setChatMessages] = useState();
    const [cookies, setCookie,removeCookies] = useCookies(['userName']);   
    const location = useLocation();
    const [message,setMessage] = useState("");

    useEffect(
        () => {
            fetch("/messages",{
                method:'GET'
            }).then(response => {
                if(response.ok){
                    return response.json()
                }
            })
            .then( res => setChatMessages(res))
            .catch(err => console.log(err))
        }    
        ,[])
    
    function actualizeMessage(e){
        setMessage(e.target.value);
    }

    function borrarUserName(e){
        removeCookies("userName");
    }

    async function sendMessage(e){
        e.preventDefault();
        try{
            await fetch("/messages",{
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body:JSON.stringify({
                    "text" : (message),
                    "date" : (Date.now()),
                    "author" : (cookies.userName)
                })
            });
            setMessage("");
        } catch(err){
            console.log(err);
        }
       
    }
    

    return(
        <div>
        {cookies.userName ? <h2>{"Soy el chat" + cookies.userName}</h2> : <Navigate to="/"></Navigate>}
        <button onClick={borrarUserName}>Borrar Nombre</button>
        <div className="chat">
            <h2 className="chat_title">#General</h2>
            <div chat="chat_principal">
            <div className="chat_connected_users">
            {connectedUsers}
            </div>
            <div className="chat_messages">
            {JSON.stringify(chatMessages)}
            <form onSubmit={sendMessage}>
            <input type="text" onChange={actualizeMessage} value={message}></input>
            <input type="submit"></input>
            </form>
            </div>
            </div>
        </div>

        </div>
    )
}