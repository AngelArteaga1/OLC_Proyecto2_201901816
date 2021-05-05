const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion");
const Asignacion = require("./Asignacion");
const Cout = require("./Cout");
const Declaracion = require("./Declaracion");
const CicloWhile = require("./While");
const CicloDoWhile = require("./DoWhile");
const CicloFor = require("./For");
const sentenciaIf = require("./If");
const sentenciaIfElse = require("./IfElse");
const Return = require("./Return");

function Bloque(_instrucciones, _ambito){
    var cadena = ""
    var existeBreak = false;
    var existeContinue = false;
    var existeReturn = false;
    var valor = null
    _instrucciones.forEach(instruccion => {
        if(existeBreak || existeContinue || existeReturn){
            return {
                existeBreak: existeBreak,
                existeContinue: existeContinue,
                existeReturn: existeReturn,
                valor: valor,
                cadena: cadena
            }
        }
        if(instruccion.tipo === TIPO_INSTRUCCION.COUT){
            cadena+=Cout(instruccion, _ambito)+'\n'
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.DECLARACION){
            var mensaje = Declaracion(instruccion, _ambito)
            if(mensaje!=null){
                cadena+=mensaje+'\n'
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.ASIGNACION){
            var mensaje = Asignacion(instruccion, _ambito)
            if(mensaje!=null){
                cadena+=mensaje+'\n'
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.WHILE){
            var mensaje = CicloWhile(instruccion, _ambito)
            existeBreak = false
            existeContinue = false
            if(mensaje!=null){
                cadena+=mensaje
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.IF){
            var exec = sentenciaIf(instruccion, _ambito)
            var mensaje = exec.cadena
            existeBreak = exec.existeBreak
            existeContinue = exec.existeContinue
            existeReturn = exec.existeReturn
            valor = exec.valor
            if(mensaje!=null){
                cadena+=mensaje
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.IF_ELSE){
            var exec = sentenciaIfElse(instruccion, _ambito)
            var mensaje = exec.cadena
            existeBreak = exec.existeBreak
            existeReturn = exec.existeReturn
            valor = exec.valor
            existeContinue = exec.existeContinue
            if(mensaje!=null){
                cadena+=mensaje
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.DOWHILE){
            var mensaje = CicloDoWhile(instruccion, _ambito)
            existeBreak = false
            existeContinue = false
            if(mensaje!=null){
                cadena+=mensaje
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.FOR){
            var mensaje = CicloFor(instruccion, _ambito)
            existeBreak = false
            existeContinue = false
            if(mensaje!=null){
                cadena+=mensaje
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.LLAMADA){
            const Exec = require("./Exec");
            var mensaje = Exec(instruccion, _ambito)
            if(mensaje!=null){
                cadena+=mensaje
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.BREAK){
            existeBreak = true;
            return {
                existeBreak: existeBreak,
                existeContinue: existeContinue,
                existeReturn: existeReturn,
                valor: valor,
                cadena: cadena
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.CONTINUE){
            existeContinue = true;
            return {
                existeBreak: existeBreak,
                existeContinue: existeContinue,
                existeReturn: existeReturn,
                valor: valor,
                cadena: cadena
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.RETURN){
            existeReturn = true;
            //OBTENEMOS EL VALOR
            valor = Return(instruccion, _ambito);
            return {
                existeBreak: existeBreak,
                existeContinue: existeContinue,
                existeReturn: existeReturn,
                valor: valor,
                cadena: cadena
            }
        }
    });
    return {
        existeBreak: existeBreak,
        existeContinue: existeContinue,
        existeReturn: existeReturn,
        valor: valor,
        cadena: cadena
    }
}

module.exports = Bloque