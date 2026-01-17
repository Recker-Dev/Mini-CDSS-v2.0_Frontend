import { useState } from "react";
import { PlusCircle, Menu } from "lucide-react";
import { customScrollbar } from "../util/scrollbar";

import SafetyCard from "./RightPanelComponents/SafetyCard";
import HypothesisCard from "./RightPanelComponents/HypothesisCard";

const defaultHypotheses = [
  {
    id: 1,
    disease: "GERD",
    probability: 0.65,
    status: "suspected",
    source: "AI",
    reasoning:
      "Post-prandial timing and substernal location match typical reflux.",
  },
  {
    id: 2,
    disease: "Stable Angina",
    probability: 0.25,
    status: "possible",
    source: "AI",
    reasoning: "Age and smoking status increase pre-test probability.",
  },
];

const safetyChecklist = [
  "Serial Troponins ordered?",
  "Atypical presentation ruled out?",
];

function prioritiseDoctorHypotheses(hypotheses) {
  const doctor = [];
  const others = [];
  for (const h of hypotheses) {
    (h.source === "Doctor" ? doctor : others).push(h);
  }
  return [...doctor, ...others];
}

export default function RightPanel({ sessionState, isOpen, togglePanel }) {
  const [drHypothesis, setDrHypothesis] = useState("");
  const [drReasoning, setDrReasoning] = useState("");
  const [hypotheses, setHypotheses] = useState(defaultHypotheses);

  function addDoctorHypothesis(e) {
    e.preventDefault();
    setHypotheses((prev) =>
      prioritiseDoctorHypotheses([
        ...prev,
        {
          id: prev.length,
          disease: drHypothesis,
          probability: Math.random(),
          status: "possible",
          source: "Doctor",
          reasoning: drReasoning,
        },
      ])
    );
    setDrHypothesis("");
    setDrReasoning("");
  }
  return (
    <aside className="max-w-md max-h-dvh relative">
      {/* Menu button */}
      <button
        onClick={() => togglePanel(!isOpen)}
        // aria-label="Evidence Board & Patient Data"
        className="fixed top-19 right-15 z-100 p-2 rounded-full bg-white shadow-md lg:hidden"
      >
        <Menu className="w-6 h-6 text-primary-blue" />
      </button>

      {/* w-[80vw] is for mobile view, it does not hurt grid view in lg */}
      <section
        className={`
        fixed top-0 left-0 z-40
        h-full w-[80vw] 
        bg-white  border-r border-slate-200 shadow-sm 
        flex flex-col gap-4 
        lg:w-full lg:translate-x-0 lg:static lg:block touch-pan-y
        ${customScrollbar}
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Heading*/}

        <h2 className="p-4 text-xs font-black text-secondary-slate-text uppercase tracking-widest">
          Reasoning Chain
        </h2>

        {/* FORM */}
        <form onSubmit={addDoctorHypothesis} className="px-2 relative">
          {/* Hypothesis Input */}
          <input
            disabled={!sessionState}
            className="w-full 
            bg-slate-50 border border-slate-200  text-primary-slate-text rounded-lg text-xs
            py-2 px-3  pr-10 mb-3 
            outline-none focus:ring-1 focus:ring-indigo-300 "
            placeholder={
              sessionState
                ? "Insert Dr's Hypothesis..."
                : "Offline..reconnect to add hypothesis"
            }
            value={drHypothesis}
            onChange={(e) => setDrHypothesis(e.target.value)}
          />
          {/* Reasoning Textarea */}
          <textarea
            disabled={!sessionState}
            className="w-full 
            bg-slate-50 border border-slate-200 text-primary-slate-text rounded-lg text-xs 
            py-2 px-3 
            outline-none focus:ring-1 focus:ring-indigo-300 resize-none"
            placeholder={
              sessionState
                ? "Clinical reasoning / logic behind this hypothesis..."
                : ""
            }
            rows={5}
            value={drReasoning}
            onChange={(e) => setDrReasoning(e.target.value)}
          />
          {/* Submit Button */}
          <button
            disabled={!sessionState}
            className={`
            absolute right-4 top-1.5 
            ${
              sessionState
                ? "text-primary-blue hover:text-secondary-blue cursor-pointer"
                : `
                    bg-secondary-slate/70
                    border-primary-slate-text/20
                    text-primary-slate-text
                    hover:bg-secondary-slate/90
                    opacity-80
                    pointer-events-none
                  `
            }
          `}
          >
            <PlusCircle className="w-5 h-5" />
          </button>
        </form>

        <h2 className="p-4 text-xs font-black text-secondary-slate-text uppercase tracking-widest">
          Diagnoses
        </h2>
        <div
          className={`flex flex-col gap-4 min-h-0 max-h-[48dvh] overflow-y-scroll p-4 ${customScrollbar}`}
        >
          {hypotheses.map((h, i) => (
            <HypothesisCard key={i} hypothesis={h} />
          ))}
        </div>
        {/*Safety Card */}
        <div className="mt-4 p-4">
          <SafetyCard safetyChecklist={safetyChecklist} />
        </div>
      </section>
    </aside>
  );
}
