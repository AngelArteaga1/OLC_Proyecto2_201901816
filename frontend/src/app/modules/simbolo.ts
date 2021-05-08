export class Simbolo {

    Identificador: string;
    TipoVar: string;
    Tipo: string;
    Entorno: string;
    Linea: number;
    Columna: number;


    constructor(_Identificador: string, _TipoVar: string, _Tipo: string, _Entorno: string, _Linea: number, _Columna: number){
        this.Identificador = _Identificador
        this.TipoVar = _TipoVar
        this.Tipo = _Tipo
        this.Entorno = _Entorno
        this.Linea = _Linea
        this.Columna = _Columna
    }
}
