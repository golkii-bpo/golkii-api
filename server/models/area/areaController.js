const areaModel = require('./areaModel');
const areaService = new (require('./areaService'))();
const Message = require('../../helpers/message');

module.exports = {

    /**
     * Extrae todas aquellas Areas activas.
     *
     * @param {*} req
     * @param {*} res
     * @returns Array<AreaModel>
     */
    getBuscar: async(req,res) => {
        try {
            const _result = await areaModel.find({Estado:true});
            return res.status(200).json(_result);
        } catch (error) {
            return res.status(400).json(new Message(error.message,null));
        }
    },

    /**
     * Extrae todas aquellas areas registradas en el sistema.
     *
     * @param {*} req
     * @param {*} res
     * @returns Array<AreaModel>
     */
    getBuscarAll: async(req,res) => {
        try {
            const _result = await areaModel.find();
            return res.status(200).json(_result);
        } catch (error) {
            return res.status(400).json(new Message(error.message,null));
        }
    },

    /**
     * Realiza la busqueda del Area por medio de un Id de Area.
     *
     * @param {*} req
     * @param {*} res
     * @returns AreaModel
     */
    getBuscarById: async(req,res) => {
        try {

            const IdArea = req.params.IdArea;
            if(!areaService.validarObjectId(IdArea)) return res.status(400).json(new Message('El Id ingresado no tiene el formato correcto'))
            const _result = await areaModel.findOne({_id:IdArea});
            return res.status(200).json(_result);

        } catch (error) {
            return res.status(400).json(new Message(error.message,null));
        }
    },

    /**
     * Agrega un nueva area en la base de datos
     *
     * @param {*} req
     * @param {*} res
     * @returns AreaModel
     */
    postAgregar: async (req,res) => {
        
        try {
            const {error,value} = areaService.validarAgregar(req.body);
            if(error) return res.status(400).json(new Message(error,null));

            await areaModel
            .create(value)
            .then((result) =>{
                return res.status(200).json(result);
            }).catch((error)=>{
                return res.status(400).json(new Message(error.message,null));
            });

        } catch (error) {
            if(error.hasOwnProperty('errmsg')) return res.status(400).json(new Message(error.errmsg,null));
            return res.status(400).json(new Message(error.message,null));
        }
    },

    /**
     * Modifica un area con un Id especifico
     *
     * @param {*} req
     * @param {*} res
     * @returns AreaModel
     */
    putModificar: async (req,res) => {
        try {

            const _id = req.params.IdArea, body = req.body;
            const {error,value} = areaService.validarModificar(_id,body);
            if(error) return res.status(200).send(new Message(error,value));
            
            const _area = await areaModel.findById(_id);
            _area.set({
                Nombre: body["Nombre"],
                Descripcion: body["Descripcion"],
                FechaModificacion: Date.now()
            });

            const resultado = await Area.save();
            res.status(200).json(resultado);

        } catch (error) {
            if(error.hasOwnProperty('errmsg')) return res.status(400).json(new Message(error.errmsg,null));
            return res.status(400).json(new Message(error.message,null));
        }
    },

    /**
     * Realiza la baka de un Area
     *
     * @param {*} req
     * @param {*} res
     * @returns areaModel
     */
    putDarBaja: async (req,res) => {
        try {
            const _id = req.params.IdArea;
            if(!areaService.validarObjectId(_id)) return res.status(400).json( new Message('El Id ingresado no tiene el formato correcto'));
            
            const _area = areaModel.findById(_id);
            if(!_area) return res.status(400).json(new Message('No existe el Area, con el codigo especificado.'));

            _area.set({
                Estado:false
            })
            const resultado = await _area.save();
            return res.status(200).json(resultado);
        } catch (error) {  
            return res.status(400).json(new Message(error.message));
        }
    },

    /**
     * Realiza el alta de un Area
     *
     * @param {*} req
     * @param {*} res
     * @returns areaModel
     */
    putDarAlta: async (req,res) => {
        try {
            const _id = req.params.IdArea;
            if(!areaService.validarObjectId(_id)) return res.status(400).json( new Message('El Id ingresado no tiene el formato correcto'));
            
            const _area = areaModel.findById(_id);
            if(!_area) return res.status(400).json(new Message('No existe el Area, con el codigo especificado.'));

            _area.set({
                Estado:true
            })
            const resultado = await _area.save();
            return res.status(200).json(resultado);
        } catch (error) {  
            return res.status(400).json(new Message(error.message));
        }
    }
}