import useOverlayStore from "@/store/overlay-store";
import useShowModalStore from "@/store/showModal.store";
import { socket } from "@/utils/socket/socket";
import { useEffect } from "react";
import useSocketOn from "./useSocketOn";
import useSocketOff from "./useSocketOff";

const useShowModalSocket = () => {
  const { title, setIsOpen, setTitle, setMessage, setTimer, setIsClose } = useShowModalStore();
  const { toggleOverlay, setIsOverlay, clearActiveParticipant, setIsRemoteOverlay } = useOverlayStore();

  const sockets = [
    {
      eventName: "showModal",
      handler: (message: string) => {
        if (message.includes("아침")) {
          //  로직 처리
          // 모달창 요소
          setIsOpen(true);
          setTitle("게임 시작");
          setMessage("누군가 당신의 뒤를 노리고 있습니다.");
          setTimer(5);
          setIsOverlay(false); //캠 클릭 이벤트 비활성화
        }

        if (message.includes("저녁")) {
          //  로직 처리
        }
        if (message.includes("아침")) {
          //  로직 처리
        }
        if (message.includes("저녁")) {
          //  로직 처리
        }
        if (message.includes("저녁")) {
          //  로직 처리
        }
        if (message.includes("저녁")) {
          //  로직 처리
        }
        if (message.includes("저녁")) {
          //  로직 처리
        }
        if (message.includes("저녁")) {
          //  로직 처리
        }
        if (message.includes("저녁")) {
          //  로직 처리
        }
        if (message.includes("저녁")) {
          //  로직 처리
        }
      }
    },

    {
      eventName: "r0TurnAllUserCameraMikeOff",
      handler: () => {
        // r0TurnAllUserCameraMikeOffHandler(tracks, userId);
      }
    }
    // 추가 소켓 리스트
  ];

  useSocketOn(sockets);
  useSocketOff(sockets);
};

export default useShowModalSocket;
