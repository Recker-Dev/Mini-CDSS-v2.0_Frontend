import ClinicalObservationCard from "./LeftPanelComponents/ClinicalObservationCard";
import PatientDataCard from "./LeftPanelComponents/PatientDataCard";
import { customScrollbar } from "../util/scrollbar";
import { Menu } from "lucide-react";

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

export default function LeftPanel({
  sessionState,
  isOpen,
  togglePanel,
  swipeHandlers,
}) {
  return (
    <aside
      {...swipeHandlers}
      className="flex-20 relative flex  max-w-md max-h-screen"
    >
      {/* Menu button */}
      <button
        onClick={() => togglePanel(!isOpen)}
        aria-label="Evidence Board & Patient Data"
        className="absolute top-3 left-3 p-2 rounded-full bg-white shadow-md lg:hidden"
      >
        <Menu className="w-6 h-6 text-primary-blue" />
      </button>

      {/*Panel*/}
      <section
        className={`
          absolute top-0 left-0 z-40
          bg-white border-r border-slate-200 flex flex-col h-full shrink-0 shadow-sm
          ${customScrollbar}
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:block touch-pan-y
        `}
      >
        {/* 1. Fixed Header */}
        <div className="p-4 border-b border-slate-50 flex shrink-0 justify-between items-center">
          <h2 className="text-xs font-black text-secondary-slate-text uppercase tracking-widest">
            Evidence Board
          </h2>
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-primary-emerald"></div>
            <div className="w-2 h-2 rounded-full bg-primary-rose"></div>
          </div>
        </div>

        <div
          className={` min-h-0 p-2 `}
        >
          {/* Keeps track of all keypoint observations make during the ongoing diagnosis */}
          <ClinicalObservationCard tag="Positive" entries={positives} />
        </div>
        <div
          className={` min-h-0 p-2 `}
        >
          <ClinicalObservationCard tag="Negative" entries={negatives} />
        </div>
        {/* Keeps track of all previous/new uploaded file and the initial patient data given (editable) */}
        <div
          className={` min-h-0 border-t border-slate-50 bg-white p2- ${customScrollbar}`}
        >
          <PatientDataCard sessionState={sessionState} />
        </div>
      </section>
    </aside>
  );
}
