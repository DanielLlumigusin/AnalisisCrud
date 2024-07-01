import "./App.css";
import React, { useState, useEffect } from "react";
import { getData, setData as saveData, deleteData } from "./Gestion"; 
import imagen from "./img/ticket.png";
import imagen_trash from "./img/basura.png";

function App() {
  const [filas, setFilas] = useState("");
  const [asientos, setAsientos] = useState("");
  const [reservados, setReservados] = useState([]);
  const [estado, setEstado] = useState("on");
  const [btnEstado, setBtnEstado] = useState("Desconectar");

  useEffect(() => {
    async function fetchData() {
      if (estado === "on") {
        try {
          const data = await getData();
          setReservados(data || []);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    }
    
    fetchData();
  }, [estado]);

  useEffect(() => {
    if (estado === "on") {
      setBtnEstado("Desconectar");
    } else {
      setBtnEstado("Conectar");
      setReservados([""]);
    }
  }, [estado]);

  const changeStatus = () => {
    if (estado === "on") {
      return <span className="cajero-status-on">Cajero en línea</span>;
    } else {
      return <span className="cajero-status-off">Cajero fuera de línea</span>;
    }
  };

  const Guardar = async (filas_temporales, asientos_temporales) => {
    if (estado !== "on") {
      alert("Cajero fuera de línea. No se puede guardar.");
      return;
    }

    const alreadyReserved = reservados.some(
      ([fila, asiento]) =>
        fila === filas_temporales && asiento === asientos_temporales
    );

    if (alreadyReserved) {
      alert("Error, el asiento ya ha sido reservado");
    } else {
      const newReservados = [...reservados, [filas_temporales, asientos_temporales]];
      setReservados(newReservados);
      
      try {
        await saveData(newReservados);
        console.log('Datos guardados exitosamente');
      } catch (error) {
        console.error('Error al guardar los datos', error);
      }
    }
  };

  const eliminarReserva = async (index) => {
    if (estado !== "on") {
      alert("Cajero fuera de línea. No se puede eliminar.");
      return;
    }
    try {
      await deleteData(index);
      window.location.reload(); 
      console.log('Reserva eliminada exitosamente');
    } catch (error) {
      console.error('Error al eliminar la reserva', error);
    }
  };

  return (
    <div className="container">
      <div className="izquierda">
        {changeStatus()}  
        <h1>Cajero Ticket</h1>
        <div className="form">
          <input
            type="text"
            placeholder="Ingrese Fila"
            value={filas}
            onChange={(e) => setFilas(e.target.value)}
            required={true}
            disabled={estado !== "on"}
          />
          <input
            type="number"
            min={0}
            max={20}
            placeholder="Ingrese Asiento"
            value={asientos}
            onChange={(e) => setAsientos(e.target.value)}
            required={true}
            disabled={estado !== "on"}
          />
          <button 
            type="button" 
            className="btn-guardar" 
            onClick={() => Guardar(filas, asientos)}
          >
            Guardar
          </button>
          <button 
            type="button" 
            className="btn-desconectar" 
            onClick={() => setEstado(estado === "on" ? "off" : "on")}
          >
            {btnEstado}
          </button>
          <img className="img-ticket" src={imagen} alt="Imagen" />
        </div>
      </div>
      <div className="derecha">
        <div className="report">
          <h1>Reporte de Asientos</h1>
          <table>
            <thead>
              <tr>
                <th>Filas</th>
                <th>Asientos</th>
              </tr>
            </thead>
            <tbody>
              {reservados.map((reservado, index) => (
                <tr key={index}>
                  <td>{reservado[0]}</td>
                  <td>{reservado[1]}</td>
                  <td>
                    <button onClick={() => eliminarReserva(index)}>
                      <img className="img-trash" src={imagen_trash} alt="trash"></img>  
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
