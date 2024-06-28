import { useOverLayActions } from "@/store/overlay-store";
import { useState } from "react";
import useSocketOn from "./useSocketOn";
import { useModalActions } from "@/store/show-modal-store";
import { useGameActions } from "@/store/game-store";

const useGameStateSocket = () => {
  const [isGame, setIsGame] = useState(false);
  const { setOverlayReset } = useOverLayActions();
  const { setPlayerReset } = useGameActions();
  const { setModalReset } = useModalActions();

  //NOTE - 게임 시작
  const gameStartSocket = {
    gameStart: () => {
      setIsGame(true);
      //local, remote "Ready" 이미지 초기화
      setOverlayReset();

      console.log("게임 시작");
    },

    //NOTE - 게임 종료
    gameEnd: () => {
      setIsGame(false);
      //Local,Remote 클릭 이벤트 및 캠 이미지 초기화
      setOverlayReset();
      //전체 모달 요소 초기화
      setModalReset();
      // 죽은 players, playersNumber 초기화
      setPlayerReset();

      console.log("게임 종료");
    }
  };
  useSocketOn(gameStartSocket);

  return isGame;
};

export default useGameStateSocket;
