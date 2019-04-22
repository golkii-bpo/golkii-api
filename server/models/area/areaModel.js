const Mongoose = require('mongoose');
const { model, Schema } = Mongoose;

const AreaSchema = new Schema({
    Nombre:{
        type: String,
        unique:true,
        index:true,
        maxlength:20,
        minlength:0,
        required:true
    },
    Descripcion:{
        type:String,
        maxlength:255,
        minlength:0
    },
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

module.exports = model('Area',AreaSchema);