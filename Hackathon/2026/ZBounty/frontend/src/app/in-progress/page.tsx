"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { BountyCard } from "@/components/BountyCard";
import { Loader2, SearchX } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function InProgressPage() {
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
          // Filter to show In Progress or In Review claims specifically for this user
          const activeClaims = data.filter(
            (b: any) =>
              (b.status.toLowerCase() === "in progress" || b.status.toLowerCase() === "in review") &&
              (b.contributorId === user?._id || (b.contributorId && b.contributorId._id === user?._id))
          );
          setBounties(activeClaims);
        }
      } catch (error) {
        console.error("Failed to fetch active claims:", error);
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
          
          {/* Welcome/Page Banner */}
          <header className="flex justify-between items-end pb-stack-sm border-b border-outline-variant">
            <div>
              <h1 className="font-headline-lg-mobile md:font-headline-lg text-on-surface mb-1 font-bold">
                In Progress Work
              </h1>
              <p className="font-body-md text-on-surface-variant">
                Track your active claims, update your solution details, and meet your deadlines.
              </p>
            </div>
          </header>

          {/* Active Claims Content */}
          <section className="flex-1">
            {isLoading ? (
              <div className="py-24 flex flex-col items-center justify-center text-on-surface-variant space-y-4">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <p className="font-medium">Loading active claims...</p>
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
                    pending_actions
                  </span>
                </div>
                <h3 className="text-lg font-bold font-headline-md mb-2 text-on-surface">
                  No active claims
                </h3>
                <p className="text-on-surface-variant max-w-md mb-6">
                  You are not currently working on any bounties. Find open tasks matching your skills in the Explorer.
                </p>
                <Link
                  href="/explore"
                  className="btn-primary px-6 py-3 font-label-md text-label-md uppercase font-bold"
                >
                  Explore Bounties
                </Link>
              </div>
            )}
          </section>

        </main>
      </div>
    </div>
  );
}
