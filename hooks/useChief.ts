import getPlayersNumber from "@/utils/mafiaSocket/getPlayersNumber";
import { useParticipants } from "@livekit/components-react";
import { useEffect, useRef, useState } from "react";

const useChief = (userId: string, isGameState: string) => {
  const [ChiefImage, setIsChief] = useState(false);
  const participants = useParticipants();
  const participantsLength = useRef(0);

  useEffect(() => {
    //NOTE - 초기 렌더 필터링
    if (!userId) {
      return;
    }

    //NOTE - players 수의 변화가 없을 경우
    if (participantsLength.current === participants.length) {
      return;
    }

    //NOTE - 게임 준비 상태에서 players의 변화가 있을 경우에 실행
    if (isGameState === "gameReady") {
      const allPlayers = getPlayersNumber(participants);
      const playerNumber = allPlayers.find((player) => player.playerId === userId);

      participantsLength.current = participants.length;

      //자신이 방장일 경우
      if (playerNumber?.number === 1) {
        setIsChief(true);
      }

      //자신이 방장이 아닐 경우
      if (playerNumber?.number !== 1) {
        setIsChief(false);
      }
    }
  }, [participants]);

  return ChiefImage;
};

export default useChief;
