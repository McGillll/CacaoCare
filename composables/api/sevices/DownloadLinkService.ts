import BaseAPIService from "../BaseApiService";

class DownloadLinkService extends BaseAPIService {
    async getLatestVersion(): Promise<any> {
        return await this.request('/download/latest', 'GET');
    }
    async getLatestVersionDate(): Promise<any>{
        return await this.request('/download/latest/date', 'GET');
    }
}

export const downloadLinkService= new DownloadLinkService();