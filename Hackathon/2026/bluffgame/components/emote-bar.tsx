"use client";

import { useState, useRef } from "react";
import type { Socket } from "socket.io-client";

const EMOTES = ["😂", "🤔", "😤", "👀"];
const RATE_LIMIT_MS = 3000;

interface EmoteBarProps {
  socket: Socket;
  gameId: string;
}

export default function EmoteBar({ socket, gameId }: EmoteBarProps) {
  const [open, setOpen] = useState(false);
  const lastEmoteAt = useRef(0);

  const sendEmote = (emoji: string) => {
    const now = Date.now();
    if (now - lastEmoteAt.current < RATE_LIMIT_MS) return;
    lastEmoteAt.current = now;
    socket.emit("send-emote", { gameId, emoji });
    setOpen(false);
  };

  return (
    <div className="relative ">
      {/* Emote picker (pops up) */}
      {open && (
        <div className="absolute bottom-full mb-2 right-0 flex gap-2 bg-black/70 backdrop-blur-md border border-white/10 rounded-2xl px-3 py-2 shadow-xl">
          {EMOTES.map((emoji) => (
            <button
              key={emoji}
              onClick={() => sendEmote(emoji)}
              className="text-2xl hover:scale-125 active:scale-95 transition-transform"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-10 h-10 rounded-full bg-black/50 border border-white/10 text-xl hover:bg-white/10 active:scale-95 transition shadow-lg"
        title="Send emote"
      >
        😊
      </button>
    </div>
  );
}
