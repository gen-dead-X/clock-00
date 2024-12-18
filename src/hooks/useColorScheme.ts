import React, { useCallback, useEffect } from 'react';

export default function useColorScheme({
  imgRef,
  dependency = undefined,
  limit = 3,
}: {
  imgRef: React.MutableRefObject<HTMLImageElement | null>;
  dependency?: React.DependencyList;
  limit?: number;
}) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const [gradientColors, setGradientColors] = React.useState<string[]>([]);

  const generateColorScheme = useCallback(() => {
    if (!imgRef.current) return;

    // Create canvas element properly
    if (!canvasRef.current) {
      canvasRef.current = document.createElement('canvas');
    }

    const img = imgRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    if (!ctx) return;

    canvas.width = img.naturalWidth || img.width;
    canvas.height = img.naturalHeight || img.height;

    try {
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
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

      let limitedArray: string[] = [];

      if (limit === 3) {
        limitedArray = [
          sortedColors[0][0],
          sortedColors[Math.round(sortedColors.length / 2)][0] ?? sortedColors[0][0],
          sortedColors[sortedColors.length - 1][0] ?? sortedColors[0][0],
        ];
      } else {
        limitedArray = sortedColors
          .slice(0, limit - 1)
          .map(([color]) => color) as unknown as string[];
      }

      setGradientColors(limitedArray);
    } catch (error) {
      console.error('Error processing image:', error);
    }
  }, [imgRef, limit]);

  useEffect(() => {
    dependency;

    if (imgRef.current?.complete) {
      generateColorScheme();
    }

    if (imgRef.current) {
      imgRef.current.addEventListener('load', generateColorScheme);
      return () => imgRef.current?.removeEventListener('load', generateColorScheme);
    }
  }, [imgRef, generateColorScheme, dependency]);

  return { gradientColors, generateColorScheme };
}
