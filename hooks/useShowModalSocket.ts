import useOverlayStore from "@/store/overlay-store";
import { useModalActions } from "@/store/show-modal-store";
import useSocketOff from "./useSocketOff";
import useSocketOn from "./useSocketOn";

const useShowModalSocket = () => {
  const { setIsOpen, setTitle, setTimer } = useModalActions();
  const { toggleOverlay, setIsOverlay, clearActiveParticipant, setIsRemoteOverlay } = useOverlayStore();

  const socketArr = [
    {
      eventName: "showModal",
      handler: (title: string, timer: number) => {
        console.log("showModal", title, timer);

        // 모달창 요소
        setIsOpen(true);
        setTitle(title);
        setTimer(timer);
        setIsOverlay(false); //캠 클릭 이벤트 비활성화
      }
    }
  ];

  //NOTE - socket On, Off 담당
  useSocketOn(socketArr);
  useSocketOff(socketArr);
};

export default useShowModalSocket;
