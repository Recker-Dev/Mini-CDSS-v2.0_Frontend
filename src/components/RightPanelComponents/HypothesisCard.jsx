import { ArrowUpRight, Trash } from "lucide-react";
import useSessionStore from "../../store/useSessionStore";
import useReasoningStore from "../../store/useReasoningStore";

export default function HypothesisCard({ hypothesis }) {
  const sessionState = useSessionStore((state) => state.sessionState);
  const savingChanges = useSessionStore((state) => state.savingChanges);

  const removeFromHypotheses = useReasoningStore(
    (state) => state.removeFromHypotheses
  );

  const canEdit = sessionState === "connected" && !savingChanges;
  return (
    <div
      className={`p-4 rounded-xl border transition-all ${
        hypothesis.source === "Doctor"
          ? "bg-indigo-50/50 border-indigo-200 ring-1 ring-indigo-100"
          : "bg-emerald-50/50 border-slate-200 ring-1 ring-slate-200"
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
        <button
          disabled={!canEdit}
          onClick={() => removeFromHypotheses(hypothesis.id)}
          className={`${!canEdit ? "cursor-not-allowed" : "cursor-pointer"}`}
        >
          <Trash
            className={`w-3.5 h-3.5 transition-all duration-200 ease-out select-none
                  ${
                    canEdit
                      ? "text-primary-rose-text hover:scale-110 active:scale-95 opacity-100"
                      : "text-primary-slate-text opacity-50 grayscale"
                  }`}
          />
        </button>
      </div>
    </div>
  );
}
