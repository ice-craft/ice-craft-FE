import { usePlayersNumbers } from "@/store/game-store";
import { useEffect, useState } from "react";

const usePlayerNumber = (userId: string) => {
  const allPlayersNumber = usePlayersNumbers();
  const [player, setPlayer] = useState<number | null>(null);

  //NOTE - 게임 시작시 players의 번호 부여
  useEffect(() => {
    const playerNumber = allPlayersNumber.find((player) => player.playerId === userId);

    if (playerNumber) {
      setPlayer(playerNumber.number);
    }
  }, [allPlayersNumber]);

  return player;
};

export default usePlayerNumber;
