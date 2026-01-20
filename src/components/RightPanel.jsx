import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { customScrollbar } from "../util/scrollbar";
import useSessionStore from "../store/useSessionStore";

import SafetyCard from "./RightPanelComponents/SafetyCard";
import HypothesisCard from "./RightPanelComponents/HypothesisCard";
import useReasoningStore from "../store/useReasoningStore";

export default function RightPanel() {
  const sessionState = useSessionStore((state) => state.sessionState);
  const hypotheses = useReasoningStore((state) => state.hypotheses);
  const addToHypotheses = useReasoningStore((state) => state.addToHypotheses);

  const [drHypothesis, setDrHypothesis] = useState("");
  const [drReasoning, setDrReasoning] = useState("");

  function addDoctorHypothesis(e) {
    e.preventDefault();
    addToHypotheses({
      disease: drHypothesis,
      reasoning: drReasoning,
    });
    setDrHypothesis("");
    setDrReasoning("");
  }
  return (
    <aside className="max-w-md h-dvh">
      <section
        className={`
        h-screen w-full
        bg-white  border-r border-slate-200 shadow-sm 
        flex flex-col gap-2 
        lg:w-full lg:translate-x-0 lg:static lg:block touch-pan-y
        ${customScrollbar}
        transform transition-transform duration-300 ease-in-out
        
        `}
      >
        {/* Heading*/}

        <h2 className="py-3 px-4 text-xs font-black text-secondary-slate-text uppercase tracking-widest">
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
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                e.currentTarget.form?.requestSubmit();
              }
            }}
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

        <h2 className="px-4 text-xs font-black text-secondary-slate-text uppercase tracking-widest">
          Diagnoses
        </h2>
        {hypotheses.length > 0 ? (
          <div
            className={`flex flex-col gap-4 min-h-0 max-h-[42dvh] overflow-y-scroll p-4 ${customScrollbar}`}
          >
            {hypotheses.map((h, i) => (
              <HypothesisCard key={i} hypothesis={h} />
            ))}
          </div>
        ) : (
          <p className="text-xs text-primary-slate-text tracking-wide p-4">
            Possible diagnoses will populate here as the evaluation progresses.
          </p>
        )}
        {/*Safety Card */}
        <div className="py-2 px-4">
          <SafetyCard />
        </div>
      </section>
    </aside>
  );
}
