const express = require('express');
const permisosRouter = express.Router();
const controller = require('./permisosController');
const errorHandler = require('../../middleware/errorHandler');

module.exports = permisosRouter;

permisosRouter
.post('/agregar',controller.agregar)