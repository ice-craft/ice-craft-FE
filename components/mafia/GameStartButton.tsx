import useConnectStore from "@/store/connect-store";
import { useReadyStore } from "@/store/toggle-store";
import { socket } from "@/utils/socket/socket";
import React, { useEffect, useState } from "react";

const GameStartButton = () => {
  const { roomId, userId } = useConnectStore();
  const { isReady, setIsReady } = useReadyStore();

  const startGameHandler = () => {
    const newIsReady = !isReady;
    setIsReady(newIsReady);
    socket.emit("setReady", userId, newIsReady, roomId);
  };

  return (
    <button style={{ backgroundColor: isReady ? "#5c5bad" : "#bfbfbf" }} onClick={startGameHandler}>
      {isReady ? "취소" : "게임 준비"}
    </button>
  );
};

export default GameStartButton;
