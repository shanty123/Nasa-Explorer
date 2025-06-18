import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';


export const getApod = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/planetary/apod`);
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch APOD data');
  }
};
