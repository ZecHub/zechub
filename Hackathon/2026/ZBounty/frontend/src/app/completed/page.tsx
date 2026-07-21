"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { BountyCard } from "@/components/BountyCard";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function CompletedPage() {
  const { user } = useAuth();
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
          // Filter to show Completed claims specifically for this user
          const completedClaims = data.filter(
            (b: any) =>
              (b.status.toLowerCase() === "completed" || b.status.toLowerCase() === "paid") &&
              (b.contributorId === user?._id || (b.contributorId && b.contributorId._id === user?._id))
          );
          setBounties(completedClaims);
        }
      } catch (error) {
        console.error("Failed to fetch completed claims:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBounties();
  }, []);

  return (
    <div className="bg-surface text-on-surface font-body-md antialiased min-h-screen flex">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col min-h-screen md:ml-64 w-full relative">
        {/* Header */}
        <Header showSearch={false} />

        {/* Main Content Area */}
        <main className="flex-1 p-margin-mobile md:p-margin-desktop max-w-container-max mx-auto w-full flex flex-col gap-stack-xl pt-6 pb-24">
          
          {/* Page Banner */}
          <header className="flex justify-between items-end pb-stack-sm border-b border-outline-variant">
            <div>
              <h1 className="font-headline-lg-mobile md:font-headline-lg text-on-surface mb-1 font-bold">
                Completed Work
              </h1>
              <p className="font-body-md text-on-surface-variant">
                Review your contribution history, ZEC rewards received, and privacy shield confirmations.
              </p>
            </div>
          </header>

          {/* Completed Content */}
          <section className="flex-1">
            {isLoading ? (
              <div className="py-24 flex flex-col items-center justify-center text-on-surface-variant space-y-4">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <p className="font-medium">Loading completed claims...</p>
              </div>
            ) : bounties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
                {bounties.map((bounty) => (
                  <BountyCard
                    key={bounty._id}
                    id={bounty._id}
                    title={bounty.title}
                    description={bounty.description}
                    reward={bounty.reward}
                    privacyScore={bounty.privacyScore}
                    tags={bounty.tags || []}
                    status={bounty.status}
                    deadline={bounty.deadline}
                    creatorName={bounty.creatorId?.username || "Anonymous"}
                    contributorId={bounty.contributorId}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 bg-surface-container-lowest rounded-xl border border-outline-variant text-center px-4 max-w-xl mx-auto mt-8 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-on-surface-variant">
                    task_alt
                  </span>
                </div>
                <h3 className="text-lg font-bold font-headline-md mb-2 text-on-surface">
                  No completed work
                </h3>
                <p className="text-on-surface-variant max-w-md mb-6">
                  You haven't completed any bounties yet. Solve claims and earn ZEC by contributing to the ecosystem.
                </p>
                <Link
                  href="/explore"
                  className="btn-primary px-6 py-3 font-label-md text-label-md uppercase font-bold"
                >
                  Find Bounties
                </Link>
              </div>
            )}
          </section>

        </main>
      </div>
    </div>
  );
}
