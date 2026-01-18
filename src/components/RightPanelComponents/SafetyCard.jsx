import { ShieldAlert } from "lucide-react";
import { customScrollbar } from "../../util/scrollbar";

export default function SafetyCard({ safetyChecklist }) {
  return (
    <div className=" bg-amber-50 rounded-xl p-4 border border-amber-100 flex gap-3">
      <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
      <div className="w-full h-full">
        <p className="text-xs font-bold text-amber-800 uppercase mb-1">
          Safety Checklist
        </p>
        {/* Scroll container */}
        <div
          className={`flex-1 min-h-0 max-h-[16dvh] overflow-y-auto pr-3 ${customScrollbar}`}
        >
          <ul className="list-disc text-xs text-amber-700 space-y-1 pl-4">
            {safetyChecklist.map((entry, i) => (
              <li key={i}>{entry}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
