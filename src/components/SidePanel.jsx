import { HeartPulse, Brain } from "lucide-react";
import { useSwipeable } from "react-swipeable";

export default function SidePanel({
  isOpen,
  onClose,
  children,
  activeTab,
  setActiveTab,
}) {
  const closeSwipeConfig = {
    onSwipedRight: () => {
      setActiveTab(null);
    },
    delta: 75, // minimum swipe distance
    preventScrollOnSwipe: true,
    trackTouch: true,
  };
  const swipeHandler = useSwipeable(closeSwipeConfig);

  return (
    <>
      <div
        {...swipeHandler}
        className={`
            fixed top-16 right-0 z-40
            h-[calc(100vh-64px)] w-[80vw] max-w-md
            transform transition-transform duration-300 ease-out
            ${isOpen ? "translate-x-0" : "translate-x-full"}
            `}
      >
        {/* actual content */}
        <div className="h-full w-full bg-white shadow-xl border-l border-slate-200">
          {children}
        </div>

        {/* Floating tabs for -> evidence board and reasoning board
            'right-full' pushes the buttons to sit outside the left border
        */}
        <div className="absolute top-[60%] right-full flex flex-col gap-1 items-end">
          {/* Evidence Board */}
          <button
            onClick={() => setActiveTab("left")}
            /* rounded-l-xl (rounded on the left) */
            className={`p-3 rounded-l-xl border-y border-l shadow-md transition-all ${
              activeTab === "left"
                ? "bg-white text-primary-blue border-slate-200 w-14"
                : "bg-slate-100 text-slate-400 border-transparent w-12"
            }`}
          >
            <HeartPulse className="w-6 h-6" />
          </button>

          {/* Reasoning Board */}
          <button
            onClick={() => setActiveTab("right")}
            className={`p-3 rounded-l-xl border-y border-l shadow-md transition-all ${
              activeTab === "right"
                ? "bg-white text-primary-blue border-slate-200 w-14"
                : "bg-slate-100 text-slate-400 border-transparent w-12"
            }`}
          >
            <Brain className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* OVERLAY */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/25 z-30" onClick={onClose} />
      )}
    </>
  );
}
