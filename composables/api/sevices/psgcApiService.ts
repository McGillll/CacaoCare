import axios from 'axios';

// Base URL for the PSGC API
const API_BASE_URL = 'https://psgc.cloud/api';

export interface Region {
  code: string;
  name: string;
}

export interface Province {
  code: string;
  name: string;
}

export interface City {
  code: string;
  name: string;
}

export interface Barangay {
  code: string;
  name: string;
}

// Fetch all regions
export const getRegions = async (): Promise<Region[]> => {
  const response = await axios.get<Region[]>(`${API_BASE_URL}/regions`);
  return response.data;
};

// Fetch provinces by region code
export const getProvinces = async (regionCode: string): Promise<Province[]> => {
  const response = await axios.get<Province[]>(`${API_BASE_URL}/regions/${regionCode}/provinces`);
  return response.data;
};

// Fetch cities by province code
export const getCities = async (provinceCode: string): Promise<City[]> => {
  const response = await axios.get<City[]>(`${API_BASE_URL}/provinces/${provinceCode}/cities`);
  return response.data;
};

// Fetch barangays by city code
export const getBarangays = async (cityCode: string): Promise<Barangay[]> => {
  const response = await axios.get<Barangay[]>(`${API_BASE_URL}/cities/${cityCode}/barangays`);
  return response.data;
};