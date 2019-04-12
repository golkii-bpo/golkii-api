const Mongoose = require('mongoose');
const {Schema} = Mongoose;

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

//Item de Settings
const SettingSchema = new Schema({
    DarkMode:Boolean,
    Side:Boolean
});

const PerfilSchema = new Schema({
    Foto:{
        type:String,
        match:/(http[s]?:\/\/)?([^\/\s]+\/)(.*)/
    },
    Settings:SettingSchema
});

//Item de User
const UserSchema = new Schema({
    userName:{
        type:String,
        required:()=>{
            return this.email
        }
    },
    emailAccount:{

    }
});