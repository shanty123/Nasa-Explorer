import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const getInsightWeather = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/insight_weather`);
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch weather data');
  }
};
