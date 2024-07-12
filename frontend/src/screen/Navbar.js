import React from "react";
import "./styles/Navbar.css";

function Navbar() {
    return (
        <nav className="navbar">
            <ul>
                <li><a href="/" className="navbar-logo">TASK</a></li>
            </ul>
            <ul>
                <li><a href="/" className="navbar-item">Inicio</a></li>
                <li><a href="/crear-tarea" className="navbar-item">Crear tarea</a></li>
                <li><a href="/crear-estado" className="navbar-item">Crear estado</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;
