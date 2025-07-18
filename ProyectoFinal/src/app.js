import express from "express";
import routes from "./routes/index.js";
import __dirname from "./dirname.js";
import { engine }  from 'express-handlebars';
import { setupSocket } from './util/socket.js';
import { createServer } from 'http';
import { connectMongoDB } from "./config/db.js";
import envsConfig from "./config/env.config.js";

const app =express();

connectMongoDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));


// Rutas de la api
app.use("/api", routes);

// Ruta para manejar errores 404
app.use((req, res) => {
    res.status(404).json({ error: "Recurso no encontrado" });
  });

  //handlebars config
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views",  __dirname +"/views");

// socket 

const server = createServer(app);
setupSocket(server);


server.listen(envsConfig.PORT, () => {
  console.log(`Servidor escuchando en el puerto ${envsConfig.PORT}`);
});


