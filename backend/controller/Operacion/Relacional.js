const TIPO_DATO = require("../Enums/TipoDato");
const TIPO_OPERACION = require("../Enums/TipoOperacion");
const TIPO_VALOR = require("../Enums/TipoValor");
const Aritmetica = require("./Aritmetica");
const ValorExpresion = require("./ValorExpresion");
const TipoResultado = require("./TipoResultado");
const OpLlamada = require("./OpLlamada");
const ListaErrores = require("../Enums/ListaErrores");

function Relacional(_expresion, _ambito){
    if(_expresion.tipo === TIPO_VALOR.DECIMAL || _expresion.tipo === TIPO_VALOR.BANDERA ||
        _expresion.tipo === TIPO_VALOR.CADENA || _expresion.tipo === TIPO_VALOR.IDENTIFICADOR ||
        _expresion.tipo === TIPO_VALOR.CARACTER || _expresion.tipo === TIPO_VALOR.DOUBLE){
        return ValorExpresion(_expresion, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.SUMA || _expresion.tipo === TIPO_OPERACION.RESTA ||
        _expresion.tipo === TIPO_OPERACION.MULT || _expresion.tipo === TIPO_OPERACION.DIV ||
        _expresion.tipo === TIPO_OPERACION.EXP || _expresion.tipo === TIPO_OPERACION.MOD ||
        _expresion.tipo === TIPO_OPERACION.MEN || _expresion.tipo === TIPO_OPERACION.MASMAS ||
        _expresion.tipo === TIPO_OPERACION.MENOSMENOS){
        return Aritmetica(_expresion, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.LLAMADA){// 2+6+7+2+9+10
        return OpLlamada(_expresion, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.CAST){
        const Castear = require("./Casteo")
        return Castear(_expresion, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.IGUALIGUAL){
        return igualigual(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.DIFERENTE){
        return diferente(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.MENOR){
        return menor(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.MENORIGUAL){
        return menorigual(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.MAYOR){
        return mayor(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.MAYORIGUAL){
        return mayorigual(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    //a+5<6*8
}

function igualigual(_opIzq, _opDer, _ambito){
    const opIzq = Relacional(_opIzq, _ambito)
    const opDer = Relacional(_opDer, _ambito)
    var mensaje = ""
    mensaje += opIzq.mensaje
    mensaje += opDer.mensaje
    if(opIzq.tipo == opDer.tipo){ //1==1 true==false ...
        var resultado = false
        if(opIzq.valor == opDer.valor){
            resultado = true
        }
        return {
            valor: resultado,
            tipo: TIPO_DATO.BANDERA,
            mensaje: mensaje,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
    var respuesta = (opIzq.tipo===null ? opIzq.valor: "")+(opDer.tipo===null ? opDer.valor: "") //true+5+10+5
    var err = {
        TipoError: "Semántico",
        Descripcion: `No se puede comparar el valor de tipo ${opIzq.tipo} con el valor de tipo ${opDer.tipo}`,
        Linea: _opIzq.linea,
        Columna: _opIzq.columna
    }
    ListaErrores.push(err)
    return{
        valor: respuesta+ `\nError semántico: no se puede comparar el valor de tipo ${opIzq.tipo} \ncon el valor de tipo ${opDer.tipo}... Linea: +${_opIzq.linea}+" Columna: "+${_opIzq.columna}`,
        tipo: null,
        mensaje: mensaje,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}
function diferente(_opIzq, _opDer, _ambito){
    const opIzq = Relacional(_opIzq, _ambito)
    const opDer = Relacional(_opDer, _ambito)
    var mensaje = ""
    mensaje += opIzq.mensaje
    mensaje += opDer.mensaje
    if(opIzq.tipo == opDer.tipo){ //1==1 true==false ...
        var resultado = false
        if(opIzq.valor != opDer.valor){
            resultado = true
        }
        return {
            valor: resultado,
            tipo: TIPO_DATO.BANDERA,
            mensaje: mensaje,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    } /*else {
        return {
            valor: false,
            tipo: TIPO_DATO.BANDERA,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }*/
    var respuesta = (opIzq.tipo===null ? opIzq.valor: "")+(opDer.tipo===null ? opDer.valor: "") //true+5+10+5
    var err = {
        TipoError: "Semántico",
        Descripcion: `No se puede comparar el valor de tipo ${opIzq.tipo} con el valor de tipo ${opDer.tipo}`,
        Linea: _opIzq.linea,
        Columna: _opIzq.columna
    }
    ListaErrores.push(err)
    return{
        valor: respuesta+ `\nError semántico: no se puede comparar el valor de tipo ${opIzq.tipo} \ncon el valor de tipo ${opDer.tipo}... Linea: +${_opIzq.linea}+" Columna: "+${_opIzq.columna}`,
        tipo: null,
        mensaje: mensaje,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}
function menor(_opIzq, _opDer, _ambito){
    const opIzq = Relacional(_opIzq, _ambito)
    const opDer = Relacional(_opDer, _ambito)
    const tipoRes = TipoResultado(opIzq.tipo, opDer.tipo)
    var mensaje = ""
    mensaje += opIzq.mensaje
    mensaje += opDer.mensaje
    if((tipoRes === TIPO_DATO.DECIMAL || tipoRes === TIPO_DATO.DOUBLE)||
    (opIzq.tipo === TIPO_DATO.CARACTER && opDer.tipo === TIPO_DATO.CARACTER)){ //1==1 true==false ...
        var resultado = false
        var izq;
        var der;
        if (opIzq.tipo === TIPO_DATO.CARACTER){
            izq = (opIzq.valor.toString()).charCodeAt()
        } else {
            izq = opIzq.valor
        }
        if (opDer.tipo === TIPO_DATO.CARACTER){
            der = (opDer.valor.toString()).charCodeAt()
        } else {
            der = opDer.valor
        }
        if(izq < der){
            resultado = true
        }
        return {
            valor: resultado,
            tipo: TIPO_DATO.BANDERA,
            mensaje: mensaje,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
    var respuesta = (opIzq.tipo===null ? opIzq.valor: "")+(opDer.tipo===null ? opDer.valor: "") //true+5+10+5
    var err = {
        TipoError: "Semántico",
        Descripcion: `No se puede comparar el valor de tipo ${opIzq.tipo} con el valor de tipo ${opDer.tipo}`,
        Linea: _opIzq.linea,
        Columna: _opIzq.columna
    }
    ListaErrores.push(err)
    return{
        valor: respuesta+ `\nError semántico: no se puede comparar el valor de tipo ${opIzq.tipo} \ncon el valor de tipo ${opDer.tipo}... Linea: +${_opIzq.linea}+" Columna: "+${_opIzq.columna}`,
        tipo: null,
        mensaje: mensaje,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}
function menorigual(_opIzq, _opDer, _ambito){
    const opIzq = Relacional(_opIzq, _ambito)
    const opDer = Relacional(_opDer, _ambito)
    const tipoRes = TipoResultado(opIzq.tipo, opDer.tipo)
    var mensaje = ""
    mensaje += opIzq.mensaje
    mensaje += opDer.mensaje
    if((tipoRes === TIPO_DATO.DECIMAL || tipoRes === TIPO_DATO.DOUBLE)||
    (opIzq.tipo === TIPO_DATO.CARACTER && opDer.tipo === TIPO_DATO.CARACTER)){ //1==1 true==false ...
        var resultado = false
        var izq;
        var der;
        if (opIzq.tipo === TIPO_DATO.CARACTER){
            izq = (opIzq.valor.toString()).charCodeAt()
        } else {
            izq = opIzq.valor
        }
        if (opDer.tipo === TIPO_DATO.CARACTER){
            der = (opDer.valor.toString()).charCodeAt()
        } else {
            der = opDer.valor
        }
        if(izq <= der){
            resultado = true
        }
        return {
            valor: resultado,
            tipo: TIPO_DATO.BANDERA,
            mensaje: mensaje,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
    var respuesta = (opIzq.tipo===null ? opIzq.valor: "")+(opDer.tipo===null ? opDer.valor: "") //true+5+10+5
    var err = {
        TipoError: "Semántico",
        Descripcion: `No se puede comparar el valor de tipo ${opIzq.tipo} con el valor de tipo ${opDer.tipo}`,
        Linea: _opIzq.linea,
        Columna: _opIzq.columna
    }
    ListaErrores.push(err)
    return{
        valor: respuesta+ `\nError semántico: no se puede comparar el valor de tipo ${opIzq.tipo} \ncon el valor de tipo ${opDer.tipo}... Linea: +${_opIzq.linea}+" Columna: "+${_opIzq.columna}`,
        tipo: null,
        mensaje: mensaje,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}
function mayor(_opIzq, _opDer, _ambito){
    const opIzq = Relacional(_opIzq, _ambito)
    const opDer = Relacional(_opDer, _ambito)
    const tipoRes = TipoResultado(opIzq.tipo, opDer.tipo)
    var mensaje = ""
    mensaje += opIzq.mensaje
    mensaje += opDer.mensaje
    if((tipoRes === TIPO_DATO.DECIMAL || tipoRes === TIPO_DATO.DOUBLE)||
    (opIzq.tipo === TIPO_DATO.CARACTER && opDer.tipo === TIPO_DATO.CARACTER)){ //1==1 true==false ...
        var resultado = false
        var izq;
        var der;
        if (opIzq.tipo === TIPO_DATO.CARACTER){
            izq = (opIzq.valor.toString()).charCodeAt()
        } else {
            izq = opIzq.valor
        }
        if (opDer.tipo === TIPO_DATO.CARACTER){
            der = (opDer.valor.toString()).charCodeAt()
        } else {
            der = opDer.valor
        }
        if(izq > der){
            resultado = true
        }
        return {
            valor: resultado,
            tipo: TIPO_DATO.BANDERA,
            mensaje: mensaje,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
    var respuesta = (opIzq.tipo===null ? opIzq.valor: "")+(opDer.tipo===null ? opDer.valor: "") //true+5+10+5
    var err = {
        TipoError: "Semántico",
        Descripcion: `No se puede comparar el valor de tipo ${opIzq.tipo} con el valor de tipo ${opDer.tipo}`,
        Linea: _opIzq.linea,
        Columna: _opIzq.columna
    }
    ListaErrores.push(err)
    return{
        valor: respuesta+ `\nError semántico: no se puede comparar el valor de tipo ${opIzq.tipo} \ncon el valor de tipo ${opDer.tipo}... Linea: +${_opIzq.linea}+" Columna: "+${_opIzq.columna}`,
        tipo: null,
        mensaje: mensaje,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}
function mayorigual(_opIzq, _opDer, _ambito){
    const opIzq = Relacional(_opIzq, _ambito)
    const opDer = Relacional(_opDer, _ambito)
    const tipoRes = TipoResultado(opIzq.tipo, opDer.tipo)
    var mensaje = ""
    mensaje += opIzq.mensaje
    mensaje += opDer.mensaje
    if((tipoRes === TIPO_DATO.DECIMAL || tipoRes === TIPO_DATO.DOUBLE)||
    (opIzq.tipo === TIPO_DATO.CARACTER && opDer.tipo === TIPO_DATO.CARACTER)){ //1==1 true==false ...
        var resultado = false
        var izq;
        var der;
        if (opIzq.tipo === TIPO_DATO.CARACTER){
            izq = (opIzq.valor.toString()).charCodeAt()
        } else {
            izq = opIzq.valor
        }
        if (opDer.tipo === TIPO_DATO.CARACTER){
            der = (opDer.valor.toString()).charCodeAt()
        } else {
            der = opDer.valor
        }
        if(izq >= der){
            resultado = true
        }
        return {
            valor: resultado,
            tipo: TIPO_DATO.BANDERA,
            mensaje: mensaje,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
    var respuesta = (opIzq.tipo===null ? opIzq.valor: "")+(opDer.tipo===null ? opDer.valor: "") //true+5+10+5
    var err = {
        TipoError: "Semántico",
        Descripcion: `No se puede comparar el valor de tipo ${opIzq.tipo} con el valor de tipo ${opDer.tipo}`,
        Linea: _opIzq.linea,
        Columna: _opIzq.columna
    }
    ListaErrores.push(err)
    return{
        valor: respuesta+ `\nError semántico: no se puede comparar el valor de tipo ${opIzq.tipo} \ncon el valor de tipo ${opDer.tipo}... Linea: +${_opIzq.linea}+" Columna: "+${_opIzq.columna}`,
        tipo: null,
        mensaje: mensaje,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

module.exports = Relacional