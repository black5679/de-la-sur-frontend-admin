// constants
import { IPaginateRequest } from "../../base/paginate.request";
import { ProductoActionTypes } from "./constants";

export interface ProductoActionType {
    type:
    | ProductoActionTypes.API_RESPONSE_SUCCESS
    | ProductoActionTypes.API_RESPONSE_ERROR
    | ProductoActionTypes.GETPAGINATE
    | ProductoActionTypes.GETBYID
    | ProductoActionTypes.GETIMAGE
    | ProductoActionTypes.INIT_REGISTER
    | ProductoActionTypes.GET_BY_ID_PRODUCT_TYPE
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

export const getByIdProducto = (id: string): ProductoActionType => ({
    type: ProductoActionTypes.GETBYID,
    payload: { id }
});

export const getImageProducto = (container: string, path: string): ProductoActionType => ({
    type: ProductoActionTypes.GETIMAGE,
    payload: { container, path }
});

export const initRegisterProduct = (): ProductoActionType => ({
    type: ProductoActionTypes.INIT_REGISTER,
    payload: { }
});

export const getByIdProductType = (id: string): ProductoActionType => ({
    type: ProductoActionTypes.GET_BY_ID_PRODUCT_TYPE,
    payload: { id }
});