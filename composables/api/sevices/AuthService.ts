import BaseAPIService from "../BaseApiService";

class AuthService extends BaseAPIService {
    async login(params: object): Promise<any> {
        return await this.request('/auth/login', 'POST', params)
    }

    async logout(): Promise<any> {
        return await this.request('auth/logout', "POST");
    }

    async createUser(params: object): Promise<any> {
        return await this.request('/auth/register', "POST", params);
    }

    async getCurrentUser(): Promise<any> {
        return await this.request(`user/`, "GET");
    }
}

export const authService = new AuthService();