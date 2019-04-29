const express = require('express');
const cargoController = require('./cargoController');
const errorHandler = require('../../middleware/errorHandler');
const cargoRoute = express.Router();

module.exports = cargoRoute;

cargoRoute
.get('',errorHandler(cargoController.getObtener))
.get('/:idCargo/Permisos',errorHandler(cargoController.getPermisosById))
.post('',errorHandler(cargoController.postAgregar));