import { login, logout, signup, forgotPassword } from "./auth";
import { getPaginateTarifa } from "./tarifa"
import { getPaginateProducto, getByIdProducto } from "./producto"
import { getMaterial } from "./material"
import { getMateriaPrima } from "./materia-prima"
import { getPaginateCompra } from "./compra";
import { getFile } from "./storage"

export { login, logout, signup, forgotPassword, getPaginateTarifa, getMaterial, getPaginateProducto, getByIdProducto, getMateriaPrima, getPaginateCompra, getFile };
