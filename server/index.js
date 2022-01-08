const express = require("express");
const connectDB = require("./config/db");

// Crear el server
const app = express();

// Conectar a la Base de Datos
connectDB();

// Habilitar express.json
// express.json permite leer datos que el usuario envie. Otra forma de hacerlo es con body parser
app.use(express.json( {extended: true} ));

// Puerto de la app
const PORT = process.env.PORT || 4000;

// Importar rutas
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/tasks', require('./routes/tasks'));

// Página principal
app.get('/', (req, res) => {
    res.send(
        `
        <!DOCTYPE html>
        <html lang="en">
            <heading>
                <title>MERN Tasks - Server</title>
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap" rel="stylesheet">
            </heading>
            <body style="background-color: #121212; color: white; font-family: 'Roboto Mono', monospace; margin-top: 1rem; margin-left: 3rem">
                <header style="font-size: 3rem">MERN TASKS</header>
                <main>
                    <p>Hello world! - From the server</p>
                </main>
            </body>
        </html>
        `
    );
})

// Iniciar la app
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}...`);
});