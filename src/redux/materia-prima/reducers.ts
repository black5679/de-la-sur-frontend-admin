// constants
import { MateriaPrimaActionTypes } from "./constants";
import { IGetMateriaPrimaResponse } from "../../responses/materia-prima/get-materia-prima.response";

const INIT_STATE : State = {
    loading: true,
    materiasPrimas: []
};

interface MateriaPrimaActionType {
    type:
    | MateriaPrimaActionTypes.API_RESPONSE_SUCCESS
    | MateriaPrimaActionTypes.API_RESPONSE_ERROR
    | MateriaPrimaActionTypes.GET
    payload: {
        actionType?: string;
        data?: IGetMateriaPrimaResponse[] | {};
        token: string | null;
        error?: string;
    };
}

interface State {
    loading: boolean;
    materiasPrimas: IGetMateriaPrimaResponse[]
}

const MateriaPrima = (state: State = INIT_STATE, action: MateriaPrimaActionType): any => {
    switch (action.type) {
        case MateriaPrimaActionTypes.API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case MateriaPrimaActionTypes.GET: {
                    return {
                        ...state,
                        loading: false,
                        materiasPrimas: action.payload.data
                    };
                }
                default:
                    return { ...state };
            }

        case MateriaPrimaActionTypes.API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case MateriaPrimaActionTypes.GET: {
                    return {
                        ...state,
                        materiasPrimas: INIT_STATE.materiasPrimas,
                        loading: false,
                    };
                }
                default:
                    return { ...state };
            }
        case MateriaPrimaActionTypes.GET:
            return { ...state, loading: true };
        default:
            return { ...state };
    }
};

export default MateriaPrima;