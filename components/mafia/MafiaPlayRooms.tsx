import useConnectStore from "@/store/connect-store";
import useOverlayStore from "@/store/overlay-store";
import S from "@/style/livekit/livekit.module.css";
import { allAudioSetting } from "@/utils/participantCamSettings/camSetting";
import BeforeUnloadHandler from "@/utils/reload/beforeUnloadHandler";
import { socket } from "@/utils/socket/socket";

import GroupMafiaModal from "@/components/modal/GroupMafiaModal";
import useMediaSocket from "@/hooks/useMediaSocket";
import { useModalActions, useModalIsOpen } from "@/store/show-modal-store";
import { DisconnectButton, useTracks } from "@livekit/components-react";
import { Participant, Track } from "livekit-client";
import { useState } from "react";
import LocalParticipant from "./LocalParticipant";
import MafiaToolTip from "./MafiaToolTip";
import RemoteParticipant from "./RemoteParticipant";
import useModalSocket from "@/hooks/useModalSocket";
import UserRoleModal from "../modal/UserRoleModal";

const MafiaPlayRooms = () => {
  const { userId, roomId, nickname } = useConnectStore();

  //캠 클릭 이벤트의 구성요소
  const { toggleOverlay, setIsOverlay, clearActiveParticipant, setIsRemoteOverlay } = useOverlayStore();

  // "GroupMafiaModal" 모달의 구성요소
  const isModalOpen = useModalIsOpen();
  const { setIsOpen } = useModalActions();
  const [currentModal, setCurrentModal] = useState<React.ReactNode>(<GroupMafiaModal />);

  //NOTE -  전체 데이터
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.Microphone, withPlaceholder: true }
    ],
    { onlySubscribed: false } // 구독 여부 상관없이 실행
  );

  //"socket 실행"
  useMediaSocket();
  useModalSocket();

  //NOTE - 캠 클릭 이벤트 헨들러
  const checkClickHandle = (event: React.MouseEvent<HTMLElement>, participant: Participant, index: number) => {
    event.stopPropagation();
    console.log("클릭 Id", participant.sid);

    toggleOverlay(participant.sid, index); // 캠 클릭시 이미지 띄우기
  };

  //NOTE - 방 나가기 이벤트 헨들러
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
      isOpen: 모달창 띄우기
      {/* {isModalOpen && <GroupMafiaModal />} */}
      {isModalOpen && <UserRoleModal />}
    </section>
  );
};

export default MafiaPlayRooms;
