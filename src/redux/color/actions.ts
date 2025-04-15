// constants
import { IInsertColorRequest } from "../../requests/color/insert-color.request";
import { IUpdateColorRequest } from "../../requests/color/update-color.request";
import { ColorActionTypes } from "./constants";

export interface ColorActionType {
    type:
    | ColorActionTypes.API_RESPONSE_SUCCESS
    | ColorActionTypes.API_RESPONSE_ERROR
    | ColorActionTypes.GET
    | ColorActionTypes.INSERT
    | ColorActionTypes.UPDATE
    | ColorActionTypes.DELETE
    payload: {} | string;
}

// common success
export const colorApiResponseSuccess = (
    actionType: string,
    data: any
): ColorActionType => ({
    type: ColorActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});
// common error
export const colorApiResponseError = (
    actionType: string,
    error: string
): ColorActionType => ({
    type: ColorActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const getColor = (): ColorActionType => ({
    type: ColorActionTypes.GET,
    payload: {},
});

export const insertColor = (request: IInsertColorRequest): ColorActionType => ({
    type: ColorActionTypes.INSERT,
    payload: request,
});

export const updateColor = (request: IUpdateColorRequest): ColorActionType => ({
    type: ColorActionTypes.UPDATE,
    payload: request,
});