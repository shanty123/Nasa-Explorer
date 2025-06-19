import axios from 'axios';

const BASE_URL ='/api';


export const getApod = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/planetary/apod`);
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch APOD data');
  }
};
