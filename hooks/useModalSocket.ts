import React from "react";
import useSocketOn from "./useSocketOn";
import useSocketOff from "./useSocketOff";
import { useModalActions } from "@/store/show-modal-store";
import useOverlayStore from "@/store/overlay-store";
import { SocketEventHandler } from "@/types";

const useModalSocket = () => {
  const { setIsOpen, setTimer, setTitle, setRole } = useModalActions();
  const { setIsOverlay } = useOverlayStore();

  const sockets = {
    //NOTE - GroupModal
    showModal: (title: string, timer: number) => {
      // 모달창 요소
      setIsOpen(true);
      setTitle(title);
      setTimer(timer);
      setIsOverlay(false); //캠 클릭 이벤트 비활성화
      console.log("showModal 정상작동");
    },
    //NOTE - UserRoleModal
    showAllPlayerRole: (role: object, timer: number) => {
      // setIsOpen(true); 추후 모든 모달창의 boolean값을 통합하기에 주석처리
      console.log("role", role);
      setRole(role);
      setTimer(timer);
      setIsOverlay(false); // 캠 클릭 이벤트 비활성화
    }
  };

  // const roleSocket = "showAllPlayerRole";
  // const roleHandler = (role: object, timer: number) => {
  //   // setIsOpen(true); 추후 모든 모달창의 boolean값을 통합하기에 주석처리
  //   console.log("role", role);
  //   setRole(role);
  //   setTimer(timer);
  //   setIsOverlay(false); // 캠 클릭 이벤트 비활성화
  // };

  //NOTE - socket On, Off 담당
  useSocketOn(sockets);
  useSocketOff(sockets);
};

export default useModalSocket;
