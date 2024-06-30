import getPlayerNumber from "@/utils/mafiaSocket/getPlayerNumber";
import { useParticipants } from "@livekit/components-react";
import { useEffect, useState } from "react";

const usePlayerNumber = (userId: string, isGameState: boolean | null) => {
  const participants = useParticipants();

  const [player, setPlayer] = useState<number | null>(null);

  useEffect(() => {
    //NOTE - 게임 시작시 players의 번호 부여
    if (isGameState) {
      const allPlayers = getPlayerNumber(participants);
      const playerNumber = allPlayers.find((player) => player.playerId === userId);

      if (playerNumber) {
        setPlayer(playerNumber.number);
      }
    }
  }, [isGameState]);

  return player;
};

export default usePlayerNumber;
