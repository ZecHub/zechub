"use client";

import { Video } from "lucide-react";
import { useDemoMode } from "@/lib/useDemoMode";

export function DemoModeBanner() {
  const { enabled, hydrated } = useDemoMode();

  if (!hydrated || !enabled) return null;

  return (
    <div className="border-b border-signal/30 bg-signal/10 px-6 py-2">
      <div className="mx-auto flex max-w-6xl items-center gap-2 text-sm font-medium text-signal">
        <Video className="h-4 w-4" />
        Demo Recording Mode — larger type, higher-contrast UI for video capture
      </div>
    </div>
  );
}
