import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/core";
import { Node } from 'react-checkbox-tree';

// helpers
import {
    getPaginateProducto as getPaginateProductoApi,
    getByIdProducto as getByIdProductoApi,
    getProductType as getProductTypeApi,
    getByIdProductType as getByIdProductTypeApi
} from "../../helpers/";

// actions
import { productoApiResponseSuccess, productoApiResponseError } from "./actions";

// constants
import { ProductoActionTypes } from "./constants";
import { AxiosResponse } from "axios";
import { PaginateResponse } from "../../base/paginate.response";
import { IGetProductResponse } from "../../responses/producto/get-producto.response";
import { IGetByIdProductResponse } from "../../responses/producto/get-by-id-producto.response";
import { IGetProductTypeResponse } from "../../responses/product-type/get-product-type.response";
import { IGetByIdProductTypeResponse } from "../../responses/product-type/get-by-id-product-type.response";

interface UserData {
    payload: any,
    type: string;
}

/**
 * Lista los productos
 */
function* getPaginateProducto(request : UserData): SagaIterator {
    try {
        const response: AxiosResponse<PaginateResponse<IGetProductResponse>> = yield call(getPaginateProductoApi, request.payload);
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
        const [response, categoriesResponse]: [AxiosResponse<IGetByIdProductResponse>, AxiosResponse<IGetProductTypeResponse>] = yield all([call(getByIdProductoApi, request.payload.id), call(getProductTypeApi)]);
        response.data.images = [];
        let image: string[] = [];
        response.data.spaceGems.forEach(spaceGem => {
            spaceGem.gemCategories[0].gemSubcategories[0].selected = true;
            image.push(spaceGem.gemCategories[0].gemSubcategories[0].colorHex.replace("#",""));
        })
        response.data.spaceMetals.forEach(spaceMetal => {
            spaceMetal.metalCategories[0].metalSubcategories[0].selected = true;
            image.push(spaceMetal.metalCategories[0].metalSubcategories[0].colorHex.replace("#",""));
        })
        response.data.images.push(`https://delasur.blob.core.windows.net/model/${response.data.id}/image/${image.join(",")}.jpg`);

        const payload = { product: response.data, productTypes: categoriesResponse.data };
        yield put(productoApiResponseSuccess(ProductoActionTypes.GETBYID, payload));
    } catch (error: any) {
        yield put(productoApiResponseError(ProductoActionTypes.GETBYID, error));
    }
}

function* initRegisterProduct(): SagaIterator {
    try {
        const [categoriesResponse]: [AxiosResponse<IGetProductTypeResponse>] = yield all([call(getProductTypeApi)]);
        const payload = { productTypes: categoriesResponse.data };
        yield put(productoApiResponseSuccess(ProductoActionTypes.GETBYID, payload));
    } catch (error: any) {
        yield put(productoApiResponseError(ProductoActionTypes.GETBYID, error));
    }
}

function* getByIdProductType(request: UserData): SagaIterator {
    try {
        const response: AxiosResponse<IGetByIdProductTypeResponse> = yield call(getByIdProductTypeApi, request.payload.id);
        const nodes: Node[] = [];
        response.data.spaceTypes.forEach(spaceType => {
            nodes.push({ value: spaceType.id, label: spaceType.name, children: spaceType.categories.map(x => ({ value: spaceType.id+"_"+x.id, label: x.name, id: x.id, children: x.subcategories.map(y => ({value: spaceType.id+"_"+x.id+"_"+y.id, id: y.id, label: y.name })) })) })
        });
        yield put(productoApiResponseSuccess(ProductoActionTypes.GET_BY_ID_PRODUCT_TYPE, response.data));
        yield put(productoApiResponseSuccess(ProductoActionTypes.SET_NODES, nodes));
    } catch (error: any) {
        yield put(productoApiResponseError(ProductoActionTypes.GET_BY_ID_PRODUCT_TYPE, error));
    }
}

function* getImageProducto(request: UserData): SagaIterator{
    try {
        let images : string[] = [];
        images.push(`https://delasur.blob.core.windows.net/${request.payload.container}/${request.payload.path}`);
        yield put(productoApiResponseSuccess(ProductoActionTypes.GETIMAGE, images));
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

export function* watchInitRegisterProduct() {
    yield takeEvery(ProductoActionTypes.INIT_REGISTER, initRegisterProduct);
}

export function* watchGetByIdProductType() {
    yield takeEvery(ProductoActionTypes.GET_BY_ID_PRODUCT_TYPE, getByIdProductType);
}

function* productoSaga() {
    yield all([
        fork(watchGetPaginateProducto), fork(watchGetByIdProducto),
         fork(watchGetImageProducto), fork(watchInitRegisterProduct),
         fork(watchGetByIdProductType)
    ]);
}

export default productoSaga;