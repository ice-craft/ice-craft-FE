import React, { useState } from "react";
import { useCountDown } from "@/hooks/useCountDown";
import useSocketOn from "@/hooks/useSocketOn";
import useSocketOff from "@/hooks/useSocketOff";
import { useModalTimer } from "@/store/show-modal-store";

const RoundTimer = () => {
  const [timer, setTimer] = useState<number | null>(null);
  const [count, setCount] = useState(timer);
  //   const count = useCountDown(timer, 1000);

  useCountDown(() => {
    if (!count) {
      return;
    }
    setCount(count - 1);
  }, 1000);

  const sockets = {
    //NOTE - 마피아 player들끼리 확인하는 시간, 토론시간, 최후의 변론 시간
    timerStatus: (timer: number) => {
      setTimer(timer);
    }
  };

  //NOTE - socket On, Off 담당
  useSocketOn(sockets);
  useSocketOff(sockets);

  console.log("count", count);

  return (
    <>
      <h2>00 : 00</h2>
    </>
  );
};

export default RoundTimer;
