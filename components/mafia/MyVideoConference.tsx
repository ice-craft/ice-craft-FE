import useOverlayStore from "@/store/overlay-store";
import S from "@/style/livekit/livekit.module.css";
import { DisconnectButton, useTracks } from "@livekit/components-react";
import { Track } from "livekit-client";
import LocalParticipant from "./LocalParticipant";
import MafiaToolTip from "./MafiaToolTip";
import RemoteParticipant from "./RemoteParticipant";
import { useRouter } from "next/navigation";

const MyVideoConference = () => {
  const { toggleOverlay } = useOverlayStore();
  const router = useRouter();

  // 전체 데이터
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.Microphone, withPlaceholder: true }
    ],
    { onlySubscribed: false }
  );

  /*
    //훅 정리
    const { localParticipant } = useLocalParticipant(); //로컬 사용자
    const [remoteParticipant] = useRemoteParticipants(); //다른 사용자
  */

  const checkClickHandle = (event: React.MouseEvent<HTMLElement>, participantSid: string, index: number) => {
    event.stopPropagation();
    toggleOverlay(participantSid, index);
  };

  const leaveRoom = () => {
    router.replace(`/main`);
  };

  return (
    <section className={S.section}>
      <LocalParticipant tracks={tracks} checkClickHandle={checkClickHandle} />
      <RemoteParticipant tracks={tracks} checkClickHandle={checkClickHandle} />
      <MafiaToolTip role="mafia" />
      <div className={S.goToMainPage}>
        <DisconnectButton onClick={leaveRoom}>나가기</DisconnectButton>
      </div>
    </section>
  );
};

export default MyVideoConference;
