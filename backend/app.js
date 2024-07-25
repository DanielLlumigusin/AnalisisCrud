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
    database: 'Analisis'
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
    const sql = "SELECT * FROM user WHERE username = ? AND password = ?";

    connection.query(sql, [username, password], (err, results) => {
        if (err) {
            console.error('Error en la BD:', err);
            res.status(500).send('Ocurrió un error en la consulta del usuario');
            return;
        }
        res.json(results);
    });
});

// Obtener todas las tareas
app.get("/getTask", function(req, res) {
    const sql = "SELECT * FROM task";
    
    connection.query(sql, (err, results) => {
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

// Editar una tarea existente
app.put("/editTask/:id", function(req, res) {
    const id = req.params.id;
    const values = req.body;
    const sql = "UPDATE task SET ? WHERE id = ?";

    connection.query(sql, [values, id], (err, results) => {
        if (err) {
            console.error('Error en la BD:', err);
            res.status(500).send('Ocurrió un error al actualizar la tarea');
            return;
        }
        res.json(results);
    });
});

app.use(errorHandler);

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
