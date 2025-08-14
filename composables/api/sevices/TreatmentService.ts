import BaseAPIService from "../BaseApiService";

class TreatmentService extends BaseAPIService{
    async getTreatments(): Promise<any>{
        return await this.request(`treatment`, `GET`)
    }

    async updateTreatment(param: FormData): Promise<any>{
        return await this.request(`treatment/${param.get('id')}?_method=PUT`, `POST`, param)
    }
}
export const treatmentService = new TreatmentService();