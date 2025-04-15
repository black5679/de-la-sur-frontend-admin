import { AxiosResponse } from "axios";
import config from "../../config";
import { IGetProductTypeResponse } from "../../responses/product-type/get-product-type.response";
import { APICore } from "./apiCore";
import { IGetByIdProductTypeResponse } from "../../responses/product-type/get-by-id-product-type.response";

const api = new APICore();
const baseUrl = config.PRODUCT_API_URL;

async function getProductType() : Promise<AxiosResponse<IGetProductTypeResponse[]>> {
    const response: AxiosResponse<IGetProductTypeResponse[]> = await api.get(`${baseUrl}producttype`, null);
    return response;
}

async function getByIdProductType(id: string) : Promise<AxiosResponse<IGetByIdProductTypeResponse>> {
    const response: AxiosResponse<IGetByIdProductTypeResponse> = await api.get(`${baseUrl}producttype/${id}`, null);
    return response;
}

export { getProductType, getByIdProductType };