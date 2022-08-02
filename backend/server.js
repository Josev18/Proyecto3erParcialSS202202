const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const conectarbd = require("./dao/db");

const port = process.env.PORT || 8000;

// Conectar MongoDB
conectarbd();

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/notes", require("./routes/tarea/index"));
app.use("/api/users", require("./routes/usuario/index"));

app.listen(port, () => console.log(`Servidor iniciado en el puerto ${port}`));
