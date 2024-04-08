import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/core";

// helpers
import {
    getMaterial as getMaterialApi
} from "../../helpers/";

// actions
import { materialApiResponseSuccess, materialApiResponseError } from "./actions";

// constants
import { MaterialActionTypes } from "./constants";
import { AxiosResponse } from "axios";
import { IGetMaterialResponse } from "../../responses/material/get-material.response";

/**
 * Lista las tarifas
 */
function* getMaterial(): SagaIterator {
    try {
        const response: AxiosResponse<IGetMaterialResponse[]> = yield call(getMaterialApi);
        yield put(materialApiResponseSuccess(MaterialActionTypes.GET, response.data));
    } catch (error: any) {
        yield put(materialApiResponseError(MaterialActionTypes.GET, error));
    }
}

export function* watchGetMaterial() {
    yield takeEvery(MaterialActionTypes.GET, getMaterial);
}

function* materialSaga() {
    yield all([
        fork(watchGetMaterial)
    ]);
}

export default materialSaga;