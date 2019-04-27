const express = require('express');
const mainRoute = express.Router();

const permisosRouter = require('../models/permisos/permisoRouter');
const cargoRouter = require('../models/cargo/cargoRouter');
const areaRouter = require('../models/area/areaRouter');

mainRoute.use('/area',areaRouter);
mainRoute.use('/permiso',permisosRouter);
mainRoute.use('/cargo',cargoRouter);

module.exports = mainRoute;