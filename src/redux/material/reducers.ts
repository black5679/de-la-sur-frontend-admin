// constants
import { MaterialActionTypes } from "./constants";
import { IGetMaterialResponse } from "../../responses/material/get-material.response";

const INIT_STATE : State = {
    loading: true,
    materiales: []
};

interface MaterialActionType {
    type:
    | MaterialActionTypes.API_RESPONSE_SUCCESS
    | MaterialActionTypes.API_RESPONSE_ERROR
    | MaterialActionTypes.GET
    payload: {
        actionType?: string;
        data?: IGetMaterialResponse[] | {};
        token: string | null;
        error?: string;
    };
}

interface State {
    loading: boolean;
    materiales: IGetMaterialResponse[]
}

const Material = (state: State = INIT_STATE, action: MaterialActionType): any => {
    switch (action.type) {
        case MaterialActionTypes.API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case MaterialActionTypes.GET: {
                    return {
                        ...state,
                        loading: false,
                        materiales: action.payload.data
                    };
                }
                default:
                    return { ...state };
            }

        case MaterialActionTypes.API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case MaterialActionTypes.GET: {
                    return {
                        ...state,
                        materiales: INIT_STATE.materiales,
                        loading: false,
                    };
                }
                default:
                    return { ...state };
            }
        case MaterialActionTypes.GET:
            return { ...state, loading: true };
        default:
            return { ...state };
    }
};

export default Material;