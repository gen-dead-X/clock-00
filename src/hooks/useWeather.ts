import WeatherContext from '@/Context/WeatherContext';
import { useCallback, useContext } from 'react';

export default function useWeather() {
  const { weather, setWeather: setWeatherUncached } = useContext(WeatherContext);

  const setWeather = useCallback(() => setWeatherUncached, [setWeatherUncached]);

  return { weather, setWeather };
}
