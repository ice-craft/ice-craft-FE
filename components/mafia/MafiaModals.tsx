import useSocketOn from "@/hooks/useSocketOn";
import { useCurrentModal, useModalActions, useModalIsOpen } from "@/store/show-modal-store";
import { Role, VoteResult, YesOrNoResults } from "@/types";
import CheckModal from "../modal/CheckModal";
import GroupMafiaModal from "../modal/GroupMafiaModal";
import LastVoteResultModal from "../modal/LastVoteResultModal";
import UserRoleModal from "../modal/UserRoleModal";
import VictoryModal from "../modal/VictoryModal";
import VoteResultModal from "../modal/VoteResultModal";

const MafiaModals = () => {
  const isOpen = useModalIsOpen();
  const currentModal = useCurrentModal();

  const { setYesOrNoVoteResult, setCurrentModal, setIsOpen, setTimer, setTitle, setRole, setVoteResult } =
    useModalActions();

  const sockets = {
    showModal: (title: string, timer: number) => {
      //NOTE -  CheckModal(찬성/반대) 투표 모달창 요소
      if (title.includes("찬성/반대 투표")) {
        setCurrentModal("CheckModal");
        setIsOpen(true);
        setTitle(title);
        setTimer(timer);
        return;
      }

      //NOTE - GroupModal 모달창 요소
      setCurrentModal("GroupMafiaModal");
      setTitle(title);
      setTimer(timer);
      setIsOpen(true);
    },

    //NOTE - UserRoleModal 모달창 요소
    showAllPlayerRole: (role: Role, timer: number) => {
      setCurrentModal("UserRoleModal");
      setRole(role);
      setTimer(timer);
      setIsOpen(true);
    },
    //NOTE - 투표 결과 모달창 요소
    showVoteResult: (voteResult: VoteResult[], timer: number) => {
      setCurrentModal("VoteResultModal");
      setVoteResult(voteResult);
      setTimer(timer);
      setIsOpen(true);
    },
    //NOTE - 찬성/반대 투표 결과 모달창 요소
    showVoteDeadOrLive: (voteResult: YesOrNoResults, timer: number) => {
      setCurrentModal("LastVoteResultModal");
      setYesOrNoVoteResult(voteResult);
      setTimer(timer);
      setIsOpen(true);
    },
    //NOTE - 승리한 팀 모달창 요소 및 게임 초기화
    victoryPlayer: (victoryTeam: string, timer: number) => {
      //승리 모달창 요소
      setCurrentModal("VictoryModal");
      setTitle(victoryTeam);
      setTimer(timer);
      setIsOpen(true);
    }
  };

  //NOTE - socket On, Off 담당
  useSocketOn(sockets);

  if (!isOpen) return null;

  //NOTE - 모달창 리스트
  /*
    GroupMafiaModal - 마피아 공용 모달창
    UserRoleModal - 직업 카드 모달창
    CheckModal - 찬반 투표 모달창 (yes or no)
    VoteResultModal - 찬반 투표 결과 모달창
    LastVoteResultModal - 최종 투표 결과 모달창
    VictoryModal - 승리 결과 모달창
  */

  switch (currentModal) {
    case "GroupMafiaModal":
      return <GroupMafiaModal />;
    case "UserRoleModal":
      return <UserRoleModal />;
    case "CheckModal":
      return <CheckModal />;
    case "VoteResultModal":
      return <VoteResultModal />;
    case "LastVoteResultModal":
      return <LastVoteResultModal />;
    case "VictoryModal":
      return <VictoryModal />;
    default:
      return null;
  }
};

export default MafiaModals;
