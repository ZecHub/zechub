import Image from "next/image";
import Link from "next/link";

import { ArrowRight02Icon, Icon } from "@/components/icons/Icon";

const NAV_LINKS = [
  { href: "/check", label: "Check" },
  { href: "/guides", label: "Guides" },
  { href: "/pools", label: "Pools" },
  { href: "/alerts", label: "Alerts" },
  { href: "/readiness", label: "Readiness" },
];

export function Header() {
  return (
    <header className="relative z-10 mb-12 flex flex-wrap items-center justify-between gap-x-4 gap-y-4 md:mb-16">
      <Link href="/" className="flex cursor-pointer items-center gap-2 text-foreground">
        <Image
          src="/logo.png"
          alt=""
          width={32}
          height={32}
          priority
          className="h-8 w-8 rounded-full"
        />
        <span className="text-lg font-medium tracking-tight">
          TURN<span className="text-faint">STILE</span>
        </span>
      </Link>

      <nav className="order-3 -mx-1 flex w-full items-center gap-6 overflow-x-auto rounded-full border border-border bg-surface/80 px-5 py-2.5 text-xs font-medium uppercase tracking-widest text-faint backdrop-blur-sm md:order-none md:w-auto md:gap-8 md:px-6 md:py-2">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="shrink-0 cursor-pointer transition-colors duration-200 hover:text-foreground"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <Link
        href="/check"
        className="group flex shrink-0 cursor-pointer items-center gap-2 rounded-lg border border-border bg-white/[0.03] px-4 py-2.5 text-[11px] font-medium uppercase tracking-tight text-muted transition-all duration-200 hover:border-border-strong hover:bg-white/[0.06] hover:text-foreground md:px-5"
      >
        <span className="hidden sm:inline">Check my wallet</span>
        <span className="sm:hidden">Check</span>
        <Icon
          icon={ArrowRight02Icon}
          size={14}
          className="transition-transform duration-200 group-hover:translate-x-1"
        />
      </Link>
    </header>
  );
}
