// constants
import { TarifaActionTypes } from "./constants";
import { IGetTarifaResponse } from "../../responses/tarifa/get-tarifa.response";
import { PaginateResponse } from "../../base/paginate.response";

const INIT_STATE : State = {
    loading: true,
    tarifas: { results: [], totalRows : 0, totalPages: 0 }
};

interface TarifaActionType {
    type:
    | TarifaActionTypes.API_RESPONSE_SUCCESS
    | TarifaActionTypes.API_RESPONSE_ERROR
    | TarifaActionTypes.GETPAGINATE
    payload: {
        actionType?: string;
        data?: PaginateResponse<IGetTarifaResponse> | {};
        token: string | null;
        error?: string;
    };
}

interface State {
    loading: boolean;
    tarifas: PaginateResponse<IGetTarifaResponse>
}

const Tarifa = (state: State = INIT_STATE, action: TarifaActionType): any => {
    switch (action.type) {
        case TarifaActionTypes.API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case TarifaActionTypes.GETPAGINATE: {
                    return {
                        ...state,
                        loading: false,
                        tarifas: action.payload.data
                    };
                }
                default:
                    return { ...state };
            }

        case TarifaActionTypes.API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case TarifaActionTypes.GETPAGINATE: {
                    return {
                        ...state,
                        error: action.payload.error,
                        tarifas: INIT_STATE.tarifas,
                        loading: false,
                    };
                }
                default:
                    return { ...state };
            }
        case TarifaActionTypes.GETPAGINATE:
            return { ...state, loading: true };
        default:
            return { ...state };
    }
};

export default Tarifa;