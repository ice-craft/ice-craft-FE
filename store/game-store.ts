import { GameState } from "@/types";
import { create } from "zustand";

const useGameStore = create<GameState>((set) => ({
  presentRoomId: "",
  updateRoomInfo: { chief: "", roomId: "" },
  diedPlayerId: [],
  isGameState: "gameReady",
  isDay: "",
  victoryPlayersId: [],
  actions: {
    setChiefPlayerId: (newChief) =>
      set((state) => {
        const presentRoomId = state.presentRoomId;
        const updateRoomInfo = state.updateRoomInfo;

        // 현재 방과 업데이트된 방의 유효성 검사
        if (presentRoomId !== newChief.roomId) {
          return { updateRoomInfo };
        }

        // 현재 방장과 업데이트된 방장의 유효성 검사
        if (updateRoomInfo.chief === newChief.chief) {
          return { updateRoomInfo };
        }

        // 새로운 방장 업데이트
        if (updateRoomInfo.chief !== newChief.chief) {
          return { updateRoomInfo: newChief };
        }

        return { updateRoomInfo };
      }),
    setPresentRoomId: (newRoomId) => set({ presentRoomId: newRoomId }),
    setDiedPlayer: (playerId) => set((state) => ({ diedPlayerId: [...state.diedPlayerId, playerId] })),
    setIsGameState: (isGame) => set({ isGameState: isGame }),
    setIsDay: (newIsDay) => set({ isDay: newIsDay }),
    setVictoryPlayersId: (newPlayerId) =>
      set((state) => {
        const victoryPlayersId = state.victoryPlayersId;
        const isPlayer = victoryPlayersId.find((playerId) => playerId === newPlayerId);

        //id 중복성 검사
        if (!isPlayer) {
          return { victoryPlayersId: [...state.victoryPlayersId, newPlayerId] };
        }

        return { victoryPlayersId };
      }),

    setGameReset: () => set({ diedPlayerId: [], isGameState: "gameReady", victoryPlayersId: [] })
  }
}));

export const useIsDay = () => useGameStore((state) => state.isDay);
export const useChiefPlayer = () => useGameStore((state) => state.updateRoomInfo);
export const useDiedPlayer = () => useGameStore((state) => state.diedPlayerId);
export const useGameState = () => useGameStore((state) => state.isGameState);
export const useVictoryPlayers = () => useGameStore((state) => state.victoryPlayersId);
export const useGameActions = () => useGameStore((state) => state.actions);
