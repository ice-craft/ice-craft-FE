import GroupMafiaModal from "@/components/modal/GroupMafiaModal";
import useMediaSocket from "@/hooks/useMediaSocket";
import useModalSocket from "@/hooks/useModalSocket";
import useConnectStore from "@/store/connect-store";
import {
  useCheckModalIsOpen,
  useGroupModalIsOpen,
  useLastModalIsOpen,
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
import { useGameActions } from "@/store/game-store";
import LastVoteResultModal from "../modal/LastVoteResultModal";

const MafiaPlayRooms = () => {
  const { userId, roomId } = useConnectStore();
  const { setDiedPlayer } = useGameActions();

  //NOTE - 임시: 각 모달창 별로 On, Off
  const isGroupModal = useGroupModalIsOpen();
  const isRoleModal = useRoleModalIsOpen();
  const isVoteModal = useVoteModalIsOpen();
  const isCheckModal = useCheckModalIsOpen();
  const isLastOpen = useLastModalIsOpen();

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
      setDiedPlayer(playerId);
    }
  };

  // NOTE - socket On 담당
  useSocketOn(sockets);

  //socket 실행
  useMediaSocket();
  useModalSocket();
  useSelectSocket();

  //NOTE - 방 나가기 이벤트 헨들러
  const leaveRoom = () => {
    socket.emit("exitRoom", roomId, userId);
  };

  //NOTE - 뒤로가기 및 새로고침(미완성)
  BeforeUnloadHandler();

  return (
    <section className={S.section}>
      <LocalParticipant tracks={tracks} />
      <RemoteParticipant tracks={tracks} />
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
      {isLastOpen && <LastVoteResultModal />}
    </section>
  );
};

export default MafiaPlayRooms;
