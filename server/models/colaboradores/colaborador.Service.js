const joi = require('joi');
// const joi = require('joi-es');
const lodash = require('lodash');
const colMdl = require('./colaborador.Model');
const msgHandler = require('../../helpers/MessageToolHandler');
const general = require('../../helpers/generalValidation');

const JoiPerfil = joi.object().keys({
    Foto: joi.string(),
    Settings: joi.object().keys({
        DarkMode: joi.boolean(),
        SiderBar: joi.boolean()
    })
})

const JoiColaborador = joi.object().keys({
    Nombre: joi.string().required(5).max(30),
    Apellido: joi.string().required(5).max(30),
    Cedula: joi.string().required().regex(/\d{3}-{0,1}\d{6}-{0,1}\d{4}[A-z]{1}/),
    Email: joi.string().email(),
    Cargo: joi.string().required(),
    Perfil: JoiPerfil
})

class colaboradorService extends general {
    validarColaborador(data){
        return joi.validate(data,JoiColaborador);
    }
};

module.exports = new colaboradorService;