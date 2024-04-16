import { create } from "zustand";
import { ConnectState } from "@/types";
import { createJSONStorage, persist } from "zustand/middleware";

const useConnectStore = create(
  persist<ConnectState>(
    (set) => ({
      isConnected: false,
      nickname: "",
      userId: "",
      roomId: "",
      setConnectionStatus: (status) => set({ isConnected: status }),
      setRoomId: (id) => set({ roomId: id }),
      setUserId: (id) => set({ userId: id }),
      setUserNickname: (id) => set({ nickname: id })
    }),
    { name: "CreateRoomInfo", storage: createJSONStorage(() => sessionStorage) }
  )
);

export default useConnectStore;
