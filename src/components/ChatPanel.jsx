import { useRef, useState } from "react";
import { Send } from "lucide-react";
import { customScrollbar } from "../util/scrollbar";

const defaultAIChat = {
  id: 1,
  type: "AI",
  content:
    "Analysis complete. I've processed your notes and 0 files. Does the chest pain worsen when taking a deep breath or lying flat?",
};

export default function ChatPanel({ sessionState }) {
  const [userInput, setUserInput] = useState("");
  const [chats, setChats] = useState([defaultAIChat]);
  const scrollRef = useRef(null);

  function handleChatSubmission() {
    setChats((prev) => [
      ...prev,
      {
        id: chats.length,
        type: "Human",
        content: userInput,
      },
      defaultAIChat,
    ]);
    setUserInput("");
  }

  return (
    <main className="h-dvh">
      <section
        className="h-full w-full
        flex flex-col justify-end 
      bg-slate-50 overflow-hidden"
      >
        {/* Chat appears */}
        <div
          ref={scrollRef}
          className={`flex-1 min-h-0  p-6 space-y-6  overflow-y-auto ${customScrollbar}`}
        >
          {chats.map((c, i) => (
            <div
              key={i}
              className={`flex ${c.type === "AI" ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-2xl shadow-sm border ${
                  c.type === "AI"
                    ? "bg-white text-primary-slate-text border-slate-200 rounded-tl-none"
                    : "bg-primary-blue text-white border-indigo-500 rounded-tr-none"
                }`}
              >
                {" "}
                <p className="text-base font-medium leading-relaxed whitespace-pre-wrap">
                  {c.content}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* User chat input */}
        <div
          className="shrink-0 h-40
        p-6 bg-white border-t border-slate-200"
        >
          <div className="flex gap-2">
            <input
              disabled={!sessionState}
              className="flex-1 
            bg-slate-50 text-primary-slate-text border border-slate-200
            rounded-xl px-4 py-3 text-sm
            focus:ring-2 focus:ring-indigo-500 outline-none"
              type="text"
              placeholder={
                sessionState
                  ? "Submit follow-up findings or ask for reasoning..."
                  : "Offline..reconnect to continue with differential diagnosis"
              }
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleChatSubmission();
                }
              }}
            />
            <button
              disabled={!sessionState}
              onClick={handleChatSubmission}
              className={`
                p-3 rounded-xl shadow-lg transition-colors
                ${
                  sessionState
                    ? "bg-primary-blue text-white hover:bg-indigo-700"
                    : "bg-gray-400 text-gray-200 cursor-not-allowed opacity-60"
                }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
