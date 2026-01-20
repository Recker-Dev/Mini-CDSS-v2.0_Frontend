import { create } from "zustand";

const useSessionStore = create((set) => ({
  sessionState: false,
  setSessionState: (sessionState) => {
    if (typeof sessionState !== "boolean") {
      throw new Error("sessionState must be a boolean");
    }
    set({ sessionState });
  },

  panelMode: null,
  setPanelMode: (panelMode) => {
    if (![null, "left", "right"].includes(panelMode)) {
      throw new Error(`Invalid panelMode: ${panelMode}`);
    }
    set({ panelMode });
  },

  activePatientId: null,
  setPatientId: (patientId) => set({ activePatientId: patientId }),
}));


export default useSessionStore;