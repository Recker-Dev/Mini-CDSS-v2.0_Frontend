import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useEvidenceStore = create()(
  persist(
    (set, get) => ({
      evidences: {
        positives: [],
        negatives: [],
      },

      setEvidences: (newEvidenceObject) => {
        set({
          evidences: {
            positives: Array.isArray(newEvidenceObject?.positives)
              ? newEvidenceObject.positives
              : [],
            negatives: Array.isArray(newEvidenceObject?.negatives)
              ? newEvidenceObject.negatives
              : [],
          },
        });
      },

      addToEvidence: (evidenceType, value) => {
        if (!["positive", "negative"].includes(evidenceType)) {
          throw new Error(
            "evidenceType must be either 'positive' or 'negative'",
          );
        }
        set({
          evidences: {
            ...get().evidences,
            [evidenceType]: [...get().evidences[evidenceType], value],
          },
        });
      },
      removeFromEvidence: (evidenceType, evidenceIndex) => {
        if (!["positive", "negative"].includes(evidenceType)) {
          throw new Error(
            "evidenceType must be either 'positive' or 'negative'",
          );
        }
        set({
          evidences: {
            ...get().evidences,
            [evidenceType]: get().evidences[evidenceType].filter(
              (_, index) => index !== evidenceIndex,
            ),
          },
        });
      },
    }),
    {
      name: "evidenceStore-samplePatientId-samepleDocId",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useEvidenceStore;
