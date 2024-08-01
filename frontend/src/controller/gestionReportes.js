import axios from "axios";
import ReporteModel from "../model/reporteModel.js";

class GestionReporte {
  constructor() {
    this.reportes = [];
    this.baseURL = "http://localhost:4000";
  }

  createReporte(
    id_usuario,
    id_task,
    titulo,
    descripcion,
    fecha_inicio,
    fecha_final,
    status,
    username,
    password,
    nombre,
    apellido
  ) {
    let reporte = new ReporteModel();
    reporte.id_usuario = id_usuario;
    reporte.id_task = id_task;
    reporte.titulo = titulo;
    reporte.descripcion = descripcion;
    reporte.fecha_inicio = fecha_inicio;
    reporte.fecha_final = fecha_final;
    reporte.status = status;
    reporte.username = username;
    reporte.password = password;
    reporte.nombre = nombre;
    reporte.apellido = apellido;
    return reporte;
  }

  async getReportes() {
    try {
      const response = await axios.get(`${this.baseURL}/getReportes`);
      this.reportes = response.data.map((reporteData) =>
        this.createReporte(
          reporteData.id_usuario,
          reporteData.id_task,
          reporteData.titulo,
          reporteData.descripcion,
          reporteData.fecha_inicio,
          reporteData.fecha_final,
          reporteData.status,
          reporteData.username,
          reporteData.password,
          reporteData.nombre,
          reporteData.apellido
        )
      );
      return this.reportes;
    } catch (error) {
      console.error("Error al obtener los reportes", error);
      return [];
    }
  }
}

export default GestionReporte;
