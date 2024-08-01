const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Configura la conexión a la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todo'
});

// Conecta a la base de datos
connection.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1);
    }
    console.log('Connected to the database');
});

// Obtener usuario con query parameters
app.get("/getUser", function(req, res) {
    const { username, password } = req.query; 
    const sql = "SELECT * FROM usuario WHERE username = ? AND password = ?";

    connection.query(sql, [username, password], (err, results) => {
        if (err) {
            console.error('Error en la BD:', err);
            res.status(500).send('Ocurrió un error en la consulta del usuario');
            return;
        }
        res.json(results);
    });
});

app.get("/checkUsername", function(req, res) {
    const { username } = req.query; 
    const sql = "SELECT * FROM usuario WHERE username = ?";

    connection.query(sql, [username], (err, results) => {
        if (err) {
            console.error('Error en la BD:', err);
            res.status(500).send('Ocurrió un error en la consulta del usuario');
            return;
        }
        res.json(results);
    });
});

app.post("/setUsuario", function(req, res) {
    const values = req.body; 
    const sql = "INSERT INTO usuario SET ?";

    connection.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error en la BD:', err);
            res.status(500).send('Ocurrió un error al insertar la tarea');
            return;
        }
        res.json(results);
    });
});


// Obtener todas las tareas
app.get("/getTasks/:id", function(req, res) {
    const id_usuario = req.params.id; 
    const sql = "SELECT * FROM task WHERE id_usuario = ?";
    
    connection.query(sql, id_usuario, (err, results) => {
        if (err) {
            console.error('Error en la BD:', err);
            res.status(500).send('Ocurrió un error en la consulta de las tasks');
            return;
        }
        res.json(results);
    });
});

// Agregar una nueva tarea
app.post("/setTask", function(req, res) {
    const values = req.body; 
    const sql = "INSERT INTO task SET ?";

    connection.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error en la BD:', err);
            res.status(500).send('Ocurrió un error al insertar la tarea');
            return;
        }
        res.json(results);
    });
});

// Actualizar una tarea
app.put("/updateTask/:id", function(req, res) {
    const id_task = req.params.id; 
    const { titulo, descripcion, fecha_inicio, fecha_final, status, id_usuario } = req.body;

    const sql = "UPDATE task SET titulo = ?, descripcion = ?, fecha_inicio = ?, fecha_final = ?, status = ? WHERE id_task = ? AND id_usuario = ?";

    connection.query(sql, [titulo, descripcion, fecha_inicio, fecha_final, status, id_task, id_usuario], (err, results) => {
        if (err) {
            console.error('Error en la BD:', err);
            res.status(500).send('Ocurrió un error al actualizar la tarea');
            return;
        }
        res.json(results);
    });
});

// Eliminar una tarea
app.delete("/deleteTask/:id", function(req, res) {
    const id = req.params.id;
    const sql = "DELETE FROM task WHERE id_task = ?";

    connection.query(sql, id, (err, results) => {
        if (err) {
            console.error('Error en la BD:', err);
            res.status(500).send('Ocurrió un error al eliminar la tarea');
            return;
        }
        res.json(results);
    });
});


app.get("/getReportes", function(req, res) {
    const sql = "select * from task natural join usuario;";

    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error en la BD:', err);
            res.status(500).send('Ocurrió un error en la consulta del reporte');
            return;
        }
        res.json(results);
    });
});

const port = 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
