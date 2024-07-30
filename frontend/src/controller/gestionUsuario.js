import axios from "axios";

class GestionUsuarios {
  constructor() {
    this.usuarios = [];
    this.baseURL = "http://localhost:4000";
  }

  async addUsuario(nombre, apellido, username, password) {
    const usuarioExistente = await this.checkUsername(username);
    
    if (usuarioExistente) {
      alert("Error: el usuario ya está registrado");
      return false;
    }

    try {
      await axios.post(`${this.baseURL}/setUsuario`, {
        username, password, nombre, apellido
      });
      return true;
    } catch (error) {
      console.error("Error al añadir un usuario:", error);
      return false;
    }
  }

  async checkUsername(username) {
    try {
      const response = await axios.get(`${this.baseURL}/checkUsername`, {
        params: { username }
      });

      return response.data.length > 0;
    } catch (error) {
      console.error("Error al verificar el nombre de usuario:", error);
      alert("Error al verificar el nombre de usuario. Por favor, inténtelo de nuevo.");
      return false;
    }
  }
}

export default GestionUsuarios;
