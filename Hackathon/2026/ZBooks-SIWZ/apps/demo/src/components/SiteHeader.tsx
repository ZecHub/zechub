"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

const LINKS: { href: string; label: string; payoutsOnly?: boolean }[] = [
  { href: "/keys", label: "Keys" },
  { href: "/transactions", label: "Transactions" },
  { href: "/payouts", label: "Payouts", payoutsOnly: true },
  { href: "/reports", label: "Reports" },
  { href: "/counterparties", label: "Contacts" },
  { href: "/audit", label: "Audit" },
  { href: "/team", label: "Team" },
  { href: "/settings/approvals", label: "Settings" },
];

export function SiteHeader({
  signedInAs,
  showPayouts,
}: {
  signedInAs?: string;
  showPayouts?: boolean;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  const links = LINKS.filter((l) => !l.payoutsOnly || showPayouts);

  return (
    <header className="border-b border-neutral-200 dark:border-neutral-800/80 bg-white/60 dark:bg-neutral-950/40 backdrop-blur sticky top-0 z-20">
      <div className="mx-auto max-w-5xl px-4 py-3.5 flex items-center justify-between gap-4">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2.5 font-semibold tracking-tight shrink-0"
        >
          <LogoMark className="h-7 w-7" />
          <span>ZBooks</span>
          <span className="text-xs font-normal text-neutral-500 hidden lg:inline">
            accounting &amp; payroll for ZEC teams
          </span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          {signedInAs && (
            <nav className="hidden md:flex gap-0.5 lg:gap-1 text-sm">
              {links.map((l) => (
                <NavLink key={l.href} href={l.href} active={isActive(pathname, l.href)}>
                  {l.label}
                </NavLink>
              ))}
            </nav>
          )}

          <ThemeToggle />

          {signedInAs && (
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="md:hidden rounded-md p-2 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-colors"
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          )}
        </div>
      </div>

      {signedInAs && open && (
        <nav className="md:hidden border-t border-neutral-200 dark:border-neutral-800/80 bg-white dark:bg-neutral-950 px-4 py-2 flex flex-col">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`rounded-md px-3 py-2.5 text-sm transition-colors ${
                isActive(pathname, l.href)
                  ? "bg-neutral-100 dark:bg-neutral-800/60 text-neutral-900 dark:text-white font-medium"
                  : "text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/60"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(href + "/");
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active?: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`rounded-md px-3 py-1.5 transition-colors ${
        active
          ? "text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-800/60"
          : "text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800/60"
      }`}
    >
      {children}
    </Link>
  );
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="ZBooks"
      className={className}
    >
      <rect x="9" y="14" width="46" height="44" rx="11" fill="#c77f0e" />
      <rect x="9" y="8" width="46" height="44" rx="11" fill="#f4b728" />
      <path
        d="M20 20H44L20 40H44"
        stroke="#1a1a1a"
        strokeWidth="6.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
