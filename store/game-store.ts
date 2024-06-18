import { GameState } from "@/types";
import { create } from "zustand";

const useGameStore = create<GameState>((set) => ({
  diedPlayerId: [],
  actions: {
    setDiedPlayer: (playerId: string) => set((state) => ({ diedPlayerId: [...state.diedPlayerId, playerId] }))
  }
}));

export const useDiedPlayer = () => useGameStore((state) => state.diedPlayerId);
export const useGameActions = () => useGameStore((state) => state.actions);
