import { socket } from "@/utils/socket/socket";
import React, { useEffect } from "react";

const useSocketOff = (sockets: any) => {
  useEffect(() => {
    return () => {
      console.log("useSocketOff 작동 횟수");
      sockets.forEach(({ eventName }: any) => {
        console.log("OffEventName", eventName);
        socket.off(eventName);
      });
    };
  }, []);
};

export default useSocketOff;
