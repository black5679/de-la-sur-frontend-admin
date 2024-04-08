import { AxiosResponse } from "axios";
import { IPaginateRequest } from "../../base/paginate.request";
import { PaginateResponse } from "../../base/paginate.response";
import { IGetTarifaResponse } from "../../responses/tarifa/get-tarifa.response";
import { APICore } from "./apiCore";

const api = new APICore();
const baseUrl = "tarifa";
// account
async function getPaginateTarifa(params: IPaginateRequest) : Promise<AxiosResponse<PaginateResponse<IGetTarifaResponse>>> {
  const response: AxiosResponse<PaginateResponse<IGetTarifaResponse>> = await api.get(`${baseUrl}/Paginate`, params);
  return response;
}

export { getPaginateTarifa };