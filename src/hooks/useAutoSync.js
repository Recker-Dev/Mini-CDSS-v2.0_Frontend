import { useEffect, useRef } from "react";
import usePatientDataStore from "../store/usePatientDataStore.js";
import useEvidenceStore from "../store/useEvidenceStore.js";
import useReasoningStore from "../store/useReasoningStore.js";

export default function useAutoSync(interval) {
  const initialPatientData = usePatientDataStore(
    (state) => state.initialPatientData,
  );
  const files = usePatientDataStore((state) => state.files);

  const positiveEvidences = useEvidenceStore(
    (state) => state.evidence.positive,
  );
  const negativeEvidences = useEvidenceStore(
    (state) => state.evidence.negative,
  );

  const hypotheses = useReasoningStore((state) => state.hypotheses);

  const lastSyncedRef = useRef({
    initialPatientData,
    files,
    positiveEvidences: positiveEvidences || [],
    negativeEvidences: negativeEvidences || [],
    hypotheses: hypotheses || [],
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const lastState = lastSyncedRef.current;

      // Compare the current vs last changes
      const changes = {};

      // Zustand ensures immutability and working with JS generally
      // we tend to do so also; so checking object reference will get out job done.

      if (initialPatientData !== lastState.initialPatientData) {
        changes.initialPatientData = initialPatientData;
      }
      if (files !== lastState.files) {
        changes.files = files;
      }

      if (positiveEvidences !== lastState.positiveEvidences) {
        changes.positiveEvidences = positiveEvidences;
      }

      if (negativeEvidences !== lastState.negativeEvidences) {
        changes.negativeEvidences = negativeEvidences;
      }

      if (hypotheses !== lastState.hypotheses) {
        changes.hypotheses = hypotheses;
      }

      // Only send if something changed
      if (Object.keys(changes).length > 0) {
        console.log("API call with changes:", changes);

        lastSyncedRef.current = {
          initialPatientData,
          files,
          positiveEvidences,
          negativeEvidences,
          hypotheses,
        };
      }
    }, interval * 1000);

    return () => clearTimeout(timeoutId);
  }, [
    initialPatientData,
    files,
    positiveEvidences,
    negativeEvidences,
    hypotheses,
    interval,
  ]);
}
