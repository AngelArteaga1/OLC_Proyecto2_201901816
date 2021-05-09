const TIPO_OPERACION = require("../Enums/TipoOperacion")
const TIPO_VALOR = require("../Enums/TipoValor")
const ValorExpresion = require("./ValorExpresion")
const Ambito = require("../Ambito/Ambito")
const Instruccion = require("../Instruccion/Instruccion")
const TIPO_DATO = require("../Enums/TipoDato")
const ListaErrores = require("../Enums/ListaErrores")

function OpLlamada(_expresion, _ambito) {
    if (_expresion.tipo === TIPO_VALOR.DECIMAL || _expresion.tipo === TIPO_VALOR.BANDERA ||
        _expresion.tipo === TIPO_VALOR.CADENA || _expresion.tipo === TIPO_VALOR.IDENTIFICADOR ||
        _expresion.tipo === TIPO_VALOR.CARACTER || _expresion.tipo === TIPO_VALOR.DOUBLE) {
        return ValorExpresion(_expresion, _ambito)
    }
    else if (_expresion.tipo === TIPO_OPERACION.LLAMADA) {
        return llamar(_expresion.opIzq, _expresion.opDer, _expresion.linea, _expresion.columna, _ambito)
    }


    function llamar(_nombre, lista_valores, _linea, _columna, _ambito) {
        var valor = {
            valor: null,
            tipo: null,
            mensaje: "",
            linea: _linea,
            columna: _columna
        }
        var cadena = ""
        var metodoEjecutar = _ambito.getFuncion(_nombre)
        if (metodoEjecutar != null) {
            var nuevoAmbito = new Ambito(_ambito, "Funcion_" + metodoEjecutar.id)
            //Si trae parametros
            if (metodoEjecutar.lista_parametros != null) {
                //Si tienen la misma cantidad
                if (lista_valores != null && metodoEjecutar.lista_parametros.length == lista_valores.length) {
                    var error = false;
                    for (let i = 0; i < metodoEjecutar.lista_parametros.length; i++) {
                        var declaracionAsignacion = Instruccion.nuevaDeclaracion(metodoEjecutar.lista_parametros[i].id, lista_valores[i], metodoEjecutar.lista_parametros[i].tipo_dato, _linea, _columna)
                        const DecParametro = require("../Instruccion/DecParametro")
                        var mensaje = DecParametro(declaracionAsignacion, nuevoAmbito)
                        cadena += mensaje
                    }
                    //console.log(_ambito);
                    //return Bloque(metodoEjecutar.instrucciones, nuevoAmbito)
                    const Bloque = require("../Instruccion/Bloque")
                    var exec = Bloque(metodoEjecutar.instrucciones, nuevoAmbito)
                    valor = exec.valor
                    cadena += exec.cadena
                    valor.mensaje += cadena
                    return valor
                }
            }
            const Bloque = require("../Instruccion/Bloque")
            var exec = Bloque(metodoEjecutar.instrucciones, nuevoAmbito)
            valor = exec.valor
            cadena += exec.cadena
            valor.mensaje += cadena
            return valor
        } 
        else if((_nombre.toString()).toLowerCase()=="tolower"){
            const Operacion = require("./Operacion")
            var op = Operacion(lista_valores[0], _ambito)
            if(op.tipo === TIPO_DATO.CADENA){
                op.valor = op.valor.toLowerCase()
                return op
            }
            var err = {
                TipoError: "Semántico",
                Descripcion: 'No se puede realizar la funcion ToLower',
                Linea: _linea,
                Columna: _columna
            }
            ListaErrores.push(err)
            return{
                tipo: null,
                valor: 'Error semántico: No se puede realizar la funcion ToLower, Linea: '+_linea+" Columna: "+_columna + "\n",
                linea: _linea,
                mensaje: 'Error semántico: No se puede realizar la funcion ToLower, Linea: '+_linea+" Columna: "+_columna +"\n",
                columna: _columna
            }
        }
        else if((_nombre.toString()).toLowerCase()=="toupper"){
            const Operacion = require("./Operacion")
            var op = Operacion(lista_valores[0], _ambito)
            if(op.tipo === TIPO_DATO.CADENA){
                op.valor = op.valor.toUpperCase()
                return op
            }
            var err = {
                TipoError: "Semántico",
                Descripcion: 'No se puede realizar la funcion ToUpper',
                Linea: _linea,
                Columna: _columna
            }
            ListaErrores.push(err)
            return{
                tipo: null,
                valor: 'Error semántico: No se puede realizar la funcion ToUpper, Linea: '+_linea+" Columna: "+_columna + "\n",
                linea: _linea,
                mensaje: 'Error semántico: No se puede realizar la funcion ToUpper, Linea: '+_linea+" Columna: "+_columna +"\n",
                columna: _columna
            }
        }
        else if((_nombre.toString()).toLowerCase()=="length"){
            const Operacion = require("./Operacion")
            var op = Operacion(lista_valores[0], _ambito)
            if(op.tipo === TIPO_DATO.CADENA){
                op.valor = op.valor.length
                op.tipo = TIPO_DATO.DECIMAL
                return op
            }
            var err = {
                TipoError: "Semántico",
                Descripcion: 'No se puede realizar la funcion lenght',
                Linea: _linea,
                Columna: _columna
            }
            ListaErrores.push(err)
            return{
                tipo: null,
                valor: 'Error semántico: No se puede realizar la funcion length, Linea: '+_linea+" Columna: "+_columna + "\n",
                linea: _linea,
                mensaje: 'Error semántico: No se puede realizar la funcion length, Linea: '+_linea+" Columna: "+_columna +"\n",
                columna: _columna
            }
        }
        else if((_nombre.toString()).toLowerCase()=="truncate"){
            const Operacion = require("./Operacion")
            var op = Operacion(lista_valores[0], _ambito)
            if(op.tipo === TIPO_DATO.DECIMAL || op.tipo === TIPO_DATO.DOUBLE){
                op.valor = Math.trunc(op.valor)
                op.tipo = TIPO_DATO.DECIMAL
                return op
            }
            var err = {
                TipoError: "Semántico",
                Descripcion: 'No se puede realizar la funcion truncate',
                Linea: _linea,
                Columna: _columna
            }
            ListaErrores.push(err)
            return{
                tipo: null,
                valor: 'Error semántico: No se puede realizar la funcion truncate, Linea: '+_linea+" Columna: "+_columna + "\n",
                linea: _linea,
                mensaje: 'Error semántico: No se puede realizar la funcion truncate, Linea: '+_linea+" Columna: "+_columna +"\n",
                columna: _columna
            }
        }
        else if((_nombre.toString()).toLowerCase()=="round"){
            const Operacion = require("./Operacion")
            var op = Operacion(lista_valores[0], _ambito)
            if(op.tipo === TIPO_DATO.DECIMAL || op.tipo === TIPO_DATO.DOUBLE){
                op.valor = Math.round(op.valor)
                op.tipo = TIPO_DATO.DECIMAL
                return op
            }
            var err = {
                TipoError: "Semántico",
                Descripcion: 'No se puede realizar la funcion round',
                Linea: _linea,
                Columna: _columna
            }
            ListaErrores.push(err)
            return{
                tipo: null,
                valor: 'Error semántico: No se puede realizar la funcion round, Linea: '+_linea+" Columna: "+_columna + "\n",
                linea: _linea,
                mensaje: 'Error semántico: No se puede realizar la funcion round, Linea: '+_linea+" Columna: "+_columna +"\n",
                columna: _columna
            }
        }
        else if((_nombre.toString()).toLowerCase()=="typeof"){
            const Operacion = require("./Operacion")
            var op = Operacion(lista_valores[0], _ambito)
            if (op.tipo === TIPO_DATO.CADENA){
                op.valor = "string"
            }
            else if (op.tipo === TIPO_DATO.DECIMAL){
                op.valor = "int"
            }
            else if (op.tipo === TIPO_DATO.DOUBLE){
                op.valor = "double"
            }
            else if (op.tipo === TIPO_DATO.BANDERA){
                op.valor = "boolean"
            }
            else if (op.tipo === TIPO_DATO.CARACTER){
                op.valor = "char"
            }
            op.tipo = TIPO_DATO.CADENA
            return op
        }
        else if((_nombre.toString()).toLowerCase()=="tostring"){
            const Operacion = require("./Operacion")
            var op = Operacion(lista_valores[0], _ambito)
            if(op.tipo === TIPO_DATO.DECIMAL || op.tipo === TIPO_DATO.DOUBLE || op.tipo === TIPO_DATO.BANDERA || op.tipo === TIPO_DATO.CADENA){
                op.valor = op.valor.toString()
                op.tipo = TIPO_DATO.CADENA
                return op
            }
            var err = {
                TipoError: "Semántico",
                Descripcion: 'No se puede realizar la funcion ToString',
                Linea: _linea,
                Columna: _columna
            }
            ListaErrores.push(err)
            return{
                tipo: null,
                valor: 'Error semántico: No se puede realizar la funcion ToString, Linea: '+_linea+" Columna: "+_columna + "\n",
                linea: _linea,
                mensaje: 'Error semántico: No se puede realizar la funcion ToString, Linea: '+_linea+" Columna: "+_columna +"\n",
                columna: _columna
            }
        }
        var err = {
            TipoError: "Semántico",
            Descripcion: `Error: La función ${_nombre} no existe`,
            Linea: _linea,
            Columna: _columna
        }
        ListaErrores.push(err)
        return {
            tipo: null,
            valor: `Error: La función ${_nombre} no existe... Linea: ${_linea} Columna: ${_columna} \n`,
            linea: _linea,
            mensaje: `Error: La función ${_nombre} no existe... Linea: ${_linea} Columna: ${_columna}\n`,
            columna: _columna
        }
    }

}

module.exports = OpLlamada