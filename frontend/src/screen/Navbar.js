import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/Navbar.css";
import iconoAgregar from "../assets/icon/agregar.png";
function Navbar() {
    const navigate = useNavigate();
    const [login, setLogin] = useState(false);

    useEffect(() => {
        const checkUser = localStorage.getItem('checkUser') === 'true';
        setLogin(checkUser);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('checkUser');
        setLogin(false);
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <ul>
                <li><Link to="/" className="navbar-logo">TASK</Link></li>
            </ul>
            <ul>
                {login ? (
                    <>
                        <li><Link to="/home" className="navbar-item">Inicio</Link></li>
                        <li><Link to="/crear-tarea" className="navbar-item"><img src={iconoAgregar} ></img>Crear tarea</Link></li>
                        <li><a href="#/" className="navbar-item" onClick={handleLogout}>Cerrar Sesión</a></li>
                    </>
                ) : (
                    <li><Link to="/login" className="navbar-item">Iniciar Sesión</Link></li>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
