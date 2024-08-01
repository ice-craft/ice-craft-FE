import { useEffect, useRef } from "react";

export const useCountDown = (callback: () => void, delay: number, isCount: boolean) => {
  const savedCallback = useRef<() => void>(callback);

  useEffect(() => {
    if (!isCount || !delay) {
      return;
    }

    const tick = () => {
      savedCallback.current();
    };

    const timerId = setInterval(tick, delay);

    return () => {
      clearInterval(timerId);
    };
  }, [isCount]);
};
