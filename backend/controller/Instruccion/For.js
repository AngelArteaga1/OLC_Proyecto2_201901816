const Ambito = require("../Ambito/Ambito")
const TIPO_DATO = require("../Enums/TipoDato")
const Operacion = require("../Operacion/Operacion")
const Asignacion = require("./Asignacion")
const Declaracion = require("./Declaracion")
const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion");
const ListaErrores = require("../Enums/ListaErrores")

function CicloFor(_instruccion, _ambito){
    //console.log(_instruccion)
    var mensaje = ""
    var error = ""
    var valor = {
        valor: null,
        tipo: null,
        mensaje: "",
        linea: _instruccion.linea,
        columna: _instruccion.columna
    }
    var nuevoAmbito = new Ambito(_ambito, "For")
    if (_instruccion.declaracion.tipo === TIPO_INSTRUCCION.DECLARACION){
        error = Declaracion(_instruccion.declaracion, nuevoAmbito)
    }
    else if (_instruccion.declaracion.tipo === TIPO_INSTRUCCION.ASIGNACION){
        //console.log(_instruccion.declaracion);
        error = Asignacion(_instruccion.declaracion, nuevoAmbito)
    } else {
        return {
            cadena: error,
            valor: valor
        }
    }
    //console.log(_instruccion.actualizacion)
    //console.log(nuevoAmbito)
    var condicion = Operacion(_instruccion.condicion, nuevoAmbito)
    mensaje += condicion.mensaje
    //console.log(condicion)
    if(condicion.tipo === TIPO_DATO.BANDERA){
        while(condicion.valor){
            const Bloque = require('./Bloque')
            //mensaje+=Bloque(_instruccion.instrucciones, nuevoAmbito2)
            var exec = Bloque(_instruccion.instrucciones, nuevoAmbito)
            mensaje += exec.cadena
            valor = exec.valor
            if (exec.existeBreak || exec.existeReturn){
                return {
                    cadena: mensaje,
                    valor: valor
                }
            }
            //actualizamos
            actualizacion = Asignacion(_instruccion.actualizacion, nuevoAmbito)
            condicion = Operacion(_instruccion.condicion, nuevoAmbito)
            mensaje += condicion.mensaje
        }
        return {
            cadena: mensaje,
            valor: valor
        }
    }
    var err = {
        TipoError: "Semántico",
        Descripcion: `No es una expresion de tipo BANDERA en la condicion del For`,
        Linea: _instruccion.linea,
        Columna: _instruccion.columna
    }
    ListaErrores.push(err)
    return {
        cadena: `Error: No es una expresion de tipo BANDERA en la condicion del For... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}\n`,
        valor: valor
    }
}

module.exports = CicloFor