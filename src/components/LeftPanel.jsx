import { useState } from "react";
import ClinicalObservationCard from "./LeftPanelComponents/ClinicalObservationCard";
import PatientDataCard from "./LeftPanelComponents/PatientDataCard";
import { customScrollbar } from "../util/scrollbar";

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

// const positives = [];
// const negatives = [];

export default function LeftPanel({ sessionState, swipeHandlers }) {
  const [savingChanges, setSavingChanges] = useState(false);
  const [positives, setPositives] = useState(defaultPositives);
  const [negatives, setNegatives] = useState(defaultNegatives);

  return (
    <aside {...swipeHandlers} className="max-w-md h-dvh ">
      <section
        className={`
          h-screen w-full
          bg-white border-r border-slate-200 shadow-sm
          flex flex-col shrink-0 
          lg:w-full lg:static lg:block touch-pan-y
          ${customScrollbar}
          `}
      >
        {/* 1. Fixed Header */}
        <div
          className="p-4 
            border-b border-slate-50 
            flex shrink-0 justify-between items-center"
        >
          <h2 className="text-xs font-black text-secondary-slate-text uppercase tracking-widest">
            Evidence Board
          </h2>
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-primary-emerald"></div>
            <div className="w-2 h-2 rounded-full bg-primary-rose"></div>
          </div>
        </div>

        {/* Keeps track of all keypoint observations make during the ongoing diagnosis */}
        <ClinicalObservationCard
          sessionState={sessionState}
          tag="Positive"
          entries={positives}
          setEntries={setPositives}
        />
        <ClinicalObservationCard
          sessionState={sessionState}
          tag="Negative"
          entries={negatives}
          setEntries={setNegatives}
        />

        {/* Keeps track of all previous/new uploaded file and the initial patient data given (editable) */}
        <div
          className={` max-h-[45dvh] shrink-0 border-t border-slate-50 bg-white`}
        >
          <PatientDataCard
            sessionState={sessionState}
            savingChanges={savingChanges}
            setSavingChanges={setSavingChanges}
          />
        </div>
      </section>
    </aside>
  );
}
