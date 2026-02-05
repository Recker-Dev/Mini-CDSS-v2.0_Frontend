import { create } from "zustand";

const useSessionStore = create((set) => ({
  sessionState: "disconnected",
  setSessionState: (sessionState) => {
    set({ sessionState });
  },
  savingChanges: false,
  setSavingChanges: (saveStatus) => {
    if (typeof saveStatus !== "boolean") {
      throw new Error("savingChanges aceepts only boolean");
    }
    set({ savingChanges: saveStatus });
  },
}));

export default useSessionStore;
