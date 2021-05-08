const ListaErrores = require("../Enums/ListaErrores");
const Operacion = require("../Operacion/Operacion");

function Asignacion(_instruccion, _ambito){
    const id = _instruccion.id;
    const existe = _ambito.existeSimbolo(id)
    if(existe){
        var valor = Operacion(_instruccion.expresion, _ambito)

        var simbolo = _ambito.getSimbolo(id)
        var tipos = {
            tipoSimbolo: simbolo.tipo,
            tipoNuevoValor: valor.tipo
        }
        if(tipos.tipoSimbolo===tipos.tipoNuevoValor){
            simbolo.valor = valor.valor
            _ambito.actualizar(id,simbolo)
            return valor.mensaje
        }
        var err = {
            TipoError: "Semántico",
            Descripcion: "No es posible asignar un valor de tipo "+tipos.tipoNuevoValor+" a la variable '"+ id +"' que es de tipo "+tipos.tipoSimbolo,
            Linea: _instruccion.linea,
            Columna: _instruccion.columna
        }
        ListaErrores.push(err)
        return "Error: No es posible asignar un valor de tipo "+tipos.tipoNuevoValor+" a la variable \n'"+ id +"' que es de tipo "+tipos.tipoSimbolo+"... Linea: "+_instruccion.linea+" Columna: "+ _instruccion.columna+"\n";
    }
    var err = {
        TipoError: "Semántico",
        Descripcion: `La variable '${String(id)}' no existe`,
        Linea: _instruccion.linea,
        Columna: _instruccion.columna
    }
    ListaErrores.push(err)
    return `Error: la variable '${String(id)}' no existe... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`+"\n"
}

module.exports = Asignacion