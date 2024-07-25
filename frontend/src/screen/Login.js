import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import "./styles/Login.css";
const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function checkUser() {
    if (user === "Daniel" && password === "1234") {
      localStorage.setItem("checkUser", true);
      alert("Ingresando al Sistema");
      navigate("/home");
      window.location.reload();
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  }

  return (
    <section className="login-container">
      <div className="card-login">
        <div className="login">
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
          <button type="button" className="btn-Login" onClick={checkUser}>
            Ingresar
          </button>
        </div>
      </div>
    </section>
  );
};

export default Login;
