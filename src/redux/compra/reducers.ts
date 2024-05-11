// constants
import { CompraActionTypes } from "./constants";
import { PaginateResponse } from "../../base/paginate.response";
import { IGetCompraResponse } from "../../responses/compra/get-compra.response";

const INIT_STATE : State = {
    loading: true,
    compras: { results: [], totalRows : 0, totalPages: 0 }
};

interface CompraActionType {
    type:
    | CompraActionTypes.API_RESPONSE_SUCCESS
    | CompraActionTypes.API_RESPONSE_ERROR
    | CompraActionTypes.GETPAGINATE
    payload: {
        actionType?: string;
        data?: PaginateResponse<IGetCompraResponse> | {};
        token: string | null;
        error?: string;
    };
}

interface State {
    loading: boolean;
    compras: PaginateResponse<IGetCompraResponse>
}

const Compra = (state: State = INIT_STATE, action: CompraActionType): any => {
    switch (action.type) {
        case CompraActionTypes.API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case CompraActionTypes.GETPAGINATE: {
                    return {
                        ...state,
                        loading: false,
                        compras: action.payload.data
                    };
                }
                default:
                    return { ...state };
            }

        case CompraActionTypes.API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case CompraActionTypes.GETPAGINATE: {
                    return {
                        ...state,
                        error: action.payload.error,
                        compras: INIT_STATE.compras,
                        loading: false,
                    };
                }
                default:
                    return { ...state };
            }
        case CompraActionTypes.GETPAGINATE:
            return { ...state, loading: true };
        default:
            return { ...state };
    }
};

export default Compra;