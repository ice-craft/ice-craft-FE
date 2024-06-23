import { GameState } from "@/types";
import { create } from "zustand";

const useGameStore = create<GameState>((set) => ({
  diedPlayerId: [],
  playersNumber: [],
  actions: {
    setDiedPlayer: (playerId) => set((state) => ({ diedPlayerId: [...state.diedPlayerId, playerId] })),
    setSortPlayers: (players) => set({ playersNumber: players })
  }
}));

export const usePlayersNumbers = () => useGameStore((state) => state.playersNumber);
export const useDiedPlayer = () => useGameStore((state) => state.diedPlayerId);
export const useGameActions = () => useGameStore((state) => state.actions);
