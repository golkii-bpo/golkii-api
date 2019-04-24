const express = require('express');
const areaRouter = express.Router();
const areaController = require('./areaController');

module.exports = areaRouter;

areaRouter
.get('/',areaController.getBuscar)
.get('/:IdArea',areaController.getBuscarById)
.post('/',areaController.postAgregar)
.put('/:IdArea',areaController.putModificar)
.put('/:IdArea/DarBaja',areaController.putDarBaja)
.put('/:IdArea/DarAlta',areaController.putDarAlta);