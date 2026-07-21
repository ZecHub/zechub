import { useState, useEffect } from "react";

const AGENT_API = "http://localhost:5001";

if (!window._agentEvents) {
  window._agentEvents = { log: [], connected: false, cycleCount: 0, subscribed: false };
}

const isActivityEvent = (type) => [
  "POSITION_OPENED", "POSITION_CLOSED", "SNIPE_EXECUTED",
  "SNIPE_CLOSED", "POSITION_UPDATE", "PROFITS_RETURNED",
  "BUY_FAILED_REFUNDED",
].includes(type);

const convertToActivity = (event) => {
  const { type, data, ts } = event;
  if (!data) return null;

  const now  = new Date(ts || Date.now());
  const time = `${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}:${String(now.getSeconds()).padStart(2,"0")}`;

  const op = type === "POSITION_OPENED"    ? "Bought"
         : type === "POSITION_CLOSED"    ? (data.reason === "TP_HIT" ? "TP Hit" : "SL Exit")
         : type === "SNIPE_EXECUTED"     ? "Sniped"
         : type === "SNIPE_CLOSED"       ? (data.reason === "TP_HIT" ? "TP Hit" : "SL Exit")
         : type === "POSITION_UPDATE"    ? "Holding"
         : type === "PROFITS_RETURNED"   ? "Returned"
         : type === "BUY_FAILED_REFUNDED" ? "Refunded"
         : type;

  return {
    id:           `${type}_${Date.now()}_${Math.random()}`,
    ts:           time,
    chain:        data.chain        || "SOLANA",
    token:        (data.token       || "UNKNOWN").trim(),
    op,
    amount:       data.amount       || data.tokensHeld || "—",
    price:        data.entryPrice   || data.executedPrice || "—",
    currentPrice: data.currentPrice && data.currentPrice !== "—" ? data.currentPrice : null,
    zec:          data.zecUsed      || "—",
    shielded:     true,
    profit:       type === "POSITION_CLOSED" && data.reason === "TP_HIT",
    pnl:          data.pnlPct ? `${data.pnlPct > 0 ? "+" : ""}${data.pnlPct}%` : null,
    fromAgent:    true,
  };
};

// Global listeners so all hook instances update together
const listeners = new Set();

const notifyAll = () => {
  listeners.forEach(fn => fn([...window._agentEvents.log]));
};

// Start single SSE connection
if (!window._agentEvents.subscribed) {
  window._agentEvents.subscribed = true;
  try {
    const es = new EventSource(`${AGENT_API}/events`);
    es.onopen = () => { window._agentEvents.connected = true; };
    es.onerror = () => { window._agentEvents.connected = false; };
    es.onmessage = (e) => {
      try {
        const event = JSON.parse(e.data);
        if (event.type === "CONNECTED") { window._agentEvents.connected = true; return; }
        if (event.type === "CYCLE_START") { window._agentEvents.cycleCount = event.data.cycle; }
        if (isActivityEvent(event.type)) {
          const activity = convertToActivity(event);
          if (activity) {
            window._agentEvents.log.unshift(activity);
            if (window._agentEvents.log.length > 100) window._agentEvents.log.pop();
            notifyAll();
          }
        }
      } catch (err) {}
    };
  } catch (err) {}
}

export default function useAgentEvents(maxEvents = 50) {
  const [events,     setEvents]     = useState([...window._agentEvents.log].slice(0, maxEvents));
  const [connected,  setConnected]  = useState(window._agentEvents.connected);
  const [cycleCount, setCycleCount] = useState(window._agentEvents.cycleCount);

  useEffect(() => {
    const update = (log) => {
      setEvents(log.slice(0, maxEvents));
      setConnected(window._agentEvents.connected);
      setCycleCount(window._agentEvents.cycleCount);
    };
    listeners.add(update);
    return () => listeners.delete(update);
  }, []);

  return { events, connected, cycleCount };
}