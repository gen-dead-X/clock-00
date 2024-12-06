import { useContext, useEffect, useState } from "react";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import "./HomeClock.scss";
import useDateAndTime from "../../hooks/useDateAndTime";
import { UserContext } from "../../Context/UserContext";
import BackgroundClock from "../../ui/BackgroundClock/BackgroundClock";
import ThemeToggleButton from "../../ui/ThemeToggleButton/ThemeToggleButton";

export default function HomeClock() {
  const { hourAngle, minuteAngle, secondAngle, time } = useDateAndTime();
  const { darkMode } = useContext(UserContext);

  return (
    <div className="flex h-dvh w-dvw items-center justify-center p-10 bg-gray-300 dark:bg-slate-800">
      <div className="flex general-shadow items-center justify-center rounded-[3rem] clock flex-1 relative h-full">
        <ThemeToggleButton />

        <BackgroundClock />

        <div className="relative bg-white dark:bg-slate-900 flex h-[20rem] w-[20rem] items-center justify-center rounded-full border-[5px] dark:border-gray-100 border-gray-900 text-center text-gray-900">
          <div className="analog-container relative h-full w-full z-30">
            <div className="h-2 w-2 z-40 bg-blue-700 dark:bg-blue-300 rounded-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" />

            {/* Hour Hand */}
            <motion.div
              className="absolute z-10"
              style={{
                height: "30%",
                width: "4px",
                backgroundColor: darkMode ? "white" : "black",
                borderRadius: "2px",
                bottom: "50%",
                left: "50%",
                transformOrigin: "bottom center",
                transform: "translateX(-50%)",
              }}
              animate={{ rotate: hourAngle }}
              transition={{ type: "spring", stiffness: 50, damping: 20 }}
            />

            {/* Minute Hand */}
            <motion.div
              className="absolute z-10"
              style={{
                height: "40%",
                width: "3px",
                backgroundColor: darkMode ? "white" : "black",
                borderRadius: "2px",
                bottom: "50%",
                left: "50%",
                transformOrigin: "bottom center",
                transform: "translateX(-50%)",
              }}
              animate={{ rotate: minuteAngle }}
              transition={{ type: "spring", stiffness: 50, damping: 20 }}
            />

            {/* Second Hand */}
            <motion.div
              className="absolute z-20"
              style={{
                height: "48%",
                width: "2px",
                backgroundColor: "red",
                borderRadius: "1px",
                bottom: "50%",
                left: "50%",
                transformOrigin: "bottom center",
                transform: "translateX(-50%)",
              }}
              animate={{ rotate: secondAngle }}
              transition={{ type: "linear", duration: 1, ease: "linear" }}
            />
          </div>

          {/* Digital Clock (Faded) */}
          <div className="digital-container absolute opacity-20">
            <DisplayTime time={time} />
          </div>
        </div>
      </div>
    </div>
  );
}

function DisplayTime({
  time,
}: Readonly<{
  time: Date;
}>) {
  const hour = format(time, "HH");
  const minute = format(time, "mm");
  const second = format(time, "ss");

  return (
    <div className="flex gap-2 text-4xl font-bold">
      {renderSlidingDigits(hour)}
      <span>:</span>
      {renderSlidingDigits(minute)}
      <span>:</span>
      {renderSlidingDigits(second)}
    </div>
  );
}

function renderSlidingDigits(value: string) {
  return (
    <div className="flex">
      {value.split("").map((digit, index) => (
        <SlidingDigit key={index} digit={digit} />
      ))}
    </div>
  );
}

function SlidingDigit({ digit }: Readonly<{ digit: string }>) {
  const [currentDigit, setCurrentDigit] = useState(digit);

  useEffect(() => {
    if (digit !== currentDigit) {
      setCurrentDigit(digit);
    }
  }, [digit, currentDigit]);

  return (
    <div className="relative flex h-12 w-8 items-center justify-center overflow-hidden dark:text-white">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentDigit}
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{ type: "spring", stiffness: 150, damping: 20 }}
          className="clock-digit absolute top-0 w-full text-center"
        >
          {currentDigit}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
