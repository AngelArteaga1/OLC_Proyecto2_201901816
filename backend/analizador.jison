
/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex

%options case-insensitive

%%

\s+                       /* skip whitespace */
//"\/\/".*                                /* IGNORE */
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]       /* IGNORE */
"//".*                                /* IGNORE */

[0-9]+("."[0-9]+)\b  return 'NUMBER'
[0-9]+               return 'entero'

//TIPOS DE DATOS
"clase"              return 'clase'
"int"                return 'int'
"double"             return 'double'
"boolean"            return 'boolean'
"char"               return 'char'
"string"             return 'string'

//PALABRAS RESERVADAS
"exec"                return 'exec'
"void"                return 'void'
"print"               return 'print'
"new"                 return 'new'
"list"                return 'list'
"add"                 return 'add'
"if"                  return 'if'
"else"                return 'else'
"switch"              return 'switch'
"case"                return 'case'
"break"               return 'break'
"continue"            return 'continue'
"default"             return 'default'
"while"               return 'while'
"for"                 return 'for'
"do"                  return 'do'
"return"              return 'return'
"true"                return 'true'
"false"               return 'false'

"=="                  return 'igualigual'
"="                   return 'igual'
"||"                  return 'or'
"&&"                  return 'and'
"!="                  return 'diferente'
"!"                   return 'not'
"<="                  return 'menorigual'
">="                  return 'mayorigual'
">"                   return 'mayor'
"<"                   return 'menor'
","                   return 'coma'
"."                   return 'punto'
";"                   return 'ptcoma'
":"                   return 'dospts'
"{"                   return 'llaveA'
"}"                   return 'llaveC'
"*"                   return 'multi'
"/"                   return 'div'
"--"                  return 'menosmenos'
"-"                   return 'menos'
"++"                  return 'sumasuma'
"+"                   return 'suma'
"^"                   return 'exponente'
"!"                   return 'not'
"?"                   return 'what'
"%"                   return 'modulo'
"("                   return 'parA'
")"                   return 'parC'
"["                   return 'corA'
"]"                   return 'corC'
"PI"                  return 'PI'
"E"                   return 'E'

//VALORES DEL DATO
([a-zA-Z])([a-zA-Z0-9_])*             return 'identificador'
["\""](("\\\"")?([^"\""]))*["\""]     return 'cadena'
["'"](("\\'")?([^"'"]))*["'"]         return 'caracter'

<<EOF>>               return 'EOF'
.					{ 
      var err = {
            TipoError: "Léxico",
            Descripcion: "El simbolo '" + yytext  + "' no se ha reconocido",
            Linea: yylloc.first_line,
            Columna: yylloc.first_column
      }
      ListaErrores.push(err)
}

/lex
%{
      const ListaErrores	= require('./controller/Enums/ListaErrores');
	const TIPO_OPERACION	= require('./controller/Enums/TipoOperacion');
	const TIPO_VALOR 		= require('./controller/Enums/TipoValor');
	const TIPO_DATO	      = require('./controller/Enums/TipoDato'); //para jalar el tipo de dato
	const INSTRUCCION	      = require('./controller/Instruccion/Instruccion');
%}

/* operator associations and precedence */

%left 'or'
%left 'and'
%right 'not' 'menosmenos' 'sumasuma'
%left 'igualigual' 'diferente' 'menor' 'menorigual' 'mayor' 'mayorigual'
%left 'suma' 'menos' 'dospts'
%left 'multi' 'div' 'modulo' 'what'
%left 'exponente'

%left umenos

%start INICIO

%% /* language grammar */


INICIO: OPCIONESCUERPO EOF {return $1;}
;

OPCIONESCUERPO: OPCIONESCUERPO CUERPO {$1.push($2); $$=$1;}
              | CUERPO {$$=[$1];}
;

