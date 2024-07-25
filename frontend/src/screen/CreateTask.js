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
    setTask(null); 
    const newTask = {
      title: title,
      description: description,
      dateStart: dateStart,
      dateEnd: dateEnd,
      status: status,
    };

    if(title === "", description === "", dateStart === "", dateEnd === "", status === ""){
      alert("Error debe completar todos los campos");
    }else{
      setTask(newTask);
      limpiarCampos();
      console.log("Task saved", newTask);
    }
    console.log("Error al guardar los datos");
  }

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const limpiarCampos = (e) => {
    setTitle("")
    setDescription("")
    setDateStart("")
    setDateEnd("")
    setStatus("")
  }

  const msgStatus = (e) => {
    if(setStatus !== null){
      return "Exito al guardar";
    }else{
      return "Error al guardar";
    }
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
        <select className="select-card" onChange={handleStatusChange}>
          <option value="">Seleccione</option>
          <option value="Pendiente">Pendiente</option>
          <option value="En curso">En curso</option>
          <option value="Terminado">Terminado</option>
        </select>
        <p className="msg-status"></p>
        <button type="button" className="btn-save" onClick={saveTask}>
          Guardar
        </button>
      </div>
    </section>
  );
}

export default CreateTask;
