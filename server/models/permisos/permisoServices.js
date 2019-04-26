const Joi = require('joi-es');
const general = require('../../helpers/generalValidation');
const areaService = new (require('../../models/area/areaService'))();
const Mensaje = new (require('../../helpers/message'))();

const _PermisoJoi = Joi.object().keys({
    IsTag: Joi.boolean().required(),
    Titulo: Joi.string().max(12),
    Descripcion: Joi.string().max(255),
    Area: Joi.string().required().max(30),
    Parent:Joi.string(),
    Path: Joi.string(),
    FechaIngreso: Joi.date(),
    FechaModificacion:Joi.date(),
    Estado:Joi.boolean()
});

class permisoService extends general{
    async validarModelo(body) {
        const {error,value} = Joi.validate(body,_PermisoJoi);
        if(error && error.details) return Mensaje.sendError(error.details[0].message);
        if(!await areaService.validarArea(value.Area)) return Mensaje.sendError('El Area a ingresar no se encuentra registrada en sistema');
        return Mensaje.sendValue(value);
    };
}

module.exports = permisoService;