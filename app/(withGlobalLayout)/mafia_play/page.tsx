"use client";

import React, { useEffect, useRef, useState } from "react";
import { socket } from "@/utils/socket/socket";

const MafiaPlay = () => {
  const [eventName, setEventName] = useState("");
  const [message, setMessage] = useState("");
  const [display, setDisplay] = useState("");

  const nickname = useRef("user3"); //NOTE - 테스트용
  const userId = useRef("11111111-f1b4-46eb-a187-2da752eed29c"); //NOTE - 테스트용
  const roomId = useRef("0ed9a099-f1b4-46eb-a187-2da752eed29c"); //NOTE - 테스트용
  const rowStart = useRef(0); //NOTE - 테스트용
  const rowEnd = useRef(10); //NOTE - 테스트용
  const title = useRef("방제목"); //NOTE - 테스트용
  const gameCategory = useRef("마피아"); //NOTE - 테스트용
  const totalUserCount = useRef("5"); //NOTE - 테스트용

  const sendHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    //NOTE - 클라이언트에서 보내는 이벤트명
    if (eventName) {
      switch (eventName) {
        case "enterMafia":
          console.log(eventName, rowStart.current, rowEnd.current); //NOTE - 테스트 코드
          socket.emit(eventName, rowStart.current, rowEnd.current);
          break;
        case "createRoom":
          console.log(eventName, title.current, gameCategory.current, totalUserCount.current); //NOTE - 테스트 코드
          socket.emit(eventName, title.current, gameCategory.current, totalUserCount.current);
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
          console.log(eventName, userId.current, true, roomId.current);
          socket.emit(eventName, userId.current, true, roomId.current);
          break;
        case "voteTo":
          console.log(eventName, userId.current, "79043912-e9c4-4658-987c-6715bebb1224");
          socket.emit(eventName, userId.current, "79043912-e9c4-4658-987c-6715bebb1224");
          break;
        case "voteYesOrNo":
          console.log(eventName, userId.current, "yes");
          socket.emit(eventName, userId.current, "yes");
          break;
        case "choosePlayer":
          console.log(eventName, userId.current, "마피아");
          socket.emit(eventName, userId.current, "마피아");
          break;
        case "testStart":
          console.log(eventName, "테스트 시작");
          socket.emit(eventName, roomId.current, Number(totalUserCount.current));
          //NOTE - 방 인원수는 반드시 숫자로 보내야함
          break;
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

  const waitForMs = (ms: number) => {
    const startTime = Date.now();

    while (Date.now() - startTime < ms) {}
  };

  useEffect(() => {
    console.log("나의 닉네임", nickname.current);
    socket.on("connect", () => {
      write(message);
    });

    socket.on("disconnect", () => {
      write("서버와 연결이 끊어졌습니다.");
    });

    socket.on("enterMafia", (rooms) => {
      console.log(`[enterMafia] ${rooms}`);
      console.log("");
    });

    socket.on("enterMafiaError", (message) => {
      console.log(`[enterMafiaError] ${message}`);
      console.log("");
    });

    socket.on("createRoom", (room_info) => {
      console.log(room_info);
    });

    socket.on("createRoomError", (message) => {
      console.log(message);
    });

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

    socket.on("exitRoom", () => {
      console.log("방에서 나갔습니다.");
    });

    socket.on("exitRoomError", (message) => {
      console.log(message);
    });

    socket.on("setReady", (message) => {
      console.log(message);
    });

    socket.on("setReadyError", () => {
      console.log("레디를  설정하는데 실패했습니다.");
    });

    socket.on("canGameStartError", () => {
      console.log("[canGameStartError]");
    });

    socket.on("connect_error", (error) => {
      if (socket.active) {
        write("잠시 연결이 끊어졌습니다.\n곧 연결됩니다.");
      } else {
        write("서버와의 연결이 끊어졌습니다.\n다시 접속하십시오.");
        console.log(error.message);
      }
    });

    socket.on("updateUserReady", (userId, ready) => {
      console.log(`${userId}가 ready를 ${ready} 함`);
    });

    socket.on("gameOver", async (title, message, timer, nickname, yesOrNo) => {
      console.log("gameOver 수신");

      waitForMs(timer);
      console.log(`${timer}ms 뒤에 ${message} 모달 창 띄움`);
    });

    socket.on("updateUserInRoom", (playerInfo) => {
      console.log("updateUserInRoom 수신");
      console.log(`GUI에 표시할 정보들 : ${playerInfo}`);
    });

    socket.on("showModal", (message, time) => {
      console.log(`[showModal] ${message} / ${time}초`);
      console.log("");
    });

    socket.on("playerMediaStatus", (media) => {
      console.log("[playerMediaStatus]");
      Object.keys(media).forEach((key) => {
        console.log(`${key} : ${media[key]["camera"]}, ${media[key]["mike"]}`);
      });
      console.log("");
    });

    socket.on("showAllPlayerRole", (role) => {
      console.log("[showAllPlayerRole]");
      Object.keys(role).forEach((key) => {
        console.log(`${key} : ${role[key]}`);
      });
      console.log("");
    });

    socket.on("timerStatus", (time) => {
      console.log(`[timerStatus] ${time}초`);
      console.log("");
    });

    socket.on("inSelect", (type, time) => {
      console.log(`[inSelect] ${type} ${time}초`);
      console.log("");
    });

    socket.on("showVoteResult", (voteBoard, time) => {
      console.log(`[showVoteResult] ${time}초`);
      console.log(voteBoard);
    });

    socket.on("showVoteDeadOrLive", (yesOrNoVoteResult) => {
      console.log("[showVoteDeadOrLive]");
      console.log(yesOrNoVoteResult);
      console.log("");
    });

    socket.on("diedPlayer", (killedPlayer) => {
      console.log(`[diedPlayer] ${killedPlayer}`);
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
