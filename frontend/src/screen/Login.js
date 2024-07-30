import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";
import "./styles/Login.css";

const Login = () => {
  const baseURL = "http://localhost:4000/getUser";
  const [data, setData] = useState([]);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const checkUser = useCallback(() => {
    setLoading(true);
    axios.get(`${baseURL}?username=${user}&password=${password}`)
      .then(response => {
        setData(response.data);
        const userFound = response.data.find(item => item.username === user && item.password === password);
        if (userFound) {
          localStorage.setItem("checkUser", "true");
          localStorage.setItem("id_usuario", userFound.id_usuario);
          localStorage.setItem("nombre", userFound.nombre);
          alert("Ingresando al Sistema");
          navigate("/home");
          window.location.reload();
        } else {
          alert("Usuario o contraseña incorrectos");
        }
      })
      .catch(error => {
        setError("Error no se pudo acceder a la base de datos.");
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user, password, navigate, baseURL]);

  return (
    <section className="login-container">
      <div className="card-login">
        <div className="login">
          <h1>Login</h1>
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
            onClick={checkUser}
            disabled={loading}
          >
            {loading ? "Cargando..." : "Ingresar"}
          </button>
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </section>
  );
};

export default Login;
