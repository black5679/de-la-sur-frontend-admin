// constants
import { ColorActionTypes } from "./constants";
import { IGetColorResponse } from "../../responses/color/get-color.response";
import { DetalleColorModalType, IDetalleColorModalProps } from "../../views/color/DetalleColorModal";

const INIT_STATE : State = {
    loading: true,
    colores: [],
    colorModalProps: {
        show: false,
        toggle: () => {},
        type: DetalleColorModalType.Registrar
    }
};

interface ColorActionType {
    type:
    | ColorActionTypes.API_RESPONSE_SUCCESS
    | ColorActionTypes.API_RESPONSE_ERROR
    | ColorActionTypes.GET
    | ColorActionTypes.INSERT
    | ColorActionTypes.UPDATE
    | ColorActionTypes.DELETE
    payload: {
        actionType?: string;
        data?: IGetColorResponse[] | {};
        token: string | null;
        error?: string;
    };
}

interface State {
    loading: boolean;
    colores: IGetColorResponse[];
    colorModalProps: IDetalleColorModalProps
}

const Compra = (state: State = INIT_STATE, action: ColorActionType): any => {
    switch (action.type) {
        case ColorActionTypes.API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case ColorActionTypes.GET: {
                    return {
                        ...state,
                        loading: false,
                        colores: action.payload.data
                    };
                }
                case ColorActionTypes.INSERT: {
                    return {
                        ...state,
                    };
                }
                default:
                    return { ...state };
            }

        case ColorActionTypes.API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case ColorActionTypes.GET: {
                    return {
                        ...state,
                        error: action.payload.error,
                        colores: INIT_STATE.colores,
                        loading: false,
                    };
                }
                case ColorActionTypes.INSERT: {
                    return {
                        ...state,
                        error: action.payload.error,
                    };
                }
                default:
                    return { ...state };
            }
        case ColorActionTypes.GET:
            return { ...state, loading: true };
        case ColorActionTypes.INSERT:
            return { ...state };
        default:
            return { ...state };
    }
};

export default Compra;