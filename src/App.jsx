import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import useSessionStore from "./store/useSessionStore";
import Header from "./components/Header";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";
import SidePanel from "./components/SidePanel";
import ChatPanel from "./components/ChatPanel";

function App() {
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

export default App;
