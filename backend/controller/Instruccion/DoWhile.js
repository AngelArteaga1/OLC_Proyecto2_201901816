const Ambito = require("../Ambito/Ambito")
const TIPO_DATO = require("../Enums/TipoDato")
const Operacion = require("../Operacion/Operacion")

function CicloDoWhile(_instruccion, _ambito) {
    var mensaje = ""
    var valor = {
        valor: null,
        tipo: null,
        mensaje: "",
        linea: _instruccion.linea,
        columna: _instruccion.columna
    }
    var operacion = Operacion(_instruccion.expresion, _ambito)
    mensaje += operacion.mensaje
    if (operacion.tipo === TIPO_DATO.BANDERA) {
        do {
            var nuevoAmbito = new Ambito(_ambito, "DoWhile")
            const Bloque = require('./Bloque')
            var exec = Bloque(_instruccion.instrucciones, nuevoAmbito)
            mensaje += exec.cadena
            valor = exec.valor
            if (exec.existeBreak) {
                return {
                    cadena: mensaje,
                    valor: valor
                }
            }
            //actualizamos
            operacion = Operacion(_instruccion.expresion, _ambito)
            mensaje += operacion.mensaje
        } while (operacion.valor);
        return {
            cadena: mensaje,
            valor: valor
        }
    }
    return {
        cadena: `Error: No es una expresion de tipo BANDERA en la condicion... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`,
        valor: valor
    }
}

module.exports = CicloDoWhile