import "./App.css";
import React, { useState, useEffect } from "react";
import { getData, setData as saveData } from "./Gestion"; 
import imagen from "./img/ticket.png";
import imagenSala from "./img/salacine.jpg";
function App() {
  const [filas, setFilas] = useState("");
  const [asientos, setAsientos] = useState("");
  const [reservados, setReservados] = useState([]);
  
  // Mostrar en tiempo real los datos de filas y asientos
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getData();
        setReservados(data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  // Guardar a los datos de filas y asientos
  const Guardar = async (filas_temporales, asientos_temporales) => {
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

  return (
    <div className="container">
      <div className="izquierda">
        <span className="cajero-status">Cajero en linea</span>
        <h1>Cajero N°1</h1>
        <div className="form">
          <input
            type="text"
            placeholder="Ingrese Fila"
            value={filas}
            onChange={(e) => setFilas(e.target.value)}
          />
          <input
            type="number"
            min={0}
            max={20}
            placeholder="Ingrese Asiento"
            value={asientos}
            onChange={(e) => setAsientos(e.target.value)}
          />
          <button type="button" className="btn-guardar" onClick={() => Guardar(filas, asientos)}>
            Guardar
          </button>
          <button type="button" className="btn-desconectar">Desconectar</button>
          <img className="img-ticket" src={imagen} alt="Imagen" />
        </div>
      </div>
      <div>
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
