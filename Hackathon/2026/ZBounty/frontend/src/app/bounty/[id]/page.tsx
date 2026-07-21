"use client";

import { use, useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Loader2, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function BountyDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { user } = useAuth();
  const router = useRouter();
  const unwrappedParams = use(params);
  const bountyId = unwrappedParams.id;

  const [bounty, setBounty] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mySubmission, setMySubmission] = useState<any>(null);

  useEffect(() => {
    const fetchBounty = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/bounties/${bountyId}`);
        if (response.ok) {
          const data = await response.json();
          setBounty(data);
        }
      } catch (error) {
        console.error("Failed to fetch bounty:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBounty();
  }, [bountyId]);

  // Fetch the logged-in freelancer's own submission for this bounty
  useEffect(() => {
    const fetchMySubmission = async () => {
      if (!user || !user._id) return;
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const res = await fetch(`${API_BASE}/api/bounties/${bountyId}/my-submission`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setMySubmission(data); // null if no submission found
        }
      } catch (err) {
        console.error('Failed to fetch my submission:', err);
      }
    };
    fetchMySubmission();
  }, [bountyId]);

  // Derived date info
  const formattedDeadline = useMemo(() => {
    if (!bounty?.deadline) return "Oct 15, 2024";
    const dateObj = new Date(bounty.deadline);
    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }, [bounty]);

  const displayStatus = useMemo(() => {
    if (!bounty) return "Open";
    const status = bounty.status.toLowerCase();

    // If the bounty is completed, always show completed
    if (status === "completed" || status === "paid") return bounty.status;

    // If the bounty is In Review:
    if (status === "in review") {
      const isMine =
        user &&
        (bounty.contributorId === user._id ||
          (bounty.contributorId && bounty.contributorId._id === user._id));
      // If it's mine show In Review, otherwise it looks Open to others
      return isMine ? "In Review" : "Open";
    }

    // If bounty is Open but the freelancer had a prior Rejected submission
    if (status === "open" && mySubmission?.status === "Rejected") {
      return "Rejected";
    }

    return bounty.status;
  }, [bounty, user, mySubmission]);

  if (isLoading) {
    return (
      <div className="bg-surface min-h-screen pt-24 flex flex-col items-center justify-center text-on-surface-variant space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="font-medium">Loading bounty details...</p>
      </div>
    );
  }

  if (!bounty) {
    return (
      <div className="bg-surface min-h-screen pt-24 flex flex-col items-center text-on-surface-variant space-y-4">
        <span className="material-symbols-outlined text-[48px] text-error">error</span>
        <h3 className="text-lg font-bold font-headline-md text-on-surface">Bounty not found</h3>
        <p>The bounty you're looking for doesn't exist or was removed.</p>
        <Link href="/explore" className="text-primary hover:underline mt-4">
          Return to Explore
        </Link>
      </div>
    );
  }

  const categoryTag = bounty.category || "Development";
  const isOpen = displayStatus.toLowerCase() === "open";
  const isInProgress = displayStatus.toLowerCase() === "in progress";
  const isCompleted = displayStatus.toLowerCase() === "completed" || displayStatus.toLowerCase() === "paid";
  const isInReview = displayStatus.toLowerCase() === "in review";
  const isRejected = displayStatus.toLowerCase() === "rejected";

  return (
    <div className="bg-surface text-on-surface font-body-md antialiased min-h-screen flex">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col min-h-screen md:ml-64 w-full relative">
        {/* Header */}
        <Header showSearch={false} />

        {/* Page Content Canvas */}
        <main className="flex-1 p-margin-mobile md:p-margin-desktop max-w-container-max mx-auto w-full relative pt-6 pb-24">
          <div className="max-w-4xl mx-auto flex flex-col gap-6">
            
            {/* Back Navigation link */}
            <div>
              <Link
                href="/explore"
                className="inline-flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors font-label-sm text-label-sm"
              >
                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                Back to Bounties
              </Link>
            </div>

            {/* Layout Columns */}
            <div className="flex flex-col lg:flex-row gap-gutter items-start">
              
              {/* Left Column: Content */}
              <div className="w-full lg:w-2/3 flex flex-col gap-stack-lg">
                
                {/* Bounty Header Card */}
                <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-stack-lg card-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <span
                      className={cn(
                        "px-3 py-1 font-label-sm text-label-sm uppercase rounded-full font-bold",
                        isOpen && "bg-[#fefce8] text-[#854d0e]",
                        isInProgress && "bg-[#f3f4f6] text-[#4b5563]",
                        isCompleted && "bg-[#f0fdf4] text-[#16a34a]",
                        isInReview && "bg-[#f0fdf4] text-[#16a34a]",
                        isRejected && "bg-red-50 text-red-600"
                      )}
                    >
                      {displayStatus}
                    </span>
                    <div className="flex gap-2">
                      <span className="bg-surface-container px-3 py-1 rounded-full font-label-sm text-label-sm text-on-surface-variant border border-outline-variant uppercase">
                        {categoryTag}
                      </span>
                    </div>
                  </div>
                  
                  <h1 className="font-headline-lg-mobile md:font-headline-lg text-on-surface mb-2 font-bold leading-tight">
                    {bounty.title}
                  </h1>
                  <p className="font-body-lg text-on-surface-variant mb-6">
                    {bounty.description}
                  </p>

                  <div className="flex items-center gap-4 border-t border-outline-variant pt-6">
                    <img
                      alt="Sponsor Logo"
                      className="w-10 h-10 rounded-full border border-outline-variant object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDw39ScrxNa3ZgzehfSnq_YoRqJofZus71SLW3Bb7uZtGBzNwV55CayP5mje1Trt7rMVRtD5X-a74dAPHwUlq3MqhfX7flwAvqOgzv3ovfQJh_UZWcxifC0HJEMI5w9ijaNf9_U_9MlKEHHY85-PRy3DXq2P5WARiDSltoNf1_7QsxWWcaIevld4uD7XoV1Zhm581DkNtbo-FrRbPxihGvZVVlg-nUvq9FcP1tOkfAYu7gueTu3PRLBVBROwBxxllhyJ6i_0BhBGw"
                    />
                    <div>
                      <p className="font-label-md text-label-md text-on-surface font-bold">
                        {bounty.creatorId?.username || "Zcash Foundation"}
                      </p>
                      <p className="font-label-sm text-label-sm text-on-surface-variant">
                        Posted 2 days ago
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bounty Details Card */}
                <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-stack-lg card-shadow prose max-w-none">
                  <h2 className="font-headline-md text-headline-md text-on-surface mb-4">Overview</h2>
                  <p className="font-body-md text-on-surface-variant mb-6 leading-relaxed">
                    We are seeking an experienced developer to implement the requirements described below. This task is part of our commitment to building a privacy-first web3 ecosystem. All code snippets should be fully commented, well-tested, and comply with safety and security guidelines.
                  </p>

                  <h2 className="font-headline-md text-headline-md text-on-surface mb-4">Technical Requirements</h2>
                  <ul className="list-disc list-inside space-y-2 mb-6 font-body-md text-on-surface-variant">
                    {bounty.skillsRequired && bounty.skillsRequired.length > 0 ? (
                      bounty.skillsRequired.map((skill: string) => (
                        <li key={skill}>Demonstrated proficiency in <strong className="text-on-surface">{skill}</strong>.</li>
                      ))
                    ) : (
                      <li>Integrate with the lightwalletd protocol structures.</li>
                    )}
                    <li>Detailed explanation of transparent vs shielded data structures.</li>
                    <li>Code implementation must compile and pass all tests successfully.</li>
                    <li>Final delivery must be in Markdown or standard repository files.</li>
                  </ul>

                  <h2 className="font-headline-md text-headline-md text-on-surface mb-4">Acceptance Criteria</h2>
                  <p className="font-body-md text-on-surface-variant mb-4 leading-relaxed">
                    The work must be reviewed and accepted by our engineering maintainers. It should be robust, well-documented, and deployable.
                  </p>
                </div>

              </div>

              {/* Right Column: Action Sidebar */}
              <div className="w-full lg:w-1/3 flex flex-col gap-stack-md">
                <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-stack-lg card-shadow sticky top-[100px]">
                  <div className="text-center mb-6">
                    <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-2">
                      Bounty Reward
                    </p>
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="font-display text-5xl font-bold text-on-surface">
                        {bounty.reward.toFixed(1)}
                      </span>
                      <span className="font-headline-md text-headline-md text-primary font-bold">
                        ZEC
                      </span>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-1 font-medium">
                      ~ ${(bounty.reward * 40).toFixed(2)} USD
                    </p>
                  </div>

                  <button
                    onClick={() => router.push(`/bounty/${bountyId}/submit`)}
                    disabled={
                      isInReview ||
                      isCompleted
                    }
                    className={cn(
                      "w-full py-3.5 font-label-md text-label-md font-bold rounded-lg transition-all card-shadow hover:shadow-lg uppercase disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer",
                      isRejected
                        ? "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
                        : "bg-primary-container text-on-primary-container hover:bg-inverse-primary"
                    )}
                  >
                    {isInReview
                      ? "Solution Submitted — In Review"
                      : isCompleted
                      ? "Bounty Completed"
                      : isRejected
                      ? "❌ Rejected — Submit New Solution"
                      : "Submit Details"}
                  </button>

                  <div className="flex flex-col gap-4 border-t border-outline-variant pt-6 mt-6">
                    <div className="flex justify-between items-center">
                      <span className="font-label-md text-label-md text-on-surface-variant flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">group</span>
                        Applicants
                      </span>
                      <span className="font-body-md text-body-md text-on-surface font-bold">
                        12
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="font-label-md text-label-md text-on-surface-variant flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                        Deadline
                      </span>
                      <span className="font-body-md text-body-md text-on-surface font-bold">
                        {formattedDeadline}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="font-label-md text-label-md text-on-surface-variant flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">history</span>
                        Est. Time
                      </span>
                      <span className="font-body-md text-body-md text-on-surface font-bold">
                        2-3 Weeks
                      </span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
