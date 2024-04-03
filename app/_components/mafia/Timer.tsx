import React, { useEffect, useState } from "react";

const Timer = () => {
  //임시 모달창 조건문
  const [isTest, setIsTest] = useState(true);

  //타이머
  const [count, setCount] = useState(5);

  //state의 변화로 인해 리렌더링 발생
  // useEffect(() => {
  //   if (isTest) {
  //     let timer = 5;
  //     const intervalId = setInterval(() => {
  //       setCount((prevCount) => prevCount - 1);
  //       timer--;

  //       if (timer === -1) {
  //         // 반복 실행을 멈출 때 사용
  //         setIsTest(false);
  //         setCount(5);
  //         clearInterval(intervalId);
  //       }
  //       console.log(timer);
  //     }, 1100);
  //   }
  // }, [isTest]);
  useEffect(() => {
    if (isTest) {
      let timer = 5;
      const intervalId = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
        timer--;

        if (timer === -1) {
          setIsTest(false);
          setCount(5);
          clearInterval(intervalId);
        }
        console.log(timer);
      }, 1100);
    }
  }, [isTest]);

  return (
    <div>
      <p className="text-6xl text-black"> {count}</p>
    </div>
  );
};

export default Timer;
