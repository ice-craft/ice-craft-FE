import { useCountDown } from "@/hooks/useCountDown";
import useSocketOn from "@/hooks/useSocketOn";
import { useIsLocalOverlay, useIsRemoteOverlay, useOverLayActions } from "@/store/overlay-store";
import { useEffect, useState } from "react";

const RoundTimer = () => {
  const [count, setCount] = useState(0);
  const [isTimer, setIsTimer] = useState(false);
  const { setIsOverlay, setInSelect } = useOverLayActions();
  const isLocalOverlay = useIsLocalOverlay();
  const isRemoteOverlay = useIsRemoteOverlay();

  const minutes = Math.floor((count % 3600) / 60);
  const seconds = Math.floor(count % 60);

  //NOTE - 타이머 기능
  useCountDown(() => setCount((prevCount) => prevCount - 1), 1000, isTimer);

  useEffect(() => {
    //NOTE - 타이머 종료
    if (count <= 0 && isTimer) {
      setIsTimer(false);
    }
    //NOTE - 타이머 종료 시 캠 클릭 이벤트 비활성화
    if (count <= 0 && isTimer && (isLocalOverlay || isRemoteOverlay)) {
      setIsOverlay(false);
    }
  }, [count]);

  const sockets = {
    //NOTE - 마피아 player들끼리 확인하는 시간, 토론시간, 최후의 변론 시간
    timerStatus: (timer: number) => {
      setCount(timer);
      setIsTimer(true);
    },
    //NOTE - 투표 시간, 특정 직업의 선택 시간
    inSelect: (message: string, timer: number) => {
      console.log("inSelect", timer);
      // OO시간
      setInSelect(message);
      // 타이머 실행
      setCount(timer);
      setIsTimer(true);
      setIsOverlay(true); // 클릭 이벤트 활성화

      // //NOTE - 지속적인 클릭 이벤트
      // if (isClick) {
      // }

      // //NOTE - 주어진 시간동안 한번만 클릭 이벤트
      // if (!isClick) {
      // }
    }
  };

  // //NOTE - socket On, Off 담당
  useSocketOn(sockets);

  return (
    <>
      <h2>
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </h2>
    </>
  );
};

export default RoundTimer;
