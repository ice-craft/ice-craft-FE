import { create } from "zustand";
import { DiedPlayerState } from "../types";

const useDiedPlayerStore = create<DiedPlayerState>((set) => ({
  diedPlayerId: [],
  setDiedPlayer: (playerId: string) => set((state) => ({ diedPlayerId: [...state.diedPlayerId, playerId] }))
}));

export const useDiedPlayer = () => useDiedPlayerStore((state) => state.diedPlayerId);
export const useDiedAction = () => useDiedPlayerStore((state) => state.setDiedPlayer);
