import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export const getInsightWeather = async () => {
  try {
    const response = await apiClient.get("/insight_weather");
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.error ||
      error.message ||
      "Failed to fetch weather data";
    throw new Error(message);
  }
};
