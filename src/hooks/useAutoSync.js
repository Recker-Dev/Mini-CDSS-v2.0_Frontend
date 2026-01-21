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

      if (initialPatientData !== lastState.initialPatientData) {
        changes.initialPatientData = initialPatientData;
      }
      if (files !== lastState.files) {
        changes.files = files;
      }

      if (positiveEvidences.length !== lastState.positiveEvidences.length) {
        changes.positiveEvidences = positiveEvidences;
      }

      if (negativeEvidences.length !== lastState.negativeEvidences.length) {
        changes.negativeEvidences = negativeEvidences;
      }

      if (hypotheses.length !== lastState.hypotheses.length) {
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
