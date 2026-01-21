import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const defaultHypotheses = [
  {
    id: crypto.randomUUID(),
    timestamp: 1768662000000,
    disease: "GERD",
    probability: 0.65,
    status: "suspected",
    source: "AI",
    reasoning:
      "Post-prandial timing and substernal location match typical reflux.",
  },
  {
    id: crypto.randomUUID(),
    timestamp: 1768662060000,
    disease: "Stable Angina",
    probability: 0.25,
    status: "possible",
    source: "AI",
    reasoning: "Age and smoking status increase pre-test probability.",
  },
];

const defaultSafetyChecklist = [
  "Serial Troponins ordered?",
  "Atypical presentation ruled out?",
  "Serial Troponins ordered?",
  "Atypical presentation ruled out?",
  "Serial Troponins ordered?",
  "Atypical presentation ruled out?",
  "Serial Troponins ordered?",
  "Atypical presentation ruled out?",
];

function prioritiseDoctorHypotheses(hypotheses) {
  const doctor = [];
  const others = [];
  for (const h of hypotheses) {
    (h.source.toLowerCase() === "doctor" ? doctor : others).push(h);
  }
  return [
    ...doctor.sort((a, b) => b.timestamp - a.timestamp),
    ...others.sort((a, b) => b.timestamp - a.timestamp),
  ];
}

const useReasoningStore = create()(
  persist(
    (set, get) => ({
      hypotheses: defaultHypotheses || [],

      setHypotheses: (newHypothesisArray) =>
        set({
          hypotheses: Array.isArray(newHypothesisArray)
            ? newHypothesisArray
            : [],
        }),

      addToHypotheses: (newHypothesisObject) => {
        set({
          hypotheses: prioritiseDoctorHypotheses([
            ...get().hypotheses,
            {
              id: crypto.randomUUID(),
              disease: newHypothesisObject.disease,
              timestamp: Date.now(),
              probability: Math.random(),
              status: "possible",
              source: "Doctor",
              reasoning: newHypothesisObject.reasoning,
            },
          ]),
        });
      },

      removeFromHypotheses: (hypothesisId) => {
        set({
          hypotheses: get().hypotheses.filter((h) => h.id !== hypothesisId),
        });
      },

      safetyChecklist: defaultSafetyChecklist || [],
      setSafetyChecklist: (newSafetyArray) => {
        set({
          safetyChecklist: Array.isArray(newSafetyArray) ? newSafetyArray : [],
        });
      },
    }),
    {
      name: "reasoningStore-samplePatientId-samepleDocId",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useReasoningStore;
