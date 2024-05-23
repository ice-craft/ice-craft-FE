import useConnectStore from "@/store/connect-store";
import useOverlayStore from "@/store/overlay-store";
import useShowModalStore from "@/store/show-modal-store";
import S from "@/style/livekit/livekit.module.css";
import { allAudioSetting } from "@/utils/participantCamSettings/camSetting";
import BeforeUnloadHandler from "@/utils/reload/beforeUnloadHandler";
import { socket } from "@/utils/socket/socket";

import GroupMafiaModal from "@/components/modal/GroupMafiaModal";
import useMediaSocket from "@/hooks/useMediaSocket";
import useShowModalSocket from "@/hooks/useShowModalSocket";
import { DisconnectButton, useTracks } from "@livekit/components-react";
import { Participant, Track } from "livekit-client";
import { useEffect, useRef, useState } from "react";
import LocalParticipant from "./LocalParticipant";
import MafiaToolTip from "./MafiaToolTip";
import RemoteParticipant from "./RemoteParticipant";
import VoteResultModal from "../modal/VoteResultModal";

const MafiaPlayRooms = () => {
  const { userId, roomId, nickname } = useConnectStore();

  //캠 클릭 이벤트의 구성요소
  const { toggleOverlay, setIsOverlay, clearActiveParticipant, setIsRemoteOverlay } = useOverlayStore();

  // "GroupMafiaModal" 모달의 구성요소
  const { title, setIsOpen, setTitle, setMessage, setTimer } = useShowModalStore();
  const [currentModal, setCurrentModal] = useState<React.ReactNode>(<GroupMafiaModal />);

  //기존 "r0ShowAllUserRole" socket Event에서 사용한 state값이다. ==> 직업 카드 효과
  const [role, setRole] = useState(null);

  // 여러 setTimeout의 타이머 상태를 저장하여 return시 한번에 제거
  const [timerIds, setTimerIds] = useState<NodeJS.Timeout[]>([]);
  const timerRef = useRef(false);
  const [voteTimerClose, setVoteTimerClose] = useState<NodeJS.Timeout>();

  //NOTE -  전체 데이터
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.Microphone, withPlaceholder: true }
    ],
    { onlySubscribed: false }
  );

  //NOTE - "showModal" 소켓 이벤트 헨들러
  useShowModalSocket();

  //NOTE - "playerMediaStatus" 소켓 에빈트 헨들러
  useMediaSocket();

  // Clear Timer
  useEffect(() => {
    return () => {
      console.log("timerId", timerIds);
      // 저장된 모든 타이머 클리어
      timerIds.forEach((timerId) => {
        console.log("timerId", timerId);
        clearTimeout(timerId);
      });
    };
  }, []);

  //NOTE - 캠 클릭 이벤트
  const checkClickHandle = (event: React.MouseEvent<HTMLElement>, participant: Participant, index: number) => {
    event.stopPropagation();
    toggleOverlay(participant.sid, index); // 캠 클릭시 이미지 띄우기
  };

  const leaveRoom = () => {
    socket.emit("exitRoom", roomId, userId);
  };

  BeforeUnloadHandler();

  return (
    <section className={S.section}>
      <LocalParticipant tracks={tracks} checkClickHandle={checkClickHandle} />
      <RemoteParticipant tracks={tracks} checkClickHandle={checkClickHandle} />
      <div className={S.goToMainPage}>
        <button
          onClick={() => {
            allAudioSetting(tracks, false);
          }}
          style={{ background: "red" }}
        >
          전체 소리 끄기
        </button>
        <DisconnectButton onClick={leaveRoom}>나가기</DisconnectButton>
      </div>
      <MafiaToolTip />
      {currentModal}
    </section>
  );
};

export default MafiaPlayRooms;
