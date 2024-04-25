import useShowModalStore from "@/store/showModal.store";
import { useEffect, useState } from "react";

export const useCountDown = (initialSecond: number) => {
  const [count, setCount] = useState(initialSecond * 10);
  const { setIsClose, setIsOpen } = useShowModalStore();

  useEffect(() => {
    let timer = initialSecond * 10;

    const intervalId = setInterval(() => {
      if (timer === 0) {
        setIsClose(true);
        setIsOpen(false);
        setCount(0);
        clearInterval(intervalId);
      } else {
        timer--;
        setCount((prev) => prev - 1);
      }

      if (timer <= 0) {
        return;
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  return count;
};
