import React from "react";

function EditTask(dataTask) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [status, setStatus] = useState("");
  const [task, setTask] = useState(null);

  return (
    <section className="formulario-container">
      <div className="card">
        <input
          className="title-card"
          type="text"
          placeholder="Titulo"
          value={dataTask.title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="description-card"
          type="text"
          placeholder="Descripcion"
          value={dataTask.description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          className="dateStart-card"
          type="date"
          value={dataTask.dateStart}
          onChange={(e) => setDateStart(e.target.value)}
        />
        <input
          className="dateEnd-card"
          type="date"
          value={dataTask.dateEnd}
          onChange={(e) => setDateEnd(e.target.value)}
        />
        <select className="select-card" value={dataTask.status}>
          <option>Seleccione</option>
          <option value={"Pendiente"}>Pendiente</option>
          <option value={"En curso"}>En curso</option>
          <option value={"Terminado"}>Terminado</option>
        </select>
        <button type="button" className="btn-save" onClick={saveTask}>
          Guardar
        </button>
      </div>
    </section>
  );
}

export default EditTask;
