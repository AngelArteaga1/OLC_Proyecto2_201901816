const Ambito = require("../controller/Ambito/Ambito")
//const Bloque = require("../controller/Instruccion/Bloque")
const Global = require("../controller/Instruccion/Global")
const Graficador = require("../controller/AST/Graficador")
var fs = require('fs')

module.exports=(parser, app)=>{
    app.post('/analizar',(req,res)=>{
        var prueba = req.body.prueba
        //try {
            var ast = parser.parse(prueba)
            var raiz = {
                tipo: "RAIZ",
                lista_instrucciones: ast
            }
            var ast = parser.parse(prueba)
            const AmbitoGlobal = new Ambito(null)
            //var cadena = Bloque(ast, AmbitoGlobal)
            var cadena  = Global(ast, AmbitoGlobal)
            var grafica = new Graficador(ast)
            var dot = grafica.graficar()
            var resultado = {
                arbol: ast,
                consola: cadena //cadena
            }
            //GENERAMOS EL ARCHIVO DOT
            fs.writeFile("./controller/ReporteAST/AST.dot", dot, function(error){
                if(error){
                    console.log(error);
                }
            })
            res.send(resultado)
        //} catch (error) {
            //res.send(error)
        //}
    })

    app.get('/',(req,res)=>{
        var respuesta={
            message:"Todo bien"
        }
        res.send(respuesta)
    })
}