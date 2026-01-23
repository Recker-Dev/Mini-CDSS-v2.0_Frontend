import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Plus } from "lucide-react";
import StatCard from "../components/PageComponents/DocDashboardComponents/StatCard";

function DocDashboard() {
  const navigate = useNavigate();
  const { doctorId } = useParams();
  const doctorName = sessionStorage.getItem("doctorName");

  const [MOCK_PATIENTS] = useState(() => [
    {
      id: "882-C",
      name: "Robert Miller",
      age: 54,
      lastVisit: "2 hours ago",
      status: "Critical",
      complaint: "Substernal Chest Pain",
    },
    {
      id: "102-B",
      name: "Alice Thompson",
      age: 29,
      lastVisit: "Yesterday",
      status: "Stable",
      complaint: "Persistent Cough",
    },
    {
      id: "551-K",
      name: "James Wilson",
      age: 67,
      lastVisit: "3 days ago",
      status: "Follow-up",
      complaint: "Hypertension Review",
    },
    {
      id: "901-Z",
      name: "Maria Garcia",
      age: 42,
      lastVisit: "1 week ago",
      status: "Stable",
      complaint: "Dizziness",
    },
  ]);

  return (
    <div className="min-h-screen w-full bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 space-y-10">
        {/* HEADER */}
        <div className="flex justify-between items-end">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-slate-text">
            Welcome, {doctorName}
          </h2>

          <button
            onClick={() => navigate(`/intake/${doctorId}`)}
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl cursor-pointer font-bold flex items-center gap-2 shadow-lg hover:scale-105 transition-transform text-sm md:text-base lg:text-base"
          >
            <Plus className="w-5 h-5" /> New Assessment
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            label="Total Sessions"
            value="1,284"
            color="text-indigo-600"
          />
          <StatCard
            label="Avg. Accuracy"
            value="94.2%"
            color="text-emerald-500"
          />
          <StatCard label="Clinical Alerts" value="12" color="text-rose-500" />
        </div>

        {/* TABLE */}
        {MOCK_PATIENTS.length > 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h3 className="font-bold text-primary-slate-text text-base lg:text-xl">
                Recent Patient Workspace
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-[900px] w-full text-left">
                <thead className="bg-slate-50 text-primary-slate-text text-sm lg:text-base uppercase font-bold">
                  <tr>
                    <th className="px-6 py-4">Patient</th>
                    <th className="px-6 py-4">Complaint</th>
                    <th className="px-6 py-4">Last Activity</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {MOCK_PATIENTS.map((p) => (
                    <tr
                      key={p.id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-5">
                        <p className="font-bold text-primary-slate-text text-base lg:text-base">
                          {p.name}
                        </p>
                        <p className="text-sm text-primary-slate-text">
                          ID: {p.id} • {p.age}yo
                        </p>
                      </td>

                      <td className="px-6 py-5 text-primary-slate-text text-base lg:text-base">
                        {p.complaint}
                      </td>

                      <td className="px-6 py-5 text-primary-slate-text text-sm lg:text-base">
                        {p.lastVisit}
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`px-3 py-1 rounded-full text-sm lg:text-base font-bold ${
                            p.status === "Critical"
                              ? "bg-rose-100 text-rose-600"
                              : "bg-emerald-100 text-emerald-600"
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>

                      <td className="px-6 py-5 text-right">
                        <button className="text-indigo-600 hover:text-indigo-800 font-bold cursor-pointer text-sm lg:text-base">
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
          <h3 className="text-lg  text-primary-slate-text mb-2">
            You haven’t created any clinical assessments yet, click on New
            Assessment to create you first one!
          </h3>
        )}
      </div>
    </div>
  );
}

export default DocDashboard;
