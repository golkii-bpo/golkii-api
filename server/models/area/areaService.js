const Joi = require('joi-es');
// const _are = require('./areaModel');
const general = require('../../helpers/generalValidation');
const Message = require('../../helpers/message');

const areaValidation = Joi.object().keys({
    Nombre: Joi.string().max(20).required(),
    Descripcion: Joi.string().max(255),
    FechaIngreso: Joi.date(),
    FechaModificacion: Joi.date(),
    Estado: Joi.boolean()
});

/**
 *Valida el modelo de datos de Area
 *
 * @param {*} body
 * @returns
 */

class areaService extends general {
    validarModelo(body) {
        const{error,value} = Joi.validate(body,areaValidation);
        //validación de modelo de datos
        if(error && error.details) return new Message(error.details[0].message);
        
        //Se valida que sea unico el tipo de datos
        return {error,value};
    };

    /**
     *Funcion que permite validar el modelo de datos de un Area
     *
     * @param {Este es el modelo ha validar} body
     * @returns {Retorna un objeto con 2 datos un error y un value. Si ocurrio un fallo en el campo de error aparecera el error}
     */
    validarAgregar(body) {
        return validarModelo(body);
    };

    /**
     * Valida los datos correspondiente para luego proceder a modificar el objecto
     *
     * @param {*} id
     * @param {*} body
     * @returns { Retorna un objeto con un 2 propiedades un error y un value. Si ocurre algun inconveniente la propiedad [error] envia un mensaje del error que ocurrio }
     */
    validarModificar(id,body) {
        if(!this.validarObjectId(id)) return new Message('El Id ingresado no tiene el formato correcto',null);
        return validarModelo(body);
    };
}

module.exports = areaService;