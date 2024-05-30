import { useCountDown } from "@/hooks/useCountDown";
import useSocketOn from "@/hooks/useSocketOn";
import { useOverLayActions } from "@/store/overlay-store";
import { useState } from "react";

const RoundTimer = () => {
  //NOTE - count, isTimer 전역관리하기 이유) socket Event의 isSelect 부분이 실행될 때 timer값을 현재 RoundTimer 컴포넌트에 전달해야하므로
  const [count, setCount] = useState(0);
  const [isTimer, setIsTimer] = useState(false);
  const { setIsOverlay } = useOverLayActions();

  const minutes = Math.floor((count % 3600) / 60);
  const seconds = Math.floor(count % 60);

  //NOTE - 마피아 player들끼리 확인하는 시간, 토론시간, 최후의 변론 시간
  const sockets = {
    timerStatus: (timer: number) => {
      setCount(timer);
      setIsTimer(true);
    },
    inSelect: (isClick: boolean, timer: number) => {
      //NOTE - 공통적인 요소
      setCount(timer);
      setIsTimer(true);
      setIsOverlay(true);

      //NOTE - 지속적인 클릭 이벤트
      if (isClick) {
      }

      //NOTE - 주어진 시간동안 한번만 클릭 이벤트
      if (!isClick) {
      }
    }
  };

  //NOTE - socket On, Off 담당
  useSocketOn(sockets);

  //NOTE - 타이머 기능
  useCountDown(() => setCount((prevCount) => prevCount - 1), 1000, isTimer);

  //NOTE - 타이머 종료
  if (count <= 0 && isTimer) {
    setIsTimer(false);
  }

  return (
    <>
      <h2>
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </h2>
    </>
  );
};

export default RoundTimer;
