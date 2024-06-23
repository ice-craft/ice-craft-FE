import { useModalActions } from "@/store/show-modal-store";
import { Role, VoteResult, YesOrNoResults } from "@/types";
import useSocketOn from "./useSocketOn";

const useModalSocket = () => {
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
    //NOTE - 승리한 팀 모달창 요소
    victoryPlayer: (victoryTeam: string, timer: number) => {
      setCurrentModal("VictoryModal");
      setTitle(victoryTeam);
      setTimer(timer);
      setIsOpen(true);
    }
  };

  //NOTE - socket On, Off 담당
  useSocketOn(sockets);
};

export default useModalSocket;
