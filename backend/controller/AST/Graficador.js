const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion");
const TIPO_OPERACION = require("../Enums/TipoOperacion");
const TIPO_VALOR = require("../Enums/TipoValor");

class Graficador {
    constructor(_raiz) {
        this.grafo = ""
        this.raiz = _raiz
        this.contador = 0
    }

    graficar() {
        this.grafo = "digraph G{";
        this.grafo += 'node[shape="box"]';
        this.grafo += 'Nodo0[label="RAIZ"];\n';
        this.contador = 1;
        this.recorrerAST("Nodo0", this.raiz)
        this.grafo += '}';
        return this.grafo
    }

    recorrerAST(_nombrePadre, _hijo) {
        _hijo.forEach(instruccion => {
            if (instruccion.tipo === TIPO_INSTRUCCION.DECLARACION) {
                var nombreHijo = "Nodo" + this.contador
                this.contador++
                this.grafo += nombreHijo + '[label="DECLARACION"];\n'
                this.grafo += _nombrePadre + "->" + nombreHijo + ';\n'
                this.graficarDeclaracion(instruccion, nombreHijo)
            }
            else if (instruccion.tipo === TIPO_INSTRUCCION.ASIGNACION) {
                var nombreHijo = "Nodo" + this.contador
                this.contador++
                this.grafo += nombreHijo + '[label="ASIGNACION"];\n'
                this.grafo += _nombrePadre + "->" + nombreHijo + ';\n'
                this.graficarAsignacion(instruccion, nombreHijo)
            }
            else if (instruccion.tipo === TIPO_INSTRUCCION.EXEC) {
                var nombreHijo = "Nodo" + this.contador
                this.contador++
                this.grafo += nombreHijo + '[label="EXEC"];\n'
                this.grafo += _nombrePadre + "->" + nombreHijo + ';\n'
                this.graficarExec(instruccion, nombreHijo)
            }
            else if (instruccion.tipo === TIPO_INSTRUCCION.DEC_METODO) {
                var nombreHijo = "Nodo" + this.contador
                this.contador++
                this.grafo += nombreHijo + '[label="METODO"];\n'
                this.grafo += _nombrePadre + "->" + nombreHijo + ';\n'
                this.graficarMetodo(instruccion, nombreHijo)
            }
            else if (instruccion.tipo === TIPO_INSTRUCCION.DEC_FUNCION) {
                var nombreHijo = "Nodo" + this.contador
                this.contador++
                this.grafo += nombreHijo + '[label="FUNCION"];\n'
                this.grafo += _nombrePadre + "->" + nombreHijo + ';\n'
                this.graficarFuncion(instruccion, nombreHijo)
            }
            else if (instruccion.tipo === TIPO_INSTRUCCION.COUT) {
                var nombreHijo = "Nodo" + this.contador
                this.contador++
                this.grafo += nombreHijo + '[label="PRINT"];\n'
                this.grafo += _nombrePadre + "->" + nombreHijo + ';\n'
                this.graficarPrint(instruccion, nombreHijo)
            }
            else if (instruccion.tipo === TIPO_INSTRUCCION.WHILE) {
                var nombreHijo = "Nodo" + this.contador
                this.contador++
                this.grafo += nombreHijo + '[label="WHILE"];\n'
                this.grafo += _nombrePadre + "->" + nombreHijo + ';\n'
                this.graficarWhile(instruccion, nombreHijo)
            }
            else if (instruccion.tipo === TIPO_INSTRUCCION.DOWHILE) {
                var nombreHijo = "Nodo" + this.contador
                this.contador++
                this.grafo += nombreHijo + '[label="DO_WHILE"];\n'
                this.grafo += _nombrePadre + "->" + nombreHijo + ';\n'
                this.graficarDoWhile(instruccion, nombreHijo)
            }
            else if (instruccion.tipo === TIPO_INSTRUCCION.FOR) {
                var nombreHijo = "Nodo" + this.contador
                this.contador++
                this.grafo += nombreHijo + '[label="FOR"];\n'
                this.grafo += _nombrePadre + "->" + nombreHijo + ';\n'
                this.graficarFor(instruccion, nombreHijo)
            }
            else if (instruccion.tipo === TIPO_INSTRUCCION.IF) {
                var nombreHijo = "Nodo" + this.contador
                this.contador++
                this.grafo += nombreHijo + '[label="IF"];\n'
                this.grafo += _nombrePadre + "->" + nombreHijo + ';\n'
                this.graficarIf(instruccion, nombreHijo)
            }
            else if (instruccion.tipo === TIPO_INSTRUCCION.IF_ELSE) {
                var nombreHijo = "Nodo" + this.contador
                this.contador++
                this.grafo += nombreHijo + '[label="IF_ELSE"];\n'
                this.grafo += _nombrePadre + "->" + nombreHijo + ';\n'
                this.graficarIfElse(instruccion, nombreHijo)
            }
            else if (instruccion.tipo === TIPO_INSTRUCCION.LLAMADA) {
                var nombreHijo = "Nodo" + this.contador
                this.contador++
                this.grafo += nombreHijo + '[label="LLAMADA"];\n'
                this.grafo += _nombrePadre + "->" + nombreHijo + ';\n'
                this.graficarExec(instruccion, nombreHijo)
            }
            else if (instruccion.tipo === TIPO_INSTRUCCION.BREAK) {
                var nombreHijo = "Nodo" + this.contador
                this.contador++
                this.grafo += nombreHijo + '[label="BREAK"];\n'
                this.grafo += _nombrePadre + "->" + nombreHijo + ';\n'
            }
            else if (instruccion.tipo === TIPO_INSTRUCCION.CONTINUE) {
                var nombreHijo = "Nodo" + this.contador
                this.contador++
                this.grafo += nombreHijo + '[label="CONTINUE"];\n'
                this.grafo += _nombrePadre + "->" + nombreHijo + ';\n'
            }
            else if (instruccion.tipo === TIPO_INSTRUCCION.RETURN) {
                var nombreHijo = "Nodo" + this.contador
                this.contador++
                this.grafo += nombreHijo + '[label="RETURN"];\n'
                this.grafo += _nombrePadre + "->" + nombreHijo + ';\n'
                this.graficarPrint(instruccion, nombreHijo)
            }
        })
    }

