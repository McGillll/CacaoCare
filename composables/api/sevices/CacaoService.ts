import BaseAPIService from "../BaseApiService";

class CacaoService extends BaseAPIService {
    async getUploadedToday(): Promise<any>{
        return await this.request('/cacao/upload/today', "GET")
    }
}

export const cacaoServices = new CacaoService();