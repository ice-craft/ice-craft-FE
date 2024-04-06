import { useLocalParticipant, useRemoteParticipants, useTracks } from "@livekit/components-react";
import { Track } from "livekit-client";
import { useEffect } from "react";
import LocalParticipant from "./LocalParticipant";
import RemoteParticipant from "./RemoteParticipant";
import useVideoStore from "@/app/_store/video-store";

const MyVideoConference = () => {
  const { setTracks } = useVideoStore();
  // 전체 데이터
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false }
    ],
    { onlySubscribed: false }
  );

  /*
    //훅 정리
    const { localParticipant } = useLocalParticipant(); //로컬 사용자
    const [remoteParticipant] = useRemoteParticipants(); //다른 사용자
  */
  const [remoteParticipant] = useRemoteParticipants();
  console.log(remoteParticipant);
  return (
    <section>
      <LocalParticipant tracks={tracks} />
      <RemoteParticipant tracks={tracks} />
    </section>
  );
};

export default MyVideoConference;
