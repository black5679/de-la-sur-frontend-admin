export interface IGetByIdProductoResponse{
    idProducto?: number,
    nombre: string,
    descripcion?: string,
    idCategoriaProducto?: number
}

export class GetByIdProductoResponse implements IGetByIdProductoResponse{
    idProducto?: number;
    nombre: string;
    descripcion?: string;
    idCategoriaProducto?: number;
    constructor(){
        this.nombre = "";
        this.descripcion = "";
    }
}