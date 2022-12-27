import React, {useState,useEffect} from 'react';
import './Chat.css';
import { useCookies } from 'react-cookie';
import { useNavigate, Navigate, redirect, useLocation } from 'react-router';
import io from 'socket.io-client';

const socket = io("http://localhost:3080",{
    withCredentials: true,
    extraHeaders: {
    "my-custom-header": "abcd"}}
    );

export default function Chat(){
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [lastPong, setLastPong] = useState(null);


    const usuarios = ["Pedrito","Juanito","Robertoide","Anastasioide"]
    const [connectedUsers,setConnectedUsers] = useState(usuarios.map( (user,index) => <p id={index}>{user}</p>));
    const [data,setData] = useState();
    const [chatMessages,setChatMessages] = useState();
    const [cookies, setCookie,removeCookies] = useCookies(['userName']);   
    const location = useLocation();
    const [message,setMessage] = useState("");

    useEffect(() => {
        socket.on('connect', () => {
          setIsConnected(true);
        });
    
        socket.on('disconnect', () => {
          setIsConnected(false);
        });
    
        socket.on('pong', () => {
          setLastPong(new Date().toISOString());
        });
    
        return () => {
          socket.off('connect');
          socket.off('disconnect');
          socket.off('pong');
        };
      }, []);



    useEffect(
        () => {
            fetch("/messages",{
                method:'GET'
            }).then(response => {
                if(response.ok){
                    return response.json()
                }
            })
            .then( res => setData(res))
            .catch(err => console.log(err))
        }  
          
        ,[])

        useEffect(  ()=>{ if(data){
            setChatMessages( data["messages"].map( dato => <p className="message">{dato["author"]}: {dato["text"]}</p>))}
        },[data])
    
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
            socket.emit("message",JSON.stringify({
                "text" : (message),
                "date" : (Date.now()),
                "author" : (cookies.userName)
            }))
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
            <div className="chat_principal">
            <div className="chat_connected_users">
            {connectedUsers}
            </div>
            <div className="chat_messages">
                <div className="chat_messages_list">
            {chatMessages}
            </div>
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