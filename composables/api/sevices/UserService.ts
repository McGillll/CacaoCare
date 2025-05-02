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
}

export const userService = new UserService();