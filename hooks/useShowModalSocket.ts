import useOverlayStore from "@/store/overlay-store";
import useShowModalStore from "@/store/show-modal-store";
import { socket } from "@/utils/socket/socket";
import { useEffect } from "react";
import useSocketOn from "./useSocketOn";
import useSocketOff from "./useSocketOff";

const useShowModalSocket = () => {
  const { title, setIsOpen, setTitle, setMessage, setTimer } = useShowModalStore();
  const { toggleOverlay, setIsOverlay, clearActiveParticipant, setIsRemoteOverlay } = useOverlayStore();

  //NOTE - socket "handler" 실행되는 곳: useEffect 내부에서 실행(첫 렌더링 시)
  const socketArr = [
    {
      eventName: "showModal",
      handler: (message: string) => {
        console.log("showModal Event Message", message);
        if (message.includes("아침")) {
          // 모달창 요소
          // setIsOpen(true);
          // setTitle("게임 시작");
          // setMessage("누군가 당신의 뒤를 노리고 있습니다.");
          // setTimer(5);
          // setIsOverlay(false); //캠 클릭 이벤트 비활성화
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
    }
  ];

  //NOTE - socket On, Off 담당
  useSocketOn(socketArr);
  useSocketOff(socketArr);
};

export default useShowModalSocket;
