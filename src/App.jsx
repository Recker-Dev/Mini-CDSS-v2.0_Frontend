import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import Header from "./components/Header";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";
import SidePanel from "./components/SidePanel";

function App() {
  const [sessionState, setSessionState] = useState(true);
  const [panelMode, setPanelMode] = useState("left");

  // spread the same object onto two elements -> Both elements register listeners -> Touch events bubble -> no dintinguish. Thus get 2 handlers.
  // Define the payload/object first and then get 2 handlers.
  const closeSwipeConfig = {
    onSwipedRight: () => {
      setPanelMode(null);
    },
    delta: 75, // minimum swipe distance
    preventScrollOnSwipe: true,
    trackTouch: true,
  };
  const swipeHandler = useSwipeable(closeSwipeConfig);

  return (
    <>
      <div className="flex flex-col">
        <Header
          sessionState={sessionState}
          toggleSession={() => {
            setSessionState(!sessionState);
          }}
        />

        {/* Main Content region */}
        <div className="grid grid-cols-[1fr_2.5fr_1fr] h-dvh">
          <div className="hidden lg:block">
            <LeftPanel sessionState={sessionState} />
          </div>
          <div className=""></div>
          <div className="hidden lg:block">
            <RightPanel sessionState={sessionState} />
          </div>
        </div>

        {/* Dynamic Dual Mode SidePanels */}
        <div className="lg:hidden">
          <SidePanel
            isOpen={panelMode !== null}
            onClose={() => setPanelMode(null)}
            activeTab={panelMode}
            setActiveTab={setPanelMode}
            swipeHandler={swipeHandler}
          >
            {panelMode === "left" && (
              <LeftPanel
                sessionState={sessionState}
              />
            )}
            {panelMode === "right" && (
              <RightPanel
                sessionState={sessionState}
              />
            )}
          </SidePanel>
        </div>
      </div>
    </>
  );
}

export default App;
