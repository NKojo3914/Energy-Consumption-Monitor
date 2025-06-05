import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Adjust as needed

export const getEnergyData = async () => {
  const response = await axios.get(`${API_BASE_URL}/energy`);
  return response.data;
};

export const postEnergyData = async (data: any) => {
  const response = await axios.post(`${API_BASE_URL}/energy`, data);
  return response.data;
};
