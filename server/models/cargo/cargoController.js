const cargoModel = require('./cargoModel');
const cargoService = new (require('./cargoService'))();
const Message = new (require('../../helpers/message'))();

module.exports = {
    postAgregar: async (req,res) => {
        const {error,value} = cargoService.validarAgregar(req.body);
        console.log(error,value);
        res.json(error);
    }
}
