import { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { useParams, useNavigate } from "react-router-dom";
import useSessionStore from "../store/useSessionStore";
import useAutoSync from "../hooks/useAutoSync";
import Header from "../components/PageComponents/DashboardComponents/Header";
import LeftPanel from "../components/PageComponents/DashboardComponents/LeftPanel";
import RightPanel from "../components/PageComponents/DashboardComponents/RightPanel";
import ChatPanel from "../components/PageComponents/DashboardComponents/ChatPanel";
import SidePanel from "../components/PageComponents/DashboardComponents/SidePanel";
import { toast } from "react-hot-toast";
import { getSessionDetails } from "../services/session";
import useEvidenceStore from "../store/useEvidenceStore";
import usePatientDataStore from "../store/usePatientDataStore";
import useChatStore from "../store/useChatStore";

function Dashboard() {
  const { patientId, doctorId, sessionId } = useParams();
  const navigate = useNavigate();

  const sessionState = useSessionStore((state) => state.sessionState);

  const [panelMode, setPanelMode] = useState(null);

  const setEvidences = useEvidenceStore((state) => state.setEvidences);
  const setPatientId = usePatientDataStore((state) => state.setPatientId);
  const setPatientNotes = usePatientDataStore((state) => state.setPatientNotes);
  const setChats = useChatStore((state) => state.setChats);

  setPatientId(patientId);
  const swipeHandler = useSwipeable({
    onSwipedLeft: () => {
      setPanelMode("left");
    },
    delta: 75, // minimum swipe distance
    preventScrollOnSwipe: true,
    trackTouch: true,
  });

  useEffect(() => {
    if (!sessionId) return;
    (async () => {
      try {
        const data = await getSessionDetails(sessionId);
        if (data.message === "User Error") {
          toast(`❌️ ${data.detail}`, { duration: 8000 });
          navigate(`/docDashboard/${doctorId}`);
          return;
        }
        if (!data) {
          toast.error("Session cannot be accessed!");
          navigate(`/docDashboard/${doctorId}`);
          return;
        }

        setEvidences(data.evidences);
        setPatientNotes(data.pat_note);
        setChats(data.chats);
      } catch {
        // setPatientSessions([]);
      } finally {
        // setLoading(false);
      }
    })();
  }, [doctorId, sessionId, navigate, setEvidences, setPatientNotes, setChats]);

  useAutoSync(2);

  return (
    <div {...swipeHandler} className="h-dvh overflow-hidden">
      <Header />
      {/* Main Content */}
      <div
        className="
        h-[calc(100dvh-64px)] w-100dvh
        grid
        grid-cols-1  //mobile view
        lg:grid-cols-[1fr_2.5fr_1fr] //desktop view
      "
      >
        <div className="hidden lg:block">
          <LeftPanel />
        </div>
        <ChatPanel sessionState={sessionState} />
        <div className="hidden lg:block">
          <RightPanel />
        </div>
      </div>

      {/* Mobile SidePanel */}
      <div className="lg:hidden">
        <SidePanel
          isOpen={panelMode !== null}
          onClose={() => setPanelMode(null)}
          activeTab={panelMode}
          setActiveTab={setPanelMode}
        >
          {panelMode === "left" && <LeftPanel />}
          {panelMode === "right" && <RightPanel />}
        </SidePanel>
      </div>
    </div>
  );
}

export default Dashboard;
