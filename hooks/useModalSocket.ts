import useSocketOn from "./useSocketOn";
import useSocketOff from "./useSocketOff";
import { useModalActions } from "@/store/show-modal-store";
import useOverlayStore from "@/store/overlay-store";
import { Role } from "@/types";

const useModalSocket = () => {
  const { setIsOpen, setTimer, setTitle, setRole } = useModalActions();
  // const { setIsOverlay } = useOverlayStore();

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
      // setIsOpen(true);
      setRole(role);
      setTimer(timer);
      // setIsOverlay(false); // 캠 클릭 이벤트 비활성화
    }
  };

  //NOTE - socket On, Off 담당
  useSocketOn(sockets);
  useSocketOff(sockets);
};

export default useModalSocket;
