import useWeather from '@/hooks/useWeather';

export default function WeatherWrapper() {
  const { weather } = useWeather();

  if (!weather) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div>
        <span>Temperature</span>:<span>{weather?.currentConditions.feelslike}</span>
      </div>
    </div>
  );
}
