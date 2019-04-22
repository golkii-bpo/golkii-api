const express = require('express');
const areaRouter = express.Router();
const areaController = require('./areaController');

module.exports = areaRouter;

areaRouter
.route('/')
.post(areaController.agregar);