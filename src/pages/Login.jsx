import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Activity } from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const canLogin = !loading && email.trim() !== "" && password.trim() !== "";

  function handleLogin(e) {
    e.preventDefault(); // prevents from default action of reload
    if (!canLogin) return;

    setLoading(true);
    const doctorId = crypto.randomUUID();
    // Placeholder logic for later on API implementation

    sessionStorage.removeItem("doctorId");
    sessionStorage.setItem("doctorId", doctorId);
    sessionStorage.setItem("doctorName", "Dr. Sarah Chen");

    navigate(`/docDashboard/${doctorId}`);
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="bg-indigo-600 p-8 text-white text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Activity className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold">MiniCDSS Login</h1>
          <p className="text-indigo-100 text-sm mt-2">
            Clinical Decision Support System
          </p>
        </div>
        <form onSubmit={handleLogin} className="p-8 space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase">
              Registered Email
            </label>
            <input
              type="email"
              disabled={loading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-1 px-4 py-3 bg-slate-50 border border-slate-200  text-primary-slate-text rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your registered mail"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase">
              Password
            </label>
            <input
              type="password"
              disabled={loading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-1 px-4 py-3 bg-slate-50 border border-slate-200 text-primary-slate-text  rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="********"
            />
          </div>
          <button
            type="submit"
            disabled={!canLogin}
            className={`w-full font-bold py-3.5 rounded-xl shadow-lg transition-all
                        ${
                          canLogin
                            ? "bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer"
                            : "bg-indigo-300 text-white/70 cursor-not-allowed"
                        }`}
          >
            {loading ? "Signing In..." : "Sign In to Workspace"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
