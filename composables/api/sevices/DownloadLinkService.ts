import BaseAPIService from "../BaseApiService";

class DownloadLinkService extends BaseAPIService {
    async getLatestVersion(): Promise<any> {
        return await this.request('/download/latest', 'GET', {});
    }
}

export const downloadLinkService= new DownloadLinkService();