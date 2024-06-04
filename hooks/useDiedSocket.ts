import React from "react";
import useSocketOn from "./useSocketOn";

//캠 클릭 이벤트 비활성화,
const useDiedSocket = () => {
  const sockets = {
    diedPlayer: (playerId: string) => {
      console.log("죽은 player", playerId);
    }
  };

  // NOTE - socket On, Off 담당
  useSocketOn(sockets);
};

export default useDiedSocket;
