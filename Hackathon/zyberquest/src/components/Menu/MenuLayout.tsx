import type { ReactNode } from "react";

export default function MenuLayout({ children }: { children: ReactNode }) {
  return (
    <main
      id="menu-root"
      role="navigation"
      aria-label="Main menu"
      className="relative min-h-dvh overflow-hidden bg-black text-white"
    >
      {/* ---- Fondo decorativo (fuera del árbol accesible) ---- */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* Capa 1: brillo radial con tokens */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(0,229,255,0.15), transparent 35%), radial-gradient(circle at 100% 0%, rgba(255,61,190,0.15), transparent 40%)",
          }}
        />
        {/* Capa 2: retícula sutil (apagable con reduce-motion) */}
        <div
          className="absolute inset-0 opacity-[0.06] motion-reduce:opacity-0"
          style={{
            backgroundImage:
              "linear-gradient(transparent 0px, rgba(255,255,255,0.08) 1px), linear-gradient(90deg, transparent 0px, rgba(255,255,255,0.08) 1px)",
            backgroundSize: "24px 24px, 24px 24px",
            maskImage:
              "radial-gradient(ellipse at center, black 60%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 60%, transparent 100%)",
          }}
        />
        {/* Capa 3: scanline CRT (apagable con reduce-motion) */}
        <div
          className="absolute inset-0 opacity-[0.05] mix-blend-screen motion-reduce:opacity-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(255,255,255,0.12) 0, rgba(255,255,255,0.12) 1px, transparent 1px, transparent 3px)",
          }}
        />
      </div>

      {/* ---- Contenido ---- */}
      <div className="relative mx-auto w-full max-w-6xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1
            id="menu-title"
            className="font-['VT323','IBM_Plex_Mono',monospace] text-4xl leading-tight tracking-tight md:text-5xl"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #00FF9C, #00E5FF 40%, #FF3DBE)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              textShadow: "0 0 12px rgba(0,229,255,0.15)",
            }}
          >
            Choose your mission
          </h1>
          <p
            id="menu-subtitle"
            className="mt-2 max-w-prose font-inter text-sm text-neutral-300 md:text-base"
          >
            Three ways to master privacy and encryption.
          </p>
        </header>

        {/* Grid de modos (inyectado como children) */}
        <section aria-labelledby="menu-title">{children}</section>

        {/* Tips accesibles (puedes moverlos a otra parte si prefieres) */}
        <p className="mt-6 text-xs text-neutral-400">
          Use <span className="font-mono">Tab/Shift+Tab</span> to navigate •{" "}
          <span className="font-mono">Enter</span> to select •{" "}
          <span className="font-mono">Esc</span> to return
        </p>
      </div>
    </main>
  );
}
