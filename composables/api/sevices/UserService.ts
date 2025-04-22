import BaseAPIService from "../BaseApiService";
import { authService } from "./AuthService";

class UserService extends BaseAPIService {
    async getAllUser(): Promise<any> {
        return await this.request('/user', 'GET')
    }
}

export const userService = new UserService();