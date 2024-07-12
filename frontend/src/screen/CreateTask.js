import React, { useState } from "react";
import "./styles/CreateTask.css";

function CreateTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [status, setStatus] = useState("");
  const [task, setTask] = useState(null);

  function saveTask() {
    setTask({
      title,
      description,
      dateStart,
      dateEnd,
    });
  }

  return (
    <section className="formulario-container">
      <div className="card">
        <input
          className="title-card"        
          type="text"
          placeholder="Titulo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
        className="description-card"
          type="text"
          placeholder="Descripcion"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
        <select className="select-card">
          <option>Seleccione</option>
          <option>Pendiente</option>
          <option>En curso</option>
          <option>Terminado</option>
        </select>
        <button type="button" className="btn-save" onClick={saveTask}>
          Guardar
        </button>
      </div>
    </section>
  );
}

export default CreateTask;
