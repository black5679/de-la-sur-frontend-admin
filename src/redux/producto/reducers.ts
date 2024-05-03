// constants
import { ProductoActionTypes } from "./constants";
import { PaginateResponse } from "../../base/paginate.response";
import { IGetProductoResponse } from "../../responses/producto/get-producto.response";

const INIT_STATE : State = {
    loading: true,
    productos: { results: [], totalRows : 0, totalPages: 0 }
};

interface ProductoActionType {
    type:
    | ProductoActionTypes.API_RESPONSE_SUCCESS
    | ProductoActionTypes.API_RESPONSE_ERROR
    | ProductoActionTypes.GETPAGINATE
    payload: {
        actionType?: string;
        data?: PaginateResponse<IGetProductoResponse> | {};
        token: string | null;
        error?: string;
    };
}

interface State {
    loading: boolean;
    productos: PaginateResponse<IGetProductoResponse>
}

const Producto = (state: State = INIT_STATE, action: ProductoActionType): any => {
    switch (action.type) {
        case ProductoActionTypes.API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case ProductoActionTypes.GETPAGINATE: {
                    return {
                        ...state,
                        loading: false,
                        productos: action.payload.data
                    };
                }
                default:
                    return { ...state };
            }

        case ProductoActionTypes.API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case ProductoActionTypes.GETPAGINATE: {
                    return {
                        ...state,
                        error: action.payload.error,
                        productos: INIT_STATE.productos,
                        loading: false,
                    };
                }
                default:
                    return { ...state };
            }
        case ProductoActionTypes.GETPAGINATE:
            return { ...state, loading: true };
        default:
            return { ...state };
    }
};

export default Producto;