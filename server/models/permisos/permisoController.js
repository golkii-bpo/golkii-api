const permisoModel = require('./permisoModel');
const permisoService = new (require('./permisoServices'))();
const Message = new (require('../../helpers/message'))();

module.exports = {

    /**
     *  Método que devuelve todos los permisos activos
     *
     * @param {*} req
     * @param {*} res
     * @returns Array<permisoModel>
     */
    getBuscar: async (req,res) => {
        const _r = await permisoModel
        .find({Estado:true})
        .select({
            Descripcion:true,
            Area:true,
            Parent:true,
            Path:true,
            IsTag:true
        });
        res.json(_r);
    },

    /**
     * Devuelve todos los permisos
     *
     * @param {*} req
     * @param {*} res
     * @returns Array<permisoModel>
     */
    getBuscarAll: async(req,res) => {
        const _r = await permisoModel.find();
        return res.status(200).json(_r);
    },

    /**
     * Metodo que permíte buscar un permiso por su Id
     *
     * @param {*} req
     * @param {*} res
     * @returns permisoModel
     */
    getBuscarById: async(req,res) => {
        const id = req.params.idPermiso;
        const _r = await permisoModel
        .find({_id:id,Estado:true})
        .select({
            Descripcion:true,
            Area:true,
            Parent:true,
            Path:true
        });
        return res.json(_r)
    },

    /**
     * Método que agrega un permiso a la base de datos
     *
     * @param {*} req
     * @param {*} res
     * @returns permisoModel
     */
    postAgregar: async (req,res) => {
        const{error,value} = await permisoService.validarModelo(req.body);
        if(error) return res.status(400).json(Message.sendError(error));

        const _permiso = await permisoModel.create(value)
        return res.status(200).json(Message.sendValue(_permiso));
    },

    /**
     * Método que modifica un modelo de Permiso 
     *
     * @param {*} req
     * @param {*} res
     * @returns permisoModel
     */
    putModificar: async (req,res) => {
        if(!req.params.hasOwnProperties('idPermiso')) return res.status(400).json(Message.sendError('La propiedad'));
        
        const id = req.params.idPermiso;
        if(!permisoService.validarObjectId(id)) return res.status(400).json(Message.sendError('El id ingresado no cumple con el formato requerido'));

        const {error,value} = permisoService.validarModelo(req.body);
        if(error) return res.status(400).json(Message.sendValue(value));

        const Permiso = await permisoModel.findById(id);
        Permiso.set({
            Nombre: value.Nombre,
            Descripcion: value.Descripcion,
            Area: value.Area,
            Titulo: value.Titulo,
            Parent: value.Parent,
            Path: value.Path,
            FechaModificacion: Date.now()
        })
        let _Permiso = await Permiso.save();
        return res.json(_Permiso);
    },

    /**
     *
     * Método que da de baja a un permiso
     *
     * @param {*} req
     * @param {*} res
     * @returns permisoModel
     */
    putDarBaja: async (req,res) => {
        if(!req.params.hasOwnProperties('idPermiso')) return res.status(400).json(Message.sendError('La propiedad'));
        
        const id = req.params.idPermiso;
        if(!permisoService.validarObjectId(id)) return res.status(400).json(Message.sendError('El id ingresado no cumple con el formato requerido'));

        const Permiso = await permisoModel.findOne({_id:id});
        Permiso.set({
            Estado:false
        });
        
        let _Permiso = await Permiso.save();
        return res.json(_Permiso);
    },

    /**
     * Método que da de alta a un permiso
     *
     * @param {*} req
     * @param {*} res
     * @returns permisoModel
     */
    putDarAlta: async (req,res) => {
        if(!req.params.hasOwnProperties('idPermiso')) return res.status(400).json(Message.sendError('La propiedad'));
        
        const id = req.params.idPermiso;
        if(!permisoService.validarObjectId(id)) return res.status(400).json(Message.sendError('El id ingresado no cumple con el formato requerido'));

        const Permiso = await permisoModel.findOne({_id:id});
        Permiso.set({
            Estado:true
        });
        
        let _Permiso = await Permiso.save();
        return res.json(_Permiso);
    },

    /**
     * Procedimiento que permite dar de baja a un equipo
     *
     * @param {*} req
     * @param {*} res
     * @returns
     */
    delEliminar: async (req,res) => {
        if(!req.params.hasOwnProperties('idPermiso')) return res.status(400).json(Message.sendError('La propiedad'));

        const idPermiso = req.params.idPermiso;
        const _resultado = await permisoModel.deleteOne({_id:id});
        return res.json(_resultado);
    }
}