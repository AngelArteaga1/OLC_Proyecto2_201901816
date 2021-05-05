const TIPO_OPERACION = require("../Enums/TipoOperacion");
const TIPO_VALOR = require("../Enums/TipoValor");
const Aritmetica = require("./Aritmetica");
const Logica = require("./Logica");
const Relacional = require("./Relacional");
const Castear = require("./Casteo");
const ValorExpresion = require("./ValorExpresion");
const OpLlamada = require("./OpLlamada");

function Operacion(_expresion, _ambito){
    if(_expresion.tipo === TIPO_VALOR.DECIMAL || _expresion.tipo === TIPO_VALOR.BANDERA ||
        _expresion.tipo === TIPO_VALOR.CADENA || _expresion.tipo === TIPO_VALOR.IDENTIFICADOR ||
        _expresion.tipo === TIPO_VALOR.CARACTER || _expresion.tipo === TIPO_VALOR.DOUBLE){
        return ValorExpresion(_expresion, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.SUMA || _expresion.tipo === TIPO_OPERACION.RESTA ||
        _expresion.tipo === TIPO_OPERACION.MULT || _expresion.tipo === TIPO_OPERACION.DIV ||
        _expresion.tipo === TIPO_OPERACION.EXP || _expresion.tipo === TIPO_OPERACION.MOD ||
        _expresion.tipo === TIPO_OPERACION.MEN || _expresion.tipo === TIPO_OPERACION.MASMAS ||
        _expresion.tipo === TIPO_OPERACION.MENOSMENOS){
        return Aritmetica(_expresion, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.IGUALIGUAL || _expresion.tipo === TIPO_OPERACION.DIFERENTE ||
        _expresion.tipo === TIPO_OPERACION.MENOR || _expresion.tipo === TIPO_OPERACION.MAYOR ||
        _expresion.tipo === TIPO_OPERACION.MENORIGUAL || _expresion.tipo === TIPO_OPERACION.MAYORIGUAL){
        return Relacional(_expresion, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.OR || _expresion.tipo === TIPO_OPERACION.AND ||
        _expresion.tipo === TIPO_OPERACION.NOT){
        return Logica(_expresion, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.CAST){
        return Castear(_expresion, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.LLAMADA){
        return OpLlamada(_expresion, _ambito)
    }
}

module.exports = Operacion