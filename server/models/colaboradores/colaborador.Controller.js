const colaboradorServices = require('./colaborador.Service');
const colaboradorModel = require('./colaborador.Model');
const msgHandler = require('../../helpers/MessageToolHandler');

module.exports = {
    
    getObtener: async (req,res) => {
        const _result = await colaboradorModel.find({Estado: true});
        return res.json(_result);
    },
    
    getObtenerAll: async (req,res) => {
        const _result = await colaboradorModel.find();
        return res.json(_result);
    },

    postAgregar: async (req,res) => {
        const Body = req.Body;
        console.log(Body);
        const {error,value} = colaboradorServices.validarColaborador(Body);
        if(error) return res.status(400).json(msgHandler.sendError(error));
        
        const _result = await colaboradorModel.create(value);
        return res.json(msgHandler.sendValue(_result));
    }
};1