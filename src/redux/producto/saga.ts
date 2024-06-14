import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/core";

// helpers
import {
    getPaginateProducto as getPaginateProductoApi,
    getByIdProducto as getByIdProductoApi,
    getFile as getFileApi
} from "../../helpers/";

// actions
import { productoApiResponseSuccess, productoApiResponseError } from "./actions";

// constants
import { ProductoActionTypes } from "./constants";
import { AxiosResponse } from "axios";
import { PaginateResponse } from "../../base/paginate.response";
import { IGetProductoResponse } from "../../responses/producto/get-producto.response";
import { IGetByIdProductoResponse } from "../../responses/producto/get-by-id-producto.response";
import { IBlobResponse } from "../../base/blob.response";

interface UserData {
    payload: any,
    type: string;
}

/**
 * Lista los productos
 */
function* getPaginateProducto(request : UserData): SagaIterator {
    try {
        const response: AxiosResponse<PaginateResponse<IGetProductoResponse>> = yield call(getPaginateProductoApi, request.payload);
        yield put(productoApiResponseSuccess(ProductoActionTypes.GETPAGINATE, response.data));
    } catch (error: any) {
        yield put(productoApiResponseError(ProductoActionTypes.GETPAGINATE, error));
    }
}

/**
 * Obtiene el producto
 */
 function* getByIdProducto(request: UserData): SagaIterator {
    try {
        const response: AxiosResponse<IGetByIdProductoResponse> = yield call(getByIdProductoApi, request.payload.idProducto);
        response.data.espacios.forEach(espacio => {
            espacio.materiasPrimas[0].selected = true;
          })
        const imageResponse: AxiosResponse<IBlobResponse> = yield call(getFileApi, "modelo", "30/imagen/F01320,F01320,D6D6D6.jpg");
        response.data.imagenes.push(imageResponse.data.imageUrl);
        console.log(imageResponse)
        yield put(productoApiResponseSuccess(ProductoActionTypes.GETBYID, response.data));
    } catch (error: any) {
        yield put(productoApiResponseError(ProductoActionTypes.GETBYID, error));
    }
}

function* getImageProducto(request: UserData): SagaIterator{
    try {
        const response: AxiosResponse<IBlobResponse> = yield call(getFileApi, request.payload.container, request.payload.path);
        yield put(productoApiResponseSuccess(ProductoActionTypes.GETIMAGE, response.data));
    } catch (error: any) {
        yield put(productoApiResponseError(ProductoActionTypes.GETIMAGE, error));
    }
}

export function* watchGetPaginateProducto() {
    yield takeEvery(ProductoActionTypes.GETPAGINATE, getPaginateProducto);
}

export function* watchGetByIdProducto() {
    yield takeEvery(ProductoActionTypes.GETBYID, getByIdProducto);
}

export function* watchGetImageProducto() {
    yield takeEvery(ProductoActionTypes.GETIMAGE, getImageProducto);
}

function* productoSaga() {
    yield all([
        fork(watchGetPaginateProducto), fork(watchGetByIdProducto),
        //  fork(watchGetImageProducto)
    ]);
}

export default productoSaga;