import { MessageState } from "@/types";
import { create } from "zustand";

const useMessageStore = create<MessageState>((set) => ({
  messages: [],
  addMessage: (newMessage) => set((state) => ({ messages: [...state.messages, newMessage] })),
  clearMessages: () => set({ messages: [] })
}));

export default useMessageStore;
