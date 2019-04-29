const cargoModel = require('./cargoModel');
const cargoService = new (require('./cargoService'))();
const Message = new (require('../../helpers/message'))();

module.exports = {
    getObtener: async(req,res) => {
        const _return = 
        await cargoModel
        .find({Estado:true})
        .select({
            Permisos:false,
            FechaModificacion:false,
            Estado:false
        });

        return res.status(400).json(Message.sendValue(_return));
    },
    getObtenerAll: async (req,res) => {
        const _return = 
        await cargoModel
        .find()
        .select({
            Permisos:false,
            FechaModificacion:false
        });
        return res.json(_return);
    },
    getBuscarById: async (req,res) => {
        if(!req.params.hasOwnProperty('idCargo')) return res.status(400).json(Message.sendValue('Favor especificar el Id del cargo'));
        const id = req.params.idCargo;
        if(!cargoService.validarObjectId(id)) return res.status(400).json(Message.sendError('El Id ingresado no tiene el formato correcto'));

        const _return = 
        await cargoModel.findOne({_id:id,Estado:true});
        return res.json(Message.sendValue(_return));
    },
    getPermisosById: async (req,res) => {
        if(!req.params.hasOwnProperty('idCargo')) return res.status(400).json(Message.sendValue('Favor especificar el Id del cargo'));
        const id = req.params.idCargo;
        if(!cargoService.validarObjectId(id)) return res.status(400).json(Message.sendError('El Id ingresado no tiene el formato correcto'));

        const _return =
        await cargoModel
        .findOne({
            _id:id,
            Estado:true
        })
        .select({
            Permisos:true,
            Nombre:true,
        });

        console.log(JSON.parse(cargoModel));
        return res.json(Message.sendValue(_return));
    },
    postAgregar: async (req,res) => {
        const {error,value} = await cargoService.validarModelo(req.body);
        if(error) return res.status(400).json(Message.sendError(error));

        let _result = await cargoModel.create(value);
        return res.json(Message.sendValue(_result));
    }
}
