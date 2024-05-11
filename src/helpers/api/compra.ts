import { AxiosResponse } from "axios";
import { IPaginateRequest } from "../../base/paginate.request";
import { PaginateResponse } from "../../base/paginate.response";
import { IGetCompraResponse } from "../../responses/compra/get-compra.response";
import { APICore } from "./apiCore";

const api = new APICore();
const baseUrl = "compra";
// account
async function getPaginateCompra(params: IPaginateRequest) : Promise<AxiosResponse<PaginateResponse<IGetCompraResponse>>> {
  const response: AxiosResponse<PaginateResponse<IGetCompraResponse>> = await api.get(`${baseUrl}/Paginate`, params);
  return response;
}

export { getPaginateCompra };