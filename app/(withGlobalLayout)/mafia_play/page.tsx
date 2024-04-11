"use client";

import React, { useEffect, useRef, useState } from "react";
import { socket } from "@/utils/socket/socket";

const MafiaPlay = () => {
  const [eventName, setEventName] = useState("");
  const [message, setMessage] = useState("");
  const [display, setDisplay] = useState("");
  const nickname = useRef(`user${crypto.getRandomValues(new Int8Array(1))}`);

  const sendHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (eventName) {
      switch (eventName) {
        case "enterMafia":
          console.log(eventName);
          socket.emit(eventName);
          break;
        //NOTE - 테스트 코드
        // case "getUserIdInRoom":
        //   console.log(eventName, message);
        //   socket.emit(eventName, message);
        //   break;
        // case "getUserInfoInRoom":
        //   console.log(eventName, message);
        //   socket.emit(eventName, message);
        //   break;
      }
    } else {
      alert("이벤트 명을 적으세요.");
    }
  };

  const connect = () => {
    if (!socket.connected) {
      socket.connect();
      console.log("서버와 연결이 되었습니다.");
    }
  };

  const disconnect = () => {
    if (socket.connected) {
      socket.emit("exit", nickname.current);
      socket.disconnect();
    }
  };

  const write = (line: string) => {
    setDisplay((prev) => `${prev}\n${line}`);
  };

  useEffect(() => {
    console.log("나의 닉네임", nickname.current);
    socket.on("connect", () => {
      write("서버와 연결되었습니다.");
    });

    socket.on("disconnect", () => {
      write("서버와 연결이 끊어졌습니다.");
    });

    socket.on("server", (message: string) => {
      write(message);
    });

    socket.on("rooms", (rooms) => {
      console.log(rooms);
    });

    //NOTE - 테스트 코드
    // socket.on("userIdInRoom", (userId) => {
    //   console.log(userId);
    // });

    socket.on("userInfoInRoom", (userInfo) => {
      console.log(userInfo);
    });

    socket.on("connect_error", (error) => {
      if (socket.active) {
        write("잠시 연결이 끊어졌습니다.\n곧 연결됩니다.");
      } else {
        write("서버와의 연결이 끊어졌습니다.\n다시 접속하십시오.");
        console.log(error.message);
      }
    });
  }, []);

  return (
    <>
      <textarea
        value={display}
        id="message"
        className="w-2/3 border-2 border-black border-solid h-3/3"
        rows={25}
        readOnly
      ></textarea>
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
        <button type="submit" className="border-2 border-black border-solid" onClick={(e) => sendHandler(e)}>
          보내기
        </button>
        <button type="button" className="border-2 border-black border-solid" onClick={connect}>
          연결
        </button>
        <button type="button" className="border-2 border-black border-solid" onClick={disconnect}>
          끊기
        </button>
      </form>
    </>
  );
};

export default MafiaPlay;