CUERPO: DEC_VAR {$$=$1}
      | DEC_VECT
      | DEC_LIST
      | DEC_MET {$$=$1}
      | DEC_FUNC {$$=$1}
      | AS_VAR {$$=$1}
      | EXEC {$$=$1}
      | ITERACION {$$=$1}
      | error ptcoma {
            var err = {
                  TipoError: "Sintactico",
                  Descripcion: "No se esperaba: '" + yytext + "'",
                  Linea: this._$.first_line,
                  Columna: this._$.first_column+1
            }
            ListaErrores.push(err)
      }
;

EXEC: exec identificador parA parC ptcoma {$$ = INSTRUCCION.nuevoExec($2, null,this._$.first_line,this._$.first_column+1)}
    | exec identificador parA LISTAVALORES parC ptcoma {$$ = INSTRUCCION.nuevoExec($2, $4,this._$.first_line,this._$.first_column+1)}
;

DEC_VAR: TIPO identificador ptcoma {$$ = INSTRUCCION.nuevaDeclaracion($2, null, $1, this._$.first_line,this._$.first_column+1)}
       | TIPO identificador igual EXPRESION ptcoma {$$ = INSTRUCCION.nuevaDeclaracion($2, $4, $1, this._$.first_line,this._$.first_column+1)}
;

AS_VAR: identificador igual EXPRESION ptcoma {$$ = INSTRUCCION.nuevaAsignacion($1, $3, this._$.first_line,this._$.first_column+1)}
      | identificador corA EXPRESION corC igual EXPRESION ptcoma
;

DEC_VECT: TIPO corA corC identificador igual new TIPO corA EXPRESION corC ptcoma //LISTA TIPO 1
        | TIPO corA corC identificador igual llaveA LISTAVALORES llaveC ptcoma //LISTA TIPO 2
;

LISTAVALORES: LISTAVALORES coma EXPRESION {$1.push($3); $$=$1;}
            | EXPRESION {$$=[$1];}
;

DEC_LIST: list menor TIPO mayor identificador igual new list menor TIPO mayor ptcoma;

AS_LIST: identificador punto add parA EXPRESION parC ptcoma
      |  identificador corA corA EXPRESION corC corC igual EXPRESION ptcoma 
;

TIPO: int {$$ = TIPO_DATO.DECIMAL}
    | double {$$ = TIPO_DATO.DOUBLE}
    | string {$$ = TIPO_DATO.CADENA}
    | char {$$ = TIPO_DATO.CARACTER}
    | boolean {$$ = TIPO_DATO.BANDERA}
;

