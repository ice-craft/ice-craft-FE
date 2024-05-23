import useOverlayStore from "@/store/overlay-store";
import { useModalActions } from "@/store/show-Modal-store";
import useSocketOff from "./useSocketOff";
import useSocketOn from "./useSocketOn";

const useShowModalSocket = () => {
  const { setIsOpen, setTitle, setRound, setTimer } = useModalActions();
  const { toggleOverlay, setIsOverlay, clearActiveParticipant, setIsRemoteOverlay } = useOverlayStore();

  const socketArr = [
    {
      eventName: "showModal",
      handler: (round: number, message: string, timer: number) => {
        console.log("showModal", round, timer, message);

        // 모달창 요소
        setIsOpen(true);
        setTitle(message);
        setRound(round);
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
