const express = require("express");
const mongoose = require("mongoose")
const server = express();
const CategoriesRoutes = require("./controller/routes/CategoriesRoutes")
require("dotenv").config()
const servidor = process.env.DB_SERVER

server.use(
    express.urlencoded(
        {extended: true}
    )
)
server.use(express.json());

server.use("/categorias", CategoriesRoutes)




mongoose.connect(`mongodb://${servidor}/blog`).then(
    console.log("conectado com sucesso"),
    server.listen(5000)
).catch((err) => console.log("Houve um erro: ${err}"))