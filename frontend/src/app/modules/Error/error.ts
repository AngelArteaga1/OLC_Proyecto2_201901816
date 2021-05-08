export class Error {

    TipoError: string;
    Descripcion: string;
    Linea: number;
    Columna: number;


    constructor(_TipoError: string, _Descripcion: string, _Linea: number, _Columna: number){
        this.TipoError = _TipoError
        this.Descripcion = _Descripcion
        this.Linea = _Linea
        this.Columna = _Columna
    }

}
