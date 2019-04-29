const Joi = require('joi');
const general = require('../../helpers/generalValidation');
const areaService = new (require('../../models/area/areaService'))();
const Message = new (require('../../helpers/message'))()

const JoiFunciones = Joi.object().keys({
    Descripcion: Joi.string().required().max(255),
    FechaIngreso: Joi.date(),
    Estado: Joi.bool()
});

const JoiPermisos = Joi.object().keys({
    Path: Joi.string().required(),
    Descripcion: Joi.string().max(255),
    Estado: Joi.bool()
})

const cargoValidacion = Joi.object().keys({
    Nombre: Joi.string().required().max(20),
    Area: Joi.string().required(),
    Descripcion: Joi.string().max(255),
    Parent: Joi.string(),
    Funciones:Joi.array().items(JoiFunciones).min(1),
    Permisos: Joi.array().items(JoiPermisos)
});

const validarPermisos = (Permisos) => {
    let _data = {},
        retorno = true;
    if(!Array.isArray(Permisos)) return false;
    for(let item of Permisos){
        if(_data.hasOwnProperty(item.Path)) {retorno = false;break;}
        _data[item.Path] = item;
    }
    return retorno;
};

class cargoService extends general {

    async validarModelo(body) {
        const {error,value} = Joi.validate(body,cargoValidacion);
        if(error && error.details) return Message.sendError(error.details[0].message);
        
        //Validacion del area que se le va a ingresar a un cargo
        if(!await areaService.validarArea(value.Area)) return Message.sendError('El area ingresada no es valida');

        //Validacion de los permisos
        if(body.hasOwnProperty('Permisos')) if(!validarPermisos(body.Permisos)) return Message.sendError('No puede existir un Permisos con el mismo Path');  
        return Message.sendValue(value);
    }

    /**
     * Realiza la validación para el modelo de datos de Area 
     *
     * @param {*} body
     * @returns Promise(Message)
     * @memberof cargoService
     */
    async validarAgregar(body){
        const {error,value} = await this.validarModelo(body);
        if(error) return Message.sendError(error)
        return Message.sendValue(value);
    }
}

module.exports = cargoService;