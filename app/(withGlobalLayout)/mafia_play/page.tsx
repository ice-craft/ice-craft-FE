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

    socket.on("r0NightStart", () => {
      console.log("r0NightStart 수신");

      socket.emit("r0NightStart");
      console.log("r0NightStart 송신");
    });

    socket.on("r0NightStartError", () => {
      console.log("[r0NightStartError]");
    });

    socket.on("r0TurnAllUserCameraMikeOff", () => {
      console.log("r0TurnAllUserCameraMikeOff 수신");

      console.log("모든 유저의 카메라와 마이크 끔");

      socket.emit("r0TurnAllUserCameraMikeOff");
      console.log("r0TurnAllUserCameraMikeOff 송신");
    });

    socket.on("r0TurnAllUserCameraMikeOffError", () => {
      console.log("[r0TurnAllUserCameraMikeOffError]");
    });

    socket.on("r0SetAllUserRole", () => {
      console.log("r0SetAllUserRole 수신");
      console.log("유저들 역할을 정하겠다는 모달창");

      socket.emit("r0SetAllUserRole");
      console.log("r0SetAllUserRole 송신");
    });

    socket.on("r0SetAllUserRoleError", () => {
      console.log("[r0SetAllUserRoleError]");
    });

    socket.on("r0ShowAllUserRole", (role) => {
      console.log("r0ShowAllUserRole 수신");

      console.log(`마피아 : ${role["마피아"]}`);
      console.log(`의사 : ${role["의사"]}`);
      console.log(`경찰 : ${role["경찰"]}`);
      console.log(`시민 : ${role["시민"]}`);

      socket.emit("r0ShowAllUserRole");
      console.log("r0ShowAllUserRole 송신");
    });

    socket.on("r0SetAllUserRoleError", () => {
      console.log("[r0SetAllUserRoleError]");
    });

    socket.on("r0ShowMafiaUserEachOther", () => {
      console.log("r0ShowMafiaUserEachOther 수신");

      console.log("r0ShowMafiaUserEachOther 모달 창 띄움");

      socket.emit("r0ShowMafiaUserEachOther");
      console.log("r0ShowMafiaUserEachOther 송신");
    });

    socket.on("r0ShowMafiaUserEachOtherError", () => {
      console.log("r0ShowMafiaUserEachOtherError 수신");
    });

    socket.on("r0TurnMafiaUserCameraOn", (mafiaPlayers) => {
      console.log("r0TurnMafiaUserCameraOn 수신");

      console.log(`자신이 마피아 플레이어라면 카메라 켤 마피아 목록 : ${mafiaPlayers}`);

      socket.emit("r0TurnMafiaUserCameraOn");
      console.log("r0TurnMafiaUserCameraOn 송신");
    });

    socket.on("r0TurnMafiaUserCameraOnError", () => {
      console.log("[r0TurnMafiaUserCameraOnError]");
    });

    socket.on("r0TurnMafiaUserCameraOff", (mafiaPlayers) => {
      console.log("r0TurnMafiaUserCameraOff 수신");

      console.log(`자신이 마피아 플레이어라면 카메라 끌 마피아 목록 : ${mafiaPlayers}`);

      socket.emit("r0TurnMafiaUserCameraOff");
      console.log("r0TurnMafiaUserCameraOff 송신");
    });

    socket.on("r0TurnMafiaUserCameraOffError", () => {
      console.log("[r0TurnMafiaUserCameraOffError]");
    });

    socket.on("r1MorningStart", () => {
      console.log("r1MorningStart 수신");

      console.log("r1MorningStart 모달 창 띄움");

      socket.emit("r1MorningStart", roomId.current);
      console.log("r1MorningStart 송신");
    });

    socket.on("r1MorningStartError", () => {
      console.log("[r1MorningStartError]");
    });

    socket.on("r1TurnAllUserCameraMikeOn", () => {
      console.log("r1TurnAllUserCameraMikeOn 수신");

      console.log("모든 플레이어의 카메라와 마이크 켬");

      socket.emit("r1TurnAllUserCameraMikeOn");
      console.log("r1TurnAllUserCameraMikeOn 송신");
    });

    socket.on("r1TurnAllUserCameraMikeOnError", () => {
      console.log("[r1TurnAllUserCameraMikeOnError]");
    });

    socket.on("r1FindMafia", () => {
      console.log("r1FindMafia 수신");

      console.log("r1FindMafia 모달 창 띄움");

      socket.emit("r1FindMafia");
      console.log("r1FindMafia 송신");
    });

    socket.on("r1FindMafiaError", () => {
      console.log("[r1FindMafiaError]");
    });

    socket.on("r1MeetingOver", () => {
      console.log("r1MetingOver 수신");

      console.log("r1MeetingOver 모달 창 띄움");

      socket.emit("r1MeetingOver");
      console.log("r1MetingOver 송신");
    });

    socket.on("r1MeetingOverError", () => {
      console.log("[r1MeetingOverError]");
    });

    socket.on("r1VoteToMafia", () => {
      console.log("r1VoteToMafia 수신");
      const votedPlayer = "55555555-f1b4-46eb-a187-2da752eed29c";

      console.log("투표 진행");

      console.log("r1VoteToMafia 모달 창 띄움");
      console.log(`${votedPlayer}에게 투표`);

      socket.emit("r1VoteToMafia", votedPlayer);
      console.log("r1VoteToMafia 송신");
    });

    socket.on("r1VoteToMafiaError", () => {
      console.log("[r1VoteToMafiaError]");
    });

    socket.on("r1ShowVoteToResult", (voteBoard) => {
      console.log("r1ShowVoteToResult 수신");

      console.log("투표 결과", voteBoard);

      socket.emit("r1ShowVoteToResult");
      console.log("r1ShowVoteToResult 송신");
    });

    socket.on("r1ShowVoteToResultError", () => {
      console.log("[r1ShowVoteToResultError]");
    });

    socket.on("r1ShowMostVotedPlayer", (message, isValid) => {
      console.log("r1ShowMostVotedPlayer 수신");

      console.log(`r1ShowMostVotedPlayer ${message} 모달 창 띄움`);

      socket.emit("r1ShowMostVotedPlayer", isValid);
      console.log("r1ShowMostVotedPlayer 송신");
    });

    socket.on("r1ShowMostVotedPlayerError", () => {
      console.log("[r1ShowMostVotedPlayerError]");
    });

    socket.on("r1LastTalk", (message) => {
      console.log("r1LastTalk 수신");

      console.log(`r1LastTalk ${message} 모달 창 띄움`);

      socket.emit("r1LastTalk");
      console.log("r1LastTalk 송신");
    });

    socket.on("r1LastTalkError", () => {
      console.log("[r1LastTalkError]");
    });

    socket.on("r1VoteYesOrNo", () => {
      console.log("r1VoteYesOrNo 수신");
      const voteYesOrNo = true;

      console.log(`r1VoteYesOrNo 모달 창 띄움`);
      console.log(`${voteYesOrNo} 투표를 함`);

      socket.emit("r1VoteYesOrNo", voteYesOrNo);
      console.log("r1VoteYesOrNo 송신");
    });

    socket.on("r1VoteYesOrNoError", () => {
      console.log("[r1VoteYesOrNoError]");
    });

    socket.on("r1ShowVoteYesOrNoResult", (voteResult) => {
      console.log("r1ShowVoteYesOrNoResult 수신");

      console.log(`찬성/반대 투표 결과 : ${voteResult}`);

      socket.emit("r1ShowVoteYesOrNoResult");
      console.log("r1ShowVoteYesOrNoResult 송신");
    });

    socket.on("r1ShowVoteYesOrNoResultError", () => {
      console.log("[r1ShowVoteYesOrNoResultError]");
    });

    socket.on("r1KillMostVotedPlayer", async (message, killedPlayer) => {
      console.log("r1KillMostVotedPlayer 수신");

      console.log(`r1KillMostVotedPlayer ${message} 모달 창 띄움`);
      console.log("killedPlayer : 죽은 플레이어 userId, 아무도 죽지 않았다면 killedPlayer는 null");
      console.log("만약 killedPlayer가 자신이라면 관전 여부 물어보고 방에서 나갈지 사망 처리할지 결정");

      socket.emit("r1KillMostVotedPlayer");
      console.log("r1KillMostVotedPlayer 송신");
    });

    socket.on("r1KillMostVotedPlayerError", () => {
      console.log("[r1KillMostVotedPlayerError]");
    });

    socket.on("r1TurnAllUserCameraMikeOff", () => {
      console.log("r1TurnAllUserCameraMikeOff 수신");

      console.log("모든 플레이어의 카메라 마이크 전부 끔");

      socket.emit("r1TurnAllUserCameraMikeOff");
      console.log("r1TurnAllUserCameraMikeOff 송신");
    });

    socket.on("r1TurnAllUserCameraMikeOffError", () => {
      console.log("[r1TurnAllUserCameraMikeOffError]");
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

    socket.on("r1DecideDoctorToSavePlayer", async (title, message, timer, nickname, yesOrNo, isValid, doctorPlayer) => {
      console.log("r1DecideDoctorToSavePlayer 수신");
      const player = null;
      waitForMs(timer);
      console.log(`${timer}ms 뒤에 ${message} 모달 창 띄움`);
      console.log();
      console.log(
        "valid : 방 구성인원에 의사가 있음, doctorPlayer :  의사가 살아있으면 유저 아이디 죽었으면 null, player :  살릴 플레이어 유저아이디 대입"
      );

      await setStatus(userId.current, { r1DecideDoctorToSavePlayer: true });
      socket.emit("r1DecideDoctorToSavePlayer", roomId.current, player);
      console.log("r1DecideDoctorToSavePlayer 송신");
    });

    socket.on("r1DecidePoliceToDoubtPlayer", async (title, message, timer, nickname, yesOrNo) => {
      console.log("r1DecidePoliceToDoubtPlayer 수신");
      const player = null;
      waitForMs(timer);
      console.log(`${timer}ms 뒤에 ${message} 모달 창 띄움`);
      console.log(
        "valid : 방 구성인원에 경찰이 있음, policePlayer :  의사가 살아있으면 유저 아이디 죽었으면 null, player :  의심하는 플레이어 유저아이디 대입"
      );

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

    socket.on("gameOver", async (title, message, timer, nickname, yesOrNo) => {
      console.log("gameOver 수신");

      waitForMs(timer);
      console.log(`${timer}ms 뒤에 ${message} 모달 창 띄움`);
    });

    socket.on("updateUserInRoom", (playerInfo) => {
      console.log("updateUserInRoom 수신");
      console.log(`GUI에 표시할 정보들 : ${playerInfo}`);
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
