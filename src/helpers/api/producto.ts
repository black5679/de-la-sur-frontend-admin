import { AxiosResponse } from "axios";
import { IPaginateRequest } from "../../base/paginate.request";
import { PaginateResponse } from "../../base/paginate.response";
import { IGetProductoResponse } from "../../responses/producto/get-producto.response";
import { APICore } from "./apiCore";

const api = new APICore();
const baseUrl = "producto";
// account
async function getPaginateProducto(params: IPaginateRequest) : Promise<AxiosResponse<PaginateResponse<IGetProductoResponse>>> {
  const response: AxiosResponse<PaginateResponse<IGetProductoResponse>> = await api.get(`${baseUrl}/Paginate`, params);
  return response;
}

export { getPaginateProducto };