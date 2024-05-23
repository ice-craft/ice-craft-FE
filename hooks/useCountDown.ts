import { useState, useEffect } from "react";

export const useCountDown = (initialTime: number) => {
  const [time, setTime] = useState(initialTime * 10);

  useEffect(() => {
    if (!initialTime) {
      return;
    }

    const timer = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 100);

    return () => {
      console.log("TimerClear 종료");
      clearInterval(timer);
    };
  }, [initialTime]);

  return time;
};
