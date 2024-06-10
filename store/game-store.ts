import { GameState } from "@/types";
import { create } from "zustand";

const useGameStore = create<GameState>((set) => ({
  isReady: false,
  isStart: false,
  diedPlayerId: [],
  actions: {
    setIsReady: (newToggle: boolean) => set({ isReady: newToggle }),
    setIsStart: (newIsStarts: boolean) => set({ isStart: newIsStarts }),
    setDiedPlayer: (playerId: string) => set((state) => ({ diedPlayerId: [...state.diedPlayerId, playerId] }))
  }
}));

export const useIsStart = () => useGameStore((state) => state.isStart);
export const useIsReady = () => useGameStore((state) => state.isReady);
export const useDiedPlayer = () => useGameStore((state) => state.diedPlayerId);
export const useGameActions = () => useGameStore((state) => state.actions);
