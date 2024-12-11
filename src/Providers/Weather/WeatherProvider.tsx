import config from '@/config/config';
import WeatherContext from '@/Context/WeatherContext';
import type { WeatherData } from '@/types/weather';
import axios from 'axios';
import { differenceInHours } from 'date-fns';
import { type ReactNode, useEffect, useMemo, useState } from 'react';

export default function WeatherProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [weatherTheme, setWeatherTheme] = useState<{ background: string; color: string } | null>(
    null,
  );

  useEffect(() => {
    async function getWeather() {
      try {
        const cachedWeather = localStorage.getItem('weather');

        if (cachedWeather) {
          const weatherTime = localStorage.getItem('weatherTime');

          if (weatherTime) {
            const cachedTime = new Date(weatherTime);
            const currentTime = new Date();

            if (differenceInHours(currentTime, cachedTime) < 4) {
              console.log('Using cached weather data.', JSON.parse(cachedWeather));
              setWeather(JSON.parse(cachedWeather));
              return;
            }
          }
        }

        const res = (
          await axios.get(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/22.577410089467445%2C%2088.43149364671405?unitGroup=metric&key=${config.WEATHER_API}&contentType=json`,
          )
        ).data;

        setWeather(res as WeatherData);
        localStorage.setItem('weather', JSON.stringify(res));
        localStorage.setItem('weatherTime', new Date().toISOString());
      } catch (e) {
        console.log(e);
      } finally {
        setWeatherTheme({
          background: '#93c5fd',
          color: '#1e3a8a',
        });
      }
    }

    getWeather();
  }, []);

  const cachedValue = useMemo(
    () => ({
      weather,
      setWeather,
      weatherTheme,
    }),
    [weather, weatherTheme],
  );

  return <WeatherContext.Provider value={cachedValue}>{children}</WeatherContext.Provider>;
}
