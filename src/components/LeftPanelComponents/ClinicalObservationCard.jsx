import { CheckCircle, X } from "lucide-react";
import { customScrollbar } from "../../util/scrollbar";

export default function ClinicalObservationCard({ tag, entries }) {
  return (
    <div className={`w-full space-y-6 flex flex-col max-h-[30vh] p-2 `}>
      <div className="flex items-center justify-between mb-3">
        <span
          className={`text-sm font-bold ${
            tag.toLowerCase() === "positive"
              ? "text-secondary-emerald-text"
              : "text-primary-rose-text"
          } flex items-center gap-1.5`}
        >
          {tag.toLowerCase() === "positive" ? (
            <CheckCircle className="w-3.5 h-3.5 text-secondary-emerald-text" />
          ) : (
            <X className="w-3.5 h-3.5 text-primary-rose-text" />
          )}
          {tag}
        </span>
        <span
          className={`text-xs ${
            tag.toLowerCase() === "positive"
              ? "bg-emerald-50  text-secondary-emerald-text"
              : "bg-rose-50 text-primary-rose-text"
          } px-1.5 rounded-md `}
        >
          {entries.length}
        </span>
      </div>
      <div className={`flex-1 flex flex-col gap-2 overflow-y-scroll p-2 ${customScrollbar} `}>
        {entries.map((e, i) => (
          <div
            key={i}
            className={`p-2 border text-xs rounded-lg cursor-pointer select-all font-medium ${
              tag.toLowerCase() === "positive"
                ? "bg-secondary-emerald/50 border-emerald-100 text-secondary-emerald-text hover:bg-emerald-100"
                : "bg-secondary-rose/50 border-rose-100 text-secondary-rose-text hover:bg-rose-100"
            }  `}
          >
            <span>{e}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
