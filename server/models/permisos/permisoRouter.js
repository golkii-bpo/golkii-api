const express = require('express');
const permisosRouter = express.Router();
const permisoController = require('./permisoController');
const errorHandler = require('../../middleware/errorHandler');

module.exports = permisosRouter;

permisosRouter
.post('/',errorHandler(permisoController.postAgregar));