    graficarIfElse(_instruccion, _padre) {
        var Condicion = `Nodo${this.contador}`
        this.grafo += Condicion + `[label="CONDICION"];\n`
        this.grafo += _padre + "->" + Condicion + ";\n"
        this.contador++
        //OPERAMOS LA CONDICION
        this.graficarOperacion(_instruccion.expresion, Condicion)
        //LLAMAMOS AL CUERPO
        var nombreHijo = `Nodo${this.contador}`
        this.contador++
        this.grafo += nombreHijo + '[label="CUERPO_IF"];\n'
        this.grafo += _padre + "->" + nombreHijo + ';\n'
        this.recorrerAST(nombreHijo, _instruccion.instruccionesIf)
        //LLAMAMOS AL CUERPO
        var nombreHijo2 = `Nodo${this.contador}`
        this.contador++
        this.grafo += nombreHijo2 + '[label="CUERPO_ELSE"];\n'
        this.grafo += _padre + "->" + nombreHijo2 + ';\n'
        this.recorrerAST(nombreHijo2, _instruccion.instruccionesElse)
    }

    graficarIf(_instruccion, _padre) {
        var Condicion = `Nodo${this.contador}`
        this.grafo += Condicion + `[label="CONDICION"];\n`
        this.grafo += _padre + "->" + Condicion + ";\n"
        this.contador++
        //OPERAMOS LA CONDICION
        this.graficarOperacion(_instruccion.expresion, Condicion)
        //LLAMAMOS AL CUERPO
        var nombreHijo = `Nodo${this.contador}`
        this.contador++
        this.grafo += nombreHijo + '[label="CUERPO_IF"];\n'
        this.grafo += _padre + "->" + nombreHijo + ';\n'
        this.recorrerAST(nombreHijo, _instruccion.instrucciones)
    }

