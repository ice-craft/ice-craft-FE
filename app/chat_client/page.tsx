"use client";
import React, { useEffect } from "react";
import { socket } from "@/app/_utils/socket/socket";

const ChatClient = () => {
  useEffect(() => {}, []);

  socket.on("connect", () => {
    console.log("연결됨");
  });

  return <div>ChatClient</div>;
};

export default ChatClient;
