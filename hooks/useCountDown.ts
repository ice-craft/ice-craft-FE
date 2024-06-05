import { useEffect, useRef, useState } from "react";

// count가 변화하더라도 useCountDown 내부의 useEffect 훅이 불필요하게 다시 실행되지 않는다는 것
export const useCountDown = (callback: () => void, delay: number, isCount: boolean) => {
  const savedCallback = useRef<() => void>(callback);

  useEffect(() => {
    if (!isCount || !delay) {
      return;
    }
    console.log("타이머 실행");

    //현재 저장된 콜백 함수 호출
    const tick = () => {
      savedCallback.current();
    };

    const timerId = setInterval(tick, delay);

    return () => {
      console.log("타이머 종료", timerId);
      clearInterval(timerId);
    };
  }, [isCount]);
};
