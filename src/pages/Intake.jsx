import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Activity, ChevronRight, FileText } from "lucide-react";
import usePatientDataStore from "../store/usePatientDataStore";
import { createNewSession } from "../services/session";
import { toast } from "react-hot-toast";

function Intake() {
  const navigate = useNavigate();
  const { doctorId } = useParams();

  const setpatientNotes = usePatientDataStore((state) => state.setpatientNotes);
  const setPatientData = usePatientDataStore((state) => state.setPatientData);
  const addToFiles = usePatientDataStore((state) => state.addToFiles);

  const setPatientId = usePatientDataStore((state) => state.setPatientId);

  const [initialPatientData, setInitialPatientData] = useState({
    patientName: "",
    age: "",
    gender: "",
  });
  const [initialNotes, setInitialNotes] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const canProceed =
    !loading &&
    initialPatientData.patientName.trim() !== "" &&
    initialPatientData.age !== "" &&
    initialPatientData.gender !== "" &&
    initialNotes.trim() !== "";

  async function handleSessionCreation() {
    if (!canProceed) return;

    setLoading(true);

    setpatientNotes(initialNotes);

    setPatientData({
      patientName: initialPatientData.patientName,
      age: initialPatientData.age,
      gender: initialPatientData.gender,
    });

    addToFiles(files);

    try {
      const data = await createNewSession(
        doctorId,
        initialPatientData.patientName,
        initialPatientData.age,
        initialPatientData.gender,
        initialNotes,
      );
      if (!data) {
        toast.error("Session Creation Failed!");
        return;
      }
      if (data.message === "User Error") {
        toast.error(data.detail);
        return;
      }
      toast.success("Session created!");
      setPatientId(data.pat_id);
      sessionStorage.removeItem("sessionId");
      sessionStorage.removeItem("patientId");
      sessionStorage.setItem("sessionId", data.id);
      sessionStorage.setItem("patientId", data.pat_id);
      navigate(`/dashboard/${doctorId}/${data.pat_id}/${data.id}`);
    } catch (err) {
      toast.error(err.message ?? "Server error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full grid md:grid-cols-5 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* LEFT PANEL */}
        <div className="md:col-span-2 bg-indigo-700 p-10 text-white">
          <Activity className="w-12 h-12 mb-8 text-indigo-300" />
          <h1 className="text-3xl font-bold mb-4">Clinical Intake</h1>
          <p className="text-indigo-100 leading-relaxed mb-8">
            Initialize the diagnostic engine with patient demographics,
            narratives, history, and raw files.
          </p>
        </div>

        {/* RIGHT PANEL */}
        <div className="md:col-span-3 p-10 space-y-6">
          {/* PATIENT DEMOGRAPHICS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">
                Patient Name
              </label>
              <input
                type="text"
                value={initialPatientData.patientName}
                onChange={(e) =>
                  setInitialPatientData((prev) => ({
                    ...prev,
                    patientName: e.target.value,
                  }))
                }
                placeholder="Full name"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-primary-slate-text 
                rounded-xl outline-none 
                focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">
                Age
              </label>
              <input
                type="number"
                min="0"
                max="150"
                value={initialPatientData.age}
                onChange={(e) =>
                  setInitialPatientData((prev) => ({
                    ...prev,
                    age: e.target.value,
                  }))
                }
                placeholder="Years"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-primary-slate-text 
                rounded-xl outline-none 
                focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">
                Gender
              </label>
              <select
                value={initialPatientData.gender}
                onChange={(e) =>
                  setInitialPatientData((prev) => ({
                    ...prev,
                    gender: e.target.value,
                  }))
                }
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-primary-slate-text 
                rounded-xl outline-none 
                focus:ring-2 focus:ring-indigo-500 text-sm"
              >
                <option value="">Select</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Non-binary">Non-binary</option>
                <option value="Other">Other</option>
                <option value="Unknown">Unknown</option>
              </select>
            </div>
          </div>

          {/* INITIAL NOTES */}
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">
              Initial Patient Note & Context
            </label>
            <textarea
              className="w-full h-48 p-4 bg-slate-50 border border-slate-200 text-primary-slate-text rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
              placeholder="Paste patient history, chief complaint, and any known vitals..."
              value={initialNotes}
              onChange={(e) => setInitialNotes(e.target.value)}
            />
          </div>

          {/* FILE UPLOAD */}
          <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center bg-slate-50/50">
            <input
              type="file"
              id="file-in"
              accept=".pdf"
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

          {/* ACTION BUTTON */}
          <button
            onClick={handleSessionCreation}
            disabled={!canProceed}
            className={`w-full font-bold py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2
              ${
                canProceed
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer"
                  : "bg-indigo-300 text-white/70 cursor-not-allowed"
              }
            `}
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
