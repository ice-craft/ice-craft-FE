import { create } from "zustand";
import { ConnectState } from "@/types";
import { Tables } from "@/types/supabase";

const useConnectStore = create<ConnectState>((set) => ({
  join: false,
  nickname: "",
  userId: "",
  roomId: "",
  rooms: [],

  actions: {
    setJoinStatus: (status: boolean) => set({ join: status }),
    setRoomId: (room: string) => set({ roomId: room }),
    setUserId: (id: string) => set({ userId: id }),
    setUserNickname: (nickname: string) => set({ nickname }),
    setRooms: (status: Tables<"room_table">[]) => set({ rooms: status })
  }
}));

export const useRoomId = () => useConnectStore((state) => state.roomId);
export const useUserId = () => useConnectStore((state) => state.userId);
export const useNickname = () => useConnectStore((state) => state.nickname);
export const useRoomsCurrent = () => useConnectStore((state) => state.rooms);

//NOTE - room actions 관리
export const useConnectActions = () => useConnectStore((state) => state.actions);
