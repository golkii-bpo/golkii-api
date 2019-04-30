const Joi = require('joi');
// const Joi = require('joi-es');
const general = require('../../helpers/generalValidation');
const cargoModel = require('./cargoModel');
const areaService = new (require('../../models/area/areaService'))();
const msgHandler = require('../../helpers/MessageToolHandler');
const lodash = require('lodash');

const JoiFunciones = Joi.object().keys({
    Descripcion: Joi.string().required().max(255),
    FechaIngreso: Joi.date(),
    Estado: Joi.bool()
});

const JoiPermisos = Joi.object().keys({
    Path: Joi.string().required(),
    Descripcion: Joi.string().max(255),
    Estado: Joi.bool()
});

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

const validarModelo = async (body) => {
    const {error,value} = Joi.validate(body,cargoValidacion);
    if(error && error.details) return msgHandler.sendError(error.details[0].message);
    
    //Validacion del area que se le va a ingresar a un cargo
    if(!await areaService.validarArea(value.Area)) return msgHandler.sendError('El area ingresada no es valida');

    //Validacion de los permisos
    if(body.hasOwnProperty('Permisos')) if(!validarPermisos(body.Permisos)) return msgHandler.sendError('No puede existir un Permisos con el mismo Path');  
    return msgHandler.sendValue(value);
}

class cargoService extends general {

    /**
     * Realiza la validación para agregar un Cargo 
     *
     * @param {*} body
     * @returns Promise(Message)
     * @memberof cargoService
     */
    async validarAgregar(body){
        const {error,value} = await validarModelo(body);
        if(error) return msgHandler.sendError(error)
        return msgHandler.sendValue(value);
    }
    /**
     * @
     * Realiza la validacion para modificar un Cargo 
     *
     * @param {*} body
     * @returns
     * @memberof cargoService
     */
    async validarModificar(body){
        const {error,value} = await validarModelo(body);
        if(error) return msgHandler.sendError(error)
        return msgHandler.sendValue(value);
    }

    validarPermisoMultiples (Permisos) {
        const data = Permisos.map(item => {
            return lodash.pick(item,['Path','Descripcion','Estado'])
        });

        const {error,value} = Joi.array().items(JoiPermisos).min(1).validate(data);
        if(error) return msgHandler.sendError(error);
        return msgHandler.sendValue(Permisos);
    }
    async validarPermisoSingle (idCargo,Permiso) {
        const _Permiso = lodash.pick(Permiso,['Path','Descripcion','Estado']);
        const {error} = JoiPermisos.validate(_Permiso);
        if(error) return msgHandler.sendError(error);

        const _idPathValid = Array.from((await cargoModel.findOne({_id:idCargo})).Permisos).find(item => {
            return item.Path == Permiso.Path;
        });
        if(_idPathValid) return msgHandler.sendError('Lo sentimos la ruta o direccion ya a sido ingresado a este cargo');

        return msgHandler.sendValue(_Permiso);
    }
}

module.exports = new cargoService;