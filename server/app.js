require("dotenv").config();

const express = require('express');
const config = require("config");
const path = require("path");
const morgan = require("morgan");
const Winston = require("winston");
const helmet = require('helmet');
const logger = Winston.createLogger({
    transports:[
        new Winston.transports.File({filename:path.join(__dirname,"../log/errors.log")})
    ]
});

//inicialiacion de web api
const app = express();

//Asignación de variables
const PORT = config.PORT;

//Middleware
app.use(express.json);
app.use(helmet());
app.use(morgan("dev"));

//Routing
app.use("*",(req,res)=>{
    return res.status(404).send("La ruta indicada no se encuentra estipulada");
})

//inicio del servidor en un puerto
app.listen(PORT,()=>{
    console.log(`Aplicación corriendo en el puerto ${PORT}`);
});