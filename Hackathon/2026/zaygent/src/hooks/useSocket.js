import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

const SERVER_URL = "http://localhost:5000";

export default function useSocket(agentActive) {
  const [activities,  setActivities]  = useState([]);
  const [freshIds,    setFreshIds]    = useState(new Set());
  const [connected,   setConnected]   = useState(false);
  const socketRef = useRef(null);

  useEffect(() => {
    // Connect to server
    socketRef.current = io(SERVER_URL, {
      transports: ["websocket", "polling"],
    });

    const socket = socketRef.current;

    socket.on("connect", () => {
      console.log("✅ Connected to Zaygent server");
      setConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected from server");
      setConnected(false);
    });

    // Receive live activity events
    socket.on("activity", (event) => {
      if (!agentActive) return;
      setActivities(prev => [event, ...prev].slice(0, 40));
      setFreshIds(prev => new Set([...prev, event.id]));
      setTimeout(() => {
        setFreshIds(prev => {
          const n = new Set(prev);
          n.delete(event.id);
          return n;
        });
      }, 1200);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Pause/resume feed based on agent status
  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.emit("agent:toggle", { isActive: agentActive });
    }
  }, [agentActive]);

  return { activities, freshIds, connected };
}