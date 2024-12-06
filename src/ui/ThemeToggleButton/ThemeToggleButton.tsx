import { useContext, useState } from 'react';
import { motion, useMotionValue, useAnimation } from 'framer-motion';
import { UserContext } from '../../Context/UserContext';
import './ThemeToggleButton.scss';
import lightModeBulb from '../../assets/theme/lightModeBuld.svg';
import darkModeBulb from '../../assets/theme/dakrModeBuld.svg';

export default function ThemeToggleButton() {
  const { darkMode, setDarkMode } = useContext(UserContext);
  const [showLottie, setShowLottie] = useState(false);
  const yValue = useMotionValue(0);
  const controls = useAnimation();

  const handleDragEnd = (_, info) => {
    if (info.offset.y > 50) {
      handleThemeChange();
    }

    controls.start({ y: 0 });
  };

  function handleThemeChange() {
    try {
      setShowLottie(true);
      if (darkMode) {
        document.querySelector('body')?.classList.remove('dark');
        localStorage.setItem('dark', 'false');
        setDarkMode(false);
        return;
      }

      document.querySelector('body')?.classList.add('dark');
      setDarkMode(true);
      localStorage.setItem('dark', 'true');
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setShowLottie(false);
      }, 2000);
    }
  }

  return (
    <div className="fixed h-dvh w-dvw p-10">
      {showLottie && <Lottie />}
      <motion.div className="absolute right-16 top-[34px]">
        <motion.button
          type="button"
          onClick={() => null} // Disable default click behavior
          drag="y" // Enable vertical drag
          dragConstraints={{ top: 0, bottom: 100 }} // Restrict drag downward only
          onDragEnd={handleDragEnd} // Handle drag end to trigger theme toggle
          style={{ y: yValue }} // Bind motion value to control movement
          animate={controls} // Attach animation controls for resetting
          className="relative cursor-grab active:cursor-grabbing"
        >
          {!darkMode ? (
            <img
              src={lightModeBulb}
              draggable="false"
              alt="light mode"
              className="h-full w-full p-1 hover:text-amber-500"
            />
          ) : (
            <img
              src={darkModeBulb}
              alt="dark mode"
              draggable="false"
              className="h-full w-full p-1 hover:text-blue-800"
            />
          )}
        </motion.button>
      </motion.div>
    </div>
  );
}

function Lottie() {
  return <div className="clock-lottie absolute left-0 top-0 z-[999] h-full w-full cursor-wait" />;
}
