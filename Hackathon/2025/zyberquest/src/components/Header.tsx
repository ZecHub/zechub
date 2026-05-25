// src/components/Header.tsx
"use client";
import Link from "next/link";

export function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-zx-green/25 bg-zx-ink/75 backdrop-blur-md">
      <div className="container-zx h-14 flex items-center justify-between">
        <Link href="/" className="font-mono text-sm tracking-widest text-zx-green hover:text-zx-cyan transition-colors">
          ZYBERQUEST
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-4 text-sm">
          <a href="#modes" className="text-zinc-300 hover:text-white">Modes</a>
          <a href="#how" className="text-zinc-300 hover:text-white">How it works</a>
          <a href="#features" className="text-zinc-300 hover:text-white">Features</a>
          <a href="#team" className="text-zinc-300 hover:text-white">Team</a>
          <Link
            href="/start"
            className="text-zx-ink bg-zx-green px-3 py-1.5 rounded glow hover:bg-zx-cyan transition-colors"
          >
            Play
          </Link>
        </nav>
      </div>
    </header>
  );
}
