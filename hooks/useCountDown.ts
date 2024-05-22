import useShowModalStore from "@/store/showModal.store";
import { useEffect, useState } from "react";

export const useCountDown = (initialSecond: number) => {
  const [count, setCount] = useState(initialSecond * 10);
  const { setIsOpen } = useShowModalStore();

  useEffect(() => {
    let timer = initialSecond * 10;

    const intervalId = setInterval(() => {
      if (timer === 0) {
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

// import { useState, useEffect } from 'react';

// function useTimer(initialTime) {
//   const [time, setTime] = useState(initialTime);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTime((prevTime) => prevTime + 1);
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [initialTime]);

//   return time;
// }
