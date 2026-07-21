"use client";

import { useEffect, useState } from "react";
import type { Socket } from "socket.io-client";
import { RefreshCw } from "lucide-react";

interface ReconnectingOverlayProps {
  socket: Socket;
  gameId: string;
  playerCode: string | null;
}

export default function ReconnectingOverlay({
  socket,
  gameId,
  playerCode,
}: ReconnectingOverlayProps) {
  const [disconnected, setDisconnected] = useState(false);

  useEffect(() => {
    const onDisconnect = () => setDisconnected(true);

    const onConnect = () => {
      setDisconnected(false);
      if (playerCode) {
        // Re-identify ourselves to the server
        socket.emit("reconnect-player", { gameId, playerCode });
      }
    };

    socket.on("disconnect", onDisconnect);
    socket.on("connect", onConnect);

    return () => {
      socket.off("disconnect", onDisconnect);
      socket.off("connect", onConnect);
    };
  }, [socket, gameId, playerCode]);

  if (!disconnected) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
      {/* Spinner */}
      <div className="w-14 h-14 border-4 border-white/10 border-t-accent-blue rounded-full animate-spin" />

      <div className="text-center space-y-1">
        <p className="font-mono text-text-primary text-xl font-bold">Connection lost</p>
        <p className="font-sans text-text-muted text-sm">Reconnecting…</p>
      </div>

      <button
        onClick={() => socket.connect()}
        className="mt-2 flex items-center gap-2 px-6 py-2.5 rounded-md font-mono text-xs uppercase tracking-[0.1em] font-bold bg-accent-blue text-white hover:brightness-110 active:scale-[0.97] transition"
      >
        <RefreshCw className="w-3.5 h-3.5" />
        Retry Now
      </button>
    </div>
  );
}
