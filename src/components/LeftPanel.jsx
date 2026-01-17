import ClinicalObservationCard from "./LeftPanelComponents/ClinicalObservationCard";
import PatientDataCard from "./LeftPanelComponents/PatientDataCard";
import { customScrollbar } from "../util/scrollbar";


const positives = [
  "Substernal Chest Pain",
  "Smoker (20pk/yr)",
  "History of HTN",
  "Normal Sinus Rhythm",
  "Normal Sinus Rhythm",
  "Normal Sinus Rhythm",
  "Normal Sinus Rhythm",
  "Normal Sinus Rhythm",
  "Normal Sinus Rhythm",
  "Normal Sinus Rhythm",
  "Normal Sinus Rhythm",
  "Normal Sinus Rhythm",
  "Normal Sinus Rhythm",
];

const negatives = [
  "No Jaw Radiation",
  "Negative Troponin",
  "No Diaphoresis",
  "Negative Troponin",
  "No Diaphoresis",
  "Negative Troponin",
  "No Diaphoresis",
  "Negative Troponin",
  "No Diaphoresis",
];

// const positives = [];
// const negatives = [];

export default function LeftPanel({
  sessionState,
  swipeHandlers,
}) {
  return (
    <aside {...swipeHandlers} className="max-w-md max-h-dvh relative ">


      {/*Panel*/}
      {/* w-full in defauly breaks mobile looks and without breaks desktop. */}
      {/* Cannot use overflow or else will break patient data input */}
      <section
        className={`
          h-screen w-full
          bg-white border-r border-slate-200 shadow-sm
          flex flex-col shrink-0 
          lg:w-full lg:static lg:block touch-pan-y
          ${customScrollbar}
          `}
          >
        {/* transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} */}
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
        <ClinicalObservationCard tag="Positive" entries={positives} />
        <ClinicalObservationCard tag="Negative" entries={negatives} />

        {/* Keeps track of all previous/new uploaded file and the initial patient data given (editable) */}
        <div className={` flex-45 grow border-t border-slate-50 bg-white`}>
          <PatientDataCard sessionState={sessionState} />
        </div>
      </section>
    </aside>
  );
}
