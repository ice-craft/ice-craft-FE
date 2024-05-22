import { useState, useEffect } from "react";

export const useCountDown = (initialTime: number) => {
  const [time, setTime] = useState(initialTime * 10);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 100);

    return () => {
      console.log("useCountDown UnMount");
      clearInterval(timer);
    };
  }, [initialTime]);

  return time;
};
