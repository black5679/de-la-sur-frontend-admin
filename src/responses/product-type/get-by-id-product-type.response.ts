export interface IGetByIdProductTypeResponse {
    id: string,
    code: string,
    name: string,
    spaceTypes: IGetByIdSpaceTypeProductTypeResponse[]
}

export interface IGetByIdSpaceTypeProductTypeResponse {
    id: string,
    code: string,
    name: string,
    isGem: boolean,
    categories: IGetByIdCategoryProductTypeResponse[]
}

export interface IGetByIdCategoryProductTypeResponse {
    id: string,
    code: string,
    name: string,
    subcategories: IGetByIdSubcategoryProductTypeResponse[]
}

export interface IGetByIdSubcategoryProductTypeResponse {
    id: string,
    code: string,
    name: string
}

export class GetByIdProductTypeResponse implements IGetByIdProductTypeResponse {
    id: string;
    code: string;
    name: string;
    spaceTypes: IGetByIdSpaceTypeProductTypeResponse[];
    constructor(){
        this.id = "";
        this.code = "";
        this.name = "";
        this.spaceTypes = [];
    }
}