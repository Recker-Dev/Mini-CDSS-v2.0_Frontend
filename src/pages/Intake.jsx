import { useState } from "react";
import { Activity, ChevronRight, FileText } from "lucide-react";
import usePatientDataStore from "../store/usePatientDataStore";

function Intake() {
  const setInitialPatientData = usePatientDataStore(
    (state) => state.setInitialPatientData,
  );
  const addToFiles = usePatientDataStore((state) => state.addToFiles);

  const [initialNotes, setInitialNotes] = useState();
  const [files, setFiles] = useState();
  const [loading, setLoading] = useState(false);

  function handleStart() {
    setLoading(true);
    setInitialPatientData(initialNotes);
    addToFiles(files);
    console.log("Acknowledged PATIENT CONTEXT: ", initialNotes);
    console.log("Acknowledged PATIENT FILES: ", files);
    // Placeholder to be filled by a new DB entry for the patientId, docId, sessionId.
    
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full grid md:grid-cols-5 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        <div className="md:col-span-2 bg-indigo-700 p-10 text-white">
          <Activity className="w-12 h-12 mb-8 text-indigo-300" />
          <h1 className="text-3xl font-bold mb-4">Clinical Intake</h1>
          <p className="text-indigo-100 leading-relaxed mb-8">
            Initialize the diagnostic engine with patient narratives, history,
            and raw files.
          </p>
        </div>
        <div className="md:col-span-3 p-10 space-y-6">
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">
              Initial Patient Note & Context
            </label>
            <textarea
              className="w-full h-48 p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
              placeholder="Paste patient history, chief complaint, and any known vitals..."
              value={initialNotes}
              onChange={(e) => setInitialNotes(e.target.value)}
            />
          </div>
          <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center bg-slate-50/50">
            <input
              type="file"
              id="file-in"
              className="hidden"
              multiple
              onChange={(e) => setFiles(Array.from(e.target.files))}
            />
            <label
              htmlFor="file-in"
              className="cursor-pointer flex flex-col items-center"
            >
              <FileText className="w-10 h-10 text-slate-300 mb-2" />
              <span className="text-sm font-semibold text-slate-600">
                Upload Labs (.pdf)
              </span>
              <span className="text-xs text-slate-400">
                {files.length} files staged
              </span>
            </label>
          </div>
          <button
            onClick={handleStart}
            disabled={!initialNotes || loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
          >
            {loading ? "Creating Session..." : "Proceed to Dashboard"}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Intake;
