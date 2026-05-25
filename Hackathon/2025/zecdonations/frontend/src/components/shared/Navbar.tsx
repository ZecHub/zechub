"use client";
import Link from "next/link";
import dynamic from "next/dynamic";

const DiscordLogin = dynamic(() => import("./DiscordLogin"), { ssr: false });
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className={`sticky top-0 z-50 transition-colors ${scrolled ? "backdrop-blur supports-[backdrop-filter]:bg-background/40 border-b border-border" : "bg-transparent border-transparent"}`}>
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-display font-bold text-lg">ZECdonate</Link>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/campaigns">Browse</Link>
          <Link href="/dashboard">Dashboard</Link>
          <DiscordLogin />
        </div>
      </div>
    </nav>
  );
}


