import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Intake from "./pages/Intake";
import Login from "./pages/Login";
import DocDashboard from "./pages/DocDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/docDashboard/:doctorId" element={<DocDashboard />} />
      <Route path="/intake/:doctorId" element={<Intake />} />
      <Route
        path="/dashboard/:patientId/:doctorId/:sessionId"
        element={<Dashboard />}
      />
    </Routes>
  );
}

export default App;
