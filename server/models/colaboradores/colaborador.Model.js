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
        required:()=>{
            if(this.userName != null || this.password != null) return true;
            return false
        }
    },
    password:{
        type:String,
        required:()=>{
            if(this.userName != null || this.password != null) return true;
            return false
        }
    },
    Olvidada:{
        type:Boolean,
        default:false
    },
    fechaModificacion: {
        type: Date,
        default: Date.now()
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
        match:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    Cargo:{
        type: Schema.Types.ObjectId,
        ref:'Cargo'
    },
    Permisos: {
        type: [permisoSchema],
        default:[]
    },
    User: {
        type : UserSchema,
        default:{
            userName:null,
            password:null,
            Olvidada: false,
            fechaModificacion: Date.now()
        }
    },
    Perfil: {
        type: PerfilSchema,
        default: {
            Foto:null,
            Settings:{
                DarkMode:false,
                SideBar:false
            }
        }
    },
    Estado : {
        type: Boolean,
        default: true
    }
});

ColaboradoresSchema.post('save', function(error, doc, next) {
    console.log(error);
    if (error.name === 'MongoError' && error.code === 11000){
        if(RegExp(/Cedula/).test(error.errmsg)) next(new Error('La cedula del colaborador ya se encuentra registradad'));
    };
    if(error) next(error);
    next();
});

module.exports = model('Colaborador',ColaboradoresSchema);