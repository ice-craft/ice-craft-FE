import { useGameState } from "@/store/game-store";
import { useRoomAction } from "@/store/room-store";
import { socket } from "@/utils/socket/socket";
import { DisconnectButton, useLocalParticipant } from "@livekit/components-react";
import { useGroupModalElement } from "@/store/show-modal-store";
import S from "@/style/livekit/livekit.module.css";
import React, { useEffect, useState } from "react";
import SpeakTimer from "./SpeakTimer";
import Image from "next/image";
import MoonIcon from "@/assets/images/moon.svg";
import SunIcon from "@/assets/images/sun.svg";

const MafiaHeader = () => {
  //NOTE - Livekit Hooks
  const { localParticipant } = useLocalParticipant();
  const roomId = localParticipant.metadata;
  const userId = localParticipant.identity;

  //NOTE - 전역 state
  const isGameState = useGameState();
  const { setIsEntry } = useRoomAction();
  const title = useGroupModalElement();

  const [morning, setMorning] = useState(false);
  const [night, setNight] = useState(false);

  //NOTE - 게임 입장 및 종료 시
  useEffect(() => {
    if (isGameState === "gameReady" || isGameState === "gameEnd") {
      setMorning(false);
      setNight(false);
    }
  }, [isGameState]);

  //NOTE - 방 나가기 이벤트 헨들러
  const leaveRoom = () => {
    setIsEntry(false);
    socket.emit("exitRoom", roomId, userId);
  };

  //NOTE - 밤, 낮 배경
  useEffect(() => {
    if (title.includes("아침")) {
      setMorning(true);
      setNight(false);
      return;
    }
    if (title.includes("밤")) {
      setNight(true);
      setMorning(false);
      return;
    }
  }, [title]);

  //NOTE - 마피아 테마
  const dayTime = morning ? S.day : "";
  const nightTime = night ? S.night : "";
  const resultClassName = `${dayTime} ${nightTime}`;

  return (
    <div className={`${S.roomBackground} ${resultClassName}`}>
      <div className={S.goToMainPage}>
        <DisconnectButton onClick={leaveRoom}>
          <span>＜</span> 방 나가기
        </DisconnectButton>
      </div>
      {isGameState === "gameStart" && (
        <div className={S.gameTimer}>
          <SpeakTimer />
          <p className={S.dayAndNight}>
            <span className={S.sun}>{morning && <Image src={SunIcon} className={S.sunImage} alt="sun icon" />}</span>
            <span className={S.moon}>{night && <Image src={MoonIcon} className={S.moonImage} alt="moon icon" />}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default MafiaHeader;
