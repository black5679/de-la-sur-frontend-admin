// constants
import { IPaginateRequest } from "../../base/paginate.request";
import { ProductoActionTypes } from "./constants";

export interface ProductoActionType {
    type:
    | ProductoActionTypes.API_RESPONSE_SUCCESS
    | ProductoActionTypes.API_RESPONSE_ERROR
    | ProductoActionTypes.GETPAGINATE
    payload: {} | string;
}

// common success
export const productoApiResponseSuccess = (
    actionType: string,
    data: any
): ProductoActionType => ({
    type: ProductoActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});
// common error
export const productoApiResponseError = (
    actionType: string,
    error: string
): ProductoActionType => ({
    type: ProductoActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const getPaginateProducto = (request: IPaginateRequest): ProductoActionType => ({
    type: ProductoActionTypes.GETPAGINATE,
    payload: request,
});