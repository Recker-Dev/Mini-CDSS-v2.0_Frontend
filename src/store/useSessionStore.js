import { create } from "zustand";

const useSessionStore = create((set) => ({
  sessionState: true,
  setSessionState: (sessionState) => {
    if (typeof sessionState !== "boolean") {
      throw new Error("sessionState accepts only boolean boolean");
    }
    set({ sessionState });
  },
  savingChanges: false,
  setSavingChanges: (saveStatus) => {
    if (typeof saveStatus !== "boolean") {
      throw new Error("savingChanges aceepts only boolean");
    }
    set({ savingChanges: saveStatus });
  },

  patientId: "882-C",
  setPatientId: (patientId) => set({ activePatientId: patientId }),
}));

export default useSessionStore;
