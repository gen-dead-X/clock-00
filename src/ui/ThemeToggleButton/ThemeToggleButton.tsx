import { useContext, useState } from "react";
import { motion, useMotionValue, useAnimation } from "framer-motion";
import { UserContext } from "../../Context/UserContext";
import LottiePlayer from "lottie-react";
import clockLottie from "../../lotiie/clock-lottie.json";
import "./ThemeToggleButton.scss";
import lightModeBulb from "../../assets/theme/lightModeBuld.svg";
import darkModeBulb from "../../assets/theme/dakrModeBuld.svg";

export default function ThemeToggleButton() {
  const { darkMode, setDarkMode } = useContext(UserContext);
  const [showLottie, setShowLottie] = useState(false);
  const yValue = useMotionValue(0); // Track the button's position
  const controls = useAnimation(); // Control animations

  const handleDragEnd = (_, info) => {
    if (info.offset.y > 50) {
      handleThemeChange(); // Trigger the theme change
    }

    // Reset position to the original (0)
    controls.start({ y: 0 });
  };

  function handleThemeChange() {
    try {
      setShowLottie(true);
      if (darkMode) {
        document.querySelector("body")?.classList.remove("dark");
        localStorage.setItem("dark", "false");
        setDarkMode(false);
        return;
      }

      document.querySelector("body")?.classList.add("dark");
      setDarkMode(true);
      localStorage.setItem("dark", "true");
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setShowLottie(false);
      }, 2000);
    }
  }

  return (
    <>
      {showLottie && <Lottie />}
      <motion.div>
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
    </>
  );
}

function Lottie() {
  return (
    <div className="clock-lottie fixed top-0 right-0 h-dvh w-dvw z-40 cursor-wait">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {/* <LottiePlayer
          loop
          animationData={clockLottie}
          className="h-[10rem] w-[10rem] lg:h-[40rem] lg:w-[40rem] dark:text-gray-900 text-gray-900"
        /> */}
      </div>
    </div>
  );
}
