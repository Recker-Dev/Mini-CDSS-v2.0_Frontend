import { Activity, X, ChevronDown, UserCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ProfileToggle from "./HeaderComponents/ProfileToggle";

export default function Header() {
  const [patientId] = useState("882-C");
  const [sessionState, setSessionState] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm h-16 flex items-center justify-between px-6">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-1.5">
          <div className="bg-primary-blue p-1.5 rounded-lg">
            <Activity className="w-6 h-6" />
          </div>
          <span
            className="font-black text-slate-800 tracking-tight
                 text-base sm:text-lg md:text-xl lg:text-2xl"
          >
            MiniCDSS <span className="text-primary-blue">Engine</span>
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className={`px-2 py-0.5 rounded-full text-xs ${
              sessionState
                ? "text-secondary-emerald-text bg-secondary-emerald"
                : "text-primary-rose-text bg-secondary-rose"
            } tracking-tight`}
          >
            <span className="hidden sm:inline">
              {/* big screen */}
              {sessionState ? "ONLINE" : "OFFLINE"}
            </span>
            <span className="inline sm:hidden">
              {/* phone screen */}
              {sessionState ? "ON" : "OFF"}
            </span>
          </span>
          <span className="hidden sm:inline px-2 py-0.5 rounded-full text-xs text-primary-slate-text bg-secondary-slate tracking-tight">
            PT ID: <span className="select-all">{patientId}</span>
          </span>
        </div>
      </div>
      <div className="flex items-center gap-6">
        {/* Doctor Profile */}
        <div className="relative" ref={profileRef}>
          <button
            className="flex items-center gap-2 px-3 py-1.5 rounded-full 
               text-sm font-medium text-slate-700
               hover:bg-secondary-slate hover:text-slate-900
               transition-colors"
            onClick={() => setProfileOpen(!profileOpen)}
          >
            <UserCircle className="w-5 h-5 text-primary-blue" />
            <span className="hidden sm:inline cursor-pointer">Dr. Admin</span>
            <ChevronDown className="hidden md:block w-4 h-4 text-slate-400" />
          </button>
          {profileOpen && <ProfileToggle />}
        </div>
        {/* Session Button */}
        <button
          onClick={() => setSessionState(!sessionState)}
          className={`text-sm font-black text-slate-400 ${
            sessionState
              ? "hover:text-primary-rose-text"
              : "hover:text-primary-emerald-text"
          } flex items-center gap-2 transition-colors cursor-pointer`}
        >
          {sessionState && <X className="w-4 h-4" />}
          <span className="hidden sm:inline">
            {/* big screen */}
            {sessionState ? "End Session" : "Start Session"}
          </span>
          <span className="inline sm:hidden">
            {/* phone screen */}
            {sessionState ? "End" : "Start"}
          </span>
        </button>
      </div>
    </header>
  );
}
