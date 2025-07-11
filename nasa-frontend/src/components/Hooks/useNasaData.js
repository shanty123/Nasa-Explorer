import { useEffect, useState } from "react";
import { getApod } from "../../api/apod";
import { getInsightWeather } from "../../api/insightWeather";

export default function useNasaData() {
  const [apod, setApod] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([getApod(), getInsightWeather()])
      .then(([apodData, weather]) => {
        setApod(apodData);
        setWeatherData(weather);
      })
      .catch(() => {
        setError("Failed to load NASA data.");
      })
      .finally(() => setLoading(false));
  }, []);

  return { apod, weatherData, loading, error };
}
