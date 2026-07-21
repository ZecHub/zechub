"use client";

import { Button } from "@/components/ui/Button";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-canvas px-6 text-center">
      <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-faint">
        Something failed
      </p>
      <h1 className="mb-4 text-3xl font-medium tracking-tighter text-foreground md:text-5xl">
        That did not work — and nothing was stored
      </h1>
      <p className="mb-10 max-w-md text-sm leading-relaxed text-muted">
        Whatever went wrong stayed on this page. If you pasted a viewing key, it lived in memory
        only and is already gone.
      </p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
