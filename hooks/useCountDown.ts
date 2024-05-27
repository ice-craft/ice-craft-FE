import { useEffect, useRef, useState } from "react";

// export const useCountDown = (initialTime: number | null, ms: number) => {
//   const [time, setTime] = useState<number | null>(initialTime); // 초기값이 null인 경우 null로 설정

//   useEffect(() => {
//     if (initialTime === -1) {
//       console.log("initialTime", initialTime);
//       return;
//     }

//     // setTime(initialTime * multiplication);

//     console.log("time", time); //현재 time이라는 값이 변화되지 않는 걸 볼 수 있다.
//     console.log("ms", ms);

//     const timer = setInterval(() => {
//       setTime((prevTime) => {
//         if (prevTime === null || prevTime <= 0) {
//           clearInterval(timer);
//           return 0;
//         }
//         return prevTime - 1;
//       });
//     }, ms);

//     return () => {
//       console.log("TimerClear 종료");
//       clearInterval(timer);
//     };
//   }, [initialTime]);

//   return time;
// };

export const useCountDown = (callback: any, delay: any) => {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    // cf. delay 인자에 null 값을 전달할 경우 타이머를 멈출 수 있음
    if (delay === null) return;

    const timer = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(timer);
  }, [delay]);
};
