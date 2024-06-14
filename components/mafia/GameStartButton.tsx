import { useGameActions, useIsReady } from "@/store/game-store";
import useConnectStore from "@/store/connect-store";
import { socket } from "@/utils/socket/socket";
import { useState } from "react";
import { useParticipants } from "@livekit/components-react";

const GameStartButton = () => {
  const { roomId, userId } = useConnectStore();
  const [isStart, setIsStart] = useState(false);
  const playerCount = useParticipants();
  const isReady = useIsReady();
  const { setIsReady } = useGameActions();

  //NOTE - Ready 버튼
  const readyHandler = () => {
    const newIsReady = !isReady;
    setIsReady(newIsReady);
    socket.emit("setReady", userId, newIsReady, roomId);
  };

  //NOTE - 게임 시작 버튼
  const startHandler = () => {
    socket.emit("gameStart", roomId, 5);
  };

  //NOTE - 총 인원수
  console.log("인원수", playerCount);
  console.log("인원수", playerCount.length);

  //NOTE - 방장일 경우에만 "게임시작 버튼" 활성화
  socket.on("chiefStart", () => {
    setIsStart(true);
  });

  return (
    <>
      <button style={{ backgroundColor: isReady ? "#5c5bad" : "#bfbfbf" }} onClick={readyHandler}>
        {isReady ? "취소" : "게임 준비"}
      </button>
      {isStart && <button onClick={startHandler}>게임시작</button>}
    </>
  );
};

export default GameStartButton;