EXPRESION: EXPRESION suma EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.SUMA,this._$.first_line,this._$.first_column+1);}
         | EXPRESION menos EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.RESTA,this._$.first_line,this._$.first_column+1);}
         | EXPRESION multi EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MULT,this._$.first_line,this._$.first_column+1);}
         | EXPRESION div EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.DIV,this._$.first_line,this._$.first_column+1);}
         | EXPRESION exponente EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.EXP,this._$.first_line,this._$.first_column+1);}
         | EXPRESION modulo EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MOD,this._$.first_line,this._$.first_column+1);}
         | menos EXPRESION %prec umenos {$$= INSTRUCCION.nuevaOperacionBinaria($2,$2, TIPO_OPERACION.MEN,this._$.first_line,this._$.first_column+1);}
         | parA EXPRESION parC {$$=$2}
         | EXPRESION igualigual EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.IGUALIGUAL,this._$.first_line,this._$.first_column+1);}
         | EXPRESION diferente EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.DIFERENTE,this._$.first_line,this._$.first_column+1);}
         | EXPRESION menor EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MENOR,this._$.first_line,this._$.first_column+1);}
         | EXPRESION menorigual EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MENORIGUAL,this._$.first_line,this._$.first_column+1);}
         | EXPRESION mayor EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MAYOR,this._$.first_line,this._$.first_column+1);}
         | EXPRESION mayorigual EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MAYORIGUAL,this._$.first_line,this._$.first_column+1);}
         | EXPRESION or EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.OR,this._$.first_line,this._$.first_column+1);}
         | EXPRESION and EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.AND,this._$.first_line,this._$.first_column+1);}
         | not EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($2,$2, TIPO_OPERACION.NOT,this._$.first_line,this._$.first_column+1);}
         | parA TIPO parC EXPRESION %prec umenos {$$= INSTRUCCION.nuevaOperacionBinaria($2,$4, TIPO_OPERACION.CAST,this._$.first_line,this._$.first_column+1);}
         | EXPRESION sumasuma {$$= INSTRUCCION.nuevaOperacionBinaria($1,$1, TIPO_OPERACION.MASMAS,this._$.first_line,this._$.first_column+1);}
         | EXPRESION menosmenos {$$= INSTRUCCION.nuevaOperacionBinaria($1,$1, TIPO_OPERACION.MENOSMENOS,this._$.first_line,this._$.first_column+1);}
         | identificador corA EXPRESION corC // para vectores
         | identificador corA corA EXPRESION corC corC // para listas
         | identificador parA  parC {$$= INSTRUCCION.nuevaOperacionBinaria($1,null, TIPO_OPERACION.LLAMADA,this._$.first_line,this._$.first_column+1);} //LLAMADA
         | identificador parA LISTAVALORES parC {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.LLAMADA,this._$.first_line,this._$.first_column+1);} //LLAMADA
         | EXPRESION what EXPRESION dospts EXPRESION //ternario
         | NUMBER {$$ = INSTRUCCION.nuevoValor(Number($1), TIPO_VALOR.DOUBLE, this._$.first_line,this._$.first_column+1)}
         | entero {$$ = INSTRUCCION.nuevoValor(Number($1), TIPO_VALOR.DECIMAL, this._$.first_line,this._$.first_column+1)}
         | true {$$ = INSTRUCCION.nuevoValor(($1), TIPO_VALOR.BANDERA, this._$.first_line,this._$.first_column+1)}
         | false {$$ = INSTRUCCION.nuevoValor($1, TIPO_VALOR.BANDERA, this._$.first_line,this._$.first_column+1)}
         | cadena {$$ = INSTRUCCION.nuevoValor($1, TIPO_VALOR.CADENA, this._$.first_line,this._$.first_column+1)}
         | identificador {$$ = INSTRUCCION.nuevoValor($1, TIPO_VALOR.IDENTIFICADOR, this._$.first_line,this._$.first_column+1)}
         | caracter {$$ = INSTRUCCION.nuevoValor($1, TIPO_VALOR.CARACTER, this._$.first_line,this._$.first_column+1)}
;

PRINT: print parA EXPRESION parC ptcoma {$$ = new INSTRUCCION.nuevoCout($3, this._$.first_line,this._$.first_column+1)}
      | print parA parC ptcoma {$$ = new INSTRUCCION.nuevoCout(
            INSTRUCCION.nuevoValor("", TIPO_VALOR.CADENA, this._$.first_line,this._$.first_column+1), this._$.first_line,this._$.first_column+1)}
;

LLAMADA: identificador parA  parC ptcoma {$$ = INSTRUCCION.nuevaLlamada($1, null, this._$.first_line, this._$.first_column+1)}
       | identificador parA LISTAVALORES parC ptcoma {$$ = INSTRUCCION.nuevaLlamada($1, $3, this._$.first_line, this._$.first_column+1)}
;

DEC_MET : void identificador parA parC llaveA OPCIONESMETODO llaveC {$$ = INSTRUCCION.nuevoMetodo($2, null, $6, this._$.first_line,this._$.first_column+1)}
        | void identificador parA LISTAPARAMETROS parC llaveA OPCIONESMETODO llaveC {$$ = INSTRUCCION.nuevoMetodo($2, $4, $7, this._$.first_line,this._$.first_column+1)}
;

