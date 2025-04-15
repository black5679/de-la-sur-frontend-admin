import { AxiosResponse } from "axios";
import { IGetColorResponse } from "../../responses/color/get-color.response";
import { APICore } from "./apiCore";
import { ResponseModel } from "../../base/response.model"
import { IInsertColorRequest } from "../../requests/color/insert-color.request";
import { IUpdateColorRequest } from "../../requests/color/update-color.request";

const api = new APICore();
const baseUrl = "color";
// account
async function getColor() : Promise<AxiosResponse<IGetColorResponse>> {
  const response: AxiosResponse<IGetColorResponse> = await api.get(`${baseUrl}`, null);
  return response;
}

async function insertColor(request : IInsertColorRequest) : Promise<AxiosResponse<ResponseModel<number>>> {
  const response: AxiosResponse<ResponseModel<number>> = await api.create(`${baseUrl}`, request);
  return response;
}

async function updateColor(request : IUpdateColorRequest) : Promise<AxiosResponse<ResponseModel<number>>> {
  const response: AxiosResponse<ResponseModel<number>> = await api.create(`${baseUrl}`, request);
  return response;
}

export { getColor, insertColor, updateColor };