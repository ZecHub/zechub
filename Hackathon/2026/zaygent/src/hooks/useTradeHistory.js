import { useState, useEffect } from "react";

const AGENT_API = "http://localhost:5001";

if (!window._tradeHistory) {
  window._tradeHistory = { log: [], subscribed: false };
}

const formatPrice = (p) => {
  if (!p) return "—";
  const n = parseFloat(p);
  if (isNaN(n)) return "—";
  return n < 0.01 ? n.toFixed(6) : n.toFixed(4);
};

const tradeListeners = new Set();
const notifyTradeListeners = () => {
  tradeListeners.forEach(fn => fn([...window._tradeHistory.log]));
};

if (!window._tradeHistory.subscribed) {
  window._tradeHistory.subscribed = true;
  try {
    const es = new EventSource(`${AGENT_API}/events`);
    es.onmessage = (e) => {
      try {
        const event  = JSON.parse(e.data);
        const { type, data, ts } = event;
        const now     = new Date(ts || Date.now());
        const dateStr = now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
        const timeStr = now.toTimeString().slice(0, 8);

        if (type === "POSITION_OPENED") {
          window._tradeHistory.log.unshift({
            id: `${Date.now()}_${Math.random()}`,
            date: dateStr, ts: timeStr,
            chain: data.chain, token: (data.token || "").trim(),
            op: "Bought", price: formatPrice(data.entryPrice),
            entryPrice: data.entryPrice, exitPrice: null,
            amount: data.amount || "—", zec: data.zecUsed || "—",
            pnl: null, profit: false, shielded: true, status: "OPEN",
          });
          notifyTradeListeners();
        }

        if (type === "POSITION_CLOSED") {
          const existing = window._tradeHistory.log.find(t =>
            t.token === (data.token || "").trim() && t.status === "OPEN"
          );
          if (existing) {
            existing.op        = data.reason === "TP_HIT" ? "TP Hit" : "SL Exit";
            existing.exitPrice = formatPrice(data.executedPrice);
            existing.pnl       = data.pnlPct ? `${data.pnlPct > 0 ? "+" : ""}${data.pnlPct}%` : null;
            existing.profit    = data.reason === "TP_HIT";
            existing.status    = "CLOSED";
            existing.closedAt  = timeStr;
          } else {
            window._tradeHistory.log.unshift({
              id: `${Date.now()}_${Math.random()}`,
              date: dateStr, ts: timeStr,
              chain: data.chain, token: (data.token || "").trim(),
              op: data.reason === "TP_HIT" ? "TP Hit" : "SL Exit",
              price: formatPrice(data.executedPrice),
              entryPrice: null, exitPrice: formatPrice(data.executedPrice),
              amount: "—", zec: "—",
              pnl: data.pnlPct ? `${data.pnlPct > 0 ? "+" : ""}${data.pnlPct}%` : null,
              profit: data.reason === "TP_HIT", shielded: true, status: "CLOSED",
            });
          }
          notifyTradeListeners();
        }

        if (type === "SNIPE_EXECUTED") {
          window._tradeHistory.log.unshift({
            id: `${Date.now()}_${Math.random()}`,
            date: dateStr, ts: timeStr,
            chain: data.chain, token: (data.token || "").trim(),
            op: "Sniped", price: formatPrice(data.entryPrice),
            entryPrice: data.entryPrice, exitPrice: null,
            amount: data.amount || "—", zec: data.zecUsed || "—",
            pnl: null, profit: false, shielded: true, status: "OPEN",
          });
          notifyTradeListeners();
        }

        if (type === "BUY_FAILED_REFUNDED") {
          window._tradeHistory.log.unshift({
            id: `${Date.now()}_${Math.random()}`,
            date: dateStr, ts: timeStr,
            chain: data.refund?.destinationChain || "—",
            token: (data.token || "").trim(),
            op: "Refunded", price: "—", amount: "—",
            zec: data.refund?.refunded?.zecRefunded?.toFixed(4) || "—",
            pnl: null, profit: false, shielded: true, status: "REFUNDED",
          });
          notifyTradeListeners();
        }

        if (type === "PROFITS_RETURNED") {
          const existing = window._tradeHistory.log.find(t =>
            t.token === (data.token || "").trim() && t.status === "CLOSED"
          );
          if (existing) {
            existing.zecReturned = data.zecReturned;
            notifyTradeListeners();
          }
        }

      } catch (err) {}
    };
  } catch (err) {}
}

export default function useTradeHistory() {
  const [trades, setTrades] = useState([...window._tradeHistory.log]);

  useEffect(() => {
    // Register listener
    tradeListeners.add(setTrades);
    setTrades([...window._tradeHistory.log]);

    // Fetch existing open positions from agent on mount
    fetch("http://localhost:5001/positions")
      .then(r => r.json())
      .then(data => {
        if (!data.success) return;
        const allPositions = [...(data.positions || []), ...(data.snipes || [])];
        let added = false;
        allPositions.forEach(p => {
          const token = (p.token || "").trim();
          const exists = window._tradeHistory.log.find(t =>
            t.token === token && t.status === "OPEN"
          );
          if (!exists && token) {
            const now     = new Date(p.openedAt || Date.now());
            const dateStr = now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
            const timeStr = now.toTimeString().slice(0, 8);
            const ep      = p.entryPrice || 0;
            window._tradeHistory.log.push({
              id:         `existing_${Date.now()}_${Math.random()}`,
              date:       dateStr,
              ts:         timeStr,
              chain:      p.chain,
              token,
              op:         "Bought",
              price:      ep < 0.01 ? ep.toFixed(6) : ep.toFixed(4),
              entryPrice: ep,
              exitPrice:  null,
              amount:     parseFloat(p.tokensHeld || 0).toFixed(4),
              zec:        "2.0000",
              pnl:        null,
              profit:     false,
              shielded:   true,
              status:     "OPEN",
            });
            added = true;
          }
        });
        if (added) setTrades([...window._tradeHistory.log]);
      })
      .catch(() => {});

    return () => tradeListeners.delete(setTrades);
  }, []);

  return trades;
}