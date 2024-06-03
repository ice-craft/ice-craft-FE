import { useModalActions } from "@/store/show-modal-store";
import { Role, VoteResult, YesOrNoResults } from "@/types";
import { useOverLayActions } from "@/store/overlay-store";
import useSocketOn from "./useSocketOn";

const useModalSocket = () => {
  const {
    setIsOpen,
    setYesOrNoVoteResult,
    setGroupIsOpen,
    setVoteIsOpen,
    setRoleIsOpen,
    setTimer,
    setTitle,
    setRole,
    setVoteResult,
    setCheckIsOpen
  } = useModalActions();

  // 추후 "isModalOpen" 통일될 예정
  const sockets = {
    //NOTE - GroupModal, CheckModal
    showModal: (title: string, timer: number) => {
      //NOTE - 최후의 투표 모달창 요소
      if (title.includes("찬성/반대 투표")) {
        setCheckIsOpen(true);
        setTitle(title);
        setTimer(timer);
        return;
      }

      //기본 모달창 요소
      setGroupIsOpen(true);
      setTitle(title);
      setTimer(timer);
    },

    //NOTE - UserRoleModal
    showAllPlayerRole: (role: Role, timer: number) => {
      setRoleIsOpen(true);
      setRole(role);
      setTimer(timer);
    },
    showVoteResult: (voteResult: VoteResult[], timer: number) => {
      setVoteIsOpen(true);
      setVoteResult(voteResult);
      setTimer(timer);
    },
    showVoteDeadOrLive: (voteResult: YesOrNoResults, timer: number) => {
      setVoteIsOpen(true);
      setYesOrNoVoteResult(voteResult);
      setTimer(timer);
      console.log("최후의 투표 결과", voteResult);
    }
  };

  //NOTE - socket On, Off 담당
  useSocketOn(sockets);
};

export default useModalSocket;
