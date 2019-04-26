module.exports = class Message {

    /**
     *Crea un instancia Message
     * @param { Retorno de información de donde se encuentra el posible error } error
     * @param { Si no hubo ningun tipo de fallo entonces retorna el resultado esperado } value
     */
    constructor(){
        this.error = null,
        this.value = null
    }

    sendError(_error){
        this.error = _error;
        this.value = null;
        return {error: this.error,value: this.value};
    }

    sendValue(content){
        this.error = null;
        this.value = content;
        return {error: this.error,value: this.value};
    }

    /**
     * Retorna un valor boleano.
     * True si hay algun tipo de error
     * False si no hubo ningun tipo de fallos
     * @description {Esto es una prueba}
     * @readonly
     */
    get getError(){
        return this.sendError;
    }

    set setError(content){
        this.value = null;
        this.error = content;
    }
    
    /**
     * Retorna los valores de Error y Value dentro de la clase
     *
     * @readonly
     */
    get getValue(){
        return this.sendValue;
    }

    /**
     * Establece el valor de resultado a la clase de Message
     *
     */
    set setValue(content){
        this.error = null;
        this.value = content;
    }
} 