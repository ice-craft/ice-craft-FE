import useConnectStore from "@/store/connect-store";
import { useModalStore, useReadyStore } from "@/store/toggle-store";
import { socket } from "@/utils/socket/socket";
import React, { useEffect, useState } from "react";

const GameStartButton = () => {
  const { roomId, userId } = useConnectStore();
  const { isReady, setIsReady } = useReadyStore();
  const { isModal, setIsModal } = useModalStore();
  const [modalMessage, setModalMessage] = useState("");

  const startGameHandler = () => {
    const newIsReady = !isReady;
    setIsReady(newIsReady);
    socket.emit("setReady", userId, newIsReady, roomId);
  };

  //   useEffect(() => {
  //     socket.on("setReady", (message) => {
  //       setModalMessage(message);
  //       setIsModal(true);
  //     });

  //     return () => {
  //       socket.off("setReady");
  //     };
  //   }, []);

  return (
    <button style={{ backgroundColor: isReady ? "#5c5bad" : "#bfbfbf" }} onClick={startGameHandler}>
      {isReady ? "취소" : "게임 준비"}
    </button>
  );
};

export default GameStartButton;
