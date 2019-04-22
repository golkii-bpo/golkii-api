const Joi = require('joi-es');

const permisosJoi = Joi.object().keys({
    Nombre:Joi.string().min(5).max(30).required(),
    Descripcion: Joi.string().max(255),
    Area: Joi.string().required().max(30),
    Titulo: Joi.string().max(12),
    Parent:Joi.string(),
    Path: Joi.string().required(),
    FechaIngreso: Joi.date(),
    FechaModificacion:Joi.date(),
    Estado:Joi.boolean().required()
});

module.exports = {
    Permisos: (body) => {
        return Joi.validate(body,permisosJoi);
    }
}