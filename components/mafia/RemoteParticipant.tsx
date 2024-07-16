import useSocketOn from "@/hooks/useSocketOn";
import { useOverLayActions } from "@/store/overlay-store";
import S from "@/style/livekit/livekit.module.css";
import { playersInfo } from "@/types";
import { socket } from "@/utils/socket/socket";
import { TrackLoop, TrackReferenceOrPlaceholder, useLocalParticipant } from "@livekit/components-react";
import { useEffect } from "react";
import RemoteParticipantTile from "./RemoteParticipantTile";

const RemoteParticipant = ({ tracks }: { tracks: TrackReferenceOrPlaceholder[] }) => {
  const { localParticipant } = useLocalParticipant();
  const { setReadyPlayers } = useOverLayActions();
  const roomId = localParticipant.metadata;

  const remotesTrack = tracks.filter(
    (track) => track.source === "camera" && track.participant.sid !== localParticipant.sid
  );

  useEffect(() => {
    //NOTE - 방 입장 시 한 번만 실행: players의 초기 Ready 상태
    if (roomId) {
      socket.emit("usersInfo", roomId);
    }
  }, [roomId]);

  const sockets = {
    //NOTE - players의 초기 Ready 상태
    usersInfo: (players: playersInfo[]) => {
      players.forEach((player) => {
        setReadyPlayers(player.user_id, player.is_ready);
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
