const express = require('express');
const cargoController = require('./cargoController');
// const errorHandler = require('../../helpers/generalValidation');
const cargoRoute = express.Router();

module.exports = cargoRoute;

cargoRoute
.post('',cargoController.postAgregar)