const Simbolo = require("../Ambito/Simbolo");
const TIPO_DATO = require("../Enums/TipoDato");
const Operacion = require("../Operacion/Operacion");
const ListaSimbolos = require("../Enums/ListaSimbolos");
const ListaErrores = require("../Enums/ListaErrores");

function Declaracion(_instruccion, _ambito){
    var cadena = ""
    if(_instruccion.tipo_dato === TIPO_DATO.DECIMAL){
        var valor = 0.0
        if(_instruccion.valor != null){
            var op = Operacion(_instruccion.valor, _ambito)
            cadena = op.mensaje
            tipo = op.tipo;
            if(tipo === TIPO_DATO.DECIMAL){
                valor = op.valor;
            }
            else {
                var err = {
                    TipoError: "Semántico",
                    Descripcion: "No es posible asignar un valor de tipo "+tipo+" a la variable '"+ _instruccion.id +"' que es de tipo "+TIPO_DATO.DECIMAL,
                    Linea: _instruccion.linea,
                    Columna: _instruccion.columna
                }
                ListaErrores.push(err)
                return "Error: No es posible asignar un valor de tipo "+tipo+" a la variable \n'"+ _instruccion.id +"' que es de tipo "+TIPO_DATO.DECIMAL+"... Linea: "+_instruccion.linea+" Columna: "+ _instruccion.columna+"\n";
            }
        }
        const nuevoSimbolo = new Simbolo(_instruccion.id, valor, TIPO_DATO.DECIMAL, _instruccion.linea, _instruccion.columna)
        if(_ambito.existeSimboloAmbitoActual(nuevoSimbolo.id)!=false){
            var err = {
                TipoError: "Semántico",
                Descripcion: "La variable '"+ nuevoSimbolo.id +"' ya existe",
                Linea: _instruccion.linea,
                Columna: _instruccion.columna
            }
            ListaErrores.push(err)
            return "Error: La variable '"+ nuevoSimbolo.id +"' ya existe... Linea: "+nuevoSimbolo.linea+" Columna: "+ nuevoSimbolo.columna+"\n";
        }
        _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
        //console.log(_ambito)
        return cadena
    }
    else if(_instruccion.tipo_dato === TIPO_DATO.DOUBLE){
        var valor = 0.0
        if(_instruccion.valor != null){
            var op = Operacion(_instruccion.valor, _ambito)
            cadena = op.mensaje
            tipo = op.tipo;
            if(tipo === TIPO_DATO.DOUBLE || tipo === TIPO_DATO.DECIMAL){
                valor = op.valor;
            }
            else {
                var err = {
                    TipoError: "Semántico",
                    Descripcion: "No es posible asignar un valor de tipo "+tipo+" a la variable '"+ _instruccion.id +"' que es de tipo "+TIPO_DATO.DOUBLE,
                    Linea: _instruccion.linea,
                    Columna: _instruccion.columna
                }
                ListaErrores.push(err)
                "Error: No es posible asignar un valor de tipo "+tipo+" a la variable \n'"+ _instruccion.id +"' que es de tipo "+TIPO_DATO.DOUBLE+"... Linea: "+_instruccion.linea+" Columna: "+ _instruccion.columna+"\n";
            }
        }
        const nuevoSimbolo = new Simbolo(_instruccion.id, valor, TIPO_DATO.DOUBLE, _instruccion.linea, _instruccion.columna)
        if(_ambito.existeSimboloAmbitoActual(nuevoSimbolo.id)!=false){
            var err = {
                TipoError: "Semántico",
                Descripcion: "La variable '"+ nuevoSimbolo.id +"' ya existe",
                Linea: _instruccion.linea,
                Columna: _instruccion.columna
            }
            ListaErrores.push(err)
            return "Error: La variable '"+ nuevoSimbolo.id +"' ya existe... Linea: "+nuevoSimbolo.linea+" Columna: "+ nuevoSimbolo.columna+"\n";
        }
        _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
        //console.log(_ambito)
        return cadena
    }
    else if(_instruccion.tipo_dato === TIPO_DATO.CADENA){
        var valor = "" // en caso sea sin asignación inicializamos la variable
        //si es una declaracion con asignacion
        if(_instruccion.valor!=null){
            op = Operacion(_instruccion.valor, _ambito)
            cadena = op.mensaje
            tipo = op.tipo;
            if(tipo === TIPO_DATO.CADENA){
                valor = String(op.valor) //casteamos a cadena
            } else {
                var err = {
                    TipoError: "Semántico",
                    Descripcion: "No es posible asignar un valor de tipo "+tipo+" a la variable '"+ _instruccion.id +"' que es de tipo "+TIPO_DATO.CADENA,
                    Linea: _instruccion.linea,
                    Columna: _instruccion.columna
                }
                ListaErrores.push(err)
                return "Error: No es posible asignar un valor de tipo "+tipo+" a la variable \n'"+ _instruccion.id +"' que es de tipo "+TIPO_DATO.CADENA+"... Linea: "+_instruccion.linea+" Columna: "+ _instruccion.columna+"\n";
            }
        }
        //verificamos si ya existe
        const nuevoSimbolo = new Simbolo(_instruccion.id, valor, TIPO_DATO.CADENA, _instruccion.linea, _instruccion.columna)
        if(_ambito.existeSimboloAmbitoActual(nuevoSimbolo.id)!=false){
            var err = {
                TipoError: "Semántico",
                Descripcion: "La variable '"+ nuevoSimbolo.id +"' ya existe",
                Linea: _instruccion.linea,
                Columna: _instruccion.columna
            }
            ListaErrores.push(err)
            return "Error: La variable '"+ nuevoSimbolo.id +"' ya existe... Linea: "+nuevoSimbolo.linea+" Columna: "+ nuevoSimbolo.columna+"\n";
        }
        _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
        return cadena
        //console.log(_ambito)
    }
    else if (_instruccion.tipo_dato === TIPO_DATO.CARACTER){
        var valor = "" // en caso sea sin asignación inicializamos la variable
        //si es una declaracion con asignacion
        if(_instruccion.valor!=null){
            op = Operacion(_instruccion.valor, _ambito)
            cadena = op.mensaje
            tipo = op.tipo
            if (tipo===TIPO_DATO.CARACTER){
                valor = String(op.valor) //casteamos a cadena
            } else {
                var err = {
                    TipoError: "Semántico",
                    Descripcion: "No es posible asignar un valor de tipo "+tipo+" a la variable '"+ _instruccion.id +"' que es de tipo "+TIPO_DATO.CARACTER,
                    Linea: _instruccion.linea,
                    Columna: _instruccion.columna
                }
                ListaErrores.push(err)
                return "Error: No es posible asignar un valor de tipo "+tipo+" a la variable \n'"+ _instruccion.id +"' que es de tipo "+TIPO_DATO.CARACTER+"... Linea: "+_instruccion.linea+" Columna: "+ _instruccion.columna+"\n";
            }
            
        }
        //verificamos si ya existe
        const nuevoSimbolo = new Simbolo(_instruccion.id, valor, TIPO_DATO.CARACTER, _instruccion.linea, _instruccion.columna)
        if(_ambito.existeSimboloAmbitoActual(nuevoSimbolo.id)!=false){
            var err = {
                TipoError: "Semántico",
                Descripcion: "La variable '"+ nuevoSimbolo.id +"' ya existe",
                Linea: _instruccion.linea,
                Columna: _instruccion.columna
            }
            ListaErrores.push(err)
            return "Error: La variable '"+ nuevoSimbolo.id +"' ya existe... Linea: "+nuevoSimbolo.linea+" Columna: "+ nuevoSimbolo.columna+"\n";
        }
        _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
        return cadena
        //console.log(_ambito)
    }
    else if(_instruccion.tipo_dato === TIPO_DATO.BANDERA){
        var valor = false // en caso sea sin asignación inicializamos la variable
        //si es una declaracion con asignacion
        if(_instruccion.valor!=null){
            op = Operacion(_instruccion.valor, _ambito)
            cadena = op.mensaje
            tipo = op.tipo
            //verificamos que el valor a asignar sea del mismo tipo
            if(tipo===TIPO_DATO.BANDERA){
                valor = Boolean(op.valor)
            }
            else{
                var err = {
                    TipoError: "Semántico",
                    Descripcion: "No es posible asignar un valor de tipo "+tipo+" a la variable '"+ _instruccion.id +"' que es de tipo "+TIPO_DATO.BANDERA,
                    Linea: _instruccion.linea,
                    Columna: _instruccion.columna
                }
                ListaErrores.push(err)
                return "Error: No es posible asignar un valor de tipo "+tipo+" a la variable \n'"+ _instruccion.id +"' que es de tipo "+TIPO_DATO.BANDERA+"... Linea: "+_instruccion.linea+" Columna: "+ _instruccion.columna+"\n";
            }
        }
        //verificamos si ya existe
        const nuevoSimbolo = new Simbolo(_instruccion.id, valor, TIPO_DATO.BANDERA, _instruccion.linea, _instruccion.columna)
        if(_ambito.existeSimboloAmbitoActual(nuevoSimbolo.id)!=false){
            var err = {
                TipoError: "Semántico",
                Descripcion: "La variable '"+ nuevoSimbolo.id +"' ya existe",
                Linea: _instruccion.linea,
                Columna: _instruccion.columna
            }
            ListaErrores.push(err)
            return "Error: La variable '"+ nuevoSimbolo.id +"' ya existe... Linea: "+nuevoSimbolo.linea+" Columna: "+ nuevoSimbolo.columna+"\n";
        }
        _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
        return cadena
        //console.log(_ambito)
    }
}

module.exports = Declaracion