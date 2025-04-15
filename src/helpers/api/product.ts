import { AxiosResponse } from "axios";
import { IPaginateRequest } from "../../base/paginate.request";
import { PaginateResponse } from "../../base/paginate.response";
import config from "../../config";
import { IGetByIdProductResponse } from "../../responses/producto/get-by-id-producto.response";
import { IGetProductResponse } from "../../responses/producto/get-producto.response";
import { APICore } from "./apiCore";

const api = new APICore();
const baseUrl = config.PRODUCT_API_URL;

async function getPaginateProducto(params: IPaginateRequest) : Promise<AxiosResponse<PaginateResponse<IGetProductResponse>>> {
  const response: AxiosResponse<PaginateResponse<IGetProductResponse>> = await api.get(`${baseUrl}product/paginate`, params);
  return response;
}

async function getByIdProducto(id: string) : Promise<AxiosResponse<IGetByIdProductResponse>> {
  const response: AxiosResponse<IGetByIdProductResponse> = await api.get(`${baseUrl}product/${id}`, null);
  return response;
}

export { getPaginateProducto, getByIdProducto };