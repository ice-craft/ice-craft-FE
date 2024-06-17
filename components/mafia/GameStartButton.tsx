import useSocketOn from "@/hooks/useSocketOn";
import { useGameActions, useIsReady } from "@/store/game-store";
import { useOverLayActions } from "@/store/overlay-store";
import { socket } from "@/utils/socket/socket";
import { useLocalParticipant, useParticipants } from "@livekit/components-react";
import { useState } from "react";

const GameStartButton = () => {
  const [isAllReady, setIsAllReady] = useState(false);
  const isReady = useIsReady();
  const { setIsReady, setIsStart } = useGameActions();
  const { clearActiveImage } = useOverLayActions();

  const participants = useParticipants();
  const { localParticipant } = useLocalParticipant();
  const playersCount = participants.length;
  const userId = localParticipant.identity;
  const roomId = localParticipant.metadata;

  //NOTE - 게임 준비 이벤트 핸들러
  const readyHandler = () => {
    const newIsReady = !isReady;
    setIsReady(newIsReady);

    socket.emit("setReady", userId, newIsReady);
  };

  //NOTE - 게임 시작 이벤트 핸들러
  const startHandler = () => {
    socket.emit("gameStart", roomId, playersCount);

    // 버튼 비활성화
    setIsStart(false);
    // 이미지 초기화clearActiveImage
    clearActiveImage();
  };

  //NOTE - 방장일 경우에만 "게임시작 버튼" 활성화
  const sockets = {
    chiefStart: () => {
      console.log("니가 방장이다");
      setIsAllReady(true);
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
