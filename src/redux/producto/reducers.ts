// constants
import { ProductoActionTypes } from "./constants";
import { PaginateResponse } from "../../base/paginate.response";
import { IGetProductResponse } from "../../responses/producto/get-producto.response";
import { GetByIdProductResponse, IGetByIdProductResponse } from "../../responses/producto/get-by-id-producto.response";
import { IGetProductTypeResponse } from "../../responses/product-type/get-product-type.response";
import { GetByIdProductTypeResponse, IGetByIdProductTypeResponse } from "../../responses/product-type/get-by-id-product-type.response";
import { Node } from "react-checkbox-tree";

const INIT_STATE: State = {
    loading: true,
    loadingProducto: true,
    productos: { results: [], totalRows: 0, totalPages: 0 },
    product: new GetByIdProductResponse(),
    productTypes: [],
    productType: new GetByIdProductTypeResponse(),
    nodes: []
};

interface ProductoActionType {
    type:
    | ProductoActionTypes.API_RESPONSE_SUCCESS
    | ProductoActionTypes.API_RESPONSE_ERROR
    | ProductoActionTypes.GETPAGINATE
    | ProductoActionTypes.GETBYID
    | ProductoActionTypes.GETIMAGE
    | ProductoActionTypes.INIT_REGISTER
    | ProductoActionTypes.GET_BY_ID_PRODUCT_TYPE
    | ProductoActionTypes.SET_NODES
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
    productos: PaginateResponse<IGetProductResponse>;
    product: IGetByIdProductResponse;
    productTypes: IGetProductTypeResponse[];
    productType: IGetByIdProductTypeResponse;
    nodes: Node[]
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
                        product: action.payload.data.product,
                        productTypes: action.payload.data.productTypes
                    };
                }
                case ProductoActionTypes.GETIMAGE: {
                    return {
                        ...state,
                        product: { ...state.product, images: action.payload.data }
                    };
                }
                case ProductoActionTypes.INIT_REGISTER: {
                    return {
                        ...state,
                        productTypes: action.payload.data
                    }; 
                }
                case ProductoActionTypes.SET_NODES: {
                    return {
                        ...state,
                        nodes: action.payload.data
                    };
                }
                case ProductoActionTypes.GET_BY_ID_PRODUCT_TYPE: {
                    return {
                        ...state,
                        productType: action.payload.data
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
                        product: INIT_STATE.product,
                        loadingProducto: false,
                    };
                }
                case ProductoActionTypes.GETIMAGE: {
                    return {
                        ...state,
                        error: action.payload.error,
                        product: INIT_STATE.product.images,
                    };
                }
                case ProductoActionTypes.INIT_REGISTER: {
                    return {
                        ...state,
                        productTypes: action.payload.data
                    }; 
                }
                case ProductoActionTypes.SET_NODES: {
                    return {
                        ...state,
                        nodes: action.payload.data
                    }; 
                }
                case ProductoActionTypes.GET_BY_ID_PRODUCT_TYPE: {
                    return {
                        ...state,
                        productType: action.payload.data
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
        case ProductoActionTypes.SET_NODES:
            return { ...state, nodes: INIT_STATE.nodes };
        case ProductoActionTypes.GET_BY_ID_PRODUCT_TYPE:
            return { ...state, productType: INIT_STATE.productType };
        default:
            return { ...state };
    }
};

export default Producto;