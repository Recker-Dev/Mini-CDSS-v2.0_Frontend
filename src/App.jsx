import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import Header from "./components/Header";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";
import SidePanel from "./components/SidePanel";

function App() {
  const [sessionState, setSessionState] = useState(true);
  const [panelMode, setPanelMode] = useState("left");

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
      <Header
        sessionState={sessionState}
        toggleSession={() => setSessionState(!sessionState)}
      />

      {/* Main Content */}
      <div className="grid grid-cols-[1fr_2.5fr_1fr] h-[calc(100dvh-64px)]">
        <div className="hidden lg:block">
          <LeftPanel sessionState={sessionState} />
        </div>
        <div />
        <div className="hidden lg:block">
          <RightPanel sessionState={sessionState} />
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
          {panelMode === "left" && <LeftPanel sessionState={sessionState} />}
          {panelMode === "right" && <RightPanel sessionState={sessionState} />}
        </SidePanel>
      </div>
    </div>
  );
}

export default App;
