import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/core";

// helpers
import {
    getMateriaPrima as getMateriaPrimaApi
} from "../../helpers";

// actions
import { materiaPrimaApiResponseSuccess, materiaPrimaApiResponseError } from "./actions";

// constants
import { MateriaPrimaActionTypes } from "./constants";
import { AxiosResponse } from "axios";
import { IGetMateriaPrimaResponse } from "../../responses/materia-prima/get-materia-prima.response";

/**
 * Lista las tarifas
 */
function* getMateriaPrima(): SagaIterator {
    try {
        const response: AxiosResponse<IGetMateriaPrimaResponse[]> = yield call(getMateriaPrimaApi);
        yield put(materiaPrimaApiResponseSuccess(MateriaPrimaActionTypes.GET, response.data));
    } catch (error: any) {
        yield put(materiaPrimaApiResponseError(MateriaPrimaActionTypes.GET, error));
    }
}

export function* watchGetMateriaPrima() {
    yield takeEvery(MateriaPrimaActionTypes.GET, getMateriaPrima);
}

function* materiaPrimaSaga() {
    yield all([
        fork(watchGetMateriaPrima)
    ]);
}

export default materiaPrimaSaga;