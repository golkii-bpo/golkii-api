const Mongoose = require('mongoose');
const {Schema,model} = Mongoose;

//Item de Permisos
const permisoSchema = new Schema({
    Path: {
        type: String,
        required: true
    },
    Nombre: {
        type: String,
        required: true,
        index: true,
        unique: true,
        maxlength:30,
        minlength:5
    },
    Titulo: {
        type: String,
        required: true,
        maxlength:12
    },
    Parent: String,
    IsFrom:{
        type:String,
        enum:['Manual','Cargo'],
        required:true
    },
    FechaIngreso:{
        type:String,
        default:Date.now(),
        required:true
    }
});

const PerfilSchema = new Schema({
    Foto:{
        type:String
    },
    Settings: new Schema({
        DarkMode:{
            type:Boolean,
            default:false
        },
        SideBar:{
            type:Boolean,
            default:false
        }
    })
});

//Item de User
const UserSchema = new Schema({
    userName:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    Olvidada:{
        type:Boolean,
        default:false
    }
});

//Main Schema
const ColaboradoresSchema = new Schema({
    Nombre:{
        type:String,
        required:true,
        minlength:5,
        maxlength:30
    },
    Apellido:{
        type:String,
        required:true,
        minlength:5,
        maxlength:30
    },
    Cedula:{
        type:String,
        required:true,
        index:true,
        unique:true,
        match:/\d{3}-{0,1}\d{6}-{0,1}\d{4}[A-z]{1}/
    },
    Email: {
        type:String,
        index: true,
        unique: true,
        match:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    Cargo:{
        type: Schema.Types.ObjectId,
        ref:'Cargo'
    },
    Permisos: [permisoSchema],
    User: UserSchema,
    Perfil: PerfilSchema,
    Estado : {
        type: Boolean,
        default: true
    }
});

module.exports = model('Colaborador',ColaboradoresSchema);