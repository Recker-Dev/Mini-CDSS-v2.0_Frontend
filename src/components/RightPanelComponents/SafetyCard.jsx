import {ShieldAlert } from "lucide-react";

export default function SafetyCard({ safetyChecklist }) {
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