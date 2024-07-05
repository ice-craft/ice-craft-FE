import { MediaStatus } from "@/types";
import { useLocalParticipant, useRemoteParticipants, useTracks } from "@livekit/components-react";
import { Track } from "livekit-client";
import { useEffect, useState } from "react";

//NOTE - playersMedias 구조: {userId: {cam: boolean, mike: boolean}}
const useMediaDevice = () => {
  const [playersMediaStatus, setPlayersMediaStatus] = useState<MediaStatus | null>(null);
  const [isMediaReset, setIsMediaReset] = useState(false);

  //로컬 player의 정보
  const localParticipant = useLocalParticipant();
  const localPlayerId = localParticipant.localParticipant.identity;

  //모든 원격 player들의 정보
  const remoteTracks = useRemoteParticipants();

  //NOTE - 미디어 관리
  useEffect(() => {
    //Type 좁히기: "playersMediaStatus": MediaStatus | null
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

        //Type 좁히기: "remotePlayerTrack": RemoteParticipant | undefined
        if (!remotePlayerTrack) {
          return;
        }

        const camera = remotePlayerTrack.getTrackPublication(Track.Source.Camera);
        const mike = remotePlayerTrack.getTrackPublication(Track.Source.Microphone);

        camera?.setSubscribed(isMedia.camera);
        mike?.setSubscribed(isMedia.mike);
      }
    });
  }, [playersMediaStatus]);

  //NOTE - 게임 종료 시 모든 player 캠 및 오디오 on
  useEffect(() => {
    if (isMediaReset) {
      console.log("🚀게임 종료 시 AllPlayer 미디어 On:", isMediaReset);

      //로컬 사용자의 미디어
      if (localPlayerId) {
        const localCamera = localParticipant.cameraTrack?.track?.mediaStreamTrack;
        const localMike = localParticipant.microphoneTrack?.track?.mediaStreamTrack;

        localCamera!.enabled = true;
        localMike!.enabled = true;
      }

      remoteTracks.forEach((remotePlayerTrack) => {
        const camera = remotePlayerTrack.getTrackPublication(Track.Source.Camera);
        const mike = remotePlayerTrack.getTrackPublication(Track.Source.Microphone);

        camera?.setSubscribed(true);
        mike?.setSubscribed(true);
      });
    }
  }, [isMediaReset]);

  return { setIsMediaReset, setPlayersMediaStatus };
};

export default useMediaDevice;
