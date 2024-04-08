export interface IPaginateRequest{
    page: number;
    pageSize: number;
    orderType: boolean;
    orderBy?: string;
    desde?: string;
    hasta?: string;
}

export class PaginateRequest implements IPaginateRequest{
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