const Ambito = require("../Ambito/Ambito")
const TIPO_DATO = require("../Enums/TipoDato")
const Operacion = require("../Operacion/Operacion")
const Asignacion = require("./Asignacion")
const Declaracion = require("./Declaracion")
const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion");

function CicloFor(_instruccion, _ambito){
    //console.log(_instruccion)
    var mensaje = ""
    var error = ""
    var nuevoAmbito = new Ambito(_ambito)
    if (_instruccion.declaracion.tipo === TIPO_INSTRUCCION.DECLARACION){
        error = Declaracion(_instruccion.declaracion, nuevoAmbito)
    }
    else if (_instruccion.declaracion.tipo === TIPO_INSTRUCCION.ASIGNACION){
        //console.log(_instruccion.declaracion);
        error = Asignacion(_instruccion.declaracion, nuevoAmbito)
    } else {
        return error
    }
    //console.log(_instruccion.actualizacion)
    //console.log(nuevoAmbito)
    var condicion = Operacion(_instruccion.condicion, nuevoAmbito)
    //console.log(condicion)
    if(condicion.tipo === TIPO_DATO.BANDERA){
        while(condicion.valor){
            var nuevoAmbito2 = new Ambito(nuevoAmbito)
            const Bloque = require('./Bloque')
            //mensaje+=Bloque(_instruccion.instrucciones, nuevoAmbito2)
            var exec = Bloque(_instruccion.instrucciones, nuevoAmbito2)
            mensaje += exec.cadena
            if (exec.existeBreak){
                return mensaje
            }
            //actualizamos
            actualizacion = Asignacion(_instruccion.actualizacion, nuevoAmbito)
            condicion = Operacion(_instruccion.condicion, nuevoAmbito)
        }
        return mensaje
    }
    return `Error: No es una expresion de tipo BANDERA en la condicion... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
}

module.exports = CicloFor