import useConnectStore from "@/store/connect-store";
import { useReadyStore } from "@/store/toggle-store";
import { socket } from "@/utils/socket/socket";
import { useLocalParticipant } from "@livekit/components-react";
import React, { useEffect, useState } from "react";

const GameStartButton = () => {
  const { roomId, userId } = useConnectStore();
  const { isReady, setIsReady } = useReadyStore();
  const local = useLocalParticipant();

  const startGameHandler = () => {
    const newIsReady = !isReady;
    setIsReady(newIsReady);
    console.log(newIsReady);
    socket.emit("setReady", userId, newIsReady, roomId);
  };

  return (
    <button style={{ backgroundColor: isReady ? "#5c5bad" : "#bfbfbf" }} onClick={startGameHandler}>
      {isReady ? "취소" : "게임 준비"}
    </button>
  );
};

export default GameStartButton;