DEC_FUNC : TIPO identificador parA parC llaveA OPCIONESMETODO llaveC {$$ = INSTRUCCION.nuevaFuncion($2, $1, null, $6, this._$.first_line,this._$.first_column+1)}
         | TIPO identificador parA LISTAPARAMETROS parC llaveA OPCIONESMETODO llaveC {$$ = INSTRUCCION.nuevaFuncion($2, $1, $4, $7, this._$.first_line,this._$.first_column+1)}
;

LISTAPARAMETROS: LISTAPARAMETROS coma  PARAMETROS {$1.push($3); $$=$1;}
               | PARAMETROS {$$=[$1];}
;

PARAMETROS: TIPO identificador {$$ = INSTRUCCION.nuevaDeclaracion($2, null, $1, this._$.first_line,this._$.first_column+1)}
;

OPCIONESMETODO: OPCIONESMETODO CUERPOMETODO  {$1.push($2); $$=$1;}
              | CUERPOMETODO {$$=[$1];}
;

CUERPOMETODO: DEC_VAR {$$=$1}
            | DEC_VECT
            | DEC_LIST
            | AS_LIST
            | AS_VAR {$$=$1}
            | IF {$$=$1}
            | SWITCH {$$=$1}
            | WHILE {$$=$1}
            | FOR {$$=$1}
            | DO_WHILE {$$=$1}
            | LLAMADA {$$=$1}
            | PRINT {$$=$1}
            | BREAK {$$=$1}
            | CONTINUE {$$=$1}
            | RETURN {$$=$1}
            | ITERACION {$$=$1}
            | error ptcoma {
                  var err = {
                        TipoError: "Sintactico",
                        Descripcion: "No se esperaba: '" + yytext + "'",
                        Linea: this._$.first_line,
                        Columna: this._$.first_column+1
                  }
                  ListaErrores.push(err)
            }
;

ITERACION: identificador sumasuma ptcoma {$$ = INSTRUCCION.nuevaAsignacion($1, (INSTRUCCION.nuevaOperacionBinaria(($$ = INSTRUCCION.nuevoValor($1, TIPO_VALOR.IDENTIFICADOR, this._$.first_line,this._$.first_column+1)),(INSTRUCCION.nuevoValor(Number(1), TIPO_VALOR.DECIMAL, this._$.first_line,this._$.first_column+1)), TIPO_OPERACION.SUMA,this._$.first_line,this._$.first_column+1)),this._$.first_line,this._$.first_column+1)}
         | identificador menosmenos ptcoma {$$ = INSTRUCCION.nuevaAsignacion($1, (INSTRUCCION.nuevaOperacionBinaria(($$ = INSTRUCCION.nuevoValor($1, TIPO_VALOR.IDENTIFICADOR, this._$.first_line,this._$.first_column+1)),(INSTRUCCION.nuevoValor(Number(1), TIPO_VALOR.DECIMAL, this._$.first_line,this._$.first_column+1)), TIPO_OPERACION.RESTA,this._$.first_line,this._$.first_column+1)),this._$.first_line,this._$.first_column+1)}
;

IF: if parA EXPRESION parC llaveA OPCIONESMETODO llaveC {$$ = INSTRUCCION.nuevoIf($3, $6, this._$.first_line,this._$.first_column+1)}
  | if parA EXPRESION parC llaveA OPCIONESMETODO llaveC else llaveA OPCIONESMETODO llaveC {$$ = INSTRUCCION.nuevoIfElse($3, $6, $10, this._$.first_line,this._$.first_column+1)}
  | if parA EXPRESION parC llaveA OPCIONESMETODO llaveC ELSEIF {$$ = INSTRUCCION.nuevoIfElseIf($3, $6, $8, null, this._$.first_line,this._$.first_column+1)}
  | if parA EXPRESION parC llaveA OPCIONESMETODO llaveC ELSEIF else llaveA OPCIONESMETODO llaveC {$$ = INSTRUCCION.nuevoIfElseIf($3, $6, $8, $11, this._$.first_line,this._$.first_column+1)}
;

