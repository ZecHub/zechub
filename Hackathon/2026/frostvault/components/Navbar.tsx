"use client";

import Link from "next/link";
import { useState } from "react";
import { Video, VideoOff } from "lucide-react";
import { ThresholdDial } from "@/components/ThresholdDial";
import { HowFrostWorksModal } from "@/components/HowFrostWorksModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocalIdentity } from "@/lib/useLocalIdentity";
import { useDemoMode } from "@/lib/useDemoMode";
import { isZcashName } from "@/lib/zcashnames";

export function Navbar() {
  const { name, setName, hydrated } = useLocalIdentity();
  const { enabled: demoMode, setEnabled: setDemoMode, hydrated: demoHydrated } = useDemoMode();
  const [draft, setDraft] = useState("");

  function claim() {
    const value = draft.trim().toLowerCase();
    const normalized = value.endsWith(".zcash") ? value : `${value}.zcash`;
    if (!isZcashName(normalized)) return;
    setName(normalized);
  }

  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <ThresholdDial total={3} filled={2} size={28} />
          <span className="font-heading text-lg font-semibold tracking-tight">FrostVault</span>
        </Link>

        <div className="flex flex-wrap items-center gap-3">
          <HowFrostWorksModal />

          {demoHydrated && (
            <Button
              variant={demoMode ? "default" : "ghost"}
              size="sm"
              className="h-8"
              onClick={() => setDemoMode(!demoMode)}
            >
              {demoMode ? <VideoOff className="h-3.5 w-3.5" /> : <Video className="h-3.5 w-3.5" />}
              {demoMode ? "Exit Demo Mode" : "Start Demo Recording"}
            </Button>
          )}

          {hydrated && (
            <div className="flex items-center gap-3">
              {name ? (
                <span className="data-well text-xs text-muted-foreground">{name}</span>
              ) : (
                <div className="flex items-center gap-2">
                  <Input
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder="yourname"
                    className="h-8 w-32 text-sm"
                    onKeyDown={(e) => e.key === "Enter" && claim()}
                  />
                  <Button size="sm" variant="secondary" onClick={claim} className="h-8">
                    Continue as .zcash
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
