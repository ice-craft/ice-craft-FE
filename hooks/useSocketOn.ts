import { SocketEventHandler } from "@/types";
import { socket } from "@/utils/socket/socket";
import { useEffect } from "react";

const useSocketOn = (handlers: SocketEventHandler) => {
  useEffect(() => {
    const sockets = Object.entries(handlers);

    // [key, value] 형식의 튜플로써 첫 번째 요소는 키의 타입이 되고 두 번째 요소는 값의 타입
    sockets.forEach(([eventName, handler]) => {
      socket.on(eventName, handler);
    });

    return () => {
      sockets.forEach(([eventName]) => {
        socket.off(eventName);
      });
    };
  }, []);
};

export default useSocketOn;

// 소켓 객체가 변경될 가능성이 거의 없으면 빈 배열을 사용하여 마운트와 언마운트 시에만 클린업 함수를 실행한다.
// 소켓 객체가 변경될 가능성이 있는 경우(재연결), [socket] 배열을 사용
