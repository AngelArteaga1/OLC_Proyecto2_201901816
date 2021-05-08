const Funcion = require("../Ambito/Funcion")
const ListaErrores = require("../Enums/ListaErrores")

function DecFuncion(_instruccion, _ambito){
    //console.log(_instruccion.lista_parametros)
    const nuevaFuncion = new Funcion(_instruccion.nombre, _instruccion.tipoFuncion, _instruccion.lista_parametros, _instruccion.instrucciones, _instruccion.linea, _instruccion.columna)
    //Si el nombre ya existe como simbolo 
    if(_ambito.existeSimbolo(nuevaFuncion.id)!=false){
        var err = {
            TipoError: "Semántico",
            Descripcion: `No se puede declarar un metodo con el mismo nombre de una variable "${nuevaFuncion.id}"`,
            Linea: nuevaFuncion.linea,
            Columna: nuevaFuncion.columna
        }
        ListaErrores.push(err)
        return `Error: No se puede declarar una funcion con el mismo nombre de una variable "${nuevaFuncion.id}" Linea: ${nuevaFuncion.linea} Columna: ${nuevaFuncion.columna}\n`
    }
    //Verificamos si el metodo ya existe
    else if(_ambito.existeMetodo(nuevaFuncion.id)!=false){
        var err = {
            TipoError: "Semántico",
            Descripcion: `Ya existe un metodo con el nombre: "${nuevaFuncion.id}"`,
            Linea: nuevaFuncion.linea,
            Columna: nuevaFuncion.columna
        }
        ListaErrores.push(err)
        return `Error: Ya existe un metodo con el nombre: "${nuevaFuncion.id}" Linea: ${nuevaFuncion.linea} Columna: ${nuevaFuncion.columna}\n`
    }
    else if(_ambito.existeFuncion(nuevaFuncion.id)!=false){
        var err = {
            TipoError: "Semántico",
            Descripcion: `La Funcion "${nuevaFuncion.id}" ya existe`,
            Linea: nuevaFuncion.linea,
            Columna: nuevaFuncion.columna
        }
        ListaErrores.push(err)
        return `Error: La Funcion "${nuevaFuncion.id}" ya existe, Linea: ${nuevaFuncion.linea} Columna: ${nuevaFuncion.columna}\n`
    }
    //Si no hay error guardamos
    _ambito.addFuncion(nuevaFuncion.id, nuevaFuncion)
    return null
}

module.exports = DecFuncion