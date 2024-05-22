import useConnectStore from "@/store/connect-store";
import { useReadyStore } from "@/store/toggle-store";
import { socket } from "@/utils/socket/socket";
import { useState } from "react";

const GameStartButton = () => {
  const { roomId, userId } = useConnectStore();
  const { isReady, setIsReady } = useReadyStore();

  const readyHandler = () => {
    const newIsReady = !isReady;
    setIsReady(newIsReady);
    socket.emit("setReady", userId, newIsReady, roomId);
  };

  //FIXME - 추후) 방장일 경우에만 버튼 활성화
  const startHandler = () => {
    console.log("start 클릭");
    socket.emit("testStart", roomId, 5);
  };

  return (
    <>
      <button style={{ backgroundColor: isReady ? "#5c5bad" : "#bfbfbf" }} onClick={readyHandler}>
        {isReady ? "취소" : "게임 준비"}
      </button>
      <button onClick={startHandler}>게임시작</button>
    </>
  );
};

export default GameStartButton;
