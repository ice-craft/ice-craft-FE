import { GameState } from "@/types";
import { create } from "zustand";

const useGameStore = create<GameState>((set) => ({
  presentRoomId: "",
  updateRoomInfo: { chief: "", roomId: "" },
  diedPlayerId: [],
  isGameState: "gameReady",
  isDay: "",
  actions: {
    setChiefPlayerId: (newChief) =>
      set((state) => {
        const presentRoomId = state.presentRoomId;
        const updateRoomInfo = state.updateRoomInfo;

        // 현재 방과 업데이트된 방의 유효성 검사
        if (presentRoomId !== newChief.roomId) {
          console.log("현재 방:", state.presentRoomId);
          console.log("동일하지 않는 방:", newChief.chief);
          return { updateRoomInfo };
        }

        // 현재 방장과 업데이트된 방장의 유효성 검사
        if (updateRoomInfo.chief === newChief.chief) {
          console.log("현재 방장:", state.updateRoomInfo.chief);
          console.log("업데이트된 방장:", newChief.chief);
          return { updateRoomInfo };
        }

        // 새로운 방장 업데이트
        if (updateRoomInfo.chief !== newChief.chief) {
          console.log("chiefUpdate", newChief.chief);
          return { updateRoomInfo: newChief };
        }

        return { updateRoomInfo };
      }),
    setPresentRoomId: (newRoomId) => set({ presentRoomId: newRoomId }),
    setDiedPlayer: (playerId) => set((state) => ({ diedPlayerId: [...state.diedPlayerId, playerId] })),
    setIsGameState: (isGame) => set({ isGameState: isGame }),
    setIsDay: (newIsDay) => set({ isDay: newIsDay }),
    setGameReset: () => set({ diedPlayerId: [], isGameState: "gameReady" })
  }
}));

export const useIsDay = () => useGameStore((state) => state.isDay);
export const useChiefPlayer = () => useGameStore((state) => state.updateRoomInfo);
export const useDiedPlayer = () => useGameStore((state) => state.diedPlayerId);
export const useGameState = () => useGameStore((state) => state.isGameState);
export const useGameActions = () => useGameStore((state) => state.actions);
