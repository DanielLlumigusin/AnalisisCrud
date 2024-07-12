import TaskModel from "../model/taskModel";

class GestionTask {
    constructor() {
        // Crear una lista para almacenar las tareas simuladas
        this.tasks = [];

        // Simular datos de tareas y agregarlas a la lista
        this.tasks.push(this.createTask(1,"CRUD ANALISIS", "Realizar un Crud con propiedades Solid", "Pendiente", "13-07-2024", "21-07-2024"));
        this.tasks.push(this.createTask(2,"Revisión de Diseño", "Evaluar diseño de interfaz", "En Progreso", "15-07-2024", "25-07-2024"));
        this.tasks.push(this.createTask(3,"Testing Unitario", "Desarrollar y ejecutar pruebas unitarias", "Completado", "18-07-2024", "22-07-2024"));
    }

    // Método para crear instancias de TaskModel con datos simulados
    createTask(id, title, description, status, date_start, date_end) {
        let task = new TaskModel();
        task.id = id;
        task.title = title;
        task.description = description;
        task.status = status;
        task.date_start = date_start;
        task.date_end = date_end;
        return task;
    }

    // Método para obtener la lista de tareas
    getTasks() {
        return this.tasks;
    }

    // Método para agregar una nueva tarea
    addTask(title, description, status, date_start, date_end) {
        let newTask = this.createTask(title, description, status, date_start, date_end);
        this.tasks.push(newTask);
    }

    // Método para actualizar una tarea existente por su índice
    updateTask(index, title, description, status, date_start, date_end) {
        if (index >= 0 && index < this.tasks.length) {
            let task = this.tasks[index];
            task.title = title;
            task.description = description;
            task.status = status;
            task.date_start = date_start;
            task.date_end = date_end;
        }
    }

    // Método para eliminar una tarea por su índice
    deleteTask(index) {
        if (index >= 0 && index < this.tasks.length) {
            this.tasks.splice(index, 1);
        }
    }
}

export default GestionTask;
