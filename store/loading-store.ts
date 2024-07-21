import { create } from "zustand";
import { LoadingState } from "@/types";

const useLoadingStore = create<LoadingState>((set) => ({
  loading: false,

  setLoading: (loading: boolean) => set({ loading })
}));

export default useLoadingStore;
