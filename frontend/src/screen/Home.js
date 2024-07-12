import React, { useEffect, useState } from "react";
import TaskModel from "../model/taskModel.js";
import GestionTask from "../controller/gestionTask.js";
import "./styles/Home.css";

function Home() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Crear una instancia de GestionTask
    const gestionTask = new GestionTask();

    // Obtener las tareas desde GestionTask
    const tasksData = gestionTask.getTasks();

    // Actualizar el estado de tareas en el componente
    setTasks(tasksData);
  }, []); 

  return (
    <section className="home-container">
      <h1 className="title-home">Registro de Tareas</h1>
      <div className="table-home-container">
        <table className="table-home">
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Descripción</th>
              <th>Fechas</th>
              <th>Estado</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {/* Mapear cada tarea para mostrar en la tabla */}
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>
                  <ul>
                    <li>Inicio: {task.date_start}</li>
                    <li>Final: {task.date_end}</li>
                  </ul>
                </td>
                <td>{task.status}</td>
                <td>
                  <button type="button">Editar</button>
                  <button type="button">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Home;
