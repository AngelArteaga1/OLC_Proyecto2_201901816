const TIPO_DATO = require("../Enums/TipoDato");

function TipoResultado(_tipo1, _tipo2){
    if(_tipo1 === TIPO_DATO.DECIMAL && _tipo2 === TIPO_DATO.DECIMAL){ return TIPO_DATO.DECIMAL}
    else if ((_tipo1 === TIPO_DATO.CADENA || _tipo2 === TIPO_DATO.CADENA) && _tipo1!==null && _tipo2!==null) return TIPO_DATO.CADENA
    else if (_tipo1 === TIPO_DATO.BANDERA && _tipo2 === TIPO_DATO.BANDERA) return TIPO_DATO.BANDERA
    else if (_tipo1 === TIPO_DATO.CARACTER && _tipo2 === TIPO_DATO.CARACTER) return TIPO_DATO.CADENA
    else if (_tipo1 === TIPO_DATO.DOUBLE && _tipo2 === TIPO_DATO.DOUBLE) return TIPO_DATO.DOUBLE
    else if ((_tipo1 === TIPO_DATO.DOUBLE && _tipo2 === TIPO_DATO.DECIMAL) ||(_tipo1 === TIPO_DATO.DECIMAL && _tipo2 === TIPO_DATO.DOUBLE)) return TIPO_DATO.DOUBLE
    else if ((_tipo1 === TIPO_DATO.DECIMAL && _tipo2 === TIPO_DATO.BANDERA) ||(_tipo1 === TIPO_DATO.BANDERA && _tipo2 === TIPO_DATO.DECIMAL)) return TIPO_DATO.DECIMAL
    else if ((_tipo1 === TIPO_DATO.DECIMAL && _tipo2 === TIPO_DATO.CARACTER) ||(_tipo1 === TIPO_DATO.CARACTER && _tipo2 === TIPO_DATO.DECIMAL)) return TIPO_DATO.DECIMAL
    else if ((_tipo1 === TIPO_DATO.DOUBLE && _tipo2 === TIPO_DATO.CARACTER) ||(_tipo1 === TIPO_DATO.CARACTER && _tipo2 === TIPO_DATO.DOUBLE)) return TIPO_DATO.DOUBLE
    else if ((_tipo1 === TIPO_DATO.CARACTER && _tipo2 === TIPO_DATO.CADENA) ||(_tipo1 === TIPO_DATO.CADENA && _tipo2 === TIPO_DATO.CARACTER)) return TIPO_DATO.CADENA
    return null
}

module.exports = TipoResultado