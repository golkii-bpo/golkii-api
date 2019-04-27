const Mongoose = require('mongoose');
const { model, Schema } = Mongoose;

const FuncionesSchema = {
    Descripcion: {
        type: String,
        maxlength: 255,
        required: true
    },
    FechaIngreso: {
        type: Date,
        default: Date.now()
    }
};

const PermisoSchema = {
    Path: {
        type: String,
        required: true,
        unique: true
    },
    Descripcion: {
        type: String,
        maxlength: 255
    }
};

const CargoSchema = new Schema({
    Nombre: {
        type: String,
        unique: true,
        index: true,
        required: true,
        maxlength: 20
    },
    Area:{
        type:String,
        required:true
    },
    Descripcion: {
        type: String,
        maxlength: 255
    },
    Parent: {
        type: String
    },
    Funciones: [FuncionesSchema],
    Permisos: [PermisoSchema],
    FechaIngreso: {
        type: Date,
        default: Date.now()
    },
    FechaModificacion: {
        type: Date,
        default: Date.now(),
        validate: {
            validator: function (v) {
                return v >= this.FechaIngreso
            },
            message: `La fecha de modificación no puede ser menor a ${this.FechaIngreso}`
        }
    },
    Estado: {
        type: Boolean,
        default: true
    }
});

module.exports =  model('Cargo',CargoSchema);