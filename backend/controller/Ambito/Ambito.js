const ListaSimbolos = require("../Enums/ListaSimbolos")

class Ambito{
    constructor(_anterior, _entorno){
        this.anterior = _anterior;
        this.entorno = _entorno;
        this.tablaSimbolos = new Map();
        this.tablaMetodos = new Map();
        this.tablaFunciones = new Map();
    }

    addSimbolo(_s, _simbolo){
        this.tablaSimbolos.set(_s.toLowerCase(), _simbolo)
        //INGRESAMOS A LA TABLA DE SIMBOLOS
        var sim = {
            Identificador: _simbolo.id,
            TipoVar: "Variable",
            Tipo: _simbolo.tipo,
            Entorno: this.entorno,
            Linea: _simbolo.linea,
            Columna: _simbolo.columna
        }
        ListaSimbolos.push(sim)
    }

    addMetodo(_s, _metodo){
        this.tablaMetodos.set(_s.toLowerCase(), _metodo)
        var sim = {
            Identificador: _metodo.id,
            TipoVar: "Metodo",
            Tipo: "Void",
            Entorno: this.entorno,
            Linea: _metodo.linea,
            Columna: _metodo.columna
        }
        ListaSimbolos.push(sim)
    }

    addFuncion(_s, _metodo){
        this.tablaFunciones.set(_s.toLowerCase(), _metodo)
        var sim = {
            Identificador: _metodo.id,
            TipoVar: "Funcion",
            Tipo: _metodo.tipo,
            Entorno: this.entorno,
            Linea: _metodo.linea,
            Columna: _metodo.columna
        }
        ListaSimbolos.push(sim)
    }

    getSimbolo(_s){ //(hola, clase simbolo)
        for(let e=this; e!=null; e=e.anterior){
            var encontrado = e.tablaSimbolos.get(_s.toLowerCase()) //hola<=>HoLA
            if(encontrado!=null){
                return encontrado
            }
        }
        return null
    }
    getMetodo(_s){ //(hola, clase simbolo)
        for(let e=this; e!=null; e=e.anterior){
            var encontrado = e.tablaMetodos.get(_s.toLowerCase()) //hola<=>HoLA
            if(encontrado!=null){
                return encontrado
            }
        }
        return null
    }
    getFuncion(_s){ //(hola, clase simbolo)
        for(let e=this; e!=null; e=e.anterior){
            var encontrado = e.tablaFunciones.get(_s.toLowerCase()) //hola<=>HoLA
            if(encontrado!=null){
                return encontrado
            }
        }
        return null
    }
    existeSimbolo(_s){
        for(let e=this; e!=null; e=e.anterior){
            var encontrado = e.tablaSimbolos.get(_s.toLowerCase()) //hola<=>HoLA
            if(encontrado!=null){
                return true
            }
        }
        return false
    }
    existeSimboloAmbitoActual(_s){
            var encontrado = this.tablaSimbolos.get(_s.toLowerCase()) //hola<=>HoLA
            if(encontrado!=null){
                return true
            }
        return false
    }
    existeMetodo(_s){
        for(let e=this; e!=null; e=e.anterior){
            var encontrado = e.tablaMetodos.get(_s.toLowerCase()) //hola<=>HoLA
            if(encontrado!=null){
                return true
            }
        }
        return false
    }
    existeFuncion(_s){
        for(let e=this; e!=null; e=e.anterior){
            var encontrado = e.tablaFunciones.get(_s.toLowerCase()) //hola<=>HoLA
            if(encontrado!=null){
                return true
            }
        }
        return false
    }
    actualizar(_s, _simbolo){
        for(let e=this; e!=null; e=e.anterior){
            var encontrado = e.tablaSimbolos.get(_s.toLowerCase());
            if(encontrado!=null){
                e.tablaSimbolos.set(_s, _simbolo)
                return true;
            }
        }
        return false
    }
}

module.exports = Ambito