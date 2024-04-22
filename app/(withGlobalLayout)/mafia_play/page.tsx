"use client";

import React, { useEffect, useRef, useState } from "react";
import { socket } from "@/utils/socket/socket";
import { setStatus } from "@/utils/supabase/statusAPI";

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
        case "start":
          console.log(eventName);
          socket.emit(eventName);
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
      console.log(rooms);
    });

    socket.on("enterMafiaError", (message) => {
      console.log(message);
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

    // socket.on("showVoteToResult", (voteResult) => {
    //   console.log(voteResult);
    // });

    socket.on("connect_error", (error) => {
      if (socket.active) {
        write("잠시 연결이 끊어졌습니다.\n곧 연결됩니다.");
      } else {
        write("서버와의 연결이 끊어졌습니다.\n다시 접속하십시오.");
        console.log(error.message);
      }
    });

    socket.on("go", (message, time) => {
      setTimeout(() => {
        console.log(message);
      }, time);
    });

    socket.on("r0NightStart", async (title, message, timer, nickname, yesOrNo) => {
      console.log("r0NightStart 수신");

      waitForMs(timer);
      console.log(`${timer}ms 뒤에 ${message} 모달 창 띄움`);

      await setStatus(userId.current, { r0NightStart: true });
      socket.emit("r0NightStart", roomId.current);
      console.log("r0NightStart 송신");
    });

    socket.on("r0TurnAllUserCameraMikeOff", async (players) => {
      console.log("r0TurnAllUserCameraMikeOff 수신");

      console.log(`카메라 마이크 끌 플레이어 목록 : ${players}`);

      await setStatus(userId.current, { r0TurnAllUserCameraMikeOff: true });
      socket.emit("r0TurnAllUserCameraMikeOff", roomId.current);
      console.log("r0TurnAllUserCameraMikeOff 송신");
    });

    socket.on("r0SetAllUserRole", async (title, message, timer, nickname, yesOrNo) => {
      console.log("r0SetAllUserRole 수신");
      waitForMs(timer);
      console.log(`${timer}ms 뒤에 ${message} 모달 창 띄움`);

      await setStatus(userId.current, { r0SetAllUserRole: true });
      socket.emit("r0SetAllUserRole", roomId.current);
      console.log("r0SetAllUserRole 송신");
    });

    socket.on("r0ShowAllUserRole", async (role) => {
      console.log("r0ShowAllUserRole 수신");

      console.log(`역할들 : ${role}`);

      await setStatus(userId.current, { r0ShowAllUserRole: true });
      socket.emit("r0ShowAllUserRole", roomId.current);
      console.log("r0ShowAllUserRole 송신");
    });

    socket.on("r0ShowMafiaUserEachOther", async (title, message, timer, nickname, yesOrNo) => {
      console.log("r0ShowMafiaUserEachOther 수신");
      waitForMs(timer);
      console.log(`${timer}ms 뒤에 ${message} 모달 창 띄움`);

      await setStatus(userId.current, { r0ShowMafiaUserEachOther: true });
      socket.emit("r0ShowMafiaUserEachOther", roomId.current);
      console.log("r0ShowMafiaUserEachOther 송신");
    });

    socket.on("r0TurnMafiaUserCameraOn", async (players) => {
      console.log("r0TurnMafiaUserCameraOn 수신");

      await setStatus(userId.current, { r0TurnMafiaUserCameraOn: true });

      console.log(`카메라 켤 마피아 목록 : ${players}`);

      waitForMs(500);

      socket.emit("r0TurnMafiaUserCameraOn", roomId.current);
      console.log("r0TurnMafiaUserCameraOn 송신");
    });

    socket.on("r0TurnMafiaUserCameraOff", async (players) => {
      console.log("r0TurnMafiaUserCameraOff 수신");

      await setStatus(userId.current, { r0TurnMafiaUserCameraOff: true });

      console.log(`카메라 끌 마피아 목록 : ${players}`);

      socket.emit("r0TurnMafiaUserCameraOff", roomId.current);
      console.log("r0TurnMafiaUserCameraOff 송신");
    });

    socket.on("r1MorningStart", async (title, message, timer, nickname, yesOrNo) => {
      console.log("r1MorningStart 수신");

      waitForMs(timer);
      console.log(`${timer}ms 뒤에 ${message} 모달 창 띄움`);

      await setStatus(userId.current, { r1MorningStart: true });
      socket.emit("r1MorningStart", roomId.current);
      console.log("r1MorningStart 송신");
    });

    socket.on("r1TurnAllUserCameraMikeOn", async (players) => {
      console.log("r1TurnAllUserCameraMikeOn 수신");

      await setStatus(userId.current, { r1TurnAllUserCameraMikeOn: true });

      console.log(`카메라와 마이크를 켤 플레이어 목록 : ${players}`);

      socket.emit("r1TurnAllUserCameraMikeOn", roomId.current);
      console.log("r1TurnAllUserCameraMikeOn 송신");
    });

    socket.on("r1FindMafia", async (title, message, timer, nickname, yesOrNo) => {
      console.log("r1FindMafia 수신");

      waitForMs(timer);
      console.log(`${timer}ms 뒤에 ${message} 모달 창 띄움`);

      await setStatus(userId.current, { r1FindMafia: true });
      socket.emit("r1FindMafia", roomId.current);
      console.log("r1FindMafia 송신");
    });

    socket.on("r1MetingOver", async (title, message, timer, nickname, yesOrNo) => {
      console.log("r1MetingOver 수신");

      waitForMs(timer);
      console.log(`${timer}ms 뒤에 ${message} 모달 창 띄움`);

      await setStatus(userId.current, { r1MetingOver: true });
      socket.emit("r1MetingOver", roomId.current);
      console.log("r1MetingOver 송신");
    });

    socket.on("r1VoteToMafia", async (title, message, timer, nickname, yesOrNo) => {
      const votedPlayer = "55555555-f1b4-46eb-a187-2da752eed29c";
      console.log("r1VoteToMafia 수신");
      console.log("투표 진행");

      waitForMs(timer);
      console.log(`${timer}ms 뒤에 ${message} 모달 창 띄움`);

      await setStatus(userId.current, { r1VoteToMafia: true });
      socket.emit("r1VoteToMafia", roomId.current, votedPlayer);
      console.log("r1VoteToMafia 송신");
    });
    socket.on("r1ShowVoteToResult", async (voteBoard) => {
      console.log("r1ShowVoteToResult 수신");

      console.log("투표 결과", voteBoard);

      await setStatus(userId.current, { r1VoteToMafia: true });
      socket.emit("r1ShowVoteToResult", roomId.current);
      console.log("r1ShowVoteToResult 송신");
    });

    socket.on("r1ShowMostVotedPlayer", async (title, message, timer, nickname, yesOrNo) => {
      console.log("r1ShowMostVotedPlayer 수신");

      waitForMs(timer);
      console.log(`${timer}ms 뒤에 ${message} 모달 창 띄움`);

      await setStatus(userId.current, { r1ShowMostVotedPlayer: true });
      socket.emit("r1ShowMostVotedPlayer", roomId.current);
      console.log("r1ShowMostVotedPlayer 송신");
    });

    socket.on("r1LastTalk", async (title, message, timer, nickname, yesOrNo) => {
      console.log("r1LastTalk 수신");

      waitForMs(timer);
      console.log(`${timer}ms 뒤에 ${message} 모달 창 띄움`);

      await setStatus(userId.current, { r1LastTalk: true });
      socket.emit("r1LastTalk", roomId.current);
      console.log("r1LastTalk 송신");
    });

    socket.on("r1VoteYesOrNo", async (title, message, timer, nickname, yesOrNo) => {
      console.log("r1VoteYesOrNo 수신");
      const voteYesOrNo = true;

      waitForMs(timer);
      console.log(`${timer}ms 뒤에 ${message} 모달 창 띄움`);

      await setStatus(userId.current, { r1VoteYesOrNo: true });
      socket.emit("r1VoteYesOrNo", roomId.current, userId.current, voteYesOrNo);
      console.log("r1VoteYesOrNo 송신");
    });

    socket.on("r1ShowVoteYesOrNoResult", async (voteResult) => {
      console.log("r1ShowVoteYesOrNoResult 수신");

      console.log(voteResult);

      await setStatus(userId.current, { r1ShowVoteYesOrNoResult: true });
      socket.emit("r1ShowVoteYesOrNoResult", roomId.current);
      console.log("r1ShowVoteYesOrNoResult 송신");
    });

    socket.on("r1KillMostVotedPlayer", async (title, message, timer, nickname, yesOrNo, killedPlayer, role) => {
      console.log("r1KillMostVotedPlayer 수신");

      waitForMs(timer);
      console.log(`${timer}ms 뒤에 ${message} 모달 창 띄움`);
      console.log(`${killedPlayer}가 ${role}인거 밝힘`);

      await setStatus(userId.current, { r1KillMostVotedPlayer: true });
      socket.emit("r1KillMostVotedPlayer", roomId.current);
      console.log("r1KillMostVotedPlayer 송신");
    });

    socket.on("r1TurnAllUserCameraMikeOff", async (allPlayers) => {
      console.log("r1TurnAllUserCameraMikeOff 수신");

      console.log(`${allPlayers}의 카메라 마이크 전부 끔`);

      await setStatus(userId.current, { r1TurnAllUserCameraMikeOff: true });
      socket.emit("r1TurnAllUserCameraMikeOff", roomId.current);
      console.log("r1TurnAllUserCameraMikeOff 송신");
    });

    socket.on("r1DecideMafiaToKillPlayer", async (title, message, timer, nickname, yesOrNo) => {
      console.log("r1DecideMafiaToKillPlayer 수신");
      waitForMs(timer);
      console.log(`${timer}ms 뒤에 ${message} 모달 창 띄움`);

      await setStatus(userId.current, { r1DecideMafiaToKillPlayer: true });
      socket.emit("r1DecideMafiaToKillPlayer", roomId.current);
      console.log("r1DecideMafiaToKillPlayer 송신");
    });

    socket.on("r1TurnMafiaUserCameraOn", async (mafiaPlayers) => {
      console.log("r1TurnMafiaUserCameraOn 수신");
      console.log(`카메라를 켤 마피아 목록 : ${mafiaPlayers}`);

      await setStatus(userId.current, { r1TurnMafiaUserCameraOn: true });
      socket.emit("r1TurnMafiaUserCameraOn", roomId.current);
      console.log("r1TurnMafiaUserCameraOn 송신");
    });

    socket.on("r1GestureToMafiaEachOther", async (title, message, timer, nickname, yesOrNo, mafiaPlayers) => {
      console.log("r1GestureToMafiaEachOther 수신");
      const player = "44444444-f1b4-46eb-a187-2da752eed29c";
      waitForMs(timer);
      console.log(`${timer}ms 뒤에 ${message} 모달 창 띄움`);

      console.log("자신이 마피아 플레이어 목록에 있으면 모달창 띄우고 어떤 플레이어를 죽일지 선택");

      await setStatus(userId.current, { r1GestureToMafiaEachOther: true });
      socket.emit("r1GestureToMafiaEachOther", roomId.current, player);
      console.log("r1GestureToMafiaEachOther 송신");
    });

    socket.on("r1TurnMafiaUserCameraOff", async (mafiaPlayers) => {
      console.log("r1TurnMafiaUserCameraOff 수신");
      console.log(`카메라를 끌 마피아 목록 : ${mafiaPlayers}`);

      await setStatus(userId.current, { r1TurnMafiaUserCameraOff: true });
      socket.emit("r1TurnMafiaUserCameraOff", roomId.current);
      console.log("r1TurnMafiaUserCameraOff 송신");
    });

    socket.on("r1DecideDoctorToSavePlayer", async (title, message, timer, nickname, yesOrNo) => {
      console.log("r1DecideDoctorToSavePlayer 수신");
      const player = null;
      waitForMs(timer);
      console.log(`${timer}ms 뒤에 ${message} 모달 창 띄움`);
      console.log("message가 의사가 있다는 메세지이면 userId 넣어서 송신, 없으면 null 넣어서 송신");

      await setStatus(userId.current, { r1DecideDoctorToSavePlayer: true });
      socket.emit("r1DecideDoctorToSavePlayer", roomId.current, player);
      console.log("r1DecideDoctorToSavePlayer 송신");
    });

    socket.on("r1DecidePoliceToDoubtPlayer", async (title, message, timer, nickname, yesOrNo) => {
      console.log("r1DecidePoliceToDoubtPlayer 수신");
      const player = null;
      waitForMs(timer);
      console.log(`${timer}ms 뒤에 ${message} 모달 창 띄움`);
      console.log("message가 경찰이 있다는 메세지이면 userId 넣어서 송신, 없으면 null 넣어서 송신");

      await setStatus(userId.current, { r1DecidePoliceToDoubtPlayer: true });
      socket.emit("r1DecidePoliceToDoubtPlayer", roomId.current, player);
      console.log("r1DecidePoliceToDoubtPlayer 송신");
    });

    socket.on("r1ShowDoubtedPlayer", async (title, message, timer, nickname, yesOrNo, policePlayer) => {
      console.log("r1ShowDoubtedPlayer 수신");
      console.log("userId가 policePlayer면 의심하고 있는 유저가 마피아인지 알려줌");

      waitForMs(timer);
      console.log(`${timer}ms 뒤에 ${message} 모달 창 띄움`);

      await setStatus(userId.current, { r1ShowDoubtedPlayer: true });
      socket.emit("r1ShowDoubtedPlayer", roomId.current);
      console.log("r1ShowDoubtedPlayer 송신");
    });

    socket.on("r1KillPlayerByRole", async () => {
      console.log("r1KillPlayerByRole 수신");

      await setStatus(userId.current, { r1KillPlayerByRole: true });
      socket.emit("r1KillPlayerByRole", roomId.current);
      console.log("r1KillPlayerByRole 송신");
    });

    socket.on("r2MorningStart", async (title, message, timer, nickname, yesOrNo) => {
      console.log("r2MorningStart 수신");

      waitForMs(timer);
      console.log(`${timer}ms 뒤에 ${message} 모달 창 띄움`);

      await setStatus(userId.current, { r1DecidePoliceToDoubtPlayer: true });
      socket.emit("r2MorningStart", roomId.current);
      console.log("r2MorningStart 송신");
    });

    socket.on("r2TurnAllUserCameraMikeOn", async (allPlayers) => {
      console.log("r2TurnAllUserCameraMikeOn 수신");
      console.log(`카메라와 마이크를 켤 플레이어 목록 : ${allPlayers}`);

      await setStatus(userId.current, { r2TurnAllUserCameraMikeOn: true });
      socket.emit("r2TurnAllUserCameraMikeOn", roomId.current);
      console.log("r2TurnAllUserCameraMikeOn 송신");
    });

    socket.on("r2ShowIsPlayerLived", async (title, message, timer, nickname, yesOrNo) => {
      console.log("r2ShowIsPlayerLived 수신");

      waitForMs(timer);
      console.log(`${timer}ms 뒤에 ${message} 모달 창 띄움`);

      await setStatus(userId.current, { r2ShowIsPlayerLived: true });
      socket.emit("r2ShowIsPlayerLived", roomId.current);
      console.log("r2ShowIsPlayerLived 송신");
    });

    socket.on("r2AskPlayerToExit", async (title, message, timer, nickname, yesOrNo) => {
      console.log("r2AskPlayerToExit 수신");

      waitForMs(timer);
      console.log(`${timer}ms 뒤에 ${message} 모달 창 띄움`);

      await setStatus(userId.current, { r2AskPlayerToExit: true });
      socket.emit("r2AskPlayerToExit", roomId.current);
      console.log("r2AskPlayerToExit 송신");
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
