import { useCountDown } from "@/hooks/useCountDown";
import useSocketOn from "@/hooks/useSocketOn";
import { useInSelect, useOverLayActions } from "@/store/overlay-store";
import { useEffect, useState } from "react";
import S from "@/style/livekit/livekit.module.css";

const SpeakTimer = () => {
  const inSelect = useInSelect();
  const [count, setCount] = useState(0);
  const [isCount, setIsCount] = useState(false);
  const { setInSelect, setOverlayReset } = useOverLayActions();

  const minutes = Math.floor((count % 3600) / 60);
  const seconds = Math.floor(count % 60);

  //NOTE - 타이머 기능
  useCountDown(() => setCount((prevCount) => prevCount - 1), 1000, isCount);

  //NOTE - 타이머 종료 및 클릭 이벤트 비활성화
  useEffect(() => {
    // 타이머 종료
    if (count <= 0 && isCount) {
      setIsCount(false);
    }
    // 캠 클릭 이벤트 비활성화 및 캠 이미지 초기화
    if (count <= 0 && isCount && inSelect) {
      setOverlayReset();
    }
  }, [count]);

  const sockets = {
    //NOTE - 마피아 player들끼리 확인하는 시간, 토론시간, 최후의 변론 시간
    timerStatus: (timer: number) => {
      setCount(timer);
      setIsCount(true);
    },
    //NOTE - 투표 시간, 특정 직업의 선택 시간
    inSelect: (message: string, timer: number) => {
      setCount(timer);
      setIsCount(true);
      setInSelect(message);
    }
  };

  // NOTE - socket On, Off 담당
  useSocketOn(sockets);

  return (
    <>
      <div className={S.timerCount}>
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </div>
    </>
  );
};

export default SpeakTimer;
