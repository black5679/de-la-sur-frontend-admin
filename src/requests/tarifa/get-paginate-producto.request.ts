import { IPaginateRequest } from "../../base/paginate.request";

export interface IGetPaginateProductoRequest extends IPaginateRequest{
}

export class GetPaginateProductoRequest implements IGetPaginateProductoRequest{
    page: number;
    pageSize: number;
    orderType: boolean;
    orderBy: string | undefined;
    desde: string | undefined;
    hasta: string | undefined;
    constructor(){
        this.page = 1;
        this.pageSize = 10;
        this.orderType = true;
    }
}