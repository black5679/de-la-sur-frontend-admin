import { IPaginateRequest } from "../../base/paginate.request";

export interface IGetPaginateTarifaRequest extends IPaginateRequest{
    materiales?: string
}

export class GetPaginateTarifaRequest implements IGetPaginateTarifaRequest{
    materiales?: string | undefined;
    page: number;
    pageSize: number;
    orderType: boolean;
    orderBy?: string | undefined;
    desde?: string | undefined;
    hasta?: string | undefined;
    constructor(){
        this.page = 1;
        this.pageSize = 10;
        this.orderType = true;
    }
}