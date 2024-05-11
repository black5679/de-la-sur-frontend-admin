// constants
import { IPaginateRequest } from "../../base/paginate.request";
import { CompraActionTypes } from "./constants";

export interface CompraActionType {
    type:
    | CompraActionTypes.API_RESPONSE_SUCCESS
    | CompraActionTypes.API_RESPONSE_ERROR
    | CompraActionTypes.GETPAGINATE
    payload: {} | string;
}

// common success
export const compraApiResponseSuccess = (
    actionType: string,
    data: any
): CompraActionType => ({
    type: CompraActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});
// common error
export const compraApiResponseError = (
    actionType: string,
    error: string
): CompraActionType => ({
    type: CompraActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const getPaginateCompra = (request: IPaginateRequest): CompraActionType => ({
    type: CompraActionTypes.GETPAGINATE,
    payload: request,
});