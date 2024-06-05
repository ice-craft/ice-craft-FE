import Citizen from "@/assets/images/cam_citizen.svg";
import Doctor from "@/assets/images/cam_doctor.svg";
import Mafia from "@/assets/images/cam_mafia.svg";
import useConnectStore from "@/store/connect-store";
import S from "@/style/livekit/livekit.module.css";
import { allAudioSetting } from "@/utils/participantCamSettings/camSetting";
import BeforeUnloadHandler from "@/utils/reload/beforeUnloadHandler";
import { socket } from "@/utils/socket/socket";

import GroupMafiaModal from "@/components/modal/GroupMafiaModal";
import useMediaSocket from "@/hooks/useMediaSocket";
import useModalSocket from "@/hooks/useModalSocket";
import { useJobImageAction } from "@/store/image-store";
import { useInSelect, useOverLayActions } from "@/store/overlay-store";
import {
  useCheckModalIsOpen,
  useGroupModalIsOpen,
  useRoleModalElement,
  useRoleModalIsOpen,
  useVoteModalIsOpen
} from "@/store/show-modal-store";
import { DisconnectButton, useLocalParticipant, useTracks } from "@livekit/components-react";
import { Track } from "livekit-client";
import CheckModal from "../modal/CheckModal";
import UserRoleModal from "../modal/UserRoleModal";
import VoteResultModal from "../modal/VoteResultModal";
import LocalParticipant from "./LocalParticipant";
import MafiaToolTip from "./MafiaToolTip";
import RemoteParticipant from "./RemoteParticipant";

import getPlayerJob from "@/utils/mafiaSocket/getPlayerJob";
import { useEffect } from "react";

const MafiaPlayRooms = () => {
  const { userId, roomId } = useConnectStore();
  const setImageState = useJobImageAction();
  const role = useRoleModalElement();
  //NOTE - 임시: 각 모달창 별로 On, Off
  const isGroupModal = useGroupModalIsOpen();
  const isRoleModal = useRoleModalIsOpen();
  const isVoteModal = useVoteModalIsOpen();
  const isCheckModal = useCheckModalIsOpen();
  //NOTE - 투표시간, 마피아시간, 의사시간, 경찰시간 구성요소
  const inSelect = useInSelect();

  //NOTE - 캠 클릭 이벤트의 구성요소
  const { setActiveParticipant, setIsOverlay, setIsRemoteOverlay, clearActiveParticipant } = useOverLayActions();
  const { localParticipant } = useLocalParticipant();

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

  //NOTE - 캠 클릭 활성화
  useEffect(() => {
    // NOTE - role, inSelect 존재하지 않을 시
    if (!role || !inSelect) return;

    //NOTE - 해당 player의 직업
    const localJob = getPlayerJob(role, localParticipant.identity);

    //NOTE - 투표 시간이면서, 모든 player 캠 클릭 이벤트 활성화
    if (inSelect.includes("vote")) {
      setIsOverlay(true);
    }
    //NOTE - 마피아 시간이면서, 마피아인 player만 캠 클릭 이벤트 활성화
    if (inSelect.includes("mafia") && localJob === "mafia") {
      setIsRemoteOverlay(true);
    }
    //NOTE - 의사 시간이면서, 의사인 player만 캠 클릭 이벤트 활성화
    if (inSelect.includes("doctor") && localJob === "doctor") {
      setIsOverlay(true);
    }
    //NOTE - 경찰 시간이면서, 경찰인 player만 캠 클릭 이벤트 활성화
    if (inSelect.includes("police") && localJob === "police") {
      setIsRemoteOverlay(true);
    }
  }, [inSelect]);

  //NOTE - 캠 클릭 이벤트 헨들러
  const checkClickHandle = (event: React.MouseEvent<HTMLElement>, playerId: string) => {
    event.stopPropagation();

    if (inSelect.includes("vote" || "mafia")) {
      socket.emit("voteTo", playerId);
      setIsOverlay(false);
      setActiveParticipant(playerId);
      return;
    }

    if (inSelect.includes("doctor")) {
      socket.emit("selectPlayer", playerId);
      setIsOverlay(false);
      setActiveParticipant(playerId);
      return;
    }

    //NOTE - 경찰 시간
    const remoteJob = getPlayerJob(role, playerId);

    if (remoteJob === "mafia") {
      setImageState(Mafia);
      setIsOverlay(false);
      setActiveParticipant(playerId);
    }
    if (remoteJob === "doctor") {
      setImageState(Doctor);
      setIsOverlay(false);
      setActiveParticipant(playerId);
    }
    if (remoteJob === "citizen") {
      setImageState(Citizen);
      setIsOverlay(false); // 클릭 이벤트를 한 번만 수행
      setActiveParticipant(playerId); // 캠 클릭시 클릭한 위치에 이미지 띄우기
    }
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

      {/* isOpen: 모달창 띄우기 */}
      {isGroupModal && <GroupMafiaModal />}
      {isRoleModal && <UserRoleModal />}
      {isVoteModal && <VoteResultModal />}
      {isCheckModal && <CheckModal />}
    </section>
  );
};

export default MafiaPlayRooms;
