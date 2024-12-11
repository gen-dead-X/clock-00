import type { WeatherData } from '@/types/weather';
import { createContext } from 'react';

type WeatherContextType = {
  weather: WeatherData | null;
  setWeather: React.Dispatch<React.SetStateAction<WeatherData | null>>;
  weatherTheme: {
    background: string;
    color: string;
  } | null;
};

const WeatherContext = createContext<WeatherContextType>({
  weather: null,
  setWeather: () => new Error('setWeather function was not provided in WeatherContext'),
  weatherTheme: null,
});

export default WeatherContext;
