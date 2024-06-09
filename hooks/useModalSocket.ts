import { useModalActions } from "@/store/show-modal-store";
import { Role, VoteResult, YesOrNoResults } from "@/types";
import useSocketOn from "./useSocketOn";

const useModalSocket = () => {
  const {
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
    showModal: (title: string, timer: number) => {
      //NOTE -  CheckModal(찬성/반대) 투표 모달창 요소
      if (title.includes("찬성/반대 투표")) {
        setCheckIsOpen(true);
        setTitle(title);
        setTimer(timer);
        return;
      }

      //NOTE - GroupModal 모달창 요소
      setGroupIsOpen(true);
      setTitle(title);
      setTimer(timer);
    },

    //NOTE - UserRoleModal 모달창 요소
    showAllPlayerRole: (role: Role, timer: number) => {
      setRoleIsOpen(true);
      setRole(role);
      setTimer(timer);
    },
    //NOTE - 투표 결과 모달창 요소
    showVoteResult: (voteResult: VoteResult[], timer: number) => {
      setVoteIsOpen(true);
      setVoteResult(voteResult);
      setTimer(timer);
    },
    //NOTE - 찬성/반대 투표 결과 모달창 요소
    showVoteDeadOrLive: (voteResult: YesOrNoResults, timer: number) => {
      //isExample(true) 모달 boolean 값 필요
      setYesOrNoVoteResult(voteResult);
      setTimer(timer);
      console.log("최후의 투표 결과", voteResult);
    }
  };

  //NOTE - socket On, Off 담당
  useSocketOn(sockets);
};

export default useModalSocket;
