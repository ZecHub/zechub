import { exchange } from "@/content/guides/exchange";
import type { Guide } from "@/content/guides/types";
import { ywallet } from "@/content/guides/ywallet";
import { zallet } from "@/content/guides/zallet";
import { zashi } from "@/content/guides/zashi";
import { zingo } from "@/content/guides/zingo";
import type { WalletSlug } from "@/lib/constants";

export const GUIDES: Record<WalletSlug, Guide> = {
  zashi,
  ywallet,
  zingo,
  zallet,
  exchange,
};

export const GUIDE_LIST: Guide[] = [zashi, ywallet, zingo, zallet, exchange];

export function getGuide(slug: string): Guide | undefined {
  return GUIDES[slug as WalletSlug];
}
