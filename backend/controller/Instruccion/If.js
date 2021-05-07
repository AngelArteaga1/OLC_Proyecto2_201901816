const Ambito = require("../Ambito/Ambito")
const TIPO_DATO = require("../Enums/TipoDato")
const Operacion = require("../Operacion/Operacion")


function sentenciaIf(_instruccion, _ambito){
    var mensaje = ""
    var existeBreak = false
    var existeContinue = false
    var existeReturn = false
    var valor = null
    var operacion = Operacion(_instruccion.expresion, _ambito)
    mensaje += operacion.mensaje
    if (operacion.tipo === TIPO_DATO.BANDERA){
        if(operacion.valor){
            var nuevoAmbito = new Ambito(_ambito, "If")
            const Bloque = require("./Bloque")
            //mensaje += Bloque(_instruccion.instrucciones, nuevoAmbito)
            var exec = Bloque(_instruccion.instrucciones, nuevoAmbito)
            mensaje += exec.cadena
            existeBreak = exec.existeBreak
            existeContinue = exec.existeContinue
            existeReturn = exec.existeReturn
            valor = exec.valor
        }
        return{
            existeBreak: existeBreak,
            existeContinue: existeContinue,
            existeReturn: existeReturn,
            valor: valor,
            cadena: mensaje
        }
    }
    return{
        existeBreak: existeBreak,
        existeContinue: existeContinue,
        existeReturn: existeReturn,
        valor: valor,
        cadena: `Error: No es una expresión válida para el IF... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
    }
}

module.exports = sentenciaIf