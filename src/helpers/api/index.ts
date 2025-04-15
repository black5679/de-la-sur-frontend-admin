import { login, logout, signup, forgotPassword } from "./auth";
import { getPaginateTarifa } from "./tarifa"
import { getPaginateProducto, getByIdProducto } from "./product"
import { getProductType, getByIdProductType } from "./product-type"
import { getMaterial } from "./material"
import { getMateriaPrima } from "./materia-prima"
import { getPaginateCompra } from "./compra";
import { getColor, insertColor, updateColor } from "./color";
import { getFile } from "./storage"

export { 
    login,
    logout, 
    signup, 
    forgotPassword, 
    getPaginateTarifa, 
    getMaterial, 
    getPaginateProducto, 
    getByIdProducto, 
    getMateriaPrima, 
    getPaginateCompra, 
    getFile, 
    getColor, 
    insertColor, 
    updateColor, 
    getProductType,
    getByIdProductType 
};
