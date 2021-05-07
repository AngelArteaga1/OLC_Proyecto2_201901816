const TIPO_DATO = require("../Enums/TipoDato");
const TIPO_VALOR = require("../Enums/TipoValor");

function ValorExpresion(_expresion, _ambito){
    if(_expresion.tipo === TIPO_VALOR.DECIMAL){
        return {
            valor: Number(_expresion.valor),
            tipo: TIPO_DATO.DECIMAL,
            mensaje: "",
            linea: _expresion.linea,
            columna: _expresion.columna
        }
    }
    else if(_expresion.tipo === TIPO_VALOR.DOUBLE){
        return {
            valor: Number(_expresion.valor),
            tipo: TIPO_DATO.DOUBLE,
            mensaje: "",
            linea: _expresion.linea,
            columna: _expresion.columna
        }
    }
    else if(_expresion.tipo === TIPO_VALOR.BANDERA){
        return {
            valor: _expresion.valor.toLowerCase()==='true' ? true: false,
            tipo: TIPO_DATO.BANDERA,
            mensaje: "",
            linea: _expresion.linea,
            columna: _expresion.columna
        }
    }
    else if(_expresion.tipo === TIPO_VALOR.CADENA){
        return {
            valor: _expresion.valor.substring(1, _expresion.valor.length-1),
            tipo: TIPO_DATO.CADENA,
            mensaje: "",
            linea: _expresion.linea,
            columna: _expresion.columna
        }
    }
    else if(_expresion.tipo === TIPO_VALOR.CARACTER){
        return {
            valor: _expresion.valor.substring(1, _expresion.valor.length-1),
            tipo: TIPO_DATO.CARACTER,
            mensaje: "",
            linea: _expresion.linea,
            columna: _expresion.columna
        }
    }
    else if(_expresion.tipo === TIPO_VALOR.IDENTIFICADOR){
        const simbolo = _ambito.getSimbolo(_expresion.valor)
        if(simbolo!=null){
            return {
                valor: simbolo.valor,
                tipo: simbolo.tipo,
                mensaje: "",
                linea: simbolo.linea,
                columna: simbolo.columna
            }
        }
        return {
            valor: "Error: la variable '"+_expresion.valor+"' no existe... Linea: "+_expresion.linea+" Columna: "+_expresion.columna,
            tipo: null,
            mensaje: "",
            linea: _expresion.linea,
            columna: _expresion.columna
        }

    }
    //IDENTIFICADOR
}

module.exports = ValorExpresion