const Mongoose = require('mongoose');
const {Schema} = Mongoose;

const empleadoModel = new Schema({
    Nombre:{
        type:String
    }
})