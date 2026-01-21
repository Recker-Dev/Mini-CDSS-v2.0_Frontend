import { useRef } from "react";
import { FileText, CirclePlus, Trash, ChevronRight } from "lucide-react";
import { customScrollbar } from "../../util/scrollbar";
import usePatientDataStore from "../../store/usePatientDataStore";
import useSessionStore from "../../store/useSessionStore";

export default function PatientDataCard() {
  const sessionState = useSessionStore((state) => state.sessionState);
  const savingChanges = useSessionStore((state) => state.savingChanges);

  const files = usePatientDataStore((state) => state.files);
  const addToFiles = usePatientDataStore((state) => state.addToFiles);
  const removeFromFiles = usePatientDataStore((state) => state.removeFromFiles);

  const initialPatientData = usePatientDataStore(
    (state) => state.initialPatientData,
  );
  const setInitialPatientData = usePatientDataStore(
    (state) => state.setInitialPatientData,
  );

  const fileInputRef = useRef(null);

  const canEdit = sessionState && !savingChanges;

  return (
    <div className="flex flex-col gap-3 p-4 pr-5.5 border-t border-slate-50 ">
      <div className="flex items-center justify-between text-xs font-black text-secondary-slate-text uppercase ">
        <div className="flex items-center gap-1.5 ">
          <FileText className="w-3.5 h-3.5" /> Patient Data
        </div>
        <button
          disabled={!canEdit}
          onClick={() => fileInputRef.current?.click()}
          className={`
          select-none
          transition-all duration-200 ease-out
          ${
            canEdit
              ? "cursor-pointer text-indigo-600 hover:text-indigo-500 hover:scale-110 active:scale-95"
              : "cursor-not-allowed text-slate-400 opacity-60"
          }
        `}
          aria-label="Add files"
        >
          <CirclePlus className="w-5.5 h-5.5" />
        </button>
      </div>

      <input
        // File input but hidden, btn has the reference to trigger click
        type="file"
        accept=".pdf,.txt"
        className="hidden"
        ref={fileInputRef}
        multiple
        onChange={(e) => {
          addToFiles(e.target.files);
          e.target.value = ""; // Reset so that same file can be selected again
        }}
      />
      <div className="w-full h-[28dvh] flex flex-col gap-2">
        {files.length > 0 && (
          <div
            className={`flex-1 flex flex-col max-h-[10dvh] min-h-0 overflow-y-scroll gap-2 p-2 ${customScrollbar}`}
          >
            {files.map((f, i) => (
              <div
                key={i}
                className="flex justify-between p-2 border text-xs rounded-lg cursor-pointer select-all font-medium 
                bg-secondary-slate/50 border-secondary-slate text-primary-slate-text hover:bg-secondary-slate"
              >
                {/* Trim the length of filename to 15 chars and keep the extension */}
                <span title={f.name}>
                  {f.name.length > 20
                    ? `${f.name.substring(0, 15)}...${f.name.substring(
                        f.name.length - 3,
                        f.name.length,
                      )}`
                    : f.name}
                </span>
                <button
                  onClick={() => {
                    removeFromFiles(f);
                  }}
                >
                  <Trash
                    className="w-3.5 h-3.5 
              transition-all duration-200 ease-out 
              hover:text-primary-rose-text hover:scale-110 active:scale-95
              cursor-pointer select-none"
                  />
                </button>
              </div>
            ))}
          </div>
        )}
        <textarea
          disabled={!canEdit}
          className={`
            flex-1
            rounded-xl border
          bg-secondary-slate/95
          border-primary-slate-text/25
            w-full h-full
            resize-none
            p-4
            text-sm/6 font-medium text-primary-slate-text tracking-tight
            placeholder:text-primary-slate-text/40
            focus:outline-none
            overflow-auto
          ${customScrollbar}
        `}
          value={initialPatientData}
          onChange={(e) => setInitialPatientData(e.target.value)}
          placeholder="Enter patient's initial clinical encouter data; like age, sex, gender, ailments, complaints and any past history etc."
        />
      </div>
    </div>
  );
}
