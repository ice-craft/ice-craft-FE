import useOverlayStore from "@/store/overlay-store";
import { useModalActions } from "@/store/show-modal-store";
import useSocketOff from "./useSocketOff";
import useSocketOn from "./useSocketOn";

const useShowModalSocket = () => {
  const { setIsOpen, setTitle, setTimer } = useModalActions();
  const { toggleOverlay, setIsOverlay, clearActiveParticipant, setIsRemoteOverlay } = useOverlayStore();

  const showModalSocket = "showModal";
  const showModalHandler = (title: string, timer: number) => {
    // 모달창 요소
    setIsOpen(true);
    setTitle(title);
    setTimer(timer);
    setIsOverlay(false); //캠 클릭 이벤트 비활성화
    console.log("showModal 정상작동");
  };

  //NOTE - socket On, Off 담당
  useSocketOn(showModalSocket, showModalHandler);
  useSocketOff(showModalSocket);
};

export default useShowModalSocket;
