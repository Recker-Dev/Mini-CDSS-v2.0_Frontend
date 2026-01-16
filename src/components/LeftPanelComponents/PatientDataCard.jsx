import { useState, useRef, useEffect } from "react";
import { FileText, CirclePlus, Trash, ChevronRight } from "lucide-react";
import { customScrollbar } from "../../util/scrollbar";
import PatientDataToggle from "./PatientDataToggle";

export default function PatientDataCard({ sessionState }) {
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [showEditPanel, setShowEditPanel] = useState(false);
  const [initialPatientData, setInitialPatientData] = useState("Age 50. Male");
  const showEditPanelRef = useRef(null);
  const [savingChanges, setSavingChanges] = useState(false);

  useEffect(() => {
    function handleClickOutside(e) {
      if (showEditPanelRef && !showEditPanelRef.current.contains(e.target)) {
        setShowEditPanel(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const canEdit = sessionState && !savingChanges;

  return (
    <section className="p-4 pr-5.5 border-t border-slate-50 ">
      <h3 className="text-xs font-black text-secondary-slate-text uppercase flex items-center justify-between">
        <div className="flex items-center gap-1.5 ">
          <FileText className="w-3.5 h-3.5" /> Patient Data
        </div>
        <button
          disabled={!canEdit}
          onClick={() => fileInputRef.current?.click()}
          className={`
          flex items-center justify-center select-none
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
      </h3>

      <input
        // File input but hidden, btn has the reference to trigger click
        type="file"
        accept=".pdf,.txt"
        className="hidden"
        ref={fileInputRef}
        multiple
        onChange={(e) => {
          const newFiles = Array.from(e.target.files || []);
          if (newFiles && newFiles.length > 0) {
            setFiles((prevFiles) => {
              const map = new Map();
              [...prevFiles, ...newFiles].forEach((file) => {
                // de-duplication logic: spread the files to array -> make a unique map per file -> remake array
                const key = `${file.name}-${file.size}-${file.lastModified}`;
                map.set(key, file);
              });
              return Array.from(map.values());
            });
            console.log("Selected newFiles:", newFiles);
            console.log("Net files:", files);
          }
          e.target.value = ""; // Reset so that same file can be selected again
        }}
      />
      <div className={`mt-3 flex flex-col gap-2 ${customScrollbar}`}>
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
                setFiles(files.filter((entry) => entry.name != f.name));
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
        {/* Clinical Encounter Initial Patient Data */}
        <div ref={showEditPanelRef} className="relative w-full">
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

          <PatientDataToggle
            canEdit={canEdit}
            isOpen={showEditPanel}
            initialPatientData={initialPatientData}
            setInitialPatientData={setInitialPatientData}
          />
        </div>
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
    </section>
  );
}