    graficarFor(_instruccion, _padre) {
        //ASIGNACION/DECLARACION
        if (_instruccion.declaracion.tipo === TIPO_INSTRUCCION.DECLARACION) {
            var nombreHijo = "Nodo" + this.contador
            this.contador++
            this.grafo += nombreHijo + '[label="DECLARACION"];\n'
            this.grafo += _padre + "->" + nombreHijo + ';\n'
            this.graficarDeclaracion(_instruccion.declaracion, nombreHijo)
        } else {
            var nombreHijo = "Nodo" + this.contador
            this.contador++
            this.grafo += nombreHijo + '[label="ASIGNACION"];\n'
            this.grafo += _padre + "->" + nombreHijo + ';\n'
            this.graficarAsignacion(_instruccion.declaracion, nombreHijo)
        }
        //OPERAMOS LA CONDICION
        var Condicion = `Nodo${this.contador}`
        this.grafo += Condicion + `[label="CONDICION"];\n`
        this.grafo += _padre + "->" + Condicion + ";\n"
        this.contador++
        this.graficarOperacion(_instruccion.condicion, Condicion)
        //ACTUALIZACION
        var actualizar = "Nodo" + this.contador
        this.contador++
        this.grafo += actualizar + '[label="ACTUALIZACION"];\n'
        this.grafo += _padre + "->" + actualizar + ';\n'
        this.graficarAsignacion(_instruccion.actualizacion, actualizar)
        //LLAMAMOS AL CUERPO
        var nombreHijo = `Nodo${this.contador}`
        this.contador++
        this.grafo += nombreHijo + '[label="CUERPO_FOR"];\n'
        this.grafo += _padre + "->" + nombreHijo + ';\n'
        this.recorrerAST(nombreHijo, _instruccion.instrucciones)
    }

    graficarDoWhile(_instruccion, _padre) {
        //LLAMAMOS AL CUERPO
        var nombreHijo = `Nodo${this.contador}`
        this.contador++
        this.grafo += nombreHijo + '[label="CUERPO_DO"];\n'
        this.grafo += _padre + "->" + nombreHijo + ';\n'
        this.recorrerAST(nombreHijo, _instruccion.instrucciones)
        //CONDICION
        var Condicion = `Nodo${this.contador}`
        this.grafo += Condicion + `[label="CONDICION"];\n`
        this.grafo += _padre + "->" + Condicion + ";\n"
        this.contador++
        //OPERAMOS LA CONDICION
        this.graficarOperacion(_instruccion.expresion, Condicion)
    }

    graficarWhile(_instruccion, _padre) {
        var Condicion = `Nodo${this.contador}`
        this.grafo += Condicion + `[label="CONDICION"];\n`
        this.grafo += _padre + "->" + Condicion + ";\n"
        this.contador++
        //OPERAMOS LA CONDICION
        this.graficarOperacion(_instruccion.expresion, Condicion)
        //LLAMAMOS AL CUERPO
        var nombreHijo = `Nodo${this.contador}`
        this.contador++
        this.grafo += nombreHijo + '[label="CUERPO_WHILE"];\n'
        this.grafo += _padre + "->" + nombreHijo + ';\n'
        this.recorrerAST(nombreHijo, _instruccion.instrucciones)
    }

    graficarPrint(_instruccion, _padre) {
        this.graficarOperacion(_instruccion.expresion, _padre)
    }

    graficarFuncion(_instruccion, _padre) {

        var tipoVar = `Nodo${this.contador}`
        this.grafo += tipoVar + `[label="TIPO \\n ${_instruccion.tipoFuncion}"];\n`
        this.grafo += _padre + "->" + tipoVar + ";\n"
        this.contador++

        var nombreMet = `Nodo${this.contador}`
        this.grafo += nombreMet + `[label="Identificador \\n ${_instruccion.nombre}"];\n`
        this.grafo += _padre + "->" + nombreMet + ";\n"
        this.contador++
        if (_instruccion.lista_parametros != null) {
            var nombreLista = `Nodo${this.contador}`
            this.grafo += nombreLista + `[label="LISTAPARAMETROS"];\n`
            this.grafo += _padre + "->" + nombreLista + ";\n"
            this.contador++
            for (let i = 0; i < _instruccion.lista_parametros.length; i++) {
                var nombreHijo = `Nodo${this.contador}`
                this.contador++
                this.grafo += nombreHijo + '[label="PARAMETRO"];\n'
                this.grafo += nombreLista + "->" + nombreHijo + ';\n'
                this.graficarParametro(_instruccion.lista_parametros[i], nombreHijo)
            }
        }
        var nombreHijo = `Nodo${this.contador}`
        this.contador++
        this.grafo += nombreHijo + '[label="CUERPO_FUNCION"];\n'
        this.grafo += _padre + "->" + nombreHijo + ';\n'
        this.recorrerAST(nombreHijo, _instruccion.instrucciones)
    }

