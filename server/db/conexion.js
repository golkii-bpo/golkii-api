const db = require('mongoose');
const Chalk = require('chalk');

const Options = { 
    useCreateIndex: true,
    useNewUrlParser: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1500
}

module.exports = {
    /**
     * Se crea una conexion para la base de datos
     *
     * @param {Cadena de Conexion para mongodb} MongoUri
     */
    connect:(MongoUri) => {
        db.connect(MongoUri,Options);

        db.connection.on('connected',()=>{
            console.log('Base de datos: '+Chalk.bgGreen(Chalk.black('Conectada')));
        });
        db.connection.on('disconnected', () =>{
            console.log('Base de datos: '+Chalk.yellow('Desconectada'));
        });
        db.connection.on('error', function(err){
            console.log(`Base de datos: ${Chalk.red(err)} error`);
        });
    }
}
