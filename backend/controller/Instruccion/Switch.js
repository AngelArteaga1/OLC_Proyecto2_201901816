const Ambito = require("../Ambito/Ambito")
const TIPO_DATO = require("../Enums/TipoDato")
const Operacion = require("../Operacion/Operacion")


function sentenciaSwitch(_instruccion, _ambito) {
    var mensaje = ""
    var existeBreak = false
    var existeContinue = false
    var existeReturn = false
    var valor = null
    var operacionPrincipal = Operacion(_instruccion.expresion, _ambito)
    mensaje += operacionPrincipal.mensaje
    //EMEPZAMOS A ITERAR LOS CASES
    for (let i = 0; i < _instruccion.lista_casos.length; i++) {
        var operacion = Operacion(_instruccion.lista_casos[i].expresion, _ambito)
        mensaje += operacion.mensaje
        if (operacion.tipo === operacionPrincipal.tipo) {
            if (operacion.valor == operacionPrincipal.valor) {
                var nuevoAmbito = new Ambito(_ambito, "Switch_Case")
                const Bloque = require("./Bloque")
                var exec = Bloque(_instruccion.lista_casos[i].instrucciones, nuevoAmbito)
                mensaje += exec.cadena
                existeBreak = exec.existeBreak
                existeContinue = exec.existeContinue
                existeReturn = exec.existeReturn
                valor = exec.valor
                return {
                    existeBreak: existeBreak,
                    existeContinue: existeContinue,
                    existeReturn: existeReturn,
                    valor: valor,
                    cadena: mensaje
                }
            }
        } else {
            return {
                existeBreak: existeBreak,
                existeContinue: existeContinue,
                existeReturn: existeReturn,
                valor: valor,
                cadena: `Error: No es una expresión válida para el Switch... Linea: ${_instruccion.lista_casos[i].linea} Columna: ${_instruccion.lista_casos[i].columna}`
            }
        }
    }
    if (_instruccion.default != null) {
        const Bloque = require("./Bloque")
        var exec = Bloque(_instruccion.default, nuevoAmbito)
        mensaje += exec.cadena
        existeBreak = exec.existeBreak
        existeContinue = exec.existeContinue
        existeReturn = exec.existeReturn
        valor = exec.valor
    }
    return {
        existeBreak: existeBreak,
        existeContinue: existeContinue,
        existeReturn: existeReturn,
        valor: valor,
        cadena: mensaje
    }
}

module.exports = sentenciaSwitch