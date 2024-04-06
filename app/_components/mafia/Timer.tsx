import { useModalStore } from "@/app/_store/modal-store";
import React, { useEffect, useState } from "react";

const Timer = () => {
  const { isModal, setIsModal } = useModalStore();

  const InitialTimerSecond = 5;
  const [count, setCount] = useState(InitialTimerSecond);

  useEffect(() => {
    let timer = InitialTimerSecond;
    const intervalId = setInterval(() => {
      timer--;
      setCount((prev) => prev - 1);

      if (timer === -1) {
        setIsModal(false);
        setCount(InitialTimerSecond);
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isModal]);

  return (
    <div>
      <p className="text-6xl text-black"> {count}</p>
    </div>
  );
};

export default Timer;
