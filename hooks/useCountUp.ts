// import { useEffect } from "react";
// import { useCountStore } from "../store/count-store";

// const useCountUp = (): number => {
//   const { timer, setTimer, isStart } = useCountStore();

//   useEffect(() => {
//     let intervalId: any;

//     if (isStart) {
//       intervalId = setInterval(() => {
//         setTimer(timer + 1);
//       }, 1000);
//     }

//     return () => clearInterval(intervalId);
//   }, [isStart, timer]);

//   return timer;
// };

// export default useCountUp;
