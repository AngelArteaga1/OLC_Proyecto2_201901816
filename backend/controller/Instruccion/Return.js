const Metodo = require("../Ambito/Metodo")
const Operacion = require("../Operacion/Operacion")

function Return(_instruccion, _ambito){
    //CONSEGUIMOS EL VALOR DEL RETURN
    if(_instruccion.expresion != null){
        var valor = Operacion(_instruccion.expresion, _ambito)
        return valor
    }
    return null
}

module.exports = Return