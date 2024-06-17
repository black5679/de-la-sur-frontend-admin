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
        let image: string[] = [];
        response.data.espacios.forEach(espacio => {
            espacio.materiasPrimas[0].selected = true;
            image.push(espacio.materiasPrimas[0].codigoHex);
          })
        const imageResponse: AxiosResponse<IBlobResponse> = yield call(getFileApi, "modelo", response.data.idMaterial + "/imagen/"+ image.join(",")+".jpg");
        response.data.imagenes = [];
        response.data.imagenes.push(imageResponse.data.imageUrl);
        yield put(productoApiResponseSuccess(ProductoActionTypes.GETBYID, response.data));
    } catch (error: any) {
        yield put(productoApiResponseError(ProductoActionTypes.GETBYID, error));
    }
}

function* getImageProducto(request: UserData): SagaIterator{
    try {
        const response: AxiosResponse<IBlobResponse> = yield call(getFileApi, request.payload.container, request.payload.path);
        let imagenes : string[] = [];
        imagenes.push(response.data.imageUrl);
        yield put(productoApiResponseSuccess(ProductoActionTypes.GETIMAGE, imagenes));
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
         fork(watchGetImageProducto)
    ]);
}

export default productoSaga;