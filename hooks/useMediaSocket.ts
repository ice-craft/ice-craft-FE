import { useLocalParticipant, useRemoteParticipants, useTracks } from "@livekit/components-react";
import { Track } from "livekit-client";
import { useEffect, useState } from "react";
import { MediaStatus } from "@/types";
import useSocketOn from "./useSocketOn";

const useMediaSocket = () => {
  const [playersMediaStatus, setPlayersMediaStatus] = useState<MediaStatus>();

  //NOTE - layersMedias 구조: {userId: {cam: boolean, mike: boolean}}
  const mediaSocket = {
    playerMediaStatus: (playersMedias: MediaStatus) => {
      console.log("playerMediaStatus Event Message", playersMedias);
      //NOTE - 모달 테스트할 경우 카메라 부분 실행을 임시로 막기
      // setPlayersMediaStatus(playersMedias);
    }
  };

  useSocketOn(mediaSocket);

  //NOTE -  로컬 player의 정보
  const localParticipant = useLocalParticipant();
  const localUserId = localParticipant.localParticipant.identity;

  //NOTE -  모든 원격 player들의 정보
  const remoteTracks = useRemoteParticipants();

  useEffect(() => {
    //NOTE - Type 좁히기: "playersMediaStatus": MediaStatus | undefined
    if (!playersMediaStatus) {
      return;
    }

    const userIdList = Object.keys(playersMediaStatus);

    userIdList.forEach((playerId) => {
      const isMedia = playersMediaStatus[playerId];

      //NOTE - 로컬 사용자의 미디어
      if (localUserId == playerId) {
        const localCamera = localParticipant.cameraTrack?.track?.mediaStreamTrack;
        const localMike = localParticipant.microphoneTrack?.track?.mediaStreamTrack;

        localCamera!.enabled = isMedia.camera;
        localMike!.enabled = isMedia.mike;
      }

      //NOTE - 원격 사용자들의 미디어
      if (localUserId !== playerId) {
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
  }, [playersMediaStatus]);
};

export default useMediaSocket;
