import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/core";

// helpers
import {
    getPaginateCompra as getPaginateCompraApi
} from "../../helpers/";

// actions
import { compraApiResponseSuccess, compraApiResponseError } from "./actions";

// constants
import { CompraActionTypes } from "./constants";
import { AxiosResponse } from "axios";
import { IGetCompraResponse } from "../../responses/compra/get-compra.response";
import { PaginateResponse } from "../../base/paginate.response";
import { IPaginateRequest } from "../../base/paginate.request";

interface UserData {
    payload: IPaginateRequest,
    type: string;
}

/**
 * Lista las tarifas
 */
function* getPaginateCompra(request : UserData): SagaIterator {
    try {
        const response: AxiosResponse<PaginateResponse<IGetCompraResponse>> = yield call(getPaginateCompraApi, request.payload);
        yield put(compraApiResponseSuccess(CompraActionTypes.GETPAGINATE, response.data));
    } catch (error: any) {
        yield put(compraApiResponseError(CompraActionTypes.GETPAGINATE, error));
    }
}

export function* watchGetPaginateCompra() {
    yield takeEvery(CompraActionTypes.GETPAGINATE, getPaginateCompra);
}

function* compraSaga() {
    yield all([
        fork(watchGetPaginateCompra)
    ]);
}

export default compraSaga;