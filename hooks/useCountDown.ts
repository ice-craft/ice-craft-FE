import { useState, useEffect } from "react";

export const useCountDown = (initialTime: number, multiplication: number, ms: number) => {
  const [time, setTime] = useState(initialTime * multiplication);

  useEffect(() => {
    if (!initialTime || initialTime < 0) {
      return;
    }

    const timer = setInterval(() => {
      setTime((prevTime) => {
        console.log("prevTime", prevTime);
        if (prevTime === 0) {
          clearInterval(timer);
        }

        return prevTime - 1;
      });
    }, ms);

    return () => {
      console.log("TimerClear 종료");
      clearInterval(timer);
    };
  }, [initialTime]);

  return time;
};
