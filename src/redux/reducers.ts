import { combineReducers } from "redux";

import Auth from "./auth/reducers";
import Layout from "./layout/reducers";
import Tarifa from "./tarifa/reducers";
import Material from "./material/reducers";

export default combineReducers({
  Auth,
  Layout,
  Tarifa,
  Material
});
