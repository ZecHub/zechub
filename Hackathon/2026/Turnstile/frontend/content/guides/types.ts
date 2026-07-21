import type { WalletSlug } from "@/lib/constants";

export interface GuideStep {
  title: string;
  body: string;
  command?: string;
}

export interface Guide {
  slug: WalletSlug;
  name: string;
  kind: "mobile" | "desktop" | "cli" | "custodial";
  summary: string;
  canExportUfvk: boolean;
  ufvkNote: string;
  steps: GuideStep[];
  source: { label: string; url: string };
}
