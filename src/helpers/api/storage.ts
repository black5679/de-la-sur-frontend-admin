import { AxiosResponse } from "axios";
import { IBlobResponse } from "../../base/blob.response";
import { APICore } from "./apiCore";

const api = new APICore();
const baseUrl = "storage";

async function getFile(container: string, path: string): Promise<AxiosResponse<IBlobResponse>> {
    const response: AxiosResponse<IBlobResponse> = await api.get(`${baseUrl}`, { container, path });
    return response;
}

export { getFile }