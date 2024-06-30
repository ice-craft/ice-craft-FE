import { useDiedPlayer } from "@/store/game-store";
import { MediaStatus } from "@/types";
import { useLocalParticipant, useRemoteParticipants } from "@livekit/components-react";
import { Track } from "livekit-client";
import { useEffect, useState } from "react";
import useSocketOn from "./useSocketOn";

const useMediaSocket = () => {
  const diedPlayerId = useDiedPlayer();
  const [playersMediaStatus, setPlayersMediaStatus] = useState<MediaStatus>();

  //NOTE -  로컬 player의 정보
  const localParticipant = useLocalParticipant();
  const localPlayerId = localParticipant.localParticipant.identity;

  //NOTE -  모든 원격 player들의 정보
  const remoteTracks = useRemoteParticipants();

  //NOTE - playersMedias 구조: {userId: {cam: boolean, mike: boolean}}
  const mediaSocket = {
    playerMediaStatus: (playersMedias: MediaStatus) => {
      setPlayersMediaStatus(playersMedias);
    }
  };

  useSocketOn(mediaSocket);

  //NOTE - 미디어 관리
  useEffect(() => {
    //NOTE - 죽은 player일 경우 캠클릭 비활성화
    const isDiedPlayer = diedPlayerId.find((playerId) => localPlayerId === playerId);

    if (isDiedPlayer) {
      localParticipant.localParticipant.setCameraEnabled(false);
      localParticipant.localParticipant.setMicrophoneEnabled(false);
    }

    //NOTE - Type 좁히기: "playersMediaStatus": MediaStatus | undefined
    if (!playersMediaStatus) {
      return;
    }

    const userIdList = Object.keys(playersMediaStatus);

    userIdList.forEach((playerId) => {
      const isMedia = playersMediaStatus[playerId];

      //NOTE - 로컬 사용자의 미디어
      if (localPlayerId == playerId) {
        const localCamera = localParticipant.cameraTrack?.track?.mediaStreamTrack;
        const localMike = localParticipant.microphoneTrack?.track?.mediaStreamTrack;

        localCamera!.enabled = isMedia.camera;
        localMike!.enabled = isMedia.mike;
      }

      //NOTE - 원격 사용자들의 미디어
      if (localPlayerId !== playerId) {
        //특정 plyer의 track(카메라 및 오디오 데이터)
        const remotePlayerTrack = remoteTracks.find((track) => track.identity === playerId);

        //NOTE - Type 좁히기: "remotePlayerTrack": RemoteParticipant | undefined
        if (!remotePlayerTrack) {
          return;
        }

        const camera = remotePlayerTrack.getTrackPublication(Track.Source.Camera);
        const mike = remotePlayerTrack.getTrackPublication(Track.Source.Microphone);

        camera?.setSubscribed(isMedia.camera);
        mike?.setSubscribed(isMedia.mike);
      }
    });
  }, [playersMediaStatus, diedPlayerId]);
};

export default useMediaSocket;
