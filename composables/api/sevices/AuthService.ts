import BaseAPIService from "../BaseApiService";

class AuthService extends BaseAPIService {
  async login(params: object): Promise<any> {
    return await this.request("/auth/login", "POST", params);
  }

  async logout(): Promise<any> {
    return await this.request("auth/logout", "POST");
  }

  async resendVerification(params: Object): Promise<any> {
    return await this.request("auth/resend-verification", "POST", params);
  }

  async createUser(params: object): Promise<any> {
    return await this.request("/auth/register", "POST", params);
  }

  async getCurrentUser(): Promise<any> {
    return await this.request(`current/user`, "GET");
  }

  async forgotPassword(params: object): Promise<any> {
    return await this.request("/auth/forgot-password", "POST", params);
  }

  async resetPassword(params: object): Promise<any> {
    return await this.request("/auth/reset-password", "POST", params);
  }
}

export const authService = new AuthService();
