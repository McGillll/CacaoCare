import BaseAPIService from "../BaseApiService";

class CacaoService extends BaseAPIService {
    async getUploadedToday(): Promise<any>{
        return await this.request('/cacao/upload/today', "GET")
    }

    async getRecent(): Promise<any>{
        return await this.request('/cacao/recent/upload', 'GET')
    }

    async getStatusCount():Promise<any>{
        return await this.request('/cacao/status/count', 'GET')
    }
}

export const cacaoServices = new CacaoService();