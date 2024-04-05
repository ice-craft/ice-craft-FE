import { useModalStore } from "@/app/_utils/store/modal-store";
import React, { useEffect, useState } from "react";

const Timer = () => {
  //임시 모달창 조건문
  const { isModal, setIsModal } = useModalStore();

  //타이머
  const [count, setCount] = useState(5);

  useEffect(() => {
    let timer = 5;
    const intervalId = setInterval(() => {
      timer--;
      setCount((prev) => prev - 1);

      if (timer === -1) {
        // 반복 실행을 멈출 때 사용
        setIsModal(false);

        setCount(5);
        clearInterval(intervalId);
      }
    }, 1100);
    //언마운트 전에  시 종료
    return () => clearInterval(intervalId);
  }, [isModal]);

  return (
    <div>
      <p className="text-6xl text-black"> {count}</p>
    </div>
  );
};

export default Timer;
