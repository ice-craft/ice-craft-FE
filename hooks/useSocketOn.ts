import { socket } from "@/utils/socket/socket";
import React, { useEffect } from "react";

const useSocketOn = (sockets: any) => {
  useEffect(() => {
    console.log("useSocketOn 작동 횟수");
    sockets.forEach(({ eventName, handler }: any) => {
      console.log("OnEventName", eventName);
      socket.on(eventName, handler);
    });
  }, []);
};

export default useSocketOn;

//기존에는 socket event를 재사용하지 않았기 때문에 []의존성 배열에 값을 넣지 않았지만
//현재는 socket event를 재사용하기 때문에 의조선 배열에 [socket]을 넣어 update해야하는 지 여부 확인하기

// 소켓 객체가 변경될 가능성이 거의 없으면 빈 배열을 사용하여 마운트와 언마운트 시에만 클린업 함수를 실행합니다.
// 소켓 객체가 변경될 가능성이 있는 경우, 최소한의 정리 작업만 수행하여 비효율성을 줄입니다.
