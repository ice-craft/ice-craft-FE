import { socket } from "@/utils/socket/socket";
import React, { useEffect } from "react";

const useSocketOff = (sockets: any) => {
  useEffect(() => {
    return () => {
      sockets.forEach(({ eventName }: any) => {
        console.log("socket Off", eventName);
        socket.off(eventName);
      });
    };
  }, []);
};

export default useSocketOff;
