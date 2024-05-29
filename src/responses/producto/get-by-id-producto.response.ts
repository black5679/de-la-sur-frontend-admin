export interface IGetByIdProductoResponse{
    idProducto?: number,
    nombre: string,
    descripcion?: string,
    idCategoriaProducto?: number,
    espacios: IGetByIdEspacioProductoResponse[]
}

export class GetByIdProductoResponse implements IGetByIdProductoResponse{
    idProducto?: number;
    nombre: string;
    descripcion?: string;
    idCategoriaProducto?: number;
    espacios: IGetByIdEspacioProductoResponse[];
    constructor(){
        this.nombre = "";
        this.descripcion = "";
        this.espacios = [];
    }
}

export interface IGetByIdEspacioProductoResponse{
    idTipoEspacio: number,
    tipoEspacio: string,
    materiasPrimas: IGetByIdMateriaPrimaEspacioProductoResponse[]
}

export class GetByIdEspacioProductoResponse implements IGetByIdEspacioProductoResponse{
    idTipoEspacio: number;
    tipoEspacio: string;
    materiasPrimas: IGetByIdMateriaPrimaEspacioProductoResponse[];
    constructor(){
        this.idTipoEspacio = 0;
        this.tipoEspacio = "";
        this.materiasPrimas = [];
    }
}

export interface IGetByIdMateriaPrimaEspacioProductoResponse{
    idMateriaPrima: number,
    materiaPrima: string,
    codigoHex: string,
    selected: boolean
}