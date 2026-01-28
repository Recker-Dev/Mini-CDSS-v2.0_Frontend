import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Plus } from "lucide-react";
import { formatDistanceToNow, parseISO } from "date-fns";
import StatCard from "../components/PageComponents/DocDashboardComponents/StatCard";
import { LoadingState } from "../components/LoadingState";
import { getSessions } from "../services/session";

function DocDashboard() {
  const navigate = useNavigate();
  const { doctorId } = useParams();
  const doctorName = sessionStorage.getItem("doctorName");
  const [patientSessions, setPatientSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!doctorId) return;
    (async () => {
      try {
        const data = await getSessions(doctorId);
        if (data && Array.isArray(data) && data.length > 0) {
          setPatientSessions(data);
        } else {
          setPatientSessions([]);
        }
      } catch {
        setPatientSessions([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [doctorId]);

  function handleLastActivity(last_activity) {
    const date = parseISO(last_activity);
    return formatDistanceToNow(date, { addSuffix: true });
  }

  function calculateCriticalCases() {
    if (!Array.isArray(patientSessions)) return 0;
    return patientSessions.filter((entry) => entry.status === "Critical")
      .length;
  }

  return (
    <div className="min-h-screen w-full bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 space-y-10">
        {/* HEADER */}
        <div className="flex justify-between items-end">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-primary-slate-text">
            Welcome, {doctorName}
          </h2>

          <button
            onClick={() => navigate(`/intake/${doctorId}`)}
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl cursor-pointer font-black flex items-center gap-2 shadow-lg hover:scale-105 transition-transform text-sm md:text-base lg:text-base"
          >
            <Plus className="w-5 h-5" /> New Assessment
          </button>
        </div>

        {/* STATS */}
        {loading ? (
          <LoadingState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              label="Total Sessions"
              value={patientSessions.length > 0 ? patientSessions.length : 0}
              color="text-indigo-600"
            />
            <StatCard
              label="Avg. Accuracy"
              value="Fake 94.2%"
              color="text-emerald-500"
            />
            <StatCard
              label="Clinical Alerts"
              value={calculateCriticalCases()}
              color="text-rose-500"
            />
          </div>
        )}

        {/* TABLE */}
        {patientSessions.length > 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h3 className="font-black text-primary-slate-text text-base lg:text-xl">
                Recent Patient Workspace
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-[900px] w-full text-left">
                <thead className="bg-slate-50 text-primary-slate-text text-sm lg:text-base uppercase font-black">
                  <tr>
                    <th className="px-6 py-4">Patient</th>
                    <th className="px-6 py-4">Complaint</th>
                    <th className="px-6 py-4">Last Activity</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {patientSessions.map((ses) => (
                    <tr
                      key={ses.id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-5">
                        <p className="font-black text-primary-slate-text text-base lg:text-base">
                          {ses.pat_name}
                        </p>
                        <p className="text-sm text-primary-slate-text">
                          ID: {ses.pat_id} • {ses.pat_age}yo
                        </p>
                      </td>

                      <td className="px-6 py-5 text-primary-slate-text text-base lg:text-base">
                        {ses.chronic_conditions}
                      </td>

                      <td className="px-6 py-5 text-primary-slate-text text-sm lg:text-base">
                        {handleLastActivity(ses.last_activity)}
                      </td>

                      <td className="px-3 py-5">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-black ${
                            ses.status === "Critical"
                              ? "bg-rose-100 text-rose-600"
                              : "bg-emerald-100 text-emerald-600"
                          }`}
                        >
                          {ses.status}
                        </span>
                      </td>

                      <td className="px-6 py-5 text-right font-black">
                        <button
                          onClick={() =>
                            navigate(
                              `/dashboard/${doctorId}/${ses.pat_id}/${ses.id}`,
                            )
                          }
                          className="text-indigo-600 hover:text-indigo-800  cursor-pointer text-sm lg:text-base"
                        >
                          Open Workspace
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <h3 className="text-lg text-center text-primary-slate-text mb-2">
            {loading
              ? "We are mining the data, please sit tight :)"
              : "You haven’t created any clinical assessments yet, click on New Assessment to create you first one!"}
          </h3>
        )}
      </div>
    </div>
  );
}

export default DocDashboard;
