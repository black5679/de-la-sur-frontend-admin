import { AxiosResponse } from "axios";
import { IGetMaterialResponse } from "../../responses/material/get-material.response";
import { APICore } from "./apiCore";

const api = new APICore();
const baseUrl = "material";
// account
async function getMaterial() : Promise<AxiosResponse<IGetMaterialResponse[]>> {
  const response: AxiosResponse<IGetMaterialResponse[]> = await api.get(`${baseUrl}`, null);
  return response;
}

export { getMaterial };