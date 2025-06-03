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

    async getCacaoTrend():Promise<any>{
        return await this.request(`/cacao/upload/trend`, 'GET')
    }
    
    async getCacaoUploadedByUser(id: Object, page: number):Promise<any>{
        return await this.request(`/cacao/user/upload/${id}/?page=${page}`, 'GET')
    }
    
    async getHighestDiseaseWithinTheWeek():Promise<any>{
        return await this.request('/cacao/disease/weeks', 'GET')
    }

    async getCacaoFeed(param: FormData) : Promise<any>{
        return await this.request(`/cacao/feed/${param.get('order')}/${param.get('filter')}/?username=${param.get('username')}&page=${param.get('page')}`, 'GET')
    }

    async getHeatMapData(filter: string, date: string): Promise<any>{
        return await this.request(`/cacao/heatmap/${filter}/${date}`, 'GET')
    }
}

export const cacaoServices = new CacaoService();