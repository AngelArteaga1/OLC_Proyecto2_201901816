const TIPO_OPERACION = require("../Enums/TipoOperacion")
const TIPO_VALOR = require("../Enums/TipoValor")
const ValorExpresion = require("./ValorExpresion")
const Ambito = require("../Ambito/Ambito")
const Instruccion = require("../Instruccion/Instruccion")

function OpLlamada(_expresion, _ambito){
    if(_expresion.tipo === TIPO_VALOR.DECIMAL || _expresion.tipo === TIPO_VALOR.BANDERA ||
        _expresion.tipo === TIPO_VALOR.CADENA || _expresion.tipo === TIPO_VALOR.IDENTIFICADOR ||
        _expresion.tipo === TIPO_VALOR.CARACTER || _expresion.tipo === TIPO_VALOR.DOUBLE){
        return ValorExpresion(_expresion, _ambito)
    }
    else if (_expresion.tipo === TIPO_OPERACION.LLAMADA){
        return llamar(_expresion.opIzq, _expresion.opDer, _expresion.linea, _expresion.columna, _ambito)
    }


    function llamar(_nombre, lista_valores, _linea, _columna, _ambito){
    var valor = null;
    var metodoEjecutar = _ambito.getFuncion(_nombre)
    if (metodoEjecutar != null) {
        var nuevoAmbito = new Ambito(_ambito)
        //Si trae parametros
        if (metodoEjecutar.lista_parametros != null) {
            //Si tienen la misma cantidad
            if (lista_valores != null && metodoEjecutar.lista_parametros.length == lista_valores.length) {
                var error = false;
                for (let i = 0; i < metodoEjecutar.lista_parametros.length; i++) {
                    var declaracionAsignacion = Instruccion.nuevaDeclaracion(metodoEjecutar.lista_parametros[i].id, lista_valores[i], metodoEjecutar.lista_parametros[i].tipo_dato, _linea, _columna)
                    const DecParametro = require("../Instruccion/DecParametro")
                    var mensaje = DecParametro(declaracionAsignacion, nuevoAmbito)
                    if (mensaje != null) {
                        error = true;
                    }
                }
                if (error) {
                    return{
                        valor: valor,
                        tipo: null,
                        linea: _linea,
                        columna: _columna
                    }
                }
                //console.log(_ambito);
                //return Bloque(metodoEjecutar.instrucciones, nuevoAmbito)
                /*var exec = Bloque(metodoEjecutar.instrucciones, nuevoAmbito)
                var mensaje = exec.cadena
                if (exec.existeBreak) {
                    mensaje += "Error: Se ha encontrado un break fuera de un ciclo"
                }
                if (exec.existeContinue) {
                    mensaje += "Error: Se ha encontrado un continue fuera de un ciclo"
                }
                return mensaje*/
            }
        }
        const Bloque = require("../Instruccion/Bloque")
        var exec = Bloque(metodoEjecutar.instrucciones, nuevoAmbito)
        valor = exec.valor
        return valor
    }
        return{
            valor: `Error: La función ${_nombre} no existe... Linea: ${_linea} Columna: ${_columna}`,
            tipo: null,
            linea: _linea,
            columna: _columna
        }
    }

}

module.exports = OpLlamada