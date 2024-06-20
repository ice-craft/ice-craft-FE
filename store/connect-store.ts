import { create } from "zustand";
import { ConnectState } from "@/types";

const useConnectStore = create<ConnectState>((set) => ({
  join: false,
  nickname: "",
  userId: "",
  roomId: "",

  actions: {
    setJoinStatus: (status: boolean) => set({ join: status }),
    setRoomId: (id: string) => set({ roomId: id }),
    setUserId: (id: string) => set({ userId: id }),
    setUserNickname: (nickname: string) => set({ nickname })
  }
}));

export const useRoomId = () => useConnectStore((state) => state.roomId);
export const useUserId = () => useConnectStore((state) => state.userId);
export const useNickname = () => useConnectStore((state) => state.nickname);

//NOTE - room actions 관리
export const useConnectActions = () => useConnectStore((state) => state.actions);
