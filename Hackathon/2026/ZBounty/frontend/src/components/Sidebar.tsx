"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn, formatZec } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

export function Sidebar() {
  const pathname = usePathname();
  const { user, balance, balanceLoading, logout } = useAuth();

  if (!user) return null;

  const navItems = [];

  if (user.role === 'Creator') {
    navItems.push(
      {
        name: "Open Bounties",
        href: "/explore",
        icon: "work",
        active: pathname === "/explore" || pathname.startsWith("/bounty"),
      },
      {
        name: "Sponsor Portal",
        href: "/sponsor",
        icon: "shield",
        active: pathname === "/sponsor",
      }
    );
  } else if (user.role === 'Admin') {
    navItems.push(
      {
        name: "Admin Portal",
        href: "/admin",
        icon: "shield",
        active: pathname === "/admin",
      }
    );
  } else {
    // Freelancer/Default
    navItems.push(
      {
        name: "Dashboard",
        href: "/dashboard",
        icon: "dashboard",
        active: pathname === "/dashboard",
      },
      {
        name: "Open Bounties",
        href: "/explore",
        icon: "work",
        active: pathname === "/explore" || pathname.startsWith("/bounty"),
      },
      {
        name: "In Progress",
        href: "/in-progress",
        icon: "pending_actions",
        active: pathname === "/in-progress",
      },
      {
        name: "Completed",
        href: "/completed",
        icon: "task_alt",
        active: pathname === "/completed",
      }
    );
  }

  // Settings is common to everyone
  navItems.push({
    name: "Settings",
    href: "/settings",
    icon: "settings",
    active: pathname === "/settings",
  });

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="bg-surface-container-lowest border-r border-outline-variant shadow-md h-screen w-64 fixed left-0 top-0 flex flex-col p-stack-md gap-stack-sm z-30 hidden md:flex">
        <div className="mb-stack-md px-2 flex flex-col items-center text-center">
          <img
            alt="Freelancer Avatar"
            className="w-16 h-16 rounded-full object-cover mb-stack-sm shadow-sm border border-outline-variant"
            src={user?.avatar || "https://lh3.googleusercontent.com/aida-public/AB6AXuDw39ScrxNa3ZgzehfSnq_YoRqJofZus71SLW3Bb7uZtGBzNwV55CayP5mje1Trt7rMVRtD5X-a74dAPHwUlq3MqhfX7flwAvqOgzv3ovfQJh_UZWcxifC0HJEMI5w9ijaNf9_U_9MlKEHHY85-PRy3DXq2P5WARiDSltoNf1_7QsxWWcaIevld4uD7XoV1Zhm581DkNtbo-FrRbPxihGvZVVlg-nUvq9FcP1tOkfAYu7gueTu3PRLBVBROwBxxllhyJ6i_0BhBGw"}
          />
          <h2 className="font-headline-md text-primary font-bold text-lg leading-tight">
            {user?.username || "Guest Portal"}
          </h2>

          {/* Live ZEC Balance */}
          <div className="mt-2 flex items-center gap-2 group relative">
            {user?.walletAddress ? (
              <>
                {/* Pulsing live dot */}
                <span className="w-2 h-2 rounded-full bg-[#16A34A] balance-live-indicator flex-shrink-0" />
                <p className="font-label-md text-label-md text-on-surface-variant">
                  {balanceLoading ? (
                    <span className="inline-flex items-center gap-1">
                      <span className="animate-pulse">···</span> ZEC
                    </span>
                  ) : (
                    <span>{formatZec(balance)} ZEC</span>
                  )}
                </p>
                {/* Tooltip */}
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-3 py-1.5 bg-inverse-surface text-inverse-on-surface text-[10px] rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-lg">
                  Confirmed balance only · Polling every 15s
                </div>
              </>
            ) : (
              <Link
                href="/settings"
                className="font-label-sm text-label-sm text-error hover:text-error/80 transition-colors underline underline-offset-2"
              >
                Link wallet →
              </Link>
            )}
          </div>
        </div>

        <nav className="flex-1 flex flex-col gap-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all font-label-md text-label-md",
                item.active
                  ? "bg-primary-container text-on-primary-container font-bold translate-x-1"
                  : "text-on-surface-variant hover:bg-surface-container-high hover:bg-surface-container-highest transition-colors"
              )}
            >
              <span
                className="material-symbols-outlined"
                style={{
                  fontVariationSettings: item.active ? "'FILL' 1" : undefined,
                }}
              >
                {item.icon}
              </span>
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-1 pt-stack-sm border-t border-outline-variant">
          <button className="w-full py-2.5 bg-primary-container text-on-primary-container font-label-md text-label-md font-bold rounded-lg hover:bg-inverse-primary transition-colors mb-stack-sm flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[18px]">
              account_balance_wallet
            </span>
            Withdraw ZEC
          </button>
          <a
            className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-container-high rounded-lg font-label-md text-label-md transition-colors"
            href="#"
          >
            <span className="material-symbols-outlined text-sm">help</span>
            <span>Help Center</span>
          </a>
          <button
            onClick={logout}
            className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-container-high rounded-lg font-label-md text-label-md transition-colors w-full text-left"
          >
            <span className="material-symbols-outlined text-sm">logout</span>
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-surface-container-lowest border-t border-outline-variant shadow-[0_-4px_12px_rgba(24,24,27,0.04)] z-30 flex justify-around items-center h-16 px-4">
        {navItems.slice(0, 4).map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-1 transition-colors",
              item.active
                ? "text-primary font-bold"
                : "text-on-surface-variant hover:text-primary"
            )}
          >
            <span
              className="material-symbols-outlined"
              style={{
                fontVariationSettings: item.active ? "'FILL' 1" : undefined,
              }}
            >
              {item.icon}
            </span>
          </Link>
        ))}
      </nav>

      {/* Pad bottom for mobile nav */}
      <div className="h-20 md:hidden w-full"></div>
    </>
  );
}
