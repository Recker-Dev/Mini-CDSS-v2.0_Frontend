import { wsUrl } from "../util/defaults";
import useSessionStore from "../store/useSessionStore";
let socket = null;

export const wsService = {
  connect: (sessionId) => {
    if (socket) return;
    useSessionStore.getState().setSessionState("connecting");
    socket = new WebSocket(`${wsUrl}/${sessionId}`);

    socket.onopen = () => {
      useSessionStore.getState().setSessionState("connected");
      console.log("Dashboard socket connection established!");
    };

    socket.onclose = () => {
      socket = null;
      useSessionStore.getState().setSessionState("disconnected");
      console.log("Dashboard socket connection closed!");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
    };

    socket.onerror = (err) => {
      useSessionStore.getState().setSessionState("disconnected");
      console.error("WS Error:", err);
    };
  },

  disconnect: () => {
    if (!socket) return;
    socket.close();
    socket = null;
    useSessionStore.getState().setSessionState("disconnected");
    console.log("Dashboard socket closed manually.");
  },

  send: (msg) => {
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(msg));
    }
  },
};
