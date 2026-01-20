import { CheckCircle, X, PlusCircle, Trash } from "lucide-react";
import { customScrollbar } from "../../util/scrollbar";
import { useState } from "react";

export default function ClinicalObservationCard({
  sessionState,
  tag,
  entries,
  setEntries,
}) {
  const [newUserEntry, setNewUserEntry] = useState("");

  return (
    <div
      className={`space-y-6 p-2 
          flex flex-col`}
    >
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
      {/* FORM */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (newUserEntry === "") return;
          setEntries((prev) => [...prev, newUserEntry]);
          setNewUserEntry("");
        }}
        className="px-2 mb-2 relative"
      >
        {/* New Observation Input */}
        <input
          disabled={!sessionState}
          className="w-full 
            bg-slate-50 border border-slate-200  text-primary-slate-text rounded-lg text-xs
            py-2 px-3  pr-10
            outline-none focus:ring-1 focus:ring-indigo-300 "
          placeholder={
            sessionState
              ? "Add a new Observation..."
              : "Offline..reconnect to add observation"
          }
          value={newUserEntry}
          onChange={(e) => setNewUserEntry(e.target.value)}
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
      {entries.length > 0 && (
        <div
          className={` max-h-[18dvh] min-h-0 flex-1 flex  flex-col gap-2 overflow-y-scroll p-2 ${customScrollbar} `}
        >
          {entries.map((e, i) => (
            <div
              key={i}
              className={`flex justify-between items-center p-2 border text-xs rounded-lg cursor-pointer select-all font-medium ${
                tag.toLowerCase() === "positive"
                  ? "bg-secondary-emerald/50 border-emerald-100 text-secondary-emerald-text hover:bg-emerald-100"
                  : "bg-secondary-rose/50 border-rose-100 text-secondary-rose-text hover:bg-rose-100"
              }  `}
            >
              <span>{e}</span>
              <button
                onClick={() => {
                  setEntries((prev) => prev.filter((_, index) => index !== i));
                }}
              >
                <Trash
                  className="w-3.5 h-3.5 
                  text-primary-slate-text
              transition-all duration-200 ease-out 
              hover:text-primary-rose-text hover:scale-110 active:scale-95
              cursor-pointer select-none"
                />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
