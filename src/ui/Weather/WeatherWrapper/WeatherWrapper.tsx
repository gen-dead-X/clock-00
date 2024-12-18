import useWeather from '@/hooks/useWeather';
import SmallLoader from '@/ui/Global/Loaders/SmallLoader/SmallLoader';
import './WeatherWrapper.scss';
import type React from 'react';
import { useRef } from 'react';
import useColorScheme from '@/hooks/useColorScheme';
import { format, parse } from 'date-fns';

export default function WeatherWrapper() {
  const { weather } = useWeather();
  const imgRef = useRef<HTMLImageElement | null>(null);
  const { gradientColors } = useColorScheme({
    imgRef,
    dependency: weather as unknown as React.DependencyList,
  });

  if (!weather) {
    return (
      <div className="flex h-full w-full items-center justify-center text-4xl">
        <SmallLoader />
      </div>
    );
  }

  return (
    <div
      style={
        {
          '--weather-card-color': `linear-gradient(135deg, ${gradientColors[0]}, ${gradientColors[1]}, ${gradientColors[2]})`,
        } as React.CSSProperties
      }
      className="weather-wrapper-full flex h-full w-full items-center justify-center"
    >
      <div className="weather-wrapper w-[40rem] rounded-3xl p-10">
        <div className="flex flex-col items-center justify-between">
          <div>
            <img
              ref={imgRef}
              className="h-40 w-40 object-contain"
              src="/weatherIcons/defaultIcons/defaultNight.svg"
              alt="weather-icon"
              crossOrigin="anonymous"
            />
            {/* <canvas ref={canvasRef} style={{ display: 'none' }} /> */}
            <p className="text-4xl">
              {weather.currentConditions.temp}
              <sup>o</sup>C
            </p>
          </div>
          <div>
            <p>{weather.currentConditions.conditions}</p>
            <p>
              Feels Like {weather.currentConditions.feelslike}
              <sup>o</sup>C
            </p>
          </div>
          <div className="flex w-full justify-between">
            <p>
              Sunrise :{' '}
              {format(
                parse(weather.currentConditions.sunrise, 'HH:mm:ss', new Date()),
                'hh:mm:ss a',
              )}
            </p>
            <p>
              Sunset :{' '}
              {format(
                parse(weather.currentConditions.sunset, 'HH:mm:ss', new Date()),
                'hh:mm:ss a',
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
