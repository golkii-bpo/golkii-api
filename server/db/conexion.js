const Mongoose = require('mongoose');
const Chalk = require('chalk');

module.exports = {
    /**
     * Se crea una conexion para la base de datos
     *
     * @param {Cadena de Conexion para mongodb} MongoUri
     */
    connect:(MongoUri) => {
        Mongoose.connect(MongoUri, { 
            useCreateIndex: true,
            useNewUrlParser: true }
        );

        Mongoose.connection.on('connected',()=>{
            console.log('Mongoose connection is '+Chalk.green('connected'));
        });
        Mongoose.connection.on('error', function(err){
            console.log(`Mongoose default connection has occured ${chalk.red(err)} error`);
        });
        Mongoose.connection.on('disconnected', function(){
            console.log('Mongoose default connection is '+chalk.yellow('disconnected'));
        });
    }
}
