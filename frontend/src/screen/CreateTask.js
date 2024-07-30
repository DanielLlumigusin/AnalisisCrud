import React, { useState } from "react";
import GestionTask from "../controller/gestionTask";
import "./styles/CreateTask.css";

function CreateTask() {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  const saveTask = () => {
    if (titulo === "" || descripcion === "" || dateStart === "" || dateEnd === "" || status === "") {
      setMessage("Error: Debe completar todos los campos");
    } else {
      const newTask = {
        titulo,
        descripcion,
        dateStart,
        dateEnd,
        status,
      };

      // Crear instancia de GestionTask y agregar tarea
      const gestionTask = new GestionTask();
      gestionTask.addTask(titulo, descripcion, status, dateStart, dateEnd);

      setMessage("Éxito: Tarea guardada correctamente");
      limpiarCampos();
      console.log("Task saved:", newTask);
    }
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const limpiarCampos = () => {
    setTitulo("");
    setDescripcion("");
    setDateStart("");
    setDateEnd("");
    setStatus("");
  };

  return (
    <section className="formulario-container">
      <div className="card">
        <h1>Crear Tarea</h1>
        <input
          className="titulo-card"
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <textarea
          className="descripcion-card"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <input
          className="dateStart-card"
          type="date"
          value={dateStart}
          onChange={(e) => setDateStart(e.target.value)}
        />
        <input
          className="dateEnd-card"
          type="date"
          value={dateEnd}
          onChange={(e) => setDateEnd(e.target.value)}
        />
        <select className="select-card" value={status} onChange={handleStatusChange}>
          <option value="">Seleccione</option>
          <option value="Pendiente">Pendiente</option>
          <option value="Progresando">Progresando</option>
          <option value="Terminado">Terminado</option>
        </select>
        <p className="msg-status">{message}</p> 
        <button type="button" className="btn-save" onClick={saveTask}>
          Guardar
        </button>
      </div>
    </section>
  );
}

export default CreateTask;
