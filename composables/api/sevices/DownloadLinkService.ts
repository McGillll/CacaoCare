import BaseAPIService from "../BaseApiService";

class DownloadLinkService extends BaseAPIService {
    async getLatestVersion(): Promise<any> {
        return await this.request('/download/latest', 'GET');
    }
    async getLatestVersionDate(): Promise<any>{
        return await this.request('/download/latest/date', 'GET');
    }
    async getAllDownloadLink(): Promise<any>{
        return await this.request('/download_link', 'GET');
    }

    async storeDownloadLink(param: Object): Promise<any>{
        return await this.request(`download_link`, `POST`, param)
    }
    async updateDownloadLink(id: Object, param: Object): Promise<any>{
        return await this.request(`download_link/${id}?_method=PUT`, `POST`, param)
    }
    async deleteDownloadLink(id: Object): Promise<any>{
        return await this.request(`download_link/${id}`, `DELETE`)
    }
}

export const downloadLinkService= new DownloadLinkService();