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

// Página principal
app.get('/', (req, res) => {
    res.send(
        `<body style="background-color: #212121; color: white">
            <header>MERN TASKS</header>
            <main>
                <p>Hello world! - From the server</p>
            </main>
        </body>`
    );
})

// Iniciar la app
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}...`);
});