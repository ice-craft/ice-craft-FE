import useSocketOn from "@/hooks/useSocketOn";
import { useState } from "react";

const GameStartButton = ({ isReady, readyHandler, startHandler }: any) => {
  const [isAllReady, setIsAllReady] = useState(false);

  //NOTE - 방장일 경우에만 "게임시작 버튼" 활성화 및 비활성화
  const sockets = {
    chiefStart: (isStart: boolean) => {
      if (isStart) {
        console.log("니가 방장이며, 게임 시작할 수 있다.");
        setIsAllReady(true);
      }
      if (!isStart) {
        console.log("니가 방장이지만, 게임 시작할 수 없다.");
        setIsAllReady(false);
      }
    }
  };
  useSocketOn(sockets);

  return (
    <>
      {isAllReady && <button onClick={startHandler}>게임시작</button>}

      {!isAllReady && (
        <button style={{ backgroundColor: isReady ? "#5c5bad" : "#bfbfbf" }} onClick={readyHandler}>
          {isReady ? "취소" : "게임 준비"}
        </button>
      )}
    </>
  );
};

export default GameStartButton;
