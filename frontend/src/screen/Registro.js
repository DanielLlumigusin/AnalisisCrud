import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GestionUsuarios from "../controller/gestionUsuario.js";
import "../App.css";
import "./styles/Login.css";

const Registro = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const guardarUsuario = async () => {
    setLoading(true);
    const gestionUsuario = new GestionUsuarios();
    const result = await gestionUsuario.addUsuario(nombre, apellido, user, password);

    if (result) {
      setMessage("Usuario registrado con éxito");
      setLoading(false);
      navigate("/login");
    } else {
      setMessage("Error: no se pudo registrar el usuario");
      setLoading(false);
    }
  };

  return (
    <section className="login-container">
      <div className="card-login">
        <div className="login">
          <h1>Registrarse</h1>
          <label>Nombre: </label>
          <input
            type="text"
            placeholder="Nombre"
            className="login-username"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <label>Apellido: </label>
          <input
            type="text"
            placeholder="Apellido"
            className="login-username"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
          <label>Usuario: </label>
          <input
            type="text"
            placeholder="Usuario"
            className="login-username"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <label>Contraseña: </label>
          <input
            type="password"
            placeholder="Contraseña"
            className="login-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="btn-Login"
            onClick={guardarUsuario}
            disabled={loading}
          >
            {loading ? "Cargando..." : "Registrar"}
          </button>
          {message && <p className="error-message">{message}</p>}
        </div>
      </div>
    </section>
  );
};

export default Registro;
