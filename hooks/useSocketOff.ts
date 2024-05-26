import { SocketEventHandler } from "@/types";
import { socket } from "@/utils/socket/socket";
import React, { useEffect } from "react";

const useSocketOff = (handlers: SocketEventHandler) => {
  useEffect(() => {
    const sockets = Object.keys(handlers);
    return () => {
      sockets.forEach((socketName) => {
        console.log("socket Off", socketName);
        socket.off(socketName);
      });
    };
  }, []);
};
export default useSocketOff;
