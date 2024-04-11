import useOverlayStore from "@/store/overlay-store";
import S from "@/style/livekit/livekit.module.css";
import { DisconnectButton, useTracks } from "@livekit/components-react";
import { Track } from "livekit-client";
import LocalParticipant from "./LocalParticipant";
import MafiaToolTip from "./MafiaToolTip";
import RemoteParticipant from "./RemoteParticipant";
import { useRouter } from "next/navigation";
import { useCamClickImageState } from "@/store/image-store";
import CamCheck from "@/assets/images/cam_check.png";
import Doctor from "@/assets/images/cam_doctor.png";
import Citizen from "@/assets/images/cam_citizen.png";
import Mafia from "@/assets/images/cam_mafia.png";

const MyVideoConference = () => {
  const { toggleOverlay } = useOverlayStore();
  const router = useRouter();
  const { setImageState } = useCamClickImageState();

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

    // 해당 시간(투표 시간 및 저녁시간의 특정 직업의 능력)에 캠 클릭 시 user의 정보(id 및 nickname)을 서버에 전달 ==> 서버에서 직업 및 특정 값을 알려준다.
    // 클라이언트에서는 정답에 대한 이미지를 띄어준다.

    // 이미지 조건부

    //마피아 시간 or 의사시간 or 투표시간
    if ("마피아" || "시민" || "의사") {
      setImageState(CamCheck);
    }

    // 경찰 시간
    if ("경찰") {
      // 특정 유저 캠 클릭 시 유저의 직업 공개
      if ("otherUser == 의사") {
        setImageState(Doctor);
      } else if ("otherUser == 마피아") {
        setImageState(Mafia);
      } else if ("otherUser == 시민") {
        setImageState(Citizen);
      }
    }

    //
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
