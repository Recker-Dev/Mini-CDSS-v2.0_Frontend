import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import Header from "./components/Header";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";

function App() {
  const [sessionState, setSessionState] = useState(true);
  const [leftPanelOpen, setLeftPanelOpen] = useState(false);
  const [rightPanelOpen, setRightPanelOpen] = useState(false);
  // spread the same object onto two elements -> Both elements register listeners -> Touch events bubble -> no dintinguish. Thus get 2 handlers.
  // Define the payload/object first and then get 2 handlers.
  const closeSwipeConfig = {
    onSwipedLeft: () => {
      console.log("Swiped left");
      setLeftPanelOpen(false);
    },
    delta: 75, // minimum swipe distance
    preventScrollOnSwipe: true,
    trackTouch: true,
  };
  const overlaySwipe = useSwipeable(closeSwipeConfig);
  const panelSwipe = useSwipeable(closeSwipeConfig);
  return (
    <>
      <div className="flex flex-col">
        <Header
          sessionState={sessionState}
          toggleSession={() => {
            setSessionState(!sessionState);
          }}
        />
        <div className="grid grid-cols-[1fr_1fr_1fr] h-dvh">
          <LeftPanel
            sessionState={sessionState}
            isOpen={leftPanelOpen}
            togglePanel={() => setLeftPanelOpen(!leftPanelOpen)}
            swipeHandlers={panelSwipe}
          />
          <div className=""></div>
          <RightPanel
            sessionState={sessionState}
            isOpen={rightPanelOpen}
            togglePanel={() => setRightPanelOpen(!rightPanelOpen)}
          />
        </div>
        {/* GLOBAL overlay */}
        {leftPanelOpen && (
          <div
            {...overlaySwipe}
            className="fixed inset-0 bg-black/25 z-1 lg:hidden"
            onClick={() => setLeftPanelOpen(false)}
          />
        )}
      </div>
    </>
  );
}

export default App;
