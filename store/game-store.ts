import { GameState } from "@/types";
import { create } from "zustand";

const useGameStore = create<GameState>((set) => ({
  diedPlayerId: [],
  gamePlayersInfo: [],
  actions: {
    setDiedPlayer: (playerId: string) => set((state) => ({ diedPlayerId: [...state.diedPlayerId, playerId] })),
    setGamePlayers: (participants) => {
      // NOTE - 입장 순서로 정렬
      const gamePlayerName = participants.sort((a, b) => {
        if (!a.joinedAt || !b.joinedAt) {
          return 1; // 존재 하지 않을 시 뒤로 이동
        }
        return new Date(a.joinedAt).getTime() - new Date(b.joinedAt).getTime();
      });

      // NOTE - gamePlayers 요소: playerName, playerJoinAt, playerNumber
      const gamePlayers = gamePlayerName.map((player, index) => ({
        playerName: player.name,
        playerJoinAt: player.joinedAt,
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
