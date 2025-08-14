import BaseAPIService from "../BaseApiService";

class TreatmentService extends BaseAPIService{
    async storeNewTreatment(param: Object): Promise<any>{
        return await this.request(`treatment`, `POST`, param)
    }
}
export const treatmentService = new TreatmentService();