const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion")
const Asignacion = require("./Asignacion")
const DecFuncion = require("./DecFuncion")
const Declaracion = require("./Declaracion")
const DecMetodo = require("./DecMetodo")
const Exec = require("./Exec")

function Global(_instrucciones, _ambito) {
    var cadena = ""
    //PRIMERA PASADA, QUE VENGA UN EXEC
    var contadorExec = 0
    for(let i = 0; i < _instrucciones.length; i++) {
        if (_instrucciones[i].tipo === TIPO_INSTRUCCION.EXEC) {
            contadorExec++;
        }
    }
    if(contadorExec == 0){
        return `Error: No se ha encontrado un Exec() para ser ejecutado`
    }
    if(contadorExec > 1){
        return `Error: Se han encontrado mas de un Exec() para ejecutar`
    }
    //SEGUNDA PASADA, DECLARAR VARIABLES, METODOS Y ASIGNACIONES
    for (let i = 0; i < _instrucciones.length; i++) {
        if (_instrucciones[i].tipo === TIPO_INSTRUCCION.DECLARACION) {
            var mensaje = Declaracion(_instrucciones[i], _ambito)
            if (mensaje != null) {
                cadena += mensaje + '\n'
            }
        }
        else if (_instrucciones[i].tipo === TIPO_INSTRUCCION.ASIGNACION) {
            var mensaje = Asignacion(_instrucciones[i], _ambito)
            if (mensaje != null) {
                cadena += mensaje + '\n'
            }
        }
        else if (_instrucciones[i].tipo === TIPO_INSTRUCCION.DEC_METODO) {
            var mensaje = DecMetodo(_instrucciones[i], _ambito)
            if (mensaje != null) {
                cadena += mensaje + '\n'
            }
        }
        else if (_instrucciones[i].tipo === TIPO_INSTRUCCION.DEC_FUNCION) {
            var mensaje = DecFuncion(_instrucciones[i], _ambito)
            if (mensaje != null) {
                cadena += mensaje + '\n'
            }
        }
    }
    //TERCERA PASADA, BUSCAMOS EL EXEC A EJECUTAR
    for(let i = 0; i < _instrucciones.length; i++) {
        if (_instrucciones[i].tipo === TIPO_INSTRUCCION.EXEC) {
            //console.log(_instrucciones[i])
            var mensaje = Exec(_instrucciones[i], _ambito)
            if (mensaje != null) {
                cadena += mensaje
            }
            break;
        }
    }
    return cadena
}

module.exports = Global