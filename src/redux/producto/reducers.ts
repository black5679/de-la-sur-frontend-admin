// constants
import { ProductoActionTypes } from "./constants";
import { PaginateResponse } from "../../base/paginate.response";
import { IGetProductoResponse } from "../../responses/producto/get-producto.response";
import { GetByIdProductoResponse, IGetByIdProductoResponse } from "../../responses/producto/get-by-id-producto.response";

const INIT_STATE: State = {
    loading: true,
    loadingProducto: true,
    productos: { results: [], totalRows: 0, totalPages: 0 },
    producto: new GetByIdProductoResponse()
};

interface ProductoActionType {
    type:
    | ProductoActionTypes.API_RESPONSE_SUCCESS
    | ProductoActionTypes.API_RESPONSE_ERROR
    | ProductoActionTypes.GETPAGINATE
    | ProductoActionTypes.GETBYID
    | ProductoActionTypes.GETIMAGE
    payload: {
        actionType?: string;
        data?: any | {};
        token: string | null;
        error?: string;
    };
}

interface State {
    loading: boolean;
    loadingProducto: boolean;
    productos: PaginateResponse<IGetProductoResponse>;
    producto: IGetByIdProductoResponse;
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
                case ProductoActionTypes.GETBYID: {
                    return {
                        ...state,
                        loadingProducto: false,
                        producto: action.payload.data
                    };
                }
                case ProductoActionTypes.GETIMAGE: {
                    return {
                        ...state,
                        producto: { ...state.producto, imagenes: action.payload.data }
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
                case ProductoActionTypes.GETBYID: {
                    return {
                        ...state,
                        error: action.payload.error,
                        producto: INIT_STATE.producto,
                        loadingProducto: false,
                    };
                }
                case ProductoActionTypes.GETIMAGE: {
                    return {
                        ...state,
                        error: action.payload.error,
                        producto: INIT_STATE.producto.imagenes,
                    };
                }
                default:
                    return { ...state };
            }
        case ProductoActionTypes.GETPAGINATE:
            return { ...state, loading: true };
        case ProductoActionTypes.GETBYID:
            return { ...state, loadingProducto: true };
        case ProductoActionTypes.GETIMAGE:
            return { ...state };
        default:
            return { ...state };
    }
};

export default Producto;