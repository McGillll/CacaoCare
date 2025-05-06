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

    async getStatusCountByUser(id: Object):Promise<any>{
        return await this.request(`/cacao/upload/count/${id}`, 'GET')
    }

    async getHighestDiseaseWithinTheWeek():Promise<any>{
        return await this.request('/cacao/disease/weeks', 'GET')
    }

    async getCacaoFeed(param: FormData) : Promise<any>{
        return await this.request(`/cacao/feed/${param.get('order')}/${param.get('filter')} ?username=${param.get('username')}&page=${param.get('page')}`, 'GET')
    }
}

export const cacaoServices = new CacaoService();