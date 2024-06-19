import S from "@/style/livekit/livekit.module.css";
import { Participants, playersInfo } from "@/types";
import { TrackLoop, useLocalParticipant } from "@livekit/components-react";
import React, { useEffect } from "react";
import RemoteParticipantTile from "./RemoteParticipantTile";
import { useOverLayActions } from "@/store/overlay-store";
import useSocketOn from "@/hooks/useSocketOn";
import { socket } from "@/utils/socket/socket";

const RemoteParticipant = ({ tracks }: Participants) => {
  const { localParticipant } = useLocalParticipant();
  const { setReadyPlayers } = useOverLayActions();
  const roomId = localParticipant.metadata;

  const remotesTrack = tracks.filter(
    (track) => track.source === "camera" && track.participant.sid !== localParticipant.sid
  );

  useEffect(() => {
    //NOTE - 방 입장 시 한 번만 실행 && Remote Player가 존재할 경우에만 실행
    if (roomId && remotesTrack.length !== 0) {
      socket.emit("usersInfo", roomId);
      console.log("usersInfo socket.emit 실행");
    }
  }, [roomId]);

  const sockets = {
    //NOTE - players의 실시간 준비 상태 update
    setReady: (playerId: string, isReady: boolean) => {
      setReadyPlayers(playerId, isReady);
    },
    //NOTE - players의 Ready 초기 상태
    usersInfo: (players: playersInfo[]) => {
      players.forEach((player) => {
        if (player.is_ready) {
          setReadyPlayers(player.user_id, player.is_ready);
        }
      });
    }
  };
  useSocketOn(sockets);

  return (
    <ul className={S.remoteParticipant}>
      <TrackLoop tracks={remotesTrack}>
        <RemoteParticipantTile />
      </TrackLoop>
    </ul>
  );
};

export default RemoteParticipant;
