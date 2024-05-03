import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/core";

// helpers
import {
    getPaginateProducto as getPaginateProductoApi
} from "../../helpers/";

// actions
import { productoApiResponseSuccess, productoApiResponseError } from "./actions";

// constants
import { ProductoActionTypes } from "./constants";
import { AxiosResponse } from "axios";
import { PaginateResponse } from "../../base/paginate.response";
import { IPaginateRequest } from "../../base/paginate.request";
import { IGetProductoResponse } from "../../responses/producto/get-producto.response";

interface UserData {
    payload: IPaginateRequest,
    type: string;
}

/**
 * Lista las tarifas
 */
function* getPaginateProducto(request : UserData): SagaIterator {
    try {
        const response: AxiosResponse<PaginateResponse<IGetProductoResponse>> = yield call(getPaginateProductoApi, request.payload);
        yield put(productoApiResponseSuccess(ProductoActionTypes.GETPAGINATE, response.data));
    } catch (error: any) {
        yield put(productoApiResponseError(ProductoActionTypes.GETPAGINATE, error));
    }
}

export function* watchGetPaginateProducto() {
    yield takeEvery(ProductoActionTypes.GETPAGINATE, getPaginateProducto);
}

function* productoSaga() {
    yield all([
        fork(watchGetPaginateProducto)
    ]);
}

export default productoSaga;