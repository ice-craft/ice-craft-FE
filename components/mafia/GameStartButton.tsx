import useSocketOn from "@/hooks/useSocketOn";
import { socket } from "@/utils/socket/socket";
import { useLocalParticipant, useParticipants } from "@livekit/components-react";
import { useEffect, useState } from "react";
import S from "@/style/livekit/livekit.module.css";

const GameStartButton = ({ isGameState }: { isGameState: string }) => {
  const participants = useParticipants();
  const [isReady, setIsReady] = useState(false);
  const [isAllReady, setIsAllReady] = useState(false);
  const { localParticipant } = useLocalParticipant();

  //NOTE - 방장에게만, "게임시작 버튼" 활성화 및 비활성화
  const sockets = {
    chiefStart: (isStart: boolean) => {
      if (isStart) {
        setIsAllReady(true);
      }
      if (!isStart) {
        setIsAllReady(false);
      }
    }
  };
  useSocketOn(sockets);

  //NOTE - 게임 입장 및 종료시 초기화
  useEffect(() => {
    if (isGameState === "gameReady") {
      setIsReady(false);
      setIsAllReady(false);
    }
  }, [isGameState]);

  //NOTE - 게임 준비 이벤트 핸들러
  const readyHandler = () => {
    const playerId = localParticipant.identity;
    const newIsReady = !isReady;
    setIsReady(newIsReady);
    socket.emit("setReady", playerId, newIsReady);
  };

  //NOTE - 게임 시작 이벤트 핸들러
  const startHandler = () => {
    const roomId = localParticipant.metadata;
    const playersCount = participants.length;
    socket.emit("gameStart", roomId, playersCount);
  };

  return (
    <>
      {isAllReady && (
        <button className={S.chiefGameStart} onClick={startHandler}>
          게임시작
        </button>
      )}

      {!isAllReady && (
        <button className={`${S.isReadyButton} ${isReady ? S.active : ""}`} onClick={readyHandler}>
          {isReady ? "취소" : "게임 준비"}
        </button>
      )}
    </>
  );
};

export default GameStartButton;
