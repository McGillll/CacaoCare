import axios from 'axios';
import { getCityCoordinates } from './openStreetMapApiService';

class WeatherService {
  async getMonthlyWeatherData(city: string, region: string, month: number, year: number, latitude?: number, longitude?: number): Promise<any> {
    // Get coordinates for the city
    // Get the first and last day of the month
    const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
    const endDate = `${year}-${String(month).padStart(2, '0')}-${new Date(year, month, 0).getDate()}`;
    // Open-Meteo archive API only allows up to 2025-09-11
    const maxAllowedDate = new Date('2025-09-11');
    const requestedEndDate = new Date(endDate);
    if (requestedEndDate > maxAllowedDate) {
      // Skip or return null if requested date is out of range
      return null;
    }
    // Fetch monthly weather data from Open-Meteo
    const response = await axios.get('https://archive-api.open-meteo.com/v1/archive', {
      params: {
        latitude,
        longitude,
        start_date: startDate,
        end_date: endDate,
        daily: ['temperature_2m_max', 'temperature_2m_min', 'precipitation_sum', 'relative_humidity_2m_max', 'relative_humidity_2m_min'],
        timezone: 'auto',
      },
    });
    const daily = response.data.daily;
    // Defensive: check if daily arrays exist and have data
    if (!daily || !daily.temperature_2m_max || !daily.temperature_2m_min || !daily.precipitation_sum || !daily.relative_humidity_2m_max || !daily.relative_humidity_2m_min) {
      return null;
    }
    // Calculate average temperature and humidity for the month
    const avgTemp = (
      daily.temperature_2m_max.reduce((a: number, b: number) => a + b, 0) +
      daily.temperature_2m_min.reduce((a: number, b: number) => a + b, 0)
    ) / (daily.temperature_2m_max.length + daily.temperature_2m_min.length);
    const avgHumidity = (
      daily.relative_humidity_2m_max.reduce((a: number, b: number) => a + b, 0) +
      daily.relative_humidity_2m_min.reduce((a: number, b: number) => a + b, 0)
    ) / (daily.relative_humidity_2m_max.length + daily.relative_humidity_2m_min.length);
    const totalPrecipitation = daily.precipitation_sum.reduce((a: number, b: number) => a + b, 0);
    // Determine weather condition
    let condition = 'Clear';
    if (totalPrecipitation > 50) condition = 'Rain';
    else if (avgHumidity > 80) condition = 'Clouds';
    else if (avgTemp < 10) condition = 'Cold';
    // Return structured data
    return {
      city,
      region,
      month,
      year,
      temperature: Math.round(avgTemp),
      humidity: Math.round(avgHumidity),
      condition,
      // Add raw daily data for further use if needed
      raw: daily
    };
  }
}

export const weatherService = new WeatherService();