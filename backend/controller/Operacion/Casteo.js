const TIPO_DATO = require("../Enums/TipoDato")
const TIPO_OPERACION = require("../Enums/TipoOperacion")
const TIPO_VALOR = require("../Enums/TipoValor")
//const Aritmetica = require("./Aritmetica")
//const Relacional = require("./Relacional")
const ValorExpresion = require("./ValorExpresion")

function Castear(_expresion, _ambito){
    //true || false
    if(_expresion.tipo === TIPO_VALOR.DECIMAL || _expresion.tipo === TIPO_VALOR.BANDERA ||
        _expresion.tipo === TIPO_VALOR.CADENA || _expresion.tipo === TIPO_VALOR.IDENTIFICADOR ||
        _expresion.tipo === TIPO_VALOR.CARACTER || _expresion.tipo === TIPO_VALOR.DOUBLE){
        return ValorExpresion(_expresion, _ambito)
    }
    /*else if(_expresion.tipo === TIPO_OPERACION.IGUALIGUAL || _expresion.tipo === TIPO_OPERACION.DIFERENTE ||
        _expresion.tipo === TIPO_OPERACION.MENOR || _expresion.tipo === TIPO_OPERACION.MENORIGUAL ||
        _expresion.tipo === TIPO_OPERACION.MAYOR || _expresion.tipo === TIPO_OPERACION.MAYORIGUAL){
        return Relacional(_expresion, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.OR || _expresion.tipo === TIPO_OPERACION.AND ||
        _expresion.tipo === TIPO_OPERACION.NOT){
        return Logica(_expresion, _ambito)
    } 
    else if(_expresion.tipo === TIPO_OPERACION.SUMA || _expresion.tipo === TIPO_OPERACION.RESTA ||
        _expresion.tipo === TIPO_OPERACION.MULT || _expresion.tipo === TIPO_OPERACION.DIV ||
        _expresion.tipo === TIPO_OPERACION.EXP || _expresion.tipo === TIPO_OPERACION.MOD ||
        _expresion.tipo === TIPO_OPERACION.MEN || _expresion.tipo === TIPO_OPERACION.MASMAS ||
        _expresion.tipo === TIPO_OPERACION.MENOSMENOS){
        return Aritmetica(_expresion, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.LLAMADA){// 2+6+7+2+9+10
        return OpLlamada(_expresion, _ambito)
    }*/
    else if (_expresion.tipo === TIPO_OPERACION.CAST){
        return casteo(_expresion.opDer, _expresion.opIzq, _ambito)
    }
}

function casteo(_op, _tipo, _ambito){
    const Operacion = require("./Operacion")
    const op = Operacion(_op, _ambito)
    var mensaje = op.mensaje
    //console.log(op)
    //console.log(_tipo)
    if (op.tipo === TIPO_DATO.DECIMAL && _tipo === TIPO_DATO.DOUBLE){
        const resultado = op.valor
        return{
            valor: resultado,
            tipo: TIPO_DATO.DOUBLE,
            mensaje: mensaje,
            linea: _op.linea,
            columna: _op.columna
        }
    }
    else if (op.tipo === TIPO_DATO.DOUBLE && _tipo === TIPO_DATO.DECIMAL){
        const resultado = _op.valor
        return{
            valor: resultado.toFixed(),
            tipo: TIPO_DATO.DECIMAL,
            mensaje: mensaje,
            linea: _op.linea,
            columna: _op.columna
        }
    }
    else if (op.tipo === TIPO_DATO.DECIMAL && _tipo === TIPO_DATO.CADENA){
        const resultado = op.valor
        return{
            valor: resultado.toString(),
            tipo: TIPO_DATO.CADENA,
            mensaje: mensaje,
            linea: _op.linea,
            columna: _op.columna
        }
    }
    else if (op.tipo === TIPO_DATO.DECIMAL && _tipo === TIPO_DATO.CARACTER){
        const resultado = op.valor
        return{
            valor: String.fromCharCode(resultado),
            tipo: TIPO_DATO.CARACTER,
            mensaje: mensaje,
            linea: _op.linea,
            columna: _op.columna
        }
    }
    else if (op.tipo === TIPO_DATO.DOUBLE && _tipo === TIPO_DATO.CADENA){
        const resultado = op.valor
        return{
            valor: resultado.toString(),
            tipo: TIPO_DATO.CADENA,
            mensaje: mensaje,
            linea: _op.linea,
            columna: _op.columna
        }
    }
    else if (op.tipo === TIPO_DATO.CARACTER && _tipo === TIPO_DATO.DECIMAL){
        const resultado = op.valor
        return{
            valor: resultado.charCodeAt(),
            tipo: TIPO_DATO.DECIMAL,
            mensaje: mensaje,
            linea: _op.linea,
            columna: _op.columna
        }
    }
    else if (op.tipo === TIPO_DATO.CARACTER && _tipo === TIPO_DATO.DOUBLE){
        const resultado = op.valor
        return{
            valor: resultado.charCodeAt(),
            tipo: TIPO_DATO.DOUBLE,
            mensaje: mensaje,
            linea: _op.linea,
            columna: _op.columna
        }
    }
    var respuesta = (_op.tipo===null ? op.valor: "")+(_tipo.tipo===null ? _tipo.valor: "") //true+5+10+5
    return{
        valor: respuesta+'\nError semántico: no se puede realizar el casteo.. Linea: '+_op.linea+" Columna: "+_op.columna,
        tipo: null,
        mensaje: mensaje,
        linea: _op.linea,
        columna: _op.columna
    }
}


module.exports = Castear