    graficarMetodo(_instruccion, _padre) {
        var nombreMet = `Nodo${this.contador}`
        this.grafo += nombreMet + `[label="Identificador \\n ${_instruccion.nombre}"];\n`
        this.grafo += _padre + "->" + nombreMet + ";\n"
        this.contador++
        if (_instruccion.lista_parametros != null) {
            var nombreLista = `Nodo${this.contador}`
            this.grafo += nombreLista + `[label="LISTAPARAMETROS"];\n`
            this.grafo += _padre + "->" + nombreLista + ";\n"
            this.contador++
            for (let i = 0; i < _instruccion.lista_parametros.length; i++) {
                var nombreHijo = `Nodo${this.contador}`
                this.contador++
                this.grafo += nombreHijo + '[label="PARAMETRO"];\n'
                this.grafo += nombreLista + "->" + nombreHijo + ';\n'
                this.graficarParametro(_instruccion.lista_parametros[i], nombreHijo)
            }
        }
        var nombreHijo = `Nodo${this.contador}`
        this.contador++
        this.grafo += nombreHijo + '[label="CUERPO_METODO"];\n'
        this.grafo += _padre + "->" + nombreHijo + ';\n'
        this.recorrerAST(nombreHijo, _instruccion.instrucciones)
    }

    graficarParametro(_instruccion, _padre) {
        var tipoVar = `Nodo${this.contador}`
        this.grafo += tipoVar + `[label="TIPO \\n ${_instruccion.tipo_dato}"];\n`
        this.grafo += _padre + "->" + tipoVar + ";\n"
        this.contador++
        var nombreVar = `Nodo${this.contador}`
        this.grafo += nombreVar + `[label="identificador \\n ${_instruccion.id}"];\n`
        this.grafo += _padre + "->" + nombreVar + ";\n"
        this.contador++
    }

    graficarExec(_instruccion, _padre) {
        var nombreMet = `Nodo${this.contador}`
        this.grafo += nombreMet + `[label="METODO/FUNCION \\n ${_instruccion.nombre}"];\n`
        this.grafo += _padre + "->" + nombreMet + ";\n"
        this.contador++
        if (_instruccion.lista_valores != null) {
            var nombreLista = `Nodo${this.contador}`
            this.grafo += nombreLista + `[label="LISTA_VALORES"];\n`
            this.grafo += _padre + "->" + nombreLista + ";\n"
            this.contador++
            for (let i = 0; i < _instruccion.lista_valores.length; i++) {
                this.graficarOperacion(_instruccion.lista_valores[i], nombreLista)
            }
        }
    }

    graficarDeclaracion(_instruccion, _padre) {
        var tipoVar = `Nodo${this.contador}`
        this.grafo += tipoVar + `[label="TIPO \\n ${_instruccion.tipo_dato}"];\n`
        this.grafo += _padre + "->" + tipoVar + ";\n"
        this.contador++
        var nombreVar = `Nodo${this.contador}`
        this.grafo += nombreVar + `[label="Identificador \\n ${_instruccion.id}"];\n`
        this.grafo += _padre + "->" + nombreVar + ";\n"
        this.contador++
        if (_instruccion.valor != null) {
            this.graficarOperacion(_instruccion.valor, _padre)
        }
    }

    graficarAsignacion(_instruccion, _padre) {
        var nombreVar = `Nodo${this.contador}`
        this.grafo += nombreVar + `[label="Identificador \\n ${_instruccion.id}"];\n`
        this.grafo += _padre + "->" + nombreVar + ";\n"
        this.contador++
        if (_instruccion.expresion != null) {
            this.graficarOperacion(_instruccion.expresion, _padre)
        }
    }

    graficarOperacion(_expresion, _padre) {
        if (_expresion.tipo === TIPO_VALOR.DECIMAL || _expresion.tipo === TIPO_VALOR.DOUBLE || _expresion.tipo === TIPO_VALOR.CADENA ||
            _expresion.tipo === TIPO_VALOR.BANDERA || _expresion.tipo === TIPO_VALOR.CARACTER) {
            var exp = _expresion.valor.toString()
            exp = exp.split("\"").join("")
            var value = `Nodo${this.contador}`
            this.grafo += value + `[label="${_expresion.tipo} \\n ${exp}"];\n`
            this.grafo += _padre + '->' + value + ";\n"
            this.contador++
        }
        else if (_expresion.tipo === TIPO_VALOR.IDENTIFICADOR) {
            var exp = _expresion.valor.toString()
            exp = exp.split("\"").join("")
            var value = `Nodo${this.contador}`
            this.grafo += value + `[label="${_expresion.tipo} \\n ${exp}"];\n`
            this.grafo += _padre + '->' + value + ";\n"
            this.contador++
        }
        else if (_expresion.tipo === TIPO_OPERACION.LLAMADA) {
            //PADRE
            var nombreHijo = "Nodo" + this.contador
            this.contador++
            this.grafo += nombreHijo + '[label="FUNCION"];\n'
            this.grafo += _padre + "->" + nombreHijo + ';\n'
            //NOMBRE
            var nombreMet = `Nodo${this.contador}`
            this.grafo += nombreMet + `[label="Identificador \\n ${_expresion.opIzq}"];\n`
            this.grafo += nombreHijo + "->" + nombreMet + ";\n"
            this.contador++
            //SI HAY PARAMETROS
            if (_expresion.opDer != null) {
                var nombreLista = `Nodo${this.contador}`
                this.grafo += nombreLista + `[label="LISTAVALORES"];\n`
                this.grafo += nombreHijo + "->" + nombreLista + ";\n"
                this.contador++
                for (let i = 0; i < _expresion.opDer.length; i++) {
                    this.graficarOperacion(_expresion.opDer[i], nombreLista)
                }
            }
        }
        else if (_expresion.tipo === TIPO_OPERACION.CAST) {
            //PADRE
            var nombreHijo = "Nodo" + this.contador
            this.contador++
            this.grafo += nombreHijo + '[label="CASTEO"];\n'
            this.grafo += _padre + "->" + nombreHijo + ';\n'
            //EL TIPO
            var tipoVar = `Nodo${this.contador}`
            this.grafo += tipoVar + `[label="TIPO \\n ${_expresion.opIzq}"];\n`
            this.grafo += nombreHijo + "->" + tipoVar + ";\n"
            this.contador++
            //LA EXPRESION
            this.graficarOperacion(_expresion.opDer, nombreHijo)

        }
        else if (_expresion.tipo === TIPO_OPERACION.SUMA || _expresion.tipo === TIPO_OPERACION.RESTA || _expresion.tipo === TIPO_OPERACION.MULT ||
            _expresion.tipo === TIPO_OPERACION.DIV || _expresion.tipo === TIPO_OPERACION.MOD || _expresion.tipo === TIPO_OPERACION.EXP ||
            _expresion.tipo === TIPO_OPERACION.IGUALIGUAL || _expresion.tipo === TIPO_OPERACION.DIFERENTE || _expresion.tipo === TIPO_OPERACION.MENOR ||
            _expresion.tipo === TIPO_OPERACION.MENORIGUAL || _expresion.tipo === TIPO_OPERACION.MAYOR || _expresion.tipo === TIPO_OPERACION.MAYORIGUAL ||
            _expresion.tipo === TIPO_OPERACION.AND || _expresion.tipo === TIPO_OPERACION.OR) {
            var value = `Nodo${this.contador}`
            this.grafo += value + `[label=" ${_expresion.tipo} \\n ${this.getSimbolo(_expresion.tipo)}"];\n`
            this.grafo += _padre + "->" + value + ";\n"
            this.contador++
            this.graficarOperacion(_expresion.opIzq, value)
            this.graficarOperacion(_expresion.opDer, value)
        }
    }

    getSimbolo(_tipo) {
        switch (_tipo) {
            case TIPO_OPERACION.SUMA:
                return "+"
            case TIPO_OPERACION.RESTA:
                return "-"
            case TIPO_OPERACION.MULT:
                return "*"
            case TIPO_OPERACION.DIV:
                return "/"
            case TIPO_OPERACION.MOD:
                return "%"
            case TIPO_OPERACION.EXP:
                return "^"
            case TIPO_OPERACION.IGUALIGUAL:
                return "=="
            case TIPO_OPERACION.DIFERENTE:
                return "!="
            case TIPO_OPERACION.MENOR:
                return "<"
            case TIPO_OPERACION.MENORIGUAL:
                return "<="
            case TIPO_OPERACION.MAYOR:
                return ">"
            case TIPO_OPERACION.MAYORIGUAL:
                return "=>"
            case TIPO_OPERACION.AND:
                return "&&"
            case TIPO_OPERACION.OR:
                return "||"
        }
    }

}

module.exports = Graficador