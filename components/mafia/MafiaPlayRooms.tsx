import useConnectStore from "@/store/connect-store";
import S from "@/style/livekit/livekit.module.css";
import { allAudioSetting } from "@/utils/participantCamSettings/camSetting";
import BeforeUnloadHandler from "@/utils/reload/beforeUnloadHandler";
import { socket } from "@/utils/socket/socket";

import GroupMafiaModal from "@/components/modal/GroupMafiaModal";
import useMediaSocket from "@/hooks/useMediaSocket";
import useModalSocket from "@/hooks/useModalSocket";
import { useInSelect, useOverLayActions } from "@/store/overlay-store";
import { useGroupModalIsOpen, useModalIsOpen, useRoleModalIsOpen, useVoteModalIsOpen } from "@/store/show-modal-store";
import { DisconnectButton, useTracks } from "@livekit/components-react";
import { Track } from "livekit-client";
import { useState } from "react";
import UserRoleModal from "../modal/UserRoleModal";
import LocalParticipant from "./LocalParticipant";
import MafiaToolTip from "./MafiaToolTip";
import RemoteParticipant from "./RemoteParticipant";
import VoteResultModal from "../modal/VoteResultModal";

const MafiaPlayRooms = () => {
  const { userId, roomId } = useConnectStore();
  const isGroupModal = useGroupModalIsOpen();
  const isRoleModal = useRoleModalIsOpen();
  const isVoteModal = useVoteModalIsOpen();
  const { setActiveParticipant, setIsOverlay } = useOverLayActions(); //캠 클릭 이벤트의 구성요소
  const inSelect = useInSelect();

  // const { toggleOverlay, setIsOverlay, clearActiveParticipant, setIsRemoteOverlay } = useOverlayStore();
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
  const checkClickHandle = (event: React.MouseEvent<HTMLElement>, playerId: string) => {
    event.stopPropagation();

    if (inSelect.includes("vote")) {
      socket.emit("voteToMafia", userId);
    }

    if (inSelect.includes("mafia")) {
      socket.emit("voteToCitizen", userId);
    }

    if (inSelect.includes("doctor")) {
      socket.emit("selectByDoctor", userId);
    }

    if (inSelect.includes("police")) {
      socket.emit("selectByPolice", userId);
    }

    // 클릭 이벤트를 한 번만 수행
    setIsOverlay(false);
    // 캠 클릭시 클릭한 위치에 이미지 띄우기
    setActiveParticipant(userId);

    console.log("checkClickHandle PlayerId", playerId);
  };

  //NOTE - 방 나가기 이벤트 헨들러
  const leaveRoom = () => {
    socket.emit("exitRoom", roomId, userId);
  };

  BeforeUnloadHandler();

  console.log("MafiaPlayRooms 작동");

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

      {/* isOpen: 모달창 띄우기 */}
      {isGroupModal && <GroupMafiaModal />}
      {isRoleModal && <UserRoleModal />}
      {isVoteModal && <VoteResultModal />}
    </section>
  );
};

export default MafiaPlayRooms;
