import axios from 'axios'

const API_BASE_URL = "https://nominatim.openstreetmap.org/search?q="

 

export async function getBarangayBoundingBox(barangay: string, city: string) : Promise<any>{
    const response = await axios.get<any>(`${API_BASE_URL}${barangay}, ${city}, Philippines&format=json`)
    return response.data[0].boundingbox
}