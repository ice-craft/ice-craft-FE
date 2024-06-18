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
  //NOTE - 서버에서 게임 실행 조건을 충족 되었을 경우 "chiefStart"라는 socket Event를 전달하여 게임 시작버튼을 활성화 시키므로 유효성검사는 충족되어 별도로
  const startHandler = () => {
    socket.emit("gameStart", roomId, playersCount);

    // 버튼 비활성화
    setIsStart(true);

    // 이미지 초기화clearActiveImage
    clearActiveImage();
    setIsReady(false);
  };

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
