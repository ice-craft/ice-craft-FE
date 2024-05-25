import { socket } from "@/utils/socket/socket";
import React, { useEffect } from "react";

const useSocketOff = (socketName: string) => {
  useEffect(() => {
    return () => {
      console.log("socket Off", socketName);
      socket.off(socketName);
    };
  }, []);
};
export default useSocketOff;
