import { MediaStatusMap } from "@/types";
import {
  TrackReferenceOrPlaceholder,
  useLocalParticipant,
  useParticipants,
  useRemoteParticipants
} from "@livekit/components-react";
import { Track } from "livekit-client";
import { useEffect } from "react";

//NOTE - 캠 및 마이크 설정
const useMediaStatus = (tracks: TrackReferenceOrPlaceholder[], playerList: MediaStatusMap | undefined) => {
  //NOTE -  로컬 user의 정보
  const localParticipant = useLocalParticipant();
  const localUserId = localParticipant.localParticipant.identity;

  //NOTE -  모든 원결 user들의 정보
  const remoteTracks = useRemoteParticipants();

  useEffect(() => {
    if (!playerList || !localParticipant) {
      return;
    }
    //NOTE - server에서 전송받은 playerList  구조: {userId: {cam: boolean, mike: boolean}}
    const userIdList = Object.keys(playerList);

    userIdList.forEach((playerId) => {
      const isMedia = playerList[playerId];

      //NOTE - 로컬 사용자
      if (localUserId == playerId) {
        const localCamera = localParticipant.cameraTrack?.track?.mediaStreamTrack;
        const localMike = localParticipant.microphoneTrack?.track?.mediaStreamTrack;

        localCamera!.enabled = isMedia.camera;
        localMike!.enabled = isMedia.mike;

        //NOTE - 원격 사용자들
      } else {
        //특정 user의 track(카메라 및 오디오 데이터)
        const remotePlayer = remoteTracks.find((track) => track.identity === playerId);

        if (!remotePlayer) {
          return;
        }

        const camera = remotePlayer.getTrackPublication(Track.Source.Camera);
        const mike = remotePlayer.getTrackPublication(Track.Source.Microphone);

        camera?.setSubscribed(isMedia.camera);
        mike?.setSubscribed(isMedia.mike);
      }
    });
  }, [playerList]);
};

export default useMediaStatus;
