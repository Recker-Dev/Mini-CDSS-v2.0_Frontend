import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import useSessionStore from "../store/useSessionStore";
import useAutoSync from "../hooks/useAutoSync";
import Header from "../components/PageComponents/DashboardComponents/Header";
import LeftPanel from "../components/PageComponents/DashboardComponents/LeftPanel";
import RightPanel from "../components/PageComponents/DashboardComponents/RightPanel";
import ChatPanel from "../components/PageComponents/DashboardComponents/ChatPanel";
import SidePanel from "../components/PageComponents/DashboardComponents/SidePanel";

function Dashboard() {
  const sessionState = useSessionStore((state) => state.sessionState);

  const [panelMode, setPanelMode] = useState(null);

  const swipeHandler = useSwipeable({
    onSwipedLeft: () => {
      setPanelMode("left");
    },
    delta: 75, // minimum swipe distance
    preventScrollOnSwipe: true,
    trackTouch: true,
  });

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
