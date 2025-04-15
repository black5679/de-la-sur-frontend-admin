import { ColorModel } from "../../models/color.model";

export interface IUpdateColorRequest{
    idColor: number
    nombre: string,
    codigoHex: string
}

export class UpdateColorRequest implements IUpdateColorRequest{
    idColor: number
    nombre: string;
    codigoHex: string;
    constructor(color: ColorModel){
        this.idColor = color.idColor;
        this.nombre = color.nombre;
        this.codigoHex = color.codigoHex;
    }
}