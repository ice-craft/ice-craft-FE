import { useEffect, useState } from "react";
import { useModalStore } from "../store/toggle-store";

export const useCountDown = (initialSecond: number) => {
  const { isModal, setIsModal } = useModalStore();
  const [count, setCount] = useState(initialSecond * 10);

  useEffect(() => {
    let timer = initialSecond * 10;
    const intervalId = setInterval(() => {
      timer--;
      setCount((prev) => prev - 1);

      if (timer === -1) {
        setIsModal(false);
        setCount(0);
        clearInterval(intervalId);
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, [isModal, initialSecond]);

  return count;
};
