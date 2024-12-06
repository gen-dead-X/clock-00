import { useEffect, useState } from 'react';

export default function useDateAndTime() {
  const [time, setTime] = useState(new Date());
  const [secondAngle, setSecondAngle] = useState(time.getSeconds() * 6);

  useEffect(() => {
    const interval = setInterval(() => {
      const newTime = new Date();
      setTime(newTime);
      setSecondAngle((prev) => prev + 6);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hourAngle = (time.getHours() % 12) * 30 + time.getMinutes() * 0.5;
  const minuteAngle = time.getMinutes() * 6;

  return { time, secondAngle, minuteAngle, hourAngle };
}
