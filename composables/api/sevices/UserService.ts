import BaseAPIService from "../BaseApiService";

class UserService extends BaseAPIService {
    async getAllUser(): Promise<any> {
        return await this.request('/user', 'GET')
    }

    async getUserSignTodayCount(): Promise<any>{
        return await this.request('/user/count/today', 'GET')
    }

    async getUserCount(): Promise<any>{
        return await this.request('/user/count/all', 'GET')
    }
    async updateUser(id: Object, params: Object): Promise<any>{
        return await this.request(`user/${id}?_method=PUT`, 'POST', params )
    }
}

export const userService = new UserService();