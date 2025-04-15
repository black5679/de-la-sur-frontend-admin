import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/core";

// helpers
import {
    getColor as getColorApi,
    insertColor as insertColorApi,
    updateColor as updateColorApi
} from "../../helpers/";

// actions
import { colorApiResponseSuccess, colorApiResponseError } from "./actions";

// constants
import { ColorActionTypes } from "./constants";
import { AxiosResponse } from "axios";
import { IGetCompraResponse } from "../../responses/compra/get-compra.response";
import { PaginateResponse } from "../../base/paginate.response";
import { ResponseModel } from "../../base/response.model";
import { IInsertColorRequest } from "../../requests/color/insert-color.request";
import { IUpdateColorRequest } from "../../requests/color/update-color.request";

/**
 * Lista los colores
 */
function* getColor(): SagaIterator {
    try {
        const response: AxiosResponse<PaginateResponse<IGetCompraResponse>> = yield call(getColorApi);
        yield put(colorApiResponseSuccess(ColorActionTypes.GET, response.data));
    } catch (error: any) {
        yield put(colorApiResponseError(ColorActionTypes.GET, error));
    }
}

/**
 * Registra un color
 */
 function* insertColor({ payload, type }: { payload: IInsertColorRequest, type: ColorActionTypes }): SagaIterator {
    try {
        const response: AxiosResponse<ResponseModel<number>> = yield call(insertColorApi, payload);
        yield put(colorApiResponseSuccess(type, response.data));
    } catch (error: any) {
        yield put(colorApiResponseError(type, error));
    }
}

/**
 * Modifica un color
 */
 function* updateColor({ payload, type }: { payload: IUpdateColorRequest, type: ColorActionTypes }): SagaIterator {
    try {
        const response: AxiosResponse<ResponseModel<number>> = yield call(updateColorApi, payload);
        yield put(colorApiResponseSuccess(type, response.data));
    } catch (error: any) {
        yield put(colorApiResponseError(type, error));
    }
}

export function* watchGetColor() {
    yield takeEvery(ColorActionTypes.GET, getColor);
}

export function* watchInsertColor() {
    yield takeEvery(ColorActionTypes.INSERT, insertColor);
}

export function* watchUpdateColor() {
    yield takeEvery(ColorActionTypes.UPDATE, updateColor);
}

function* compraSaga() {
    yield all([
        fork(watchGetColor), fork(watchInsertColor), fork(watchUpdateColor)
    ]);
}

export default compraSaga;