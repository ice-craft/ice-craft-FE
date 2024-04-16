import { create } from "zustand";
import { ConnectState } from "@/types";

const useConnectStore = create<ConnectState>((set) => ({
  isConnected: false,
  nickname: "",
  userId: "",
  roomId: "",
  setConnectionStatus: (status) => set({ isConnected: status }),
  setRoomId: (id) => set({ roomId: id }),
  setUserId: (id) => set({ userId: id }),
  setUserNickname: (id) => set({ nickname: id })
}));

export default useConnectStore;
