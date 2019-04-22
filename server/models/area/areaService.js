const Joi = require('joi-es');

const areaValidation = Joi.object().keys({
    Nombre: Joi.string().max(20).required(),
    Descripcion: Joi.string().max(255),
    FechaIngreso: Joi.date(),
    FechaModificacion: Joi.date(),
    Estado: Joi.boolean()
});

module.exports = {
    /**
     *Funcion que permite validar el modelo de datos de un Area
     *
     * @param {Este es el modelo ha validar} body
     * @returns {Retorna un objeto con 2 datos un error y un value. Si ocurrio un fallo en el campo de error aparecera el error}
     */
    validar: (body) => {
        return Joi.validate(body,areaValidation);
    }
}