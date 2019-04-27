// const Joi = require('joi-es');
const Joi = require('joi');
const Message = require('../../helpers/message');

const JoiFunciones = Joi.object().keys({
    Descripcion: Joi.string().required().max(255),
    FechaIngreso: Joi.date()
});

const JoiPermisos = Joi.object().keys({
    Path: Joi.string().required(),
    Descripcion: Joi.string().max(255)
})

const permisoValidacion = Joi.object().keys({
    Nombre: Joi.string().required().max(20),
    Area: Joi.string().required(),
    Descripcion: Joi.string().max(255),
    Parent: Joi.string(),
    Funciones:Joi.array().items(JoiFunciones),
    Permisos: Joi.array().items(JoiPermisos)
});

const validarModelo = (body) => {
    return Joi.validate(body,permisoValidacion);
}

class cargoService extends Message {
    validarAgregar(body){
       return validarModelo(body);
    }
}

module.exports = cargoService;