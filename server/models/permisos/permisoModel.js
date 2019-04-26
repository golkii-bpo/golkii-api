
const Mongoose = require('mongoose');
const { model, Schema } = Mongoose;

const PermisoSchema = new Schema({
    IsTag: {
        type: Boolean,
        required: true,
    },
    Titulo: {
        type: String,
        required: true,
        unique:true,
        maxlength:15
    },
    Descripcion: {
        type:String,
        required:false,
        maxlength:255
    },
    Area: {
        type: String,
        required: true,
        maxlength:30
    },
    Parent: {
        type:String,
        required: function() {
            return !this.IsTag;
        }
    },
    Path: {
        type: String,
        required: function() {
            return !this.IsTag;
        }
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

PermisoSchema.post('save', function(error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) next(new Error('El titulo del permiso debe ser único'));
    if(error) next(error);
    next();
});

module.exports = model("Permiso",PermisoSchema);