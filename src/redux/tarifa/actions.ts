// constants
import { IPaginateRequest } from "../../base/paginate.request";
import { TarifaActionTypes } from "./constants";

export interface TarifaActionType {
    type:
    | TarifaActionTypes.API_RESPONSE_SUCCESS
    | TarifaActionTypes.API_RESPONSE_ERROR
    | TarifaActionTypes.GETPAGINATE
    payload: {} | string;
}

// common success
export const tarifaApiResponseSuccess = (
    actionType: string,
    data: any
): TarifaActionType => ({
    type: TarifaActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});
// common error
export const tarifaApiResponseError = (
    actionType: string,
    error: string
): TarifaActionType => ({
    type: TarifaActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const getPaginateTarifa = (request: IPaginateRequest): TarifaActionType => ({
    type: TarifaActionTypes.GETPAGINATE,
    payload: request,
});