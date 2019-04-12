
const Mongoose = require('mongoose');
const { Model, Schema } = Mongoose;

const PermisoSchema = new Schema({
    Nombre: {
        type: String,
        required: true,
        index: true,
        unique: true,
        maxlength:30,
        minlength:5
    },
    Descripcion: {
        type:String,
        required:false,
        maxlength:255
    },
    Area: {
        type: String,
        required: true,
        index: true,
        maxlength:30
    },
    Titulo: {
        type: String,
        required: true,
        maxlength:12
    },
    Parent: String,
    Path: {
        type: String,
        required: true
    },
    FechaIngreso: {
        type: Date,
        default: Date.now()
    },
    FechaModificacion: {
        type: Date,
        default: Date.now()
    },
    Estado: {
        type: Boolean,
        default: true,
        required: true
    }
});

module.exports = Model("Permiso",PermisoSchema);