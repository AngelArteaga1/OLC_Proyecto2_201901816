const Ambito = require("../Ambito/Ambito")
const ListaErrores = require("../Enums/ListaErrores")
const TIPO_DATO = require("../Enums/TipoDato")
const Operacion = require("../Operacion/Operacion")


function sentenciaIfElseIf(_instruccion, _ambito) {
    var mensaje = ""
    var existeBreak = false
    var existeContinue = false
    var existeReturn = false
    var valor = null
    var operacion = Operacion(_instruccion.expresion, _ambito)
    mensaje += operacion.mensaje
    if (operacion.tipo === TIPO_DATO.BANDERA) {
        if (operacion.valor) {
            var nuevoAmbito = new Ambito(_ambito, "If")
            const Bloque = require("./Bloque")
            //mensaje += Bloque(_instruccion.instruccionesIf, nuevoAmbito)
            var exec = Bloque(_instruccion.instruccionesIf, nuevoAmbito)
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
        //console.log(_instruccion.lista_elseif);
        for (let i = 0; i < _instruccion.lista_elseif.length; i++) {
            var operacion = Operacion(_instruccion.lista_elseif[i].expresion, _ambito)
            mensaje += operacion.mensaje
            if (operacion.tipo === TIPO_DATO.BANDERA) {
                if (operacion.valor) {
                    var nuevoAmbito = new Ambito(_ambito, "IfElse")
                    const Bloque = require("./Bloque")
                    var exec = Bloque(_instruccion.lista_elseif[i].instruccionesElseIf, nuevoAmbito)
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
                var err = {
                    TipoError: "Semántico",
                    Descripcion: `No es una expresión válida para el If`,
                    Linea: _instruccion.lista_elseif[i].linea,
                    Columna: _instruccion.lista_elseif[i].columna
                }
                ListaErrores.push(err)
                return {
                    existeBreak: existeBreak,
                    existeContinue: existeContinue,
                    existeReturn: existeReturn,
                    valor: valor,
                    cadena: `Error: No es una expresión válida para el If... Linea: ${_instruccion.lista_elseif[i].linea} Columna: ${_instruccion.lista_elseif[i].columna}\n`
                }
            }
        }
        if (_instruccion.instruccionesElse != null) {
            const Bloque = require("./Bloque")
            var exec = Bloque(_instruccion.instruccionesElse, nuevoAmbito)
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
    var err = {
        TipoError: "Semántico",
        Descripcion: `No es una expresión válida para el If`,
        Linea: _instruccion.linea,
        Columna: _instruccion.columna
    }
    ListaErrores.push(err)
    return {
        existeBreak: existeBreak,
        existeContinue: existeContinue,
        existeReturn: existeReturn,
        valor: valor,
        cadena: `Error: No es una expresión válida para el IF... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}\n`
    }
}

module.exports = sentenciaIfElseIf