ELSEIF: ELSEIF CONEIF {$1.push($2); $$=$1;}
      | CONEIF {$$=[$1];}
;

CONEIF: else if parA EXPRESION parC llaveA OPCIONESMETODO llaveC {$$ = INSTRUCCION.nuevoElseIf($4, $7, this._$.first_line,this._$.first_column+1)}
;

SWITCH: switch parA EXPRESION parC llaveA LISTACASOS llaveC {$$ = INSTRUCCION.nuevoSwitch($3, $6, null, this._$.first_line,this._$.first_column+1)}
      | switch parA EXPRESION parC llaveA LISTACASOS default dospts OPCIONESMETODO llaveC {$$ = INSTRUCCION.nuevoSwitch($3, $6, $9, this._$.first_line,this._$.first_column+1)}
;

LISTACASOS: LISTACASOS CASO {$1.push($2); $$=$1;}
            | CASO {$$=[$1];}
;

CASO: case EXPRESION dospts OPCIONESMETODO {$$ = INSTRUCCION.nuevoCaso($2, $4, this._$.first_line,this._$.first_column+1)}
;

BREAK: break ptcoma {$$ = new INSTRUCCION.nuevoBreak(this._$.first_line,this._$.first_column+1)}
;

CONTINUE: continue ptcoma {$$ = new INSTRUCCION.nuevoContinue(this._$.first_line,this._$.first_column+1)}
;

RETURN: return EXPRESION ptcoma {$$ = new INSTRUCCION.nuevoReturn($2, this._$.first_line,this._$.first_column+1)}
      | return ptcoma {$$ = new INSTRUCCION.nuevoReturn(null, this._$.first_line,this._$.first_column+1)}
;

WHILE: while parA EXPRESION parC llaveA OPCIONESMETODO llaveC {$$ = new INSTRUCCION.nuevoWhile($3, $6 , this._$.first_line,this._$.first_column+1)}
;

FOR: for parA AS_DEC ptcoma EXPRESION ptcoma AS_DEC parC llaveA OPCIONESMETODO llaveC {$$ = new INSTRUCCION.nuevoFor($3, $5, $7, $10, this._$.first_line,this._$.first_column+1)}
;

AS_DEC: TIPO identificador igual EXPRESION {$$ = INSTRUCCION.nuevaDeclaracion($2, $4, $1, this._$.first_line,this._$.first_column+1)}
      | identificador igual EXPRESION {$$ = INSTRUCCION.nuevaAsignacion($1, $3, this._$.first_line,this._$.first_column+1)}
      | identificador sumasuma {$$ = INSTRUCCION.nuevaAsignacion($1, (INSTRUCCION.nuevaOperacionBinaria(($$ = INSTRUCCION.nuevoValor($1, TIPO_VALOR.IDENTIFICADOR, this._$.first_line,this._$.first_column+1)),(INSTRUCCION.nuevoValor(Number(1), TIPO_VALOR.DECIMAL, this._$.first_line,this._$.first_column+1)), TIPO_OPERACION.SUMA,this._$.first_line,this._$.first_column+1)),this._$.first_line,this._$.first_column+1)}
      | identificador menosmenos {$$ = INSTRUCCION.nuevaAsignacion($1, (INSTRUCCION.nuevaOperacionBinaria(($$ = INSTRUCCION.nuevoValor($1, TIPO_VALOR.IDENTIFICADOR, this._$.first_line,this._$.first_column+1)),(INSTRUCCION.nuevoValor(Number(1), TIPO_VALOR.DECIMAL, this._$.first_line,this._$.first_column+1)), TIPO_OPERACION.RESTA,this._$.first_line,this._$.first_column+1)),this._$.first_line,this._$.first_column+1)}
;

DO_WHILE: do llaveA OPCIONESMETODO llaveC while parA EXPRESION parC ptcoma {$$ = new INSTRUCCION.nuevoDoWhile($7, $3 , this._$.first_line,this._$.first_column+1)}
;
