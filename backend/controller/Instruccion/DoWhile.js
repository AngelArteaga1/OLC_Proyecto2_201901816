const Ambito = require("../Ambito/Ambito")
const TIPO_DATO = require("../Enums/TipoDato")
const Operacion = require("../Operacion/Operacion")

function CicloDoWhile(_instruccion, _ambito){
    var mensaje = ""
    var operacion = Operacion(_instruccion.expresion, _ambito)
    if(operacion.tipo === TIPO_DATO.BANDERA){
        do{
            var nuevoAmbito = new Ambito(_ambito, "DoWhile")
            const Bloque = require('./Bloque')
            //mensaje+=Bloque(_instruccion.instrucciones, nuevoAmbito)
            var exec = Bloque(_instruccion.instrucciones, nuevoAmbito)
            mensaje += exec.cadena
            if (exec.existeBreak){
                return mensaje
            }
            //actualizamos
            operacion = Operacion(_instruccion.expresion, _ambito)
        } while(operacion.valor);
        return mensaje
    }
    return `Error: No es una expresion de tipo BANDERA en la condicion... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
}

module.exports = CicloDoWhile