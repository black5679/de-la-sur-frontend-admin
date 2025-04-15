import { ColorModel } from "../../models/color.model";

export interface IInsertColorRequest{
    nombre: string,
    codigoHex: string
}

export class InsertColorRequest implements IInsertColorRequest{
    nombre: string;
    codigoHex: string;
    constructor(color: ColorModel){
        this.nombre = color.nombre;
        this.codigoHex = color.codigoHex;
    }
}