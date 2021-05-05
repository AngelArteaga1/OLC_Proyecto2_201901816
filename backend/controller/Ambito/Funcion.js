class Funcion{
    constructor(_id, _tipo, _lista_parametros, _instrucciones, _linea, _columna){
        this.id = _id;
        this.tipo = _tipo;
        this.lista_parametros = _lista_parametros;
        this.instrucciones = _instrucciones;
        this.linea = _linea;
        this.columna = _columna;
    }
}

module.exports = Funcion