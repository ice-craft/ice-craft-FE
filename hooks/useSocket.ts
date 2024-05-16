import { socket } from "@/utils/socket/socket";
import { useEffect } from "react";

const useSocket = (sockets: any) => {
  useEffect(() => {
    sockets.forEach(({ eventName, handler }: any) => {
      console.log("eventName", eventName);
      console.log("handler", handler);
      socket.on(eventName, handler);
    });

    return () => {
      sockets.forEach(({ eventName, handler }: any) => {
        socket.off(eventName, handler);
        console.log("작동하니?");
      });
    };
  }, []);
};

export default useSocket;
