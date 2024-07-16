import getPlayersNumber from "@/utils/mafiaSocket/getPlayersNumber";
import { useParticipants } from "@livekit/components-react";
import { useEffect, useState } from "react";

const usePlayerNumber = (userId: string, isGameState: string) => {
  const participants = useParticipants();

  const [player, setPlayer] = useState<number | null>(null);

  useEffect(() => {
    //NOTE - 게임 시작시 players의 번호 부여
    if (isGameState === "gameStart") {
      const allPlayers = getPlayersNumber(participants);
      const playerNumber = allPlayers.find((player) => player.playerId === userId);

      if (playerNumber) {
        setPlayer(playerNumber.number);
      }
    }
  }, [isGameState]);

  return player;
};

export default usePlayerNumber;
