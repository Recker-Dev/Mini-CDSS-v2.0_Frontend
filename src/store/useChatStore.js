import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useChatStore = create()(
  persist(
    (set, get) => ({
      chats: [],
      setChats: (chats) => set({ chats }),

      addToChats: (chat) => {
        set({
          chats: [...get().chats, chat],
        });
      },

      updateChat: (updated) => {
        set({
          chats: get().chats.map((c) => (c.id === updated.id ? updated : c)),
        });
      },
    }),
    {
      name: "chatDataStore-samplePatientId-samepleDocId",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useChatStore;
