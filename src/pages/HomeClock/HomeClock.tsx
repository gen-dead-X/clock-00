import { useEffect, useState } from "react";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import "./HomeClock.scss";
import useDateAndTime from "../../hooks/useDateAndTime";

export default function HomeClock() {
  const { hourAngle, minuteAngle, secondAngle, time } = useDateAndTime();

  return (
    <div className="clock relative z-[50] flex h-screen w-screen items-center justify-center">
      <div className="relative flex h-[20rem] w-[20rem] items-center justify-center rounded-full border-[5px] border-gray-900 text-center text-gray-900">
        <div className="analog-container relative h-full w-full z-30">
          {/* Hour Hand */}
          <motion.div
            className="absolute z-10"
            style={{
              height: "30%",
              width: "4px",
              backgroundColor: "black",
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
              backgroundColor: "black",
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
  );
}

function DisplayTime({
  time,
}: Readonly<{
  time: Date;
}>) {
  const hour = format(time, "hh");
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
    <div className="relative flex h-12 w-8 items-center justify-center overflow-hidden">
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
