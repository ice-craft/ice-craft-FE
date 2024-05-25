import { useLocalParticipant, useRemoteParticipants, useTracks } from "@livekit/components-react";
import { Track } from "livekit-client";
import { useEffect, useState } from "react";
import useSocketOff from "./useSocketOff";
import useSocketOn from "./useSocketOn";
import { MediaStatus } from "@/types";

const useMediaSocket = () => {
  const [playersMediaStatus, setPlayersMediaStatus] = useState<MediaStatus | undefined>();

  //NOTE -  로컬 player의 정보
  const localParticipant = useLocalParticipant();
  const localUserId = localParticipant.localParticipant.identity;

  //NOTE -  모든 원격 player들의 정보
  const remoteTracks = useRemoteParticipants();

  // playersMedias 구조: {userId: {cam: boolean, mike: boolean}}
  const mediaSocket = "playerMediaStatus";
  const mediaHandler = (playersMedias: MediaStatus) => {
    console.log("playerMediaStatus Event Message", playersMedias);
    //NOTE - 모달 테스트할 경우 카메라 부분 실행을 임시로 막기
    // setPlayersMediaStatus(playersMedias);
  };

  useSocketOn(mediaSocket, mediaHandler);
  useSocketOff(mediaSocket);

  useEffect(() => {
    //NOTE - 서버에 전송 받는 user가 아닌 경우 및 트랙 정보가 없는 user일 경우 사전에 방진
    if (!playersMediaStatus || !localParticipant) {
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

        //NOTE - 임시로 생성: 테스트할 당시 테스트 id의 값에는 미디어 장치의 값이 없어 Error가 발생
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
