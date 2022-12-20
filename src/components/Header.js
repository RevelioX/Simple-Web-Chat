import React, {useState} from 'react';
import './Header.css';

export default function Header(){
    return(
        <div className="header">
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
            </link>
            <i class="material-icons">chat_bubble_outline</i>
            <h2>Online Chat Application</h2>
        </div>
    )
}