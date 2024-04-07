import useOverlayStore from "@/app/_store/overlay-store";
import S from "@/app/_style/livekit/livekit.module.css";
import { useTracks } from "@livekit/components-react";
import { Track } from "livekit-client";
import LocalParticipant from "./LocalParticipant";
import RemoteParticipant from "./RemoteParticipant";

const MyVideoConference = () => {
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

  const showOverlay = useOverlayStore((state) => state.showOverlay);
  const toggleOverlay = useOverlayStore((state) => state.toggleOverlay);

  const checkClickHandle = (event: any, participantSid: any) => {
    event.stopPropagation();
    toggleOverlay(participantSid);
  };

  return (
    <section className={S.section}>
      <LocalParticipant tracks={tracks} checkClickHandle={checkClickHandle} />
      <RemoteParticipant tracks={tracks} checkClickHandle={checkClickHandle} />
    </section>
  );
};

export default MyVideoConference;
