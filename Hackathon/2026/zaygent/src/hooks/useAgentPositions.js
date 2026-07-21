import { useState, useEffect } from "react";

const AGENT_API = "http://localhost:5001";

export default function useAgentPositions(refreshInterval = 10000) {
  const [positions,    setPositions]    = useState([]);
  const [snipes,       setSnipes]       = useState([]);
  const [agentOnline,  setAgentOnline]  = useState(false);
  const [loading,      setLoading]      = useState(true);
  const [lastUpdated,  setLastUpdated]  = useState(null);

  const fetchPositions = async () => {
    try {
      const res  = await fetch(`${AGENT_API}/positions`);
      const data = await res.json();
      if (data.success) {
        setPositions(data.positions || []);
        setSnipes(data.snipes       || []);
        setAgentOnline(true);
        setLastUpdated(new Date());
      }
    } catch (err) {
      setAgentOnline(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPositions();
    const interval = setInterval(fetchPositions, refreshInterval);
    return () => clearInterval(interval);
  }, [refreshInterval]);

  // Also subscribe to SSE events from agent
  useEffect(() => {
    let es;
    try {
      es = new EventSource(`${AGENT_API}/events`);
      es.onmessage = (e) => {
        try {
          const event = JSON.parse(e.data);
          if (event.type === "POSITIONS_UPDATE") {
            setPositions(event.data.positions || []);
            setSnipes(event.data.snipes       || []);
            setLastUpdated(new Date());
          }
        } catch (err) {}
      };
      es.onerror = () => setAgentOnline(false);
    } catch (err) {}
    return () => { if (es) es.close(); };
  }, []);

  return { positions, snipes, agentOnline, loading, lastUpdated, refresh: fetchPositions };
}