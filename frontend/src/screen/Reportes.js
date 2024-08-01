// src/components/Reportes.js
import React, { useEffect, useState } from "react";
import GestionReporte from "../controller/gestionReportes.js";
import ExportController from "../controller/ExportController";
import "./styles/Reportes.css";

function Reportes() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadReporte = async () => {
      const gestionReporte = new GestionReporte();
      try {
        const reporteData = await gestionReporte.getReportes();
        setData(reporteData);
      } catch (error) {
        console.error(error);
      }
    };
    loadReporte();
  }, []);

  const handleGeneratePDF = () => {
    ExportController.generatePDF("reportTable");
  };

  const handleGenerateXLS = () => {
    const headers = [
      "Id Usuario",
      "Id task",
      "Título",
      "Descripción",
      "Fecha Inicio",
      "Fecha Final",
      "Estado",
      "Username",
      "Password",
      "Nombre",
      "Apellido",
    ];
    ExportController.generateXLS(headers, data);
  };

  return (
    <div className="container-reportes">
      <div className="header-reportes">
        <h1>REPORTE DE TAREAS DE TODOS LOS USUARIOS</h1>
        <div>
          <button type="button" className="btn-pdf" onClick={handleGeneratePDF}>
            PDF
          </button>
          <button type="button" className="btn-xls" onClick={handleGenerateXLS}>
            XLS
          </button>
        </div>
      </div>
      <table className="table-home" id="reportTable">
        <thead>
          <tr>
            <th className="id-table">Id Usuario</th>
            <th>Id task</th>
            <th>Título</th>
            <th>Descripción</th>
            <th>Fechas</th>
            <th>Estado</th>
            <th>Username</th>
            <th>Password</th>
            <th>Nombre</th>
            <th>Apellido</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id_data}>
              <td>{item.id_usuario}</td>
              <td>{item.id_task}</td>
              <td>{item.titulo}</td>
              <td>{item.descripcion}</td>
              <td>
                <ul>
                  <li>Inicio: {item.fecha_inicio.slice(0, 10)}</li>
                  <li>Fin: {item.fecha_final.slice(0, 10)}</li>
                </ul>
              </td>
              <td>
                <p className={item.status}>{item.status}</p>
              </td>
              <td>{item.username}</td>
              <td>{item.password}</td>
              <td>{item.nombre}</td>
              <td>{item.apellido}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="Total">Total de Tareas: {data.length}</p>
    </div>
  );
}

export default Reportes;
