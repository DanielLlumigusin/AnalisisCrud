import TaskModel from "../model/taskModel";
import axios from "axios";

class GestionTask {
  constructor() {
    this.tasks = [];
    this.baseURL = "http://localhost:4000";
  }

  createTask(id_task, titulo, descripcion, status, fecha_inicio, fecha_final) {
    let task = new TaskModel();
    task.id_task = id_task;
    task.titulo = titulo;
    task.descripcion = descripcion;
    task.status = status;
    task.fecha_inicio = fecha_inicio;
    task.fecha_final = fecha_final;
    return task;
  }

  async getTasks() {
    try {
      const id_usuario = localStorage.getItem("id_usuario");
      const response = await axios.get(`${this.baseURL}/getTasks/${id_usuario}`);
      this.tasks = response.data.map((taskData,) =>
        this.createTask(
          taskData.id_task,
          taskData.titulo,
          taskData.descripcion,
          taskData.status,
          taskData.fecha_inicio,
          taskData.fecha_final
        )
      );
      return this.tasks;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return [];
    }
  }

  async addTask(titulo, descripcion, status, fecha_inicio, fecha_final) {
    try {
      const id_usuario = localStorage.getItem("id_usuario");
      await axios.post(`${this.baseURL}/setTask`, {
        titulo,
        descripcion,
        status,
        fecha_inicio,
        fecha_final,
        id_usuario,
      });
    } catch (error) {
      console.error("Error adding task:", error);
    }
  }

  async updateTask(id_task, titulo, descripcion, status, fecha_inicio, fecha_final) {
    try {
      const id_usuario = localStorage.getItem("id_usuario");
      await axios.put(`${this.baseURL}/updateTask/${id_task}`, {
        titulo,
        descripcion,
        status,
        fecha_inicio,
        fecha_final,
        id_usuario,
      });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  }

  async deleteTask(id_task) {
    try {
      await axios.delete(`${this.baseURL}/deleteTask/${id_task}`);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }
}

export default GestionTask;
