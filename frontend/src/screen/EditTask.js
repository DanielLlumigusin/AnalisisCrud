import React, { useState, useEffect } from "react";
import "./styles/EditTask.css";
function EditTask({ dataTask, saveTask }) {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha_inicio, setFechaInicio] = useState("");
  const [fecha_final, setFechaFinal] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (dataTask) {
      setTitulo(dataTask.titulo);
      setDescripcion(dataTask.descripcion);
      setFechaInicio(dataTask.fecha_inicio.slice(0, 10));
      setFechaFinal(dataTask.fecha_final.slice(0, 10));
      setStatus(dataTask.status);
    }
  }, [dataTask]);

  const handleSave = () => {
    const updatedTask = {
      ...dataTask,
      titulo,
      descripcion,
      fecha_inicio,
      fecha_final,
      status,
    };
    saveTask(updatedTask);
  };

  return (
    <section className="formulario-container">
      <div className="card">
        <input
          className="titulo-card"
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <textarea
          className="descripcion-card"
          type="text"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <input
          className="fecha_inicio-card"
          type="date"
          value={fecha_inicio}
          onChange={(e) => setFechaInicio(e.target.value)}
        />
        <input
          className="fecha_final-card"
          type="date"
          value={fecha_final}
          onChange={(e) => setFechaFinal(e.target.value)}
        />
        <select
          className="select-card"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="" disabled>
            Seleccione
          </option>
          <option value="Pendiente">Pendiente</option>
          <option value="En curso">En curso</option>
          <option value="Terminado">Terminado</option>
        </select>
        <button type="button" className="btn-save" onClick={handleSave}>
          Guardar
        </button>
      </div>
    </section>
  );
}

export default EditTask;
