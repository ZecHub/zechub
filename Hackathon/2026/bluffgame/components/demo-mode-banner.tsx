"use client";

import { Circle, Video, VideoOff } from "lucide-react";
import { useDemoMode } from "@/hooks/use-demo-mode";

/**
 * Purely cosmetic "Demo Recording Mode" indicator, driven by a localStorage
 * flag (see useDemoMode). Toggling it never touches game state — it only
 * shows/hides a top banner, useful when screen-recording a run-through.
 */
export default function DemoModeBanner() {
  const { enabled, toggleDemoMode } = useDemoMode();

  return (
    <>
      {enabled && (
        <div className="fixed top-0 left-0 right-0 z-[999] flex items-center justify-center gap-2 bg-accent-red/15 border-b border-accent-red/40 py-1.5 text-accent-red">
          <Circle className="w-2.5 h-2.5 fill-accent-red animate-pulse" />
          <span className="font-mono text-[11px] uppercase tracking-[0.15em]">
            Demo Recording Mode
          </span>
        </div>
      )}

      <button
        onClick={toggleDemoMode}
        title={enabled ? "Turn off demo recording mode" : "Turn on demo recording mode"}
        className={`fixed bottom-3 right-3 z-[999] flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wider transition active:scale-95 ${
          enabled
            ? "bg-accent-red/10 border-accent-red/40 text-accent-red hover:bg-accent-red/20"
            : "bg-game-elevated/80 border-card-border text-text-muted hover:text-text-primary"
        }`}
      >
        {enabled ? <Video className="w-3 h-3" /> : <VideoOff className="w-3 h-3" />}
        Demo
      </button>
    </>
  );
}
