// constants
import { MateriaPrimaActionTypes } from "./constants";

export interface MateriaPrimaActionType {
    type:
    | MateriaPrimaActionTypes.API_RESPONSE_SUCCESS
    | MateriaPrimaActionTypes.API_RESPONSE_ERROR
    | MateriaPrimaActionTypes.GET
    payload: {} | string;
}

// common success
export const materiaPrimaApiResponseSuccess = (
    actionType: string,
    data: any
): MateriaPrimaActionType => ({
    type: MateriaPrimaActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});
// common error
export const materiaPrimaApiResponseError = (
    actionType: string,
    error: string
): MateriaPrimaActionType => ({
    type: MateriaPrimaActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const getMateriaPrima = (): MateriaPrimaActionType => ({
    type: MateriaPrimaActionTypes.GET,
    payload: {},
});