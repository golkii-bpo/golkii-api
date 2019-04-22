const express = require('express');
const mainRoute = express.Router();

const permisosRouter = require('../models/permisos/permisosRouter');
const areaRouter = require('../models/area/areaRouter');

mainRoute.use('/permisos',permisosRouter);
mainRoute.use('/area',areaRouter);

module.exports = mainRoute;