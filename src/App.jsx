import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import Header from "./components/Header";
import LeftPanel from "./components/LeftPanel";
import { PlusCircle, ArrowUpRight, ShieldAlert } from "lucide-react";
import { customScrollbar } from "./util/scrollbar";

function RightPanel() {
  const [drHypothesis, setDrHypothesis] = useState("");
  const [drReasoning, setDrReasoning] = useState("");
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

  const [hypotheses, setHypotheses] = useState(defaultHypotheses);

  function prioritiseDoctorHypotheses(hypotheses) {
    const doctor = [];
    const others = [];
    for (const h of hypotheses) {
      (h.source === "Doctor" ? doctor : others).push(h);
    }
    return [...doctor, ...others];
  }

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
    <div className="flex-30 max-w-md">
      <aside
        className="h-dvh 
      bg-white border-l border-slate-200 flex flex-col shadow-sm
      "
      >
        <section className="p-4 border-b border-slate-50 flex flex-col h-full overflow-hidden">
          {/* 1. TOP SECTION: Heading and Form (Fixed height) */}
          <div className="flex flex-col h-full gap-4 mb-4 shrink-0">
            <h2 className="text-xs font-black text-secondary-slate-text uppercase tracking-widest">
              Reasoning Chain
            </h2>

            <form onSubmit={addDoctorHypothesis} className="relative">
              {/* Hypothesis Input */}
              <input
                className="w-full bg-slate-50 border border-slate-200  text-primary-slate-text rounded-lg py-2 px-3 text-xs pr-10 outline-none focus:ring-1 focus:ring-indigo-300 mb-3"
                placeholder="Insert Dr's Hypothesis..."
                value={drHypothesis}
                onChange={(e) => setDrHypothesis(e.target.value)}
              />
              {/* Reasoning Textarea */}
              <textarea
                className="w-full bg-slate-50 border border-slate-200 text-primary-slate-text rounded-lg py-2 px-3 text-xs outline-none focus:ring-1 focus:ring-indigo-300 resize-none"
                placeholder="Clinical reasoning / logic behind this hypothesis..."
                rows={5}
                value={drReasoning}
                onChange={(e) => setDrReasoning(e.target.value)}
              />
              {/* Submit Button */}
              <button className="absolute right-2 top-1.5 text-primary-blue hover:text-secondary-blue cursor-pointer">
                <PlusCircle className="w-5 h-5" />
              </button>
            </form>

            <h2 className="text-xs font-black text-secondary-slate-text uppercase tracking-widest">
              Diagnoses
            </h2>
            <div
              className={`flex flex-col gap-4 overflow-y-scroll pr-2 ${customScrollbar}`}
            >
              {hypotheses.map((h, i) => (
                <HypothesisCard key={i} hypothesis={h} />
              ))}
            </div>
            {/* 3. Safety Card stays pinned at the bottom or follows the scroll */}
            <div className="mt-4 shrink-0">
              <SafetyCard safetyChecklist={safetyChecklist} />
            </div>
          </div>
        </section>
      </aside>
    </div>
  );
}

function SafetyCard({ safetyChecklist }) {
  return (
    <div className="bg-amber-50 rounded-xl p-4 border border-amber-100 flex gap-3">
      <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
      <div>
        <p className="text-xs font-bold text-amber-800 uppercase mb-1">
          Safety Checklist
        </p>
        <ul className="text-xs text-amber-700 space-y-1 list-disc ml-3">
          {safetyChecklist.map((entry, i) => (
            <li key={i}>{entry}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function HypothesisCard({ hypothesis }) {
  return (
    <div
      className={`p-4 rounded-xl border transition-all ${
        hypothesis.source === "Doctor"
          ? "bg-indigo-50/50 border-indigo-200 ring-1 ring-indigo-100"
          : "bg-white border-slate-100 hover:border-slate-300"
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <span
            className={`text-[8px] font-black px-1.5 py-0.5 rounded uppercase ${
              hypothesis.source === "Doctor"
                ? "bg-primary-blue text-white"
                : "bg-primary-slate text-white"
            }`}
          >
            {hypothesis.source}
          </span>
          <h4 className="font-bold text-primary-slate-text text-sm">
            {hypothesis.disease}
          </h4>
        </div>
        <span className="text-[10px] font-bold text-secondary-slate-text">
          {(hypothesis.probability * 100).toFixed(0)}%
        </span>
      </div>

      <p className="text-[11px] text-slate-600 leading-relaxed mb-3">
        {hypothesis.reasoning}
      </p>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-1000 ${
              hypothesis.source === "Doctor"
                ? "bg-primary-blue"
                : "bg-primary-emerald"
            }`}
            style={{ width: `${hypothesis.probability * 100}%` }}
          />
        </div>
        <button className="p-1 hover:bg-slate-100 rounded transition-colors text-primary-slate-text cursor-pointer">
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

function App() {
  const [sessionState, setSessionState] = useState(true);
  const [leftPanelOpen, setLeftPanelOpen] = useState(false);
  // spread the same object onto two elements -> Both elements register listeners -> Touch events bubble -> no dintinguish. Thus get 2 handlers.
  // Define the payload/object first and then get 2 handlers.
  const closeSwipeConfig = {
    onSwipedLeft: () => {
      console.log("Swiped left");
      setLeftPanelOpen(false);
    },
    delta: 75, // minimum swipe distance
    preventScrollOnSwipe: true,
    trackTouch: true,
  };
  const overlaySwipe = useSwipeable(closeSwipeConfig);
  const panelSwipe = useSwipeable(closeSwipeConfig);
  return (
    <>
      <div className="flex flex-col">
        <Header
          sessionState={sessionState}
          toggleSession={() => {
            setSessionState(!sessionState);
          }}
        />
        <div className="flex max-h-screen">
          <LeftPanel
            sessionState={sessionState}
            isOpen={leftPanelOpen}
            togglePanel={() => setLeftPanelOpen(!leftPanelOpen)}
            swipeHandlers={panelSwipe}
          />
          <div className="flex-45"></div>
          <RightPanel />
        </div>

        {/* GLOBAL overlay */}
        {leftPanelOpen && (
          <div
            {...overlaySwipe}
            className="fixed inset-0 bg-black/25 z-1 lg:hidden"
            onClick={() => setLeftPanelOpen(false)}
          />
        )}
      </div>
    </>
  );
}

export default App;
