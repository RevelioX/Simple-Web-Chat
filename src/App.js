import './App.css';
import React, {useState} from 'react';
import Login from'./components/Login.js';
import Header from './components/Header.js';
import Chat from './components/Chat.js'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login/>
  },
  {
    path: '/chat',
    element: <Chat/>
  }
])
function App() {

 return (
  <div>
  <Header/>
  <RouterProvider router={router}/>
  </div>
  );
}

export default App;


