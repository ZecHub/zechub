// components/Start/ModeLayout.tsx
import { type ReactNode } from "react";
import clsx from "clsx";
import dynamic from "next/dynamic";

// Carga dinámica del canvas para evitar SSR issues
const CodeRainCanvas = dynamic(() => import("./CodeRainCanvas"), { ssr: false });

export default function ModeLayout({ children }: { children: ReactNode }) {
  return (
    <main
      className={clsx(
        "relative min-h-[100svh] w-full",
        "bg-[var(--zx-ink)] text-white",
        "isolate overflow-hidden"
      )}
    >
      {/* Capa CodeRain */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <CodeRainCanvas />
      </div>

      {/* Capa Scanline sutil */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.10] mix-blend-screen"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0, rgba(255,255,255,0.05) 1px, rgba(0,0,0,0) 3px)",
        }}
      />

      <div
        className={clsx(
          "mx-auto max-w-7xl px-4 py-10 md:py-16",
          "grid gap-10 md:grid-cols-2 md:gap-12 items-center"
        )}
      >
        {children}
      </div>

    </main>
  );
}
