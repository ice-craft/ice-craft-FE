import { useGameActions, useIsReady } from "@/store/game-store";
import useConnectStore from "@/store/connect-store";
import { socket } from "@/utils/socket/socket";
import { useState } from "react";
import { useLocalParticipant, useParticipants } from "@livekit/components-react";
import useSocketOn from "@/hooks/useSocketOn";

const GameStartButton = () => {
  const { roomId } = useConnectStore();
  const participants = useParticipants();
  const [isStart, setIsStart] = useState(false);
  const { localParticipant } = useLocalParticipant();

  const isReady = useIsReady();
  const { setIsReady } = useGameActions();

  //NOTE - 게임 준비 이벤트 핸들러
  const readyHandler = () => {
    const newIsReady = !isReady;
    const userId = localParticipant.identity;

    setIsReady(newIsReady);
    socket.emit("setReady", userId, newIsReady);
  };

  //NOTE - 게임 시작 이벤트 핸들러
  const startHandler = () => {
    const playersCount = participants.length;

    socket.emit("gameStart", roomId, playersCount);
  };

  //NOTE - 방장일 경우에만 "게임시작 버튼" 활성화
  const sockets = {
    chiefStart: () => {
      setIsStart(true);
    }
  };

  useSocketOn(sockets);

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
