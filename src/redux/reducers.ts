import { combineReducers } from "redux";

import Auth from "./auth/reducers";
import Layout from "./layout/reducers";
import Tarifa from "./tarifa/reducers";
import Material from "./material/reducers";
import Producto from "./producto/reducers";
import MateriaPrima from "./materia-prima/reducers";
import Compra from "./compra/reducers";
import Color from "./color/reducers";

export default combineReducers({
  Auth,
  Layout,
  Tarifa,
  Material,
  Producto,
  MateriaPrima,
  Compra,
  Color
});
