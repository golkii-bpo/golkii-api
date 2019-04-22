module.exports = class Message {
    /**
     *Crea un instancia Message
     * @param { Retorno de información de donde se encuentra el posible error } error
     * @param { Si no hubo ningun tipo de fallo entonces retorna el resultado esperado } value
     */
    constructor(error,value){
        this.error = error,
        this.value = value
    }

    /**
     * Retorna un valor boleano.
     * True si hay algun tipo de error
     * False si no hubo ningun tipo de fallos
     * @description {Esto es una prueba}
     * @readonly
     */
    get Error(){
        return this.hasError();
    }
    hasError(){
        return this.error? true:false;
    }

    
    /**
     * Retorna los valores de Error y Value dentro de la clase
     *
     * @readonly
     */
    get Values(){
        return this.hasResult();
    }
    hasResult(){
        return {error:this.error,value:this.value};
    }

} 