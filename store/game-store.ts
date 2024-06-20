import { GameState } from "@/types";
import { create } from "zustand";

const useGameStore = create<GameState>((set) => ({
  diedPlayerId: [],
  gamePlayersInfo: [],
  actions: {
    setDiedPlayer: (playerId: string) => set((state) => ({ diedPlayerId: [...state.diedPlayerId, playerId] })),
    setGamePlayers: (participants) => {
      // NOTE - 닉네임 정렬
      const gamePlayerName = participants
        .map((player) => player.name)
        .sort((a, b) => {
          if (!a || !b) {
            return -1;
          }
          return a > b ? 1 : -1;
        });

      // NOTE - PlayerNumber 부여
      const gamePlayers = gamePlayerName.map((playerName, index) => ({
        playerName,
        playerNumber: index + 1
      }));

      //NOTE - gamePlayersInfo 저장
      set({ gamePlayersInfo: gamePlayers });
    }
  }
}));

export const useGamePlayers = () => useGameStore((state) => state.gamePlayersInfo);
export const useDiedPlayer = () => useGameStore((state) => state.diedPlayerId);
export const useGameActions = () => useGameStore((state) => state.actions);
