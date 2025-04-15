export interface IGetByIdProductResponse{
    id: string,
    code: string,
    name: string,
    images: string[],
    spaceGems: IGetByIdSpaceGemProductResponse[],
    spaceMetals: IGetByIdSpaceMetalProductResponse[]
}
export interface IGetByIdSpaceGemProductResponse{
    spaceTypeCode: string,
    name: string,
    gemCategories: IGetByIdGemCategoryProductResponse[];
}

export interface IGetByIdGemCategoryProductResponse{
    code: string,
    name: string,
    gemSubcategories: IGetByIdGemSubcategoryProductResponse[]
}

export interface IGetByIdGemSubcategoryProductResponse{
    code: string,
    name: string,
    colorHex: string,
    selected: boolean
}
export interface IGetByIdSpaceMetalProductResponse{
    spaceTypeCode: string,
    name: string,
    metalCategories: IGetByIdMetalCategoryProductResponse[];
}

export interface IGetByIdMetalCategoryProductResponse{
    code: string,
    name: string,
    metalSubcategories: IGetByIdMetalSubcategoryProductResponse[]
}

export interface IGetByIdMetalSubcategoryProductResponse{
    code: string,
    name: string,
    colorHex: string,
    selected: boolean
}
export class GetByIdProductResponse implements IGetByIdProductResponse{
    id: string;
    code: string;
    name: string;
    images: string[];
    spaceGems: IGetByIdSpaceGemProductResponse[];
    spaceMetals: IGetByIdSpaceMetalProductResponse[];
    constructor(){
        this.id = "";
        this.code = "";
        this.name = "";
        this.images = [];
        this.spaceGems = [];
        this.spaceMetals = [];
    }
}