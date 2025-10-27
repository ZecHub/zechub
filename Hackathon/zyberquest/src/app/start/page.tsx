// app/start/page.tsx
import type { Metadata } from "next";
import ModeLayout from "@/components/Start/ModeLayout";
import CyberpunkHero from "@/components/Start/CyberpunkHero";
import ModePanel from "@/components/Start/ModePanel";

export const metadata: Metadata = {
  title: "ZyberQuest — Choose Your Mode",
  description: "Two paths. One mission. Play, learn, and hack.",
};

export default function StartPage() {
  return (
    <ModeLayout>
      {/* Left column: explanatory panel */}
      <section aria-labelledby="choose-mode-title" className="order-2 md:order-1">
        <ModePanel />
      </section>

      {/* Right column: hero with capsules */}
      <aside className="order-1 md:order-2">
        <CyberpunkHero />
      </aside>
    </ModeLayout>
  );
}
