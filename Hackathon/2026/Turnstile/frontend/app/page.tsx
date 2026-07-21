import { AlertBand } from "@/components/landing/AlertBand";
import { CountdownSection } from "@/components/landing/CountdownSection";
import { FinalCta } from "@/components/landing/FinalCta";
import { GuidesStrip } from "@/components/landing/GuidesStrip";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { LiveGrid, type LiveGridData } from "@/components/landing/LiveGrid";
import { PrivacySplit } from "@/components/landing/PrivacySplit";
import { AppFrame } from "@/components/layout/AppFrame";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import type { PoolTotals } from "@/components/landing/HeroVisual";
import readiness from "@/content/readiness.json";
import { loadPools } from "@/lib/pools";

export const revalidate = 600;

export default async function Home() {
  let pools: PoolTotals | null = null;
  let orchardSpark: number[] | null = null;

  try {
    const data = await loadPools();
    pools = {
      orchard: data.current.orchard,
      sapling: data.current.sapling,
      sprout: data.current.sprout,
    };
    orchardSpark = data.series.orchard.slice(-26).map(p => p[1]);
  } catch {}

  const wallets = readiness.entries.filter(e => e.kind !== "service");
  const grid: LiveGridData = {
    orchard: pools?.orchard ?? null,
    orchardSpark,
    readiness: {
      declaredReady: wallets.filter(e => e.status === "ready").length,
      unknown: wallets.filter(e => e.status === "unknown").length,
      total: wallets.length,
    },
  };

  return (
    <AppFrame>
      <Header />
      <Hero pools={pools} />
      <CountdownSection />
      <LiveGrid data={grid} />
      <HowItWorks />
      <PrivacySplit />
      <GuidesStrip />
      <AlertBand />
      <FinalCta />
      <Footer />
    </AppFrame>
  );
}
