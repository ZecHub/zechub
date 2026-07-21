import Link from "next/link";

import { Github01Icon, Icon } from "@/components/icons/Icon";
import { IRONWOOD_ACTIVATION_HEIGHT } from "@/lib/constants";
import { ZCASH_UPGRADE_URL, ZECHUB_WIKI_URL } from "@/lib/constants";
import { formatHeight } from "@/lib/format";

const PRODUCT_LINKS = [
  { href: "/check", label: "Check my wallet" },
  { href: "/guides", label: "Migration guides" },
  { href: "/pools", label: "Shielded pools" },
  { href: "/alerts", label: "Activation alerts" },
  { href: "/readiness", label: "Ecosystem readiness" },
];

const RESOURCE_LINKS = [
  { href: ZECHUB_WIKI_URL, label: "ZecHub wiki" },
  { href: ZCASH_UPGRADE_URL, label: "Zcash network upgrades" },
  { href: "https://github.com/Enoch208/turnstile", label: "Source code" },
];

export function Footer() {
  return (
    <footer className="relative z-10 mt-24 w-full border-t border-border pt-16">
      <div className="mb-16 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="flex flex-col gap-6">
          <h2 className="text-6xl font-medium leading-none tracking-tighter text-border-strong md:text-7xl lg:text-8xl">
            Turnstile
          </h2>
          <p className="text-xl font-light italic text-faint md:text-2xl">
            The Ironwood migration companion—
          </p>
        </div>

        <div className="flex flex-col gap-4 lg:items-end lg:text-right">
          <p className="text-base font-light leading-snug tracking-tight text-muted md:text-2xl">
            Orchard stops taking deposits at block {formatHeight(IRONWOOD_ACTIVATION_HEIGHT)}.
            Turnstile never sees a spending key, and stores nothing.
          </p>
          <p className="font-mono text-4xl font-medium tracking-tighter text-foreground md:text-5xl">
            {formatHeight(IRONWOOD_ACTIVATION_HEIGHT)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 border-t border-border pt-10 md:grid-cols-3">
        <div className="flex flex-col gap-4">
          {PRODUCT_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="cursor-pointer text-base text-muted transition-colors duration-200 hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          {RESOURCE_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="cursor-pointer text-base text-muted transition-colors duration-200 hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-4 md:items-end">
          <a
            href="https://github.com/Enoch208/turnstile"
            target="_blank"
            rel="noreferrer"
            className="flex w-fit cursor-pointer items-center gap-2 rounded-full border border-border bg-white/[0.03] px-4 py-2 text-sm text-muted transition-all duration-200 hover:border-border-strong hover:text-foreground"
          >
            <Icon icon={Github01Icon} size={16} />
            Open source, MIT
          </a>
          <p className="max-w-xs text-xs leading-relaxed text-faint md:text-right">
            An educational tool, not financial advice. Verify against official Zcash sources.
          </p>
        </div>
      </div>
    </footer>
  );
}
