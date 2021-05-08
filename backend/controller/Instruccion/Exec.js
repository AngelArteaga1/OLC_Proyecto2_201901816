const Ambito = require("../Ambito/Ambito");
const ListaErrores = require("../Enums/ListaErrores");
const Operacion = require("../Operacion/Operacion");
const Bloque = require("./Bloque");
const Declaracion = require("./Declaracion");
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
        var nuevoAmbito = new Ambito(_ambito, "Metodo_"+metodoEjecutar.id)
        //Si trae parametros
        if (metodoEjecutar.lista_parametros != null) {
            //Si tienen la misma cantidad
            if (_instruccion.lista_valores != null && metodoEjecutar.lista_parametros.length == _instruccion.lista_valores.length) {
                var error = false;
                for (let i = 0; i < metodoEjecutar.lista_parametros.length; i++) {
                    //var op = Operacion(_instruccion.lista_valores[i]);
                    //console.log(_instruccion.lista_valores[i])
                    //console.log("SIGUIENTE");
                    var declaracionAsignacion = Instruccion.nuevaDeclaracion(metodoEjecutar.lista_parametros[i].id, _instruccion.lista_valores[i], metodoEjecutar.lista_parametros[i].tipo_dato, _instruccion.linea, _instruccion.columna)
                    //console.log(declaracionAsignacion.id)
                    //console.log(declaracionAsignacion.valor)
                    var mensaje = Declaracion(declaracionAsignacion, nuevoAmbito)
                    cadena += mensaje
                }
                //console.log(nuevoAmbito.tablaSimbolos);
                //console.log("TREMENDO");
                //console.log(_ambito);
                //return Bloque(metodoEjecutar.instrucciones, nuevoAmbito)
                var exec = Bloque(metodoEjecutar.instrucciones, nuevoAmbito)
                var mensaje = exec.cadena
                if (exec.existeBreak) {
                    var err = {
                        TipoError: "Semántico",
                        Descripcion: `Se ha encontrado un break fuera de un ciclo`,
                        Linea: _instruccion.linea,
                        Columna: _instruccion.columna
                    }
                    ListaErrores.push(err)
                    mensaje += "Error: Se ha encontrado un break fuera de un ciclo\n"
                }
                if (exec.existeContinue) {
                    var err = {
                        TipoError: "Semántico",
                        Descripcion: `Se ha encontrado un continue fuera de un ciclo`,
                        Linea: _instruccion.linea,
                        Columna: _instruccion.columna
                    }
                    ListaErrores.push(err)
                    mensaje += "Error: Se ha encontrado un continue fuera de un ciclo\n"
                }
                return mensaje
            }
        }
        var exec = Bloque(metodoEjecutar.instrucciones, nuevoAmbito)
        var mensaje = exec.cadena
        if (exec.existeBreak) {
            var err = {
                TipoError: "Semántico",
                Descripcion: `Se ha encontrado un break fuera de un ciclo`,
                Linea: _instruccion.linea,
                Columna: _instruccion.columna
            }
            ListaErrores.push(err)
            mensaje += "Error: Se ha encontrado un break fuera de un ciclo\n"
        }
        if (exec.existeContinue) {
            var err = {
                TipoError: "Semántico",
                Descripcion: `Se ha encontrado un continue fuera de un ciclo`,
                Linea: _instruccion.linea,
                Columna: _instruccion.columna
            }
            ListaErrores.push(err)
            mensaje += "Error: Se ha encontrado un continue fuera de un ciclo\n"
        }
        return mensaje
    }
    var err = {
        TipoError: "Semántico",
        Descripcion: `El método ${_instruccion.nombre} no existe`,
        Linea: _instruccion.linea,
        Columna: _instruccion.columna
    }
    ListaErrores.push(err)
    return `Error: El método ${_instruccion.nombre} no existe... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}\n`
}

module.exports = Exec