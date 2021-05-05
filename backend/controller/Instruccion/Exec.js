const Ambito = require("../Ambito/Ambito")
const Bloque = require("./Bloque")
const DecParametro = require("./DecParametro")
const Instruccion = require("./Instruccion")

function Exec(_instruccion, _ambito) {
    var cadena = "";
    var metodoEjecutar = _ambito.getMetodo(_instruccion.nombre)
    if (metodoEjecutar == null){
        metodoEjecutar = _ambito.getFuncion(_instruccion.nombre)
    }
    //console.log(_ambito)
    if (metodoEjecutar != null) {
        var nuevoAmbito = new Ambito(_ambito)
        //Si trae parametros
        if (metodoEjecutar.lista_parametros != null) {
            //Si tienen la misma cantidad
            if (_instruccion.lista_valores != null && metodoEjecutar.lista_parametros.length == _instruccion.lista_valores.length) {
                var error = false;
                for (let i = 0; i < metodoEjecutar.lista_parametros.length; i++) {
                    var declaracionAsignacion = Instruccion.nuevaDeclaracion(metodoEjecutar.lista_parametros[i].id, _instruccion.lista_valores[i], metodoEjecutar.lista_parametros[i].tipo_dato, _instruccion.linea, _instruccion.columna)
                    //console.log(declaracionAsignacion)
                    var mensaje = DecParametro(declaracionAsignacion, nuevoAmbito)
                    if (mensaje != null) {
                        error = true;
                        cadena += mensaje + '\n'
                    }
                }
                if (error) {
                    return cadena
                }
                //console.log(_ambito);
                //return Bloque(metodoEjecutar.instrucciones, nuevoAmbito)
                var exec = Bloque(metodoEjecutar.instrucciones, nuevoAmbito)
                var mensaje = exec.cadena
                if (exec.existeBreak) {
                    mensaje += "Error: Se ha encontrado un break fuera de un ciclo"
                }
                if (exec.existeContinue) {
                    mensaje += "Error: Se ha encontrado un continue fuera de un ciclo"
                }
                return mensaje
            }
        }
        var exec = Bloque(metodoEjecutar.instrucciones, nuevoAmbito)
        var mensaje = exec.cadena
        if (exec.existeBreak) {
            mensaje += "Error: Se ha encontrado un break fuera de un ciclo"
        }
        if (exec.existeContinue) {
            mensaje += "Error: Se ha encontrado un continue fuera de un ciclo"
        }
        return mensaje
    }
    return `Error: El método ${_instruccion.nombre} no existe... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
}

module.exports = Exec