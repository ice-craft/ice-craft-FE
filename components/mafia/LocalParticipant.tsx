import CamCheck from "@/assets/images/cam_check.svg";
import S from "@/style/livekit/livekit.module.css";
import { Participants } from "@/types";
import { ParticipantTile, TrackLoop, useLocalParticipant } from "@livekit/components-react";
import Image from "next/image";
import React from "react";
import GameStartButton from "./GameStartButton";
import SpeakTimer from "./SpeakTimer";
import { useActivePlayer, useInSelect, useIsLocalOverlay, useOverLayActions } from "@/store/overlay-store";
import { useDiedPlayer, useIsReady } from "@/store/game-store";
import PlayerDieImage from "@/assets/images/player_die.svg";
import { socket } from "@/utils/socket/socket";
import { useJobImageAction } from "@/store/image-store";

const LocalParticipant: React.FC<Participants> = ({ tracks }) => {
  const { localParticipant } = useLocalParticipant();
  const activePlayerId = useActivePlayer();
  const isLocalOverlay = useIsLocalOverlay();
  const isReady = useIsReady();
  const { setActiveParticipant, setIsOverlay } = useOverLayActions();
  const inSelect = useInSelect();
  const setImageState = useJobImageAction();
  const diedPlayers = useDiedPlayer();

  const localTracks = tracks.filter((track) => track.participant.sid === localParticipant.sid);
  const diedPlayer = diedPlayers.find((diedPlayer) => diedPlayer === localParticipant.identity);

  //NOTE - 캠 클릭 이벤트 헨들러
  const checkClickHandle = (event: React.MouseEvent<HTMLElement>, playerId: string) => {
    event.stopPropagation();
    console.log("clickEvent", playerId);

    setIsOverlay(false); // : 클릭 이벤트를 한 번만 수행
    setActiveParticipant(playerId); // : 캠 클릭시 클릭한 위치에 이미지 띄우기

    //NOTE - 투표 및 마피아 시간
    if (inSelect.includes("vote")) {
      console.log("vote", playerId);
      socket.emit("voteTo", playerId);
      setImageState(CamCheck);
      return;
    }

    //NOTE - 의사 시간
    if (inSelect.includes("doctor")) {
      socket.emit("selectPlayer", playerId);
      setImageState(CamCheck);
      return;
    }
  };

  return (
    <div className={S.localParticipant}>
      <SpeakTimer />
      <TrackLoop tracks={localTracks}>
        <div
          className={`${S.participantOverlay} ${activePlayerId === localParticipant.identity ? S.active : ""}`}
          onClick={isLocalOverlay ? (e) => checkClickHandle(e, localParticipant.identity) : undefined}
        >
          <ParticipantTile disableSpeakingIndicator={true} className={isLocalOverlay ? S.localCam : undefined} />
          {!diedPlayer ? (
            <div className={`${S.imageOverlay} ${isReady ? S.active : ""}`}>
              <Image src={CamCheck} alt={localParticipant.identity} />
            </div>
          ) : (
            <div className={S.playerDieOverlay}>
              <Image src={PlayerDieImage} alt={localParticipant.identity} />
            </div>
          )}
        </div>
      </TrackLoop>
      <GameStartButton />
    </div>
  );
};

export default LocalParticipant;
