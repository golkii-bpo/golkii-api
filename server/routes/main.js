const express = require('express');
const mainRoute = express.Router();

const permisosRouter = require('../models/permisos/permisoRouter');
const areaRouter = require('../models/area/areaRouter');

mainRoute.use('/area',areaRouter);
mainRoute.use('/permiso',permisosRouter);

module.exports = mainRoute;