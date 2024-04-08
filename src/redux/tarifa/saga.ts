import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/core";

// helpers
import {
    getPaginateTarifa as getPaginateTarifaApi
} from "../../helpers/";

// actions
import { tarifaApiResponseSuccess, tarifaApiResponseError } from "./actions";

// constants
import { TarifaActionTypes } from "./constants";
import { AxiosResponse } from "axios";
import { IGetTarifaResponse } from "../../responses/tarifa/get-tarifa.response";
import { PaginateResponse } from "../../base/paginate.response";
import { IPaginateRequest } from "../../base/paginate.request";

interface UserData {
    payload: IPaginateRequest,
    type: string;
}

/**
 * Lista las tarifas
 */
function* getPaginateTarifa(request : UserData): SagaIterator {
    try {
        const response: AxiosResponse<PaginateResponse<IGetTarifaResponse>> = yield call(getPaginateTarifaApi, request.payload);
        yield put(tarifaApiResponseSuccess(TarifaActionTypes.GETPAGINATE, response.data));
    } catch (error: any) {
        yield put(tarifaApiResponseError(TarifaActionTypes.GETPAGINATE, error));
    }
}

export function* watchGetPaginateTarifa() {
    yield takeEvery(TarifaActionTypes.GETPAGINATE, getPaginateTarifa);
}

function* tarifaSaga() {
    yield all([
        fork(watchGetPaginateTarifa)
    ]);
}

export default tarifaSaga;