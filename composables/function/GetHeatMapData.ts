import { getBarangayBoundingBox } from "../api/sevices/openStreetMapApiService"
import type { HeatPoint } from "../model/HeatPoint"

export async function fetchBaranggayBoundingBox(response: any): Promise<any> {
    let heatpoints: HeatPoint[] = []
    for (const data of response.data.uploaded) {
        let heatpoint = {} as HeatPoint
        heatpoint.intensity = (data.count / response.data.total) * 100
        heatpoint.name = data.barangay
        heatpoint.count = data.count
        heatpoint.boundingbox = await getBarangayBoundingBox(data.barangay, data.city)
        heatpoints.push(heatpoint)
    }
    return heatpoints
}