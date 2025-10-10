import IntroHero from "@/components/tournament/IntroHero";
import type { Viewport, Metadata } from "next";

export const metadata: Metadata = {
  title: "ZyberQuest Tournament — Intro",
  description: "Epic intro screen for ZyberQuest Tournament",
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function TournamentIntroPage() {
  return (
    <main className="min-h-dvh relative bg-black text-white">
      <IntroHero />
    </main>
  );
}
