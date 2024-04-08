"use client";

import React, { useEffect, useState } from "react";
import { socket } from "@/utils/socket/socket";

const ChatClient = () => {
  const [eventName, setEventName] = useState("");
  const [message, setMessage] = useState("");

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

  return (
    <>
      <textarea id="message" className="w-2/3 border-2 border-black border-solid h-3/3"></textarea>
      <form id="form" action="">
        <input
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          id="input"
          autoComplete="off"
          className="border-2 border-black border-solid"
        />
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          id="input"
          autoComplete="off"
          maxLength={100}
          className="border-2 border-black border-solid"
        />
        <button className="border-2 border-black border-solid">보내기</button>
      </form>
    </>
  );
};

export default ChatClient;
