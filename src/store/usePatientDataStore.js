import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const usePatientDataStore = create()(
  persist(
    (set, get) => ({
      patientId: "",
      setPatientId: (patientId) => set({ patientId }),

      patientData: {},
      setPatientData: (patientData) =>
        set({ initialPatientData: patientData }),

      patientNotes: "",
      setPatientNotes: (patiendData) =>
        set({ patientNotes: patiendData }),

      files: [],
      addToFiles: (files) => {
        const newFiles = Array.from(files || []); // ensures files is always an array
        if (!newFiles.length) return;

        // de-duplication logic: spread the files to array -> make a unique map per file -> remake array
        set(() => {
          const map = new Map();
          [...get().files, ...newFiles].forEach((file) => {
            const key = `${encodeURIComponent(file.name)}-${file.size}-${file.lastModified}`;
            map.set(key, file);
          });

          return { files: Array.from(map.values()) };
        });
      },
      removeFromFiles: (file) =>
        set({
          files: get().files.filter((f) => f.name !== file.name),
        }),
    }),
    {
      name: "patientDataStore-samplePatientId-samepleDocId",
      storage: createJSONStorage(() => sessionStorage),

      // Omits the files -> cuz local storage cant store files
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) => !["files"].includes(key)),
        ),
    },
  ),
);

export default usePatientDataStore;
