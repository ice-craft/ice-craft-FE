"use client";

import React, { useEffect, useRef, useState } from "react";
import { socket } from "@/utils/socket/socket";

const MafiaPlay = () => {
  const [eventName, setEventName] = useState("");
  const [message, setMessage] = useState("");
  const [display, setDisplay] = useState("");

  const nickname = useRef("user3");
  const userId = useRef("79043912-e9c4-4658-987c-6715bebb1223"); //NOTE - 테스트용
  const roomId = useRef("30ed837a-fc34-4fcd-9d5d-9c31bbde2726"); //NOTE - 테스트용

  const sendHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    //NOTE - 클라이언트에서 보내는 이벤트명
    if (eventName) {
      switch (eventName) {
        case "enterMafia":
          console.log(eventName); //NOTE - 테스트 코드
          socket.emit(eventName);
          break;
        case "joinRoom":
          console.log(eventName, userId.current, roomId.current, nickname.current); //NOTE - 테스트 코드
          socket.emit(eventName, userId.current, roomId.current, nickname.current);
          break;
        case "fastJoinRoom":
          console.log(eventName, userId.current, nickname.current); //NOTE - 테스트 코드
          socket.emit(eventName, userId.current, nickname.current);
          break;
        case "exitRoom":
          console.log(eventName, roomId.current, userId.current); //NOTE - 테스트 코드
          socket.emit(eventName, roomId.current, userId.current);
          break;
        case "setReady":
          console.log(eventName, userId.current, true);
          socket.emit(eventName, userId.current, true);
          break;
        case "voteTo": //마피아 지목
          console.log(eventName, userId.current, "ee93a48d-a0a1-4e10-854b-dee2580e5f2e");
          socket.emit(eventName, userId.current, "ee93a48d-a0a1-4e10-854b-dee2580e5f2e");
          break;
        case "voteYesOrNo":
          console.log(eventName, userId.current, "yes");
          socket.emit(eventName, userId.current, "yes");
          break;
        case "choosePlayer": //의사나 마피아가 지목할때 대상
          console.log(eventName, userId.current);
          socket.emit(eventName, userId.current);
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
      write(message);
    });

    socket.on("disconnect", () => {
      write("서버와 연결이 끊어졌습니다.");
    });

    socket.on("server", (message: string) => {
      write(message);
    });

    //NOTE - 테스트 코드
    // socket.on("rooms", (rooms) => {
    //   console.log(rooms);
    // });

    socket.on("rooms", (rooms) => {
      console.log(rooms);
    });

    //NOTE - 테스트 코드
    // socket.on("userIdInRoom", (userId) => {
    //   console.log(userId);
    // });

    socket.on("joinRoom", (userInfo) => {
      console.log(userInfo);
    });

    socket.on("joinRoomError", (message) => {
      console.log(message);
    });

    socket.on("fastJoinRoom", (room_id, userInfo) => {
      console.log(room_id, userInfo);
    });

    socket.on("fastJoinRoomError", (message) => {
      console.log(message);
    });

    socket.on("exitRoom", (userInfo) => {
      console.log(userInfo);
    });

    socket.on("exitRoomError", (message) => {
      console.log(message);
    });

    socket.on("setReady", (message) => {
      console.log(message);
    });

    socket.on("setReadyError", (message) => {
      console.log(message);
    });

    socket.on("voteTo", (message) => {
      console.log(message);
    });

    socket.on("voteToError", (message) => {
      console.log(message);
    });

    socket.on("voteYesOrNo", (message) => {
      console.log(message);
    });

    socket.on("voteYesOrNoError", (message) => {
      console.log(message);
    });

    socket.on("choosePlayer", (message) => {
      console.log(message);
    });

    socket.on("choosePlayerError", (message) => {
      console.log(message);
    });

    socket.on("showModal", (title, message, timer, nickname, yesOrNo) => {
      console.log(title, message, timer, nickname, yesOrNo);
    });

    socket.on("setCamera", (userId, isOn) => {
      console.log(userId, isOn);
    });

    socket.on("setMike", (userId, isOn) => {
      console.log(userId, isOn);
    });

    socket.on("openPlayerRole", (userId, role) => {
      console.log(userId, role);
    });

    socket.on("showVoteYesOrNoResult", (voteResult) => {
      console.log(voteResult);
    });

    socket.on("showVoteToResult", (voteResult) => {
      console.log(voteResult);
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
