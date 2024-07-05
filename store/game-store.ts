import { GameState } from "@/types";
import { create } from "zustand";

const useGameStore = create<GameState>((set) => ({
  diedPlayerId: [],
  isGameState: "gameReady",
  actions: {
    setDiedPlayer: (playerId) => set((state) => ({ diedPlayerId: [...state.diedPlayerId, playerId] })),
    setIsGameState: (isGame) => set({ isGameState: isGame }),
    setGameReset: () => set({ diedPlayerId: [], isGameState: "gameReady" })
  }
}));

export const useDiedPlayer = () => useGameStore((state) => state.diedPlayerId);
export const useGameState = () => useGameStore((state) => state.isGameState);
export const useGameActions = () => useGameStore((state) => state.actions);
