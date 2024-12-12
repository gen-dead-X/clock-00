import useWeather from '@/hooks/useWeather';
import SmallLoader from '@/ui/Global/Loaders/SmallLoader/SmallLoader';
import './WeatherWrapper.scss';
import React, { useEffect, useRef, useState } from 'react';

export default function WeatherWrapper() {
  const { weather } = useWeather();
  const imgRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [gradientColors, setGradientColors] = useState<string[]>(['#ffffff', '#ffffff']);

  useEffect(() => {
    console.log('Here');

    if (!imgRef.current || !canvasRef.current) return;

    console.log('Here 2');

    const img = imgRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      if (!ctx) return;

      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, img.width, img.height);
      const { data } = imageData;

      const colorCounts: Record<string, number> = {};
      const threshold = 32;

      function roundColor(value: number) {
        return Math.round(value / threshold) * threshold;
      }

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];

        if (a === 0) continue;

        if ((r === 0 && g === 0 && b === 0) || (r === 255 && g === 255 && b === 255)) continue;

        const roundedColor = `rgb(${roundColor(r)},${roundColor(g)},${roundColor(b)})`;

        colorCounts[roundedColor] = (colorCounts[roundedColor] || 0) + 1;
      }

      const sortedColors = Object.entries(colorCounts).sort((a, b) => b[1] - a[1]);
      console.log(sortedColors);

      const primaryColor = sortedColors[0]?.[0] || '#ffffff';
      const secondaryColor = sortedColors[1]?.[0] || '#ffffff';

      console.log(primaryColor, secondaryColor);

      setGradientColors([primaryColor, secondaryColor]);
    };
  }, [weather]);

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
          '--weather-card-color': `linear-gradient(135deg, ${gradientColors[0]}, ${gradientColors[1]})`,
        } as React.CSSProperties
      }
      className="weather-wrapper-full flex h-full w-full items-center justify-center"
    >
      <div className="weather-wrapper xl:w1/3 w-1/2 rounded-3xl p-10">
        <div className="flex items-center justify-between">
          <div>
            <img
              ref={imgRef}
              src="/weatherIcons/defaultIcons/defaultNight.svg"
              alt="weather-icon"
            />
            <canvas ref={canvasRef} style={{ display: 'none' }} />
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
        </div>
      </div>
    </div>
  );
}
