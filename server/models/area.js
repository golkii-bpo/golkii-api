const Mongoose = require('mongoose');
const { Model, Schema } = Mongoose;

const FuncionesSchema = new Schema({
    Descripcion: {
        type: String,
        maxlength: 255,
        required: true
    },
    FechaIngreso: {
        type: Date,
        default: Date.now()
    }
});

const PermisosSchema = new Schema({
    Path: {
        type: String,
        required: true,
        unique: true
    },
    Descripcion: {
        type: String,
        maxlength: 255
    }
});

const CargoSchema = new Schema({
    Nombre: {
        type: String,
        unique: true,
        index: true,
        required: true,
        maxlength: 20
    },
    Descripcion: {
        type: String,
        maxlength: 255
    },
    Parent: {
        type: String,
        required: true
    },
    Funciones: [FuncionesSchema],
    Permisos: [PermisosSchema],
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

const AreaSchema = new Schema({
    Nombre:{
        type: String,
        unique:true,
        index:true,
        maxlength:20,
        minlength:0
    },
    Descripcion:{
        type:String,
        maxlength:255,
        minlength:0
    },
    Cargos:[CargoSchema],
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
})

module.exports =  Model('Area',AreaSchema);