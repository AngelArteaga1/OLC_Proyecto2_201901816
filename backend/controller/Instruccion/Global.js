const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion")
const Asignacion = require("./Asignacion")
const DecFuncion = require("./DecFuncion")
const Declaracion = require("./Declaracion")
const DecMetodo = require("./DecMetodo")
const Exec = require("./Exec")
const ListaSimbolos = require("../Enums/ListaSimbolos")
const ListaErrores = require("../Enums/ListaErrores")

function Global(_instrucciones, _ambito) {
    var cadena = ""
    //PRIMERA PASADA, QUE VENGA UN EXEC
    var contadorExec = 0
    for (let i = 0; i < _instrucciones.length; i++) {
        if (_instrucciones[i].tipo === TIPO_INSTRUCCION.EXEC) {
            contadorExec++;
        }
    }
    if (contadorExec == 0) {
        var err = {
            TipoError: "Semántico",
            Descripcion: `No se ha encontrado un Exec() para ser ejecutado`,
            Linea: 0,
            Columna: 0
        }
        ListaErrores.push(err)
        return `Error: No se ha encontrado un Exec() para ser ejecutado\n`
    }
    if (contadorExec > 1) {
        var err = {
            TipoError: "Semántico",
            Descripcion: `Se han encontrado mas de un Exec() para ejecutar`,
            Linea: 0,
            Columna: 0
        }
        ListaErrores.push(err)
        return `Error: Se han encontrado mas de un Exec() para ejecutar\n`
    }
    //SEGUNDA PASADA, DECLARAR VARIABLES, METODOS Y ASIGNACIONES
    for (let i = 0; i < _instrucciones.length; i++) {
        if (_instrucciones[i].tipo === TIPO_INSTRUCCION.DECLARACION) {
            var mensaje = Declaracion(_instrucciones[i], _ambito)
            if (mensaje != null) {
                cadena += mensaje
            }
        }
        else if (_instrucciones[i].tipo === TIPO_INSTRUCCION.ASIGNACION) {
            var mensaje = Asignacion(_instrucciones[i], _ambito)
            if (mensaje != null) {
                cadena += mensaje
            }
        }
        else if (_instrucciones[i].tipo === TIPO_INSTRUCCION.DEC_METODO) {
            var mensaje = DecMetodo(_instrucciones[i], _ambito)
            if (mensaje != null) {
                cadena += mensaje
            }
        }
        else if (_instrucciones[i].tipo === TIPO_INSTRUCCION.DEC_FUNCION) {
            var mensaje = DecFuncion(_instrucciones[i], _ambito)
            if (mensaje != null) {
                cadena += mensaje
            }
        }
    }
    //TERCERA PASADA, BUSCAMOS EL EXEC A EJECUTAR
    for (let i = 0; i < _instrucciones.length; i++) {
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
//module.exports = ListaSimbolos