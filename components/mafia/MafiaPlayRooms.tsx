import Citizen from "@/assets/images/cam_citizen.svg";
import Doctor from "@/assets/images/cam_doctor.svg";
import Mafia from "@/assets/images/cam_mafia.svg";
import CamCheck from "@/assets/images/cam_check.svg";
import GroupMafiaModal from "@/components/modal/GroupMafiaModal";
import useMediaSocket from "@/hooks/useMediaSocket";
import useModalSocket from "@/hooks/useModalSocket";
import useConnectStore from "@/store/connect-store";
import { useJobImageAction } from "@/store/image-store";
import { useInSelect, useOverLayActions } from "@/store/overlay-store";
import {
  useCheckModalIsOpen,
  useGroupModalIsOpen,
  useRoleModalElement,
  useRoleModalIsOpen,
  useVoteModalIsOpen
} from "@/store/show-modal-store";
import S from "@/style/livekit/livekit.module.css";
import { allAudioSetting } from "@/utils/participantCamSettings/camSetting";
import BeforeUnloadHandler from "@/utils/reload/beforeUnloadHandler";
import { socket } from "@/utils/socket/socket";
import { DisconnectButton, useTracks } from "@livekit/components-react";
import { Track } from "livekit-client";
import CheckModal from "../modal/CheckModal";
import UserRoleModal from "../modal/UserRoleModal";
import VoteResultModal from "../modal/VoteResultModal";
import LocalParticipant from "./LocalParticipant";
import MafiaToolTip from "./MafiaToolTip";
import RemoteParticipant from "./RemoteParticipant";

import useSelectSocket from "@/hooks/useSelectSocket";
import useSocketOn from "@/hooks/useSocketOn";
import { useDiedAction } from "@/store/active-store";
import getPlayerJob from "@/utils/mafiaSocket/getPlayerJob";
import { Role } from "@/types";

const MafiaPlayRooms = () => {
  const { userId, roomId } = useConnectStore();
  // const role = useRoleModalElement();

  const role: Role = {
    mafia: ["ed21e5d9-e3b6-4faf-af38-3a906c7827", "adfasdfasfasfdsaf"],
    doctor: [
      "ed21e5d9-e3b6-4faf-af38-3a906c7827ae",
      "adhfk23jk1h3k123",
      "ec975a0a-e9b7-4af5-9a1f-0e5a906abf72",
      "6ef00822-f847-4e94-9732-61b71c467e68"
    ],
    police: [
      "4446de7f-27bd-46f8-bf2a-b870edb5a950",
      "6efef090-2466-4a1c-9e27-0ff9068c93c1",
      "b73d123a-cc89-496b-a786-dc2cab696b21"
    ],
    citizen: ["794d5dc8-cf4c-46e8-b7cc-82a41c537c4c", ""]
  };

  const inSelect = useInSelect();
  const setDiedPlayer = useDiedAction();
  const setImageState = useJobImageAction();

  //NOTE - 캠 클릭 이벤트의 구성요소
  const { setActiveParticipant, setIsOverlay } = useOverLayActions();
  //NOTE - 임시: 각 모달창 별로 On, Off
  const isGroupModal = useGroupModalIsOpen();
  const isRoleModal = useRoleModalIsOpen();
  const isVoteModal = useVoteModalIsOpen();
  const isCheckModal = useCheckModalIsOpen();

  //NOTE -  전체 데이터
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.Microphone, withPlaceholder: true }
    ],
    { onlySubscribed: false } // 구독 여부 상관없이 실행
  );

  //NOTE - 죽은 playerId 관리
  const sockets = {
    diedPlayer: (playerId: string) => {
      // console.log("죽은 player", playerId);
      setDiedPlayer(playerId);
    }
  };

  // NOTE - socket On 담당
  useSocketOn(sockets);

  //socket 실행
  useMediaSocket();
  useModalSocket();
  useSelectSocket();

  //NOTE - 캠 클릭 이벤트 헨들러
  const checkClickHandle = (event: React.MouseEvent<HTMLElement>, playerId: string) => {
    event.stopPropagation();
    console.log("clickEvent", playerId);

    setIsOverlay(false); // : 클릭 이벤트를 한 번만 수행
    setActiveParticipant(playerId); // : 캠 클릭시 클릭한 위치에 이미지 띄우기

    //NOTE - 투표 및 마피아 시간
    if (inSelect.includes("vote" || "mafia")) {
      socket.emit("voteTo", playerId);
      setImageState(CamCheck);
      return;
    }

    //NOTE - 의사 시간
    if (inSelect.includes("doctor")) {
      socket.emit("selectPlayer", playerId);
      setImageState(CamCheck);
      return;
    }

    //NOTE - 경찰 시간
    if (inSelect.includes("police")) {
      const clickPlayerJob = getPlayerJob(role, playerId);

      if (clickPlayerJob === "mafia") {
        setImageState(Mafia);
      }
      if (clickPlayerJob === "doctor") {
        setImageState(Doctor);
      }
      if (clickPlayerJob === "citizen") {
        setImageState(Citizen);
      }
    }
  };

  //NOTE - 방 나가기 이벤트 헨들러
  const leaveRoom = () => {
    socket.emit("exitRoom", roomId, userId);
  };

  //NOTE - 뒤로가기 및 새로고침(미완성)
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
