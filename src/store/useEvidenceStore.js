import { create } from "zustand";
import { persist } from "zustand/middleware";

const defaultPositives = [
  "Substernal Chest Pain",
  "Smoker (20pk/yr)",
  "History of HTN",
];

const defaultNegatives = [
  "No Jaw Radiation",
  "Negative Troponin",
  "No Diaphoresis",
];

const useEvidenceStore = create()(
  persist(
    (set, get) => ({
      evidence: {
        positive: defaultPositives || [],
        negative: defaultNegatives || [],
      },

      setEvidences: (newEvidenceObject) => {
        set({
          evidence: {
            positive: Array.isArray(newEvidenceObject?.positive)
              ? newEvidenceObject.positive
              : [],
            negative: Array.isArray(newEvidenceObject?.negative)
              ? newEvidenceObject.negative
              : [],
          },
        });
      },

      addToEvidence: (evidenceType, value) => {
        if (!["positive", "negative"].includes(evidenceType)) {
          throw new Error(
            "evidenceType must be either 'positive' or 'negative'"
          );
        }
        set({
          evidence: {
            ...get().evidence,
            [evidenceType]: [...get().evidence[evidenceType], value],
          },
        });
      },
      removeFromEvidence: (evidenceType, evidenceIndex) => {
        if (!["positive", "negative"].includes(evidenceType)) {
          throw new Error(
            "evidenceType must be either 'positive' or 'negative'"
          );
        }
        set({
          evidence: {
            ...get().evidence,
            [evidenceType]: get().evidence[evidenceType].filter(
              (_, index) => index !== evidenceIndex
            ),
          },
        });
      },
    }),
    {
      name: "evidence-samplePatientId-samepleDocId",
    }
  )
);

export default useEvidenceStore;
