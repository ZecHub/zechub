"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { LinkWalletModal } from "./LinkWalletModal";
import { LoginModal } from "./LoginModal";
import { LogIn } from "lucide-react";

interface HeaderProps {
  onSearchChange?: (val: string) => void;
  searchValue?: string;
  showSearch?: boolean;
}

export function Header({
  onSearchChange,
  searchValue = "",
  showSearch = true,
}: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLinkWalletOpen, setIsLinkWalletOpen] = useState(false);

  const isExplore = pathname === "/explore";
  const isDashboard = pathname === "/dashboard";

  // Automatically trigger LinkWallet modal if user is logged in but has no wallet address linked
  useEffect(() => {
    if (user && !user.walletAddress) {
      setIsLinkWalletOpen(true);
    }
  }, [user?.walletAddress]);

  return (
    <header className="bg-surface border-b border-outline-variant shadow-sm w-full sticky top-0 z-20">
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto h-16">
        {/* Left: Search input on desktop, Brand name on mobile */}
        <div className="flex items-center gap-stack-lg">
          <Link
            href="/explore"
            className="font-display text-headline-md font-bold text-on-surface md:hidden"
          >
            ZcashBounties
          </Link>
          
            {user && (
              <div className="hidden md:flex gap-6 items-center">
                {showSearch ? (
                  <div className="relative text-on-surface-variant">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-sm">
                      search
                    </span>
                    <input
                      type="text"
                      placeholder="Search bounties..."
                      value={searchValue}
                      onChange={(e) => onSearchChange?.(e.target.value)}
                      className="bg-surface-container-lowest border border-outline-variant rounded-full py-1.5 pl-10 pr-4 text-sm focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 transition-all w-64 outline-none"
                    />
                  </div>
                ) : (
                  <div className="w-64"></div>
                )}

                <nav className="flex gap-6 h-full items-center">
                  <Link
                    href="/explore"
                    className={cn(
                      "font-label-md text-label-md transition-all py-1.5 px-2 rounded",
                      isExplore
                        ? "text-primary font-bold border-b-2 border-primary rounded-none"
                        : "text-on-surface-variant hover:text-primary hover:bg-surface-container-low"
                    )}
                  >
                    Explore
                  </Link>
                  {user.role === 'Freelancer' && (
                    <Link
                      href="/dashboard"
                      className={cn(
                        "font-label-md text-label-md transition-all py-1.5 px-2 rounded",
                        isDashboard
                          ? "text-primary font-bold border-b-2 border-primary rounded-none"
                          : "text-on-surface-variant hover:text-primary hover:bg-surface-container-low"
                      )}
                    >
                      My Claims
                    </Link>
                  )}
                  <Link
                    href="#"
                    className="text-on-surface-variant hover:text-primary font-label-md text-label-md hover:bg-surface-container-low transition-colors px-2 py-1.5 rounded"
                  >
                    Rankings
                  </Link>
                </nav>
              </div>
            )}
        </div>

        {/* Right: Action triggers */}
        <div className="flex items-center gap-stack-md">
          {user ? (
            <>
              {user.role === "Creator" && (
                <Link
                  href="/create"
                  className="hidden sm:block px-4 py-2 bg-primary-container text-on-primary-container font-label-md text-label-md font-bold rounded-lg hover:bg-inverse-primary transition-colors text-center"
                >
                  Post Bounty
                </Link>
              )}
              <button
                onClick={() => setIsLinkWalletOpen(true)}
                className="text-on-surface-variant hover:text-primary transition-colors w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-low"
                title={user.walletAddress ? `Linked: ${user.walletAddress}` : "No Zcash Address Linked"}
              >
                <span className={cn("material-symbols-outlined", user.walletAddress ? "text-primary font-bold" : "text-error")}>
                  account_balance_wallet
                </span>
              </button>
              <button className="text-on-surface-variant hover:text-primary transition-colors w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-low relative">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
              </button>
              <img
                alt="User profile"
                onClick={() => {
                  if (user.role === 'Creator') router.push("/sponsor");
                  else if (user.role === 'Admin') router.push("/admin");
                  else router.push("/dashboard");
                }}
                className="w-8 h-8 rounded-full border border-outline-variant object-cover cursor-pointer hover:opacity-85 transition-opacity"
                src={user.avatar || "https://lh3.googleusercontent.com/aida-public/AB6AXuDw39ScrxNa3ZgzehfSnq_YoRqJofZus71SLW3Bb7uZtGBzNwV55CayP5mje1Trt7rMVRtD5X-a74dAPHwUlq3MqhfX7flwAvqOgzv3ovfQJh_UZWcxifC0HJEMI5w9ijaNf9_U_9MlKEHHY85-PRy3DXq2P5WARiDSltoNf1_7QsxWWcaIevld4uD7XoV1Zhm581DkNtbo-FrRbPxihGvZVVlg-nUvq9FcP1tOkfAYu7gueTu3PRLBVBROwBxxllhyJ6i_0BhBGw"}
              />
            </>
          ) : (
            <button
              onClick={() => setShowLoginModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-label-md text-label-md font-bold rounded-lg hover:bg-primary/95 transition-colors uppercase card-shadow active:scale-[0.98]"
            >
              <LogIn className="w-4 h-4" />
              Sign In
            </button>
          )}
        </div>
      </div>

      {/* Google Login Simulation Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />

      {/* Link Wallet Modal */}
      <LinkWalletModal
        isOpen={isLinkWalletOpen}
        onClose={() => setIsLinkWalletOpen(false)}
      />
    </header>
  );
}
