'use client';

import { useEffect, useRef } from "react";
import { createPhaserGameWithMode, destroyPhaserGame } from "@/game/labyrinth";
import type Phaser from "phaser";

export default function LaberintosPlayPage() {
  const mountRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    gameRef.current = createPhaserGameWithMode();
    return () => {
      destroyPhaserGame(gameRef.current || undefined);
      gameRef.current = null;
    };
  }, []);

  return (
    <main className="min-h-screen zx-scanline flex items-center justify-center">
      <div
        ref={mountRef}
        id="phaser-mount"
        className="w-[960px] h-[540px] border border-zinc-800 rounded-lg"
        aria-label="Zona de juego Phaser"
      />
    </main>
  );
}
