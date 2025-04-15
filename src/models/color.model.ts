export interface IColorModel{
    idColor: number,
    nombre: string,
    codigoHex: string
}

export class ColorModel implements IColorModel{
    idColor: number;
    nombre: string;
    codigoHex: string;
    constructor(){
        this.idColor = 0;
        this.nombre = "";
        this.codigoHex = "#ffffff";
    }
}