"use client";

import React, { useEffect } from "react";
import { socket } from "@/app/_utils/socket/socket";

const ChatClient = () => {
  useEffect(() => {
    console.log("first");
    socket.disconnect();
  }, []);

  socket.on("connect", () => {
    console.log("연결됨");
  });

  socket.on("disconnect", () => {
    console.log("연결 종료");
  });

  return <div>ChatClient</div>;
};

export default ChatClient;
