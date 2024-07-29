import React, { useEffect, useState } from "react";
import GestionTask from "../controller/gestionTask.js";
import EditTask from "./EditTask.js";
import ReactModal from "react-modal";
import "./styles/Home.css";
import EditarIcono from "../assets/icon/editar.png";
import EliminarIcono from "../assets/icon/eliminar.png";

ReactModal.setAppElement("#root");

function Home() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    const loadTasks = async () => {
      const gestionTask = new GestionTask();
      try {
        const tasksData = await gestionTask.getTasks();
        setTasks(tasksData);
      } catch (error) {
        console.error("Error loading tasks:", error);
      }
    };

    loadTasks();
  }, []);

  const eliminarTask = async (id_task) => {
    if (window.confirm("¿Está seguro de que desea eliminar esta tarea?")) {
      const gestionTask = new GestionTask();
      try {
        await gestionTask.deleteTask(id_task);
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task.id_task !== id_task)
        );
        alert("Tarea eliminada con éxito.");
      } catch (error) {
        console.error("Error deleting task:", error);
        alert("Error al eliminar la tarea.");
      }
    }
  };

  const handleEditClick = (task) => {
    setCurrentTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = async (updatedTask) => {
    const gestionTask = new GestionTask();
    try {
      await gestionTask.updateTask(
        updatedTask.id_task,
        updatedTask.titulo,
        updatedTask.descripcion,
        updatedTask.status,
        updatedTask.fecha_inicio,
        updatedTask.fecha_final
      );
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id_task === updatedTask.id_task ? updatedTask : task
        )
      );
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Error al actualizar la tarea.");
    }
  };

  return (
    <section className="home-container">
      <h1 className="title-home">Registro de Tareas</h1>
      <div className="table-home-container">
        <table className="table-home">
          <thead>
            <tr>
              <th className="id-table">ID</th>
              <th>Título</th>
              <th>Descripción</th>
              <th>Fechas</th>
              <th>Estado</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task,index) => (
              <tr key={task.id_task}>
                <td>{index+1}</td>
                <td>{task.titulo}</td>
                <td>{task.descripcion}</td>
                <td>
                  <ul>
                    <li>Inicio: {task.fecha_inicio.slice(0, 10)}</li>
                    <li>Fin: {task.fecha_final.slice(0, 10)}</li>
                  </ul>
                </td>
                <td>{task.status}</td>
                <td>
                  <button
                    className="btn-Editar"
                    onClick={() => handleEditClick(task)}
                  >
                    <img className="EditarIcono" src={EditarIcono} alt="Editar" />
                  </button>
                  <button
                    className="btn-Eliminar"
                    onClick={() => eliminarTask(task.id_task)}
                  >
                    <img
                      className="EliminarIcono"
                      src={EliminarIcono}
                      alt="Eliminar"
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Edit Task"
      >
        {currentTask && (
          <EditTask
            dataTask={currentTask}
            saveTask={handleSaveTask}
          />
        )}
      </ReactModal>
    </section>
  );
}

export default Home;
