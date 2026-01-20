import { useState, useRef, useEffect } from "react";
import { FileText, CirclePlus, Trash, ChevronRight } from "lucide-react";
import { customScrollbar } from "../../util/scrollbar";
import usePatientDataStore from "../../store/usePatientDataStore";
import PatientDataToggle from "./PatientDataToggle";
import useSessionStore from "../../store/useSessionStore";

export default function PatientDataCard() {
  const sessionState = useSessionStore((state) => state.sessionState);
  const savingChanges = useSessionStore((state) => state.savingChanges);
  const setSavingChanges = useSessionStore((state) => state.setSavingChanges);

  const files = usePatientDataStore((state) => state.files);
  const addToFiles = usePatientDataStore((state) => state.addToFiles);
  const removeFromFiles = usePatientDataStore((state) => state.removeFromFiles);

  const fileInputRef = useRef(null);
  const [showEditPanel, setShowEditPanel] = useState(false);
  const showPatientDataRef = useRef(null);


  useEffect(() => {
    function handleClickOutside(e) {
      if (
        showPatientDataRef &&
        !showPatientDataRef.current.contains(e.target)
      ) {
        setShowEditPanel(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      {files.length > 0 && (
        <div
          className={`flex flex-col max-h-[18dvh] min-h-0 overflow-y-scroll gap-2 p-2 ${customScrollbar}`}
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
                      f.name.length
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
      {/* Clinical Encounter Initial Patient Data */}
      <div ref={showPatientDataRef} className="relative w-full">
        {/* Initial Patient Data Btn */}
        <button
          onClick={() => setShowEditPanel(!showEditPanel)}
          className={`
                w-full flex justify-between items-center p-2 border text-xs rounded-lg
                font-medium transition-all

                ${
                  canEdit
                    ? `
                      cursor-pointer
                      bg-secondary-emerald/70
                      border-primary-emerald-text/20
                      text-secondary-emerald-text
                      hover:bg-secondary-emerald/90
                    `
                    : `
                      cursor-pointer
                      bg-secondary-slate/70
                      border-primary-slate-text/20
                      text-primary-slate-text
                      hover:bg-secondary-slate/90
                      opacity-80
                    `
                }
              `}
        >
          <span className="tracking-tight">
            Patient Data — {canEdit ? "Editable" : "Read-Only"}
          </span>

          <ChevronRight
            className={`
                w-4 h-4 transition-all
                ${
                  sessionState
                    ? "text-secondary-emerald-text hover:text-primary-emerald-text hover:scale-110 active:scale-95"
                    : "text-primary-slate-text opacity-70"
                }
              `}
          />
        </button>
        {/* Input Box for Patient Data {Transition Rendering} */}
        <PatientDataToggle canEdit={canEdit} isOpen={showEditPanel} />
      </div>
      {/* Save button */}
      <div className="flex justify-end">
        <button
          disabled={!canEdit}
          onClick={() => {
            console.log("Syncing up state...");
            setSavingChanges(true);
            setTimeout(() => setSavingChanges(false), 2000);
          }}
          className={`
            w-32 h-auto mt-4 ml-32 p-2 border text-xs rounded-lg
            font-medium text-center tracking-wide
            transition-all

            ${
              canEdit
                ? "cursor-pointer bg-secondary-emerald/70 border-primary-emerald-text/20 text-secondary-emerald-text hover:bg-secondary-emerald/90"
                : "cursor-not-allowed bg-slate-200 border-slate-300 text-slate-400 opacity-70"
            }
          `}
        >
          {sessionState ? (
            <span>{savingChanges ? "Saving..." : "Save Changes"}</span>
          ) : (
            <span>Offline</span>
          )}
        </button>
      </div>
    </div>
  );
}
