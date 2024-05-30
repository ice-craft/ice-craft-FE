import { useModalActions } from "@/store/show-modal-store";
import { Role } from "@/types";
import { useOverLayActions } from "@/store/overlay-store";
import useSocketOn from "./useSocketOn";

const useModalSocket = () => {
  const { setIsOpen, setTimer, setTitle, setRole } = useModalActions();
  const { setIsOverlay } = useOverLayActions();

  const sockets = {
    //NOTE - GroupModal
    showModal: (title: string, timer: number) => {
      // 모달창 요소
      setIsOpen(true);
      setTitle(title);
      setTimer(timer);
      // setIsOverlay(false); //캠 클릭 이벤트 비활성화
    },

    //NOTE - UserRoleModal
    showAllPlayerRole: (role: Role, timer: number) => {
      // "isModalOpen" 통일될 예정
      // setIsOpen(true);
      setRole(role);
      setTimer(timer);
      // setIsOverlay(false); // 캠 클릭 이벤트 비활성화
    }
  };

  //NOTE - socket On, Off 담당
  useSocketOn(sockets);
};

export default useModalSocket;
