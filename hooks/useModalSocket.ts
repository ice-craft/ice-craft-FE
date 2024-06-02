import { useModalActions } from "@/store/show-modal-store";
import { Role, VoteResult } from "@/types";
import { useOverLayActions } from "@/store/overlay-store";
import useSocketOn from "./useSocketOn";

const useModalSocket = () => {
  const { setIsOpen, setGroupIsOpen, setVoteIsOpen, setRoleIsOpen, setTimer, setTitle, setRole, setVoteResult } =
    useModalActions();

  // 추후 "isModalOpen" 통일될 예정
  const sockets = {
    //NOTE - GroupModal
    showModal: (title: string, timer: number) => {
      // 모달창 요소
      setGroupIsOpen(true);
      setTitle(title);
      setTimer(timer);
      console.log("timer", timer);
    },

    //NOTE - UserRoleModal
    showAllPlayerRole: (role: Role, timer: number) => {
      setRoleIsOpen(true);
      setRole(role);
      setTimer(timer);
      console.log("직업 Role", role);
    },

    showVoteResult: (voteResult: VoteResult, timer: number) => {
      setVoteIsOpen(true);
      setVoteResult(voteResult);
      setTimer(timer);
      console.log("voteResult", voteResult);
      console.log("voteResult Time", timer);
    }
  };

  //NOTE - socket On, Off 담당
  useSocketOn(sockets);
};

export default useModalSocket;
