// components/Start/ModePanel.tsx
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

type ModeKey = "demo" | "tournament" | null;

const DEMO_DEST = "/intro";      // cambia a "/menu" si prefieres
const TOURNAMENT_DEST = "/tournament";

type ModeDef = {
  key: Exclude<ModeKey, null>;
  title: string;
  desc: string;
  href: string;
  borderClass: string;       // tailwind para el borde base
  titleClass: string;        // color del título
  gradient: string;          // fondo sólido con degradado
  glow: string;              // color del glow WOW estático
};

const MODES: ModeDef[] = [
  {
    key: "demo",
    title: "Demo Mode (Free)",
    desc: "Jump right in. No payment required. Explore all game modes off-chain.",
    href: DEMO_DEST,
    borderClass: "border-emerald-400",
    titleClass: "text-emerald-300",
    // negro → verde (sólido, sin transparencia)
    gradient:
      "linear-gradient(135deg, #0A0D0A 15%, #0A0D0A 35%, #062018 60%, #063525 100%)",
    glow: "#00FF9C",
  },
  {
    key: "tournament",
    title: "Tournament Mode",
    desc: "Compete for rewards. On-chain interactions, insert coin flow, and ranked runs.",
    href: TOURNAMENT_DEST,
    borderClass: "border-yellow-400",
    titleClass: "text-yellow-300",
    // negro → amarillo (sólido, sin transparencia)
    gradient:
      "linear-gradient(135deg, #0A0D0A 15%, #0A0D0A 35%, #241D05 60%, #3A2B06 100%)",
    glow: "#F4B728",
  },
];

export default function ModePanel() {
  const router = useRouter();
  const [selected, setSelected] = React.useState<ModeKey>(null);
  const [leaving, setLeaving] = React.useState(false);

  const handleGo = () => {
    if (!selected || leaving) return;
    const href = MODES.find((m) => m.key === selected)!.href;
    setLeaving(true);
    setTimeout(() => router.push(href), 180); // salida sutil si tienes anim en el contenedor
  };

  return (
    <section
      aria-labelledby="choose-mode-title"
      aria-describedby="choose-mode-sub"
      className="space-y-6 md:space-y-8"
      role="region"
    >
      <header>
        <h1
          id="choose-mode-title"
          className="font-mono text-3xl md:text-4xl lg:text-5xl tracking-tight text-[var(--zx-green)]"
        >
          Choose Your Mode
        </h1>
        <p id="choose-mode-sub" className="mt-2 text-sm md:text-base text-zinc-300">
          Two paths. One mission. Play, learn, and hack.
        </p>
      </header>

      {/* Lista de opciones (sin atajos personalizados) */}
      <div role="list" className="grid gap-4">
        {MODES.map((mode) => {
          const isSelected = selected === mode.key;
          return (
            <div key={mode.key} role="listitem" className="relative">
              {/* Anillo WOW ESTÁTICO (neón) sólo cuando está seleccionada */}
              {isSelected && (
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-[3px] rounded-xl"
                  style={{
                    background: `conic-gradient(
                      from 0turn,
                      ${mode.glow} 0%,
                      transparent 22%,
                      ${mode.glow} 44%,
                      transparent 66%,
                      ${mode.glow} 88%,
                      transparent 100%
                    )`,
                    filter: "blur(6px) saturate(140%)",
                  }}
                />
              )}

              <Card
                onClick={() => setSelected(mode.key)}
                tabIndex={0}
                className={clsx(
                  "cursor-pointer relative overflow-hidden",
                  "border-2 bg-black",      // base sólida
                  mode.borderClass,         // borde por color
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--zx-green)]"
                )}
                style={{
                  backgroundImage: mode.gradient, // degradado negro→color
                  boxShadow: isSelected
                    ? `0 0 32px 4px ${mode.glow}33`
                    : `0 0 18px 0 ${mode.glow}22`,
                }}
              >
                {/* sutil grain para textura (ayuda a leer sobre el CodeRain) */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay"
                  style={{
                    backgroundImage:
                      "radial-gradient(#ffffff 1px, transparent 1px), radial-gradient(#ffffff 1px, transparent 1px)",
                    backgroundPosition: "0 0, 8px 8px",
                    backgroundSize: "16px 16px",
                  }}
                />

                <CardHeader>
                  <CardTitle className={clsx("text-base md:text-lg", mode.titleClass)}>
                    {mode.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-zinc-200/90">{mode.desc}</p>
                </CardContent>

                {/* Borde iluminado SOLO cuando está seleccionada (estático) */}
                <div
                  aria-hidden
                  className={clsx(
                    "pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-150",
                    isSelected ? "opacity-100" : "opacity-0"
                  )}
                  style={{
                    outline: `2px solid ${mode.glow}`,
                    outlineOffset: "-2px",
                    filter: `drop-shadow(0 0 10px ${mode.glow}) drop-shadow(0 0 22px ${mode.glow})`,
                  }}
                />
              </Card>
            </div>
          );
        })}
      </div>

      {/* GO global */}
      <div className="pt-2">
        <Button
          type="button"
          variant="default"
          className={clsx(
            "w-full md:w-auto px-5 py-2 text-sm font-medium",
            "border focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-[var(--zx-green)]",
            "text-[var(--zx-green)] border-[var(--zx-green)]/60 bg-transparent",
            selected
              ? "hover:bg-[var(--zx-yellow)] hover:text-black hover:border-[var(--zx-yellow)]"
              : "opacity-60 cursor-not-allowed"
          )}
          onClick={handleGo}
          disabled={!selected || leaving}
          aria-disabled={!selected || leaving}
        >
          GO
        </Button>
      </div>
    </section>
  );
}
