import { useEffect, useState } from "react";
import { useModalStore } from "../store/modal-store";

export const useCountDown = (initialTime: number) => {
  const { isModal, setIsModal } = useModalStore();
  const [count, setCount] = useState(initialTime);

  useEffect(() => {
    let timer = initialTime;
    const intervalId = setInterval(() => {
      timer--;
      setCount((prev) => prev - 1);

      if (timer === -1) {
        setIsModal(false);
        setCount(0);
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isModal]);

  return count;
};
