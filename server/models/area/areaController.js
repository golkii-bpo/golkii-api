const areaModel = require('./areaModel');
const areaService = require('./areaService');
const Mensaje = require('../../helpers/message');

module.exports = {
    /**
     * Agrega un nueva area en la base de datos
     *
     * @param {*} req
     * @param {*} res
     * @returns
     */
    agregar: async (req,res) => {
        
        try {
            const {error,value} = areaService.validar(req.body);
            if(error && error.details) return res.status(400).json(new Mensaje(error,null));
            const result = await areaModel.create(value);
            console.log(result);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json(new Mensaje(error,null));
        }
    }
}