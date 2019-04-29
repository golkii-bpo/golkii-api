const areaModel = require('./areaModel');
const areaService = new (require('./areaService'))();
let Mensaje = new (require('../../helpers/message'))();

module.exports = {
    
    /**
     * Extrae todas aquellas Areas activas.
     *
     * @param {*} req
     * @param {*} res
     * @returns Array<AreaModel>
     */
    getObtener: async(req,res) => {
            const _result = 
            await areaModel
            .find({Estado:true})
            .select({FechaModificacion:0});

            return res.status(200).json(Mensaje.sendValue(_result));
    },

    /**
     * Extrae todas aquellas areas registradas en el sistema.
     *
     * @param {*} req
     * @param {*} res
     * @returns Array<AreaModel>
     */
    getObtenerAll: async(req,res) => {
            const _result = await areaModel.find();
            return res.status(200).json(Mensaje.sendValue(_result));
    },

    /**
     * Realiza la busqueda del Area por medio de un Id de Area.
     *
     * @param {*} req
     * @param {*} res
     * @returns AreaModel
     */
    getBuscarById: async(req,res) => {
            const IdArea = req.params.IdArea;
            if(!areaService.validarObjectId(IdArea)) return res.status(400).json(Mensaje.sendError('El Id ingresado no tiene el formato correcto'))
            const _result = await areaModel.findOne({_id:IdArea}).select({FechaModificacion:0});;
            return res.status(200).json(Mensaje.sendValue(_result));
    },

    /**
     * Agrega un nueva area en la base de datos
     *
     * @param {*} req
     * @param {*} res
     * @returns AreaModel
     */
    postAgregar: async (req,res) => {
            const {error,value} = areaService.validarAgregar(req.body);
            if(error) return res.status(400).json(Mensaje.sendError(error));

            const _result = await areaModel.create(value);
            return res.status(200).json(Mensaje.sendValue(Mensaje.sendValue(_result)));
    },

    /**
     * Modifica un area con un Id especifico
     *
     * @param {*} req
     * @param {*} res
     * @returns AreaModel
     */
    putModificar: async (req,res) => {
            const _id = req.params.IdArea, body = req.body;
            const {error,value} = areaService.validarModificar(_id,body);
            if(error) return res.status(200).send(Mensaje.sendValue(value));
            
            const _area = await areaModel.findById(_id);
            _area.set({
                Nombre: body["Nombre"],
                Descripcion: body["Descripcion"],
                FechaModificacion: Date.now()
            });

            const _result = await Area.save();
            res.status(200).json(Mensaje.sendValue(_result));
    },

    /**
     * Realiza la baka de un Area
     *
     * @param {*} req
     * @param {*} res
     * @returns areaModel
     */
    putDarBaja: async (req,res) => {
            const _id = req.params.IdArea;
            if(!areaService.validarObjectId(_id)) return res.status(400).json(Mensaje.sendError('El Id ingresado no tiene el formato correcto'));
            
            const _area = areaModel.findById(_id);
            if(!_area) return res.status(400).json(Mensaje.sendError('No existe el Area, con el codigo especificado.'));

            _area.set({
                Estado:false
            })
            const _result = await _area.save();
            return res.status(200).json(Mensaje.sendValue(_result));
    },

    /**
     * Realiza el alta de un Area
     *
     * @param {*} req
     * @param {*} res
     * @returns areaModel
     */
    putDarAlta: async (req,res) => {
        const _id = req.params.IdArea;
        if(!areaService.validarObjectId(_id)) return res.status(400).json(Mensaje.sendError('El Id ingresado no tiene el formato correcto'));
        
        const _area = areaModel.findById(_id);
        if(!_area) return res.status(400).json(Mensaje.sendError('No existe el Area, con el codigo especificado.'));

        _area.set({
            Estado:true
        })
        const _result = await _area.save();
        return res.status(200).json(Mensaje.sendValue(_result));
    }
}