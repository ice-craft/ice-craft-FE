import { useEffect, useRef, useState } from "react";
import { useModalStore } from "../_store/modal-store";

export const useCountDown = (initialTime: number) => {
  const { isModal, setIsModal } = useModalStore();
  const time = useRef(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      time.current--;

      if (time.current == -1) {
        clearInterval(timer);
        setIsModal(false);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isModal]);

  return time.current;
};

// const { isModal, setIsModal } = useModalStore();
// const InitialTimerSecond = 5;
// const count = useRef<number>(InitialTimerSecond);

// useEffect(() => {
//   let timer = InitialTimerSecond;
//   const intervalId = setInterval(() => {
//     //   setCount((prevCount) => prevCount--);
//     timer--;

//     if (timer === -1) {
//       setIsModal(false);
//       clearInterval(intervalId);
//     }
//   }, 1000);
//   count.current = timer;
//   return () => clearInterval(intervalId);
// }, [isModal]);

// return count.current;
