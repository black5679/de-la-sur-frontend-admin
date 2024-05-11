import { AxiosResponse } from "axios";
import { IGetMateriaPrimaResponse } from "../../responses/materia-prima/get-materia-prima.response";
import { APICore } from "./apiCore";

const api = new APICore();
const baseUrl = "materiaprima";
// account
async function getMateriaPrima() : Promise<AxiosResponse<IGetMateriaPrimaResponse[]>> {
  const response: AxiosResponse<IGetMateriaPrimaResponse[]> = await api.get(`${baseUrl}`, null);
  return response;
}

export { getMateriaPrima };