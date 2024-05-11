import { all } from "redux-saga/effects";

import authSaga from "./auth/saga";
import layoutSaga from "./layout/saga";
import tarifaSaga from "./tarifa/saga";
import materialSaga from "./material/saga";
import productoSaga from "./producto/saga";
import materiaPrimaSaga from "./materia-prima/saga";
import compraSaga from "./compra/saga";

export default function* rootSaga() {
  yield all([authSaga(), layoutSaga(), tarifaSaga(), materialSaga(), productoSaga(), materiaPrimaSaga(), compraSaga()]);
}
