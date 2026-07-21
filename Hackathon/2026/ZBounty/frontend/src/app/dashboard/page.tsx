"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { cn, formatZec } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function DashboardPage() {
  const { user, balance, balanceLoading } = useAuth();
  const router = useRouter();
  const [bounties, setBounties] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      if (user.role === 'Creator') {
        router.replace('/sponsor');
      } else if (user.role === 'Admin') {
        router.replace('/admin');
      }
    }
  }, [user, router]);

  useEffect(() => {
    const fetchBounties = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/bounties`);
        if (response.ok) {
          const data = await response.json();
          setBounties(data);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBounties();
  }, []);

  const activeClaims = bounties
    .filter(
      (b: any) =>
        b.status.toLowerCase() === "in progress" &&
        (b.contributorId === user?._id || (b.contributorId && b.contributorId._id === user?._id))
    )
    .map((b: any) => ({
      id: b._id,
      bountyId: b._id.substring(18),
      title: b.title,
      description: b.description,
      status: b.status,
      rewardZec: b.reward,
      rewardUsd: b.reward * 40,
      progress: 40,
      timeLeft: "Due in 14 days",
    }));

  const pendingReviews = bounties
    .filter(
      (b: any) =>
        b.status.toLowerCase() === "in review" &&
        (b.contributorId === user?._id || (b.contributorId && b.contributorId._id === user?._id))
    )
    .map((b: any) => ({
      id: b._id,
      bountyId: b._id.substring(18),
      title: b.title,
      reviewer: "Admin Reviewer",
      rewardZec: b.reward,
      submittedText: "Submitted recently",
    }));

  return (
    <div className="bg-surface text-on-surface font-body-md antialiased min-h-screen flex">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col min-h-screen md:ml-64 w-full relative">
        {/* Top Header */}
        <Header showSearch={false} />

        {/* Main Content Area */}
        <main className="flex-1 p-margin-mobile md:p-margin-desktop max-w-container-max mx-auto w-full flex flex-col gap-stack-xl pt-6">
          
          {/* Welcome Banner */}
          <header className="flex justify-between items-end pb-stack-sm border-b border-outline-variant">
            <div>
              <h1 className="font-headline-lg-mobile md:font-headline-lg text-on-surface mb-1">
                Welcome back, {user?.username || "Alex"}.
              </h1>
              <p className="font-body-md text-on-surface-variant">
                Here is your current performance and active workload.
              </p>
            </div>
          </header>

          {/* Stats Bento Grid Row */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            
            {/* Total Earned / Live Balance Card */}
            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-stack-lg card-shadow card-hover transition-all duration-300 relative overflow-hidden group">
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary-container rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500 ease-out"></div>
              <div className="flex items-center gap-3 mb-stack-sm relative z-10">
                <span className="material-symbols-outlined text-primary bg-surface-container p-2 rounded-lg">
                  account_balance_wallet
                </span>
                <div className="flex items-center gap-2">
                  <h3 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                    {user?.walletAddress ? "Live Balance" : "Total Earned"}
                  </h3>
                  {user?.walletAddress && (
                    <span className="w-2 h-2 rounded-full bg-[#16A34A] balance-live-indicator" title="Live — polling every 15s" />
                  )}
                </div>
              </div>

              {user?.walletAddress ? (
                <>
                  <div className="flex items-baseline gap-2 relative z-10">
                    {balanceLoading && balance === 0 ? (
                      <span className="font-display text-4xl md:text-5xl font-bold text-on-surface animate-pulse">···</span>
                    ) : (
                      <span className="font-display text-4xl md:text-5xl font-bold text-on-surface">
                        {formatZec(balance)}
                      </span>
                    )}
                    <span className="font-headline-md text-headline-md text-on-surface-variant">ZEC</span>
                  </div>
                  <div className="mt-3 font-label-sm text-on-surface-variant relative z-10 truncate font-mono text-[10px] opacity-60">
                    {user.walletAddress.slice(0, 12)}...{user.walletAddress.slice(-6)}
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-baseline gap-2 relative z-10">
                    <span className="font-display text-4xl md:text-5xl font-bold text-on-surface">—</span>
                    <span className="font-headline-md text-headline-md text-on-surface-variant">ZEC</span>
                  </div>
                  <Link
                    href="/settings"
                    className="mt-4 inline-flex items-center gap-1 text-primary font-label-sm text-label-sm hover:underline relative z-10"
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>
                      add_circle
                    </span>
                    Link wallet to see balance
                  </Link>
                </>
              )}
            </div>

            {/* Active Claims Card */}
            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-stack-lg card-shadow card-hover transition-all duration-300">
              <div className="flex items-center gap-3 mb-stack-sm">
                <span className="material-symbols-outlined text-tertiary bg-tertiary-container/30 p-2 rounded-lg">
                  work
                </span>
                <h3 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                  Active Claims
                </h3>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-4xl md:text-5xl font-bold text-on-surface">
                  {activeClaims.length}
                </span>
              </div>
              <div className="mt-6 flex gap-1.5">
                <div className="h-1 flex-1 bg-primary-container rounded-full"></div>
                <div className="h-1 flex-1 bg-primary-container rounded-full"></div>
                <div className="h-1 flex-1 bg-surface-variant rounded-full"></div>
              </div>
            </div>

            {/* Rank Card */}
            {(() => {
              const completedCount = user?.reputation?.tasksCompleted || 0;
              let rank = "Beginner";
              let nextRankInfo = "Complete 1 bounty to reach Bronze";
              if (completedCount >= 10) {
                rank = "Gold";
                nextRankInfo = "Maximum Rank Reached";
              } else if (completedCount >= 5) {
                rank = "Silver";
                nextRankInfo = `${10 - completedCount} more completed bounties to Gold`;
              } else if (completedCount >= 1) {
                rank = "Bronze";
                nextRankInfo = `${5 - completedCount} more completed bounties to Silver`;
              }

              return (
                <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-stack-lg card-shadow card-hover transition-all duration-300 relative overflow-hidden">
                  <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
                    <span className="material-symbols-outlined" style={{ fontSize: "120px", fontVariationSettings: "'FILL' 1" }}>
                      workspace_premium
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mb-stack-sm relative z-10">
                    <span className="material-symbols-outlined text-secondary bg-surface-variant p-2 rounded-lg">
                      workspace_premium
                    </span>
                    <h3 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                      Current Rank
                    </h3>
                  </div>
                  <div className="flex items-baseline gap-2 relative z-10">
                    <span className="font-display text-4xl md:text-5xl font-bold text-on-surface">{rank}</span>
                  </div>
                  <div className="mt-5 font-label-sm text-label-sm text-on-surface-variant relative z-10">
                    {nextRankInfo}
                  </div>
                </div>
              );
            })()}

          </section>

          {/* Main Dashboard Listings Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter items-start pb-16">
            
            {/* Left: Active Claims List */}
            <div className="lg:col-span-2 flex flex-col gap-stack-md">
              <div className="flex justify-between items-center border-b border-outline-variant pb-2 mb-2">
                <h2 className="font-headline-md text-headline-md text-on-surface">
                  Active Claims
                </h2>
                <Link
                  href="/explore"
                  className="btn-secondary font-label-sm text-label-sm px-3 py-1.5 rounded-lg flex items-center gap-1"
                >
                  View All
                  <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                    arrow_forward
                  </span>
                </Link>
              </div>

              {activeClaims.map((claim) => (
                <article
                  key={claim.id}
                  className="bg-surface-container-lowest rounded-xl border border-outline-variant p-stack-lg card-shadow card-hover transition-all duration-200"
                >
                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-[#f1e7d6] text-[#71717A] font-label-sm text-label-sm uppercase px-3 py-1 rounded-full">
                          {claim.status}
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">
                          #{claim.bountyId}
                        </span>
                      </div>
                      <h3 className="font-headline-md text-xl font-bold text-on-surface mb-1">
                        {claim.title}
                      </h3>
                      <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
                        {claim.description}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-headline-md text-headline-md text-on-surface font-bold">
                        {claim.rewardZec.toFixed(1)} ZEC
                      </div>
                      <div className="font-label-sm text-label-sm text-on-surface-variant">
                        ~ ${claim.rewardUsd} USD
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant mb-2">
                      <span>Progress</span>
                      <span>{claim.progress}%</span>
                    </div>
                    <div className="w-full h-1 bg-[#E4E4E7] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary-container rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${claim.progress}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between mt-4 items-center">
                      <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
                        <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                          timer
                        </span>
                        {claim.timeLeft}
                      </div>
                      <button className="btn-primary font-label-md text-label-md font-bold px-4 py-2 rounded-lg">
                        Update Progress
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Right Side: Pending Reviews & Find Work card */}
            <aside className="flex flex-col gap-stack-md">
              <div className="flex justify-between items-center border-b border-outline-variant pb-2 mb-2">
                <h2 className="font-headline-md text-headline-md text-on-surface">
                  Pending Reviews
                </h2>
              </div>

              {pendingReviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-surface-container-lowest rounded-xl border border-outline-variant p-stack-md card-shadow hover:border-[#E4E4E7] transition-colors relative overflow-hidden"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#16A34A] opacity-80"></div>
                  <div className="pl-2">
                    <div className="flex justify-between items-start mb-2">
                      <span className="bg-[#16A34A]/10 text-[#16A34A] font-label-sm text-label-sm uppercase px-2 py-0.5 rounded-full">
                        In Review
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        #{review.bountyId}
                      </span>
                    </div>
                    <h4 className="font-body-md text-body-md font-bold text-on-surface mb-2">
                      {review.title}
                    </h4>
                    <div className="flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant">
                      <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>
                        account_circle
                      </span>
                      Reviewer: {review.reviewer}
                    </div>
                    <div className="mt-3 pt-3 border-t border-outline-variant flex justify-between items-center">
                      <span className="font-label-md text-label-md font-bold text-on-surface">
                        {review.rewardZec.toFixed(1)} ZEC
                      </span>
                      <span className="text-xs text-on-surface-variant">
                        {review.submittedText}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Explore Card Prompts */}
              <div className="bg-surface-container-low rounded-xl border border-outline-variant p-stack-lg text-center mt-stack-md">
                <div className="w-12 h-12 bg-surface-container-lowest rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <span className="material-symbols-outlined text-primary">search</span>
                </div>
                <h4 className="font-headline-md text-headline-md text-on-surface mb-2">
                  Find more work
                </h4>
                <p className="font-body-md text-body-md text-on-surface-variant mb-4">
                  There are currently open bounties matching your skill set.
                </p>
                <Link
                  href="/explore"
                  className="btn-secondary font-label-md text-label-md font-bold px-4 py-2.5 rounded-lg w-full text-center block"
                >
                  Explore Bounties
                </Link>
              </div>
            </aside>

          </div>
        </main>
      </div>
    </div>
  );
}
