import { create } from "zustand";

const useWsStore = create()((set, get) => ({
  socket: null,
  setWs: (ws) => set({ ws }),

  sendMessage : (msg) => {
    const ws = get().ws

    if(ws.readState === WebSocket.OPEN) {
        ws.sendMessage
    }

  }

}));

export default useWsStore;
