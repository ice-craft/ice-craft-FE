import { GameState } from "@/types";
import { create } from "zustand";

const useGameStore = create<GameState>((set) => ({
  diedPlayerId: [],
  isGameState: false,
  actions: {
    setDiedPlayer: (playerId) => set((state) => ({ diedPlayerId: [...state.diedPlayerId, playerId] })),
    setIsGameState: (isGame) => set({ isGameState: isGame }),
    setPlayerReset: () => set({ diedPlayerId: [] })
  }
}));

export const useDiedPlayer = () => useGameStore((state) => state.diedPlayerId);
export const useIsGameState = () => useGameStore((state) => state.isGameState);
export const useGameActions = () => useGameStore((state) => state.actions);
