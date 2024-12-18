import { motion } from 'framer-motion';
import useDateAndTime from '../../hooks/useDateAndTime';
import { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';
import './BackgroundClock.scss';

export default function BackgroundClock() {
  const { hourAngle, minuteAngle, secondAngle } = useDateAndTime();
  const { darkMode } = useContext(UserContext);

  return (
    <div className="background-clock-container absolute left-0 top-0 z-[-20] flex h-full w-full items-center justify-center opacity-0 blur-sm">
      <div className="relative h-full w-full">
        {/* Hour Hand */}
        <motion.div
          className="absolute z-10"
          style={{
            height: '30%',
            width: '4px',
            backgroundColor: darkMode ? 'white' : 'black',
            borderRadius: '2px',
            bottom: '50%',
            left: '50%',
            transformOrigin: 'bottom center',
            transform: 'translateX(-50%)',
          }}
          animate={{ rotate: hourAngle }}
          transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        />

        {/* Minute Hand */}
        <motion.div
          className="absolute z-10"
          style={{
            height: '40%',
            width: '3px',
            backgroundColor: darkMode ? 'white' : 'black',
            borderRadius: '2px',
            bottom: '50%',
            left: '50%',
            transformOrigin: 'bottom center',
            transform: 'translateX(-50%)',
          }}
          animate={{ rotate: minuteAngle }}
          transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        />

        {/* Second Hand */}
        <motion.div
          className="absolute z-20"
          style={{
            height: '48%',
            width: '2px',
            backgroundColor: 'red',
            borderRadius: '1px',
            bottom: '50%',
            left: '50%',
            transformOrigin: 'bottom center',
            transform: 'translateX(-50%)',
          }}
          animate={{ rotate: secondAngle }}
          transition={{ type: 'linear', duration: 1, ease: 'linear' }}
        />
      </div>
    </div>
  );
}
