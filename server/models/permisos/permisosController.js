const _val = require('./permisosValidation');
const Mensaje = require('../../helpers/message');
const Permisos = require('./permisosModel');

module.exports = {
    async agregar (req,res) {
        try {
            const {error,value} = _val.Permisos(req.body);
            if(error) return res.status(400).send(new Mensaje(error.details[0].message,value));
            let _result = await Permisos.create(value);
            return res.status(200).send(_result);
        } catch(err){
            return res.status(400).send(new Mensaje(err,null));
        }
    }
}