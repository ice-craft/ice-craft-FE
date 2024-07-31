import { create } from "zustand";
import { LoadingState } from "@/types";

const useLoadingStore = create<LoadingState>((set) => ({
  loading: false,
  actions: {
    setLoading: (loading: boolean) => set({ loading })
  }
}));

export const useLoading = () => useLoadingStore((state) => state.loading);
export const useLoadingActions = () => useLoadingStore((state) => state.actions);
