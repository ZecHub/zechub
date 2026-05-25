"use client";
import Hero from "./Hero";
import CampaignMarquee from "./CampaignMarquee";
import HowItWorks from "./HowItWorks";
import FeaturedCampaigns from "./FeaturedCampaigns";
import CallToAction from "./CallToAction";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))] overflow-hidden">
      <Hero />
      <CampaignMarquee />
      <HowItWorks />
      <FeaturedCampaigns />
      <CallToAction />
    </main>
  );
}

