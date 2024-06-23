import { useEffect, useRef } from "react";

// count가 변화하더라도 useCountDown 내부의 useEffect 훅이 불필요하게 리렌더링되지 않는다.
export const useCountDown = (callback: () => void, delay: number, isCount: boolean) => {
  const savedCallback = useRef<() => void>(callback);

  useEffect(() => {
    if (!isCount || !delay) {
      return;
    }

    //현재 저장된 콜백 함수 호출
    const tick = () => {
      savedCallback.current();
    };

    const timerId = setInterval(tick, delay);

    return () => {
      clearInterval(timerId);
    };
  }, [isCount]);
};
