import CamCheck from "@/assets/images/cam_check.svg";
import Citizen from "@/assets/images/cam_citizen.svg";
import Doctor from "@/assets/images/cam_doctor.svg";
import Mafia from "@/assets/images/cam_mafia.svg";
import PlayerDieImages from "@/assets/images/player_die.svg";
import { useDiedPlayer } from "@/store/game-store";
import { useJobImageAction, useJobImageState } from "@/store/image-store";
import { useActivePlayer, useInSelect, useIsRemoteOverlay, useOverLayActions } from "@/store/overlay-store";
import { useRoleModalElement } from "@/store/show-modal-store";
import S from "@/style/livekit/livekit.module.css";
import { RemoteReadyStates } from "@/types";
import getPlayerJob from "@/utils/mafiaSocket/getPlayerJob";
import { socket } from "@/utils/socket/socket";
import { ParticipantTile, ParticipantTileProps, useEnsureTrackRef } from "@livekit/components-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const MyParticipantTile = ({ trackRef }: ParticipantTileProps) => {
  const trackReference = useEnsureTrackRef(trackRef);
  const diedPlayers = useDiedPlayer();
  const PlayerId = useActivePlayer();
  const [remoteReadyStates, setRemoteReadyStates] = useState<RemoteReadyStates>({});
  const imageState = useJobImageState();
  const isRemoteOverlay = useIsRemoteOverlay();
  const { setActiveParticipant, setIsOverlay } = useOverLayActions();
  const inSelect = useInSelect();
  const setImageState = useJobImageAction();
  const role = useRoleModalElement();
  const diedPlayer = diedPlayers.find((diedPlayer) => diedPlayer === trackReference.participant.identity);

  useEffect(() => {
    const participantReady = (userId: string, isReady: boolean) => {
      setRemoteReadyStates((prev) => ({ ...prev, [userId]: isReady }));
    };

    socket.on("updateUserReady", participantReady);

    return () => {
      socket.off("updateUserReady");
    };
  }, []);

  //NOTE - 캠 클릭 이벤트 헨들러
  const checkClickHandle = (event: React.MouseEvent<HTMLElement>, playerId: string) => {
    event.stopPropagation();
    console.log("clickEvent", playerId);

    setIsOverlay(false); // : 클릭 이벤트를 한 번만 수행
    setActiveParticipant(playerId); // : 캠 클릭시 클릭한 위치에 이미지 띄우기

    //NOTE - 투표 및 마피아 시간
    if (inSelect.includes("vote" || "mafia")) {
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

    //NOTE - 경찰 시간
    if (inSelect.includes("police")) {
      const clickPlayerJob = getPlayerJob(role, playerId);

      if (clickPlayerJob === "mafia") {
        setImageState(Mafia);
      }
      if (clickPlayerJob === "doctor") {
        setImageState(Doctor);
      }
      if (clickPlayerJob === "citizen") {
        setImageState(Citizen);
      }
    }
  };

  if (!trackReference) {
    return null;
  }

  return (
    <>
      <li
        className={`${S.remoteParticipantOverlay} ${PlayerId === trackReference.participant.identity ? S.active : ""}`}
        onClick={isRemoteOverlay ? (e) => checkClickHandle(e, trackReference.participant.identity) : undefined}
      >
        <ParticipantTile
          disableSpeakingIndicator={true}
          className={`${S.remoteCam} ${isRemoteOverlay ? "cursor-pointer" : ""}`}
        />
        {!diedPlayer ? (
          <div
            className={`${S.remoteOverlay} ${remoteReadyStates[trackReference.participant.identity] ? S.active : ""}`}
          >
            <Image src={imageState!} alt={trackReference.participant.identity} />
          </div>
        ) : (
          <div className={S.playerDieOverlay}>
            <Image src={PlayerDieImages} alt={trackReference.participant.identity} />
          </div>
        )}
      </li>
    </>
  );
};

export default MyParticipantTile;
