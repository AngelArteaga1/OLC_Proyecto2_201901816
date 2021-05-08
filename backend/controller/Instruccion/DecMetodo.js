const Metodo = require("../Ambito/Metodo")
const ListaErrores = require("../Enums/ListaErrores")

function DecMetodo(_instruccion, _ambito){
    //console.log(_instruccion.lista_parametros)
    const nuevoMetodo = new Metodo(_instruccion.nombre, _instruccion.lista_parametros, _instruccion.instrucciones, _instruccion.linea, _instruccion.columna)
    //Si el nombre ya existe como simbolo 
    if(_ambito.existeSimbolo(nuevoMetodo.id)!=false){
        var err = {
            TipoError: "Semántico",
            Descripcion: `No se puede declarar un metodo con el mismo nombre de una variable "${nuevoMetodo.id}"`,
            Linea: nuevoMetodo.linea,
            Columna: nuevoMetodo.columna
        }
        ListaErrores.push(err)
        return `Error: No se puede declarar un metodo con el mismo nombre \n de una variable "${nuevoMetodo.id}" Linea: ${nuevoMetodo.linea} Columna: ${nuevoMetodo.columna}\n`
    }
    else if(_ambito.existeFuncion(nuevoMetodo.id)!=false){
        var err = {
            TipoError: "Semántico",
            Descripcion: `No se puede declarar un metodo con el mismo nombre de una función "${nuevoMetodo.id}"`,
            Linea: nuevoMetodo.linea,
            Columna: nuevoMetodo.columna
        }
        ListaErrores.push(err)
        return `Error: No se puede declarar un metodo con el mismo nombre \n de una funcion "${nuevoMetodo.id}" Linea: ${nuevoMetodo.linea} Columna: ${nuevoMetodo.columna}\n`
    }
    else if(_ambito.existeMetodo(nuevoMetodo.id)!=false){
        var err = {
            TipoError: "Semántico",
            Descripcion: `El metodo "${nuevoMetodo.id}" ya existe`,
            Linea: nuevoMetodo.linea,
            Columna: nuevoMetodo.columna
        }
        ListaErrores.push(err)
        return `Error: El metodo "${nuevoMetodo.id}" ya existe, Linea: ${nuevoMetodo.linea} Columna: ${nuevoMetodo.columna}\n`
    }
    //Si no hay error guardamos
    _ambito.addMetodo(nuevoMetodo.id, nuevoMetodo)
    return null
}

module.exports = DecMetodo