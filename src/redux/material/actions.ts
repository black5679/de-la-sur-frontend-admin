// constants
import { MaterialActionTypes } from "./constants";

export interface MaterialActionType {
    type:
    | MaterialActionTypes.API_RESPONSE_SUCCESS
    | MaterialActionTypes.API_RESPONSE_ERROR
    | MaterialActionTypes.GET
    payload: {} | string;
}

// common success
export const materialApiResponseSuccess = (
    actionType: string,
    data: any
): MaterialActionType => ({
    type: MaterialActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});
// common error
export const materialApiResponseError = (
    actionType: string,
    error: string
): MaterialActionType => ({
    type: MaterialActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const getMaterial = (): MaterialActionType => ({
    type: MaterialActionTypes.GET,
    payload: {},
});