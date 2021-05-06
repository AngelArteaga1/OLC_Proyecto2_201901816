const Ambito = require("../controller/Ambito/Ambito")
const Global = require("../controller/Instruccion/Global")
const Graficador = require("../controller/AST/Graficador")
const ListaSimbolos = require("../controller/Enums/ListaSimbolos")
const ListaErrores = require("../controller/Enums/ListaErrores")
var fs = require('fs')

module.exports = (parser, app) => {
    app.post('/analizar', (req, res) => {
        //Reseteamos las listas
        while(ListaSimbolos.length > 0) {
            ListaSimbolos.pop();
        }
        while(ListaErrores.length > 0) {
            ListaErrores.pop();
        }
        //ya leemos
        var prueba = req.body.prueba
        var ast = parser.parse(prueba)
        var raiz = {
            tipo: "RAIZ",
            lista_instrucciones: ast
        }
        var ast = parser.parse(prueba)
        const AmbitoGlobal = new Ambito(null, "Global")
        //var cadena = Bloque(ast, AmbitoGlobal)
        var cadena = Global(ast, AmbitoGlobal)
        var grafica = new Graficador(ast)
        var dot = grafica.graficar()
        var resultado = {
            arbol: ast,
            consola: cadena //cadena
        }
        //GENERAMOS EL ARCHIVO DOT
        fs.writeFile("./controller/ReporteAST/AST.dot", dot, function (error) {
            if (error) {
                console.log(error);
            }
        })
        res.send(resultado)
    })

    app.get('/', (req, res) => {
        var respuesta = {
            message: "Todo bien"
        }
        res.send(respuesta)
    })
}