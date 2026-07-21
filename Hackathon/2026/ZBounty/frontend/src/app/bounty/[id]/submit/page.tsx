"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function BountySubmissionPage({
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State
  const [summary, setSummary] = useState("");
  const [prLink, setPrLink] = useState("");
  const [zcashAddress, setZcashAddress] = useState("");

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

  useEffect(() => {
    if (bounty && user) {
      // Block if THIS user's submission is still actively in review (Submitted status)
      const myContributorId = bounty.contributorId?._id || bounty.contributorId;
      const isMineInReview =
        bounty.status.toLowerCase() === "in review" &&
        myContributorId?.toString() === user._id?.toString();

      const alreadyCompleted =
        bounty.status.toLowerCase() === "completed" ||
        bounty.status.toLowerCase() === "paid";

      if (isMineInReview) {
        alert("Your solution is already submitted and pending review.");
        router.push(`/bounty/${bountyId}`);
      } else if (alreadyCompleted) {
        alert("This bounty has already been completed.");
        router.push("/explore");
      }
    }
  }, [bounty, user, router, bountyId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!summary || !prLink || !zcashAddress) {
      alert("Please fill out all required fields.");
      return;
    }

    if (!user) {
      alert("You must be logged in to submit a solution.");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${API_BASE}/api/bounties/${bountyId}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          link: prLink,
          notes: summary,
          contributorId: user._id,
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        alert("Failed to submit bounty.");
      }
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Submission failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-surface min-h-screen pt-24 flex flex-col items-center justify-center text-on-surface-variant space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="font-medium">Loading submission details...</p>
      </div>
    );
  }

  if (!bounty) {
    return (
      <div className="bg-surface min-h-screen pt-24 flex flex-col items-center text-on-surface-variant space-y-4">
        <span className="material-symbols-outlined text-[48px] text-error">error</span>
        <h3 className="text-lg font-bold font-headline-md text-on-surface">Bounty not found</h3>
        <p>The bounty you're trying to submit work for doesn't exist.</p>
        <Link href="/explore" className="text-primary hover:underline mt-4">
          Return to Explore
        </Link>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="bg-surface min-h-screen flex flex-col font-body-md text-body-md text-on-surface">
        <Header showSearch={false} />
        <main className="flex-1 w-full max-w-xl mx-auto px-margin-mobile py-stack-xl flex flex-col items-center justify-center text-center mt-12">
          <div className="w-16 h-16 bg-[#f0fdf4] text-[#16a34a] rounded-full flex items-center justify-center mb-6 shadow-sm border border-[#bbf7d0]">
            <span className="material-symbols-outlined text-4xl">task_alt</span>
          </div>
          <h1 className="font-headline-lg text-on-surface mb-2 font-bold">
            Submission Received!
          </h1>
          <p className="text-on-surface-variant mb-8 max-w-md">
            Your solution for <strong>"{bounty.title}"</strong> has been successfully submitted and is pending developer review.
          </p>
          <div className="flex gap-4 w-full justify-center">
            <button
              onClick={() => router.push("/dashboard")}
              className="btn-primary px-6 py-3 font-label-md text-label-md uppercase font-bold"
            >
              Go to Dashboard
            </button>
            <button
              onClick={() => router.push("/explore")}
              className="btn-secondary px-6 py-3 font-label-md text-label-md uppercase font-bold"
            >
              Explore More Bounties
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-surface min-h-screen flex flex-col font-body-md text-body-md text-on-surface pb-16">
      {/* Top Navigation */}
      <Header showSearch={false} />

      {/* Main Content Layout */}
      <main className="flex-1 w-full max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg mt-6">
        
        {/* Breadcrumb Header */}
        <div className="mb-stack-lg">
          <Link
            href={`/bounty/${bountyId}`}
            className="inline-flex items-center text-on-surface-variant hover:text-primary transition-colors mb-4 font-label-sm text-label-sm"
          >
            <span className="material-symbols-outlined mr-1" style={{ fontSize: "16px" }}>
              arrow_back
            </span>
            Back to Bounty Details
          </Link>
          <h1 className="font-headline-lg-mobile md:font-display text-on-surface mb-2 font-bold leading-tight">
            Submit Work
          </h1>
          <p className="text-on-surface-variant font-body-lg text-body-lg">
            For: "{bounty.title}"
          </p>
        </div>

        {/* Form Container Card */}
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-stack-lg card-shadow">
          <form onSubmit={handleSubmit} className="space-y-stack-xl">
            
            {/* Step 1: Submission Details */}
            <section>
              <h2 className="font-headline-md text-headline-md text-on-surface mb-stack-md flex items-center border-b border-outline-variant pb-3">
                <span className="bg-surface-container text-primary font-bold w-8 h-8 rounded-full flex items-center justify-center mr-3 font-label-md text-label-md border border-outline-variant">
                  1
                </span>
                Submission Details
              </h2>
              <div className="space-y-stack-md">
                <div>
                  <label
                    className="block font-label-md text-label-md text-on-surface mb-2 font-bold"
                    htmlFor="summary"
                  >
                    Summary of Work Completed
                  </label>
                  <textarea
                    id="summary"
                    rows={4}
                    required
                    placeholder="Briefly describe what you implemented and how it solves the bounty requirements..."
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    className="input-field w-full rounded-lg border-[#E4E4E7] bg-white p-3 font-body-md text-body-md text-on-surface resize-y"
                  />
                </div>
              </div>
            </section>

            {/* Step 2: Proof of Work */}
            <section>
              <h2 className="font-headline-md text-headline-md text-on-surface mb-stack-md flex items-center border-b border-outline-variant pb-3">
                <span className="bg-surface-container text-primary font-bold w-8 h-8 rounded-full flex items-center justify-center mr-3 font-label-md text-label-md border border-outline-variant">
                  2
                </span>
                Proof of Work
              </h2>
              <div className="space-y-stack-md">
                <div>
                  <label
                    className="block font-label-md text-label-md text-on-surface mb-2 font-bold"
                    htmlFor="pr-link"
                  >
                    GitHub PR or Repository Link
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-on-surface-variant">
                      <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
                        link
                      </span>
                    </span>
                    <input
                      id="pr-link"
                      type="url"
                      required
                      placeholder="https://github.com/..."
                      value={prLink}
                      onChange={(e) => setPrLink(e.target.value)}
                      className="input-field w-full rounded-lg border-[#E4E4E7] bg-white py-3 pl-10 pr-3 font-body-md text-body-md text-on-surface"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-label-md text-label-md text-on-surface mb-2 font-bold">
                    Additional Attachments (Optional)
                  </label>
                  <div className="border-2 border-dashed border-[#E4E4E7] rounded-lg p-stack-lg text-center hover:bg-surface-container-low transition-colors cursor-pointer group">
                    <span className="material-symbols-outlined text-on-surface-variant text-4xl mb-2 group-hover:text-primary transition-colors">
                      upload_file
                    </span>
                    <p className="font-body-md text-body-md text-on-surface">
                      Drag and drop files here, or{" "}
                      <span className="text-primary font-bold underline">browse</span>
                    </p>
                    <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">
                      Supports PDF, ZIP, MP4 (Max 50MB)
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Step 3: Payment Details */}
            <section>
              <h2 className="font-headline-md text-headline-md text-on-surface mb-stack-md flex items-center border-b border-outline-variant pb-3">
                <span className="bg-surface-container text-primary font-bold w-8 h-8 rounded-full flex items-center justify-center mr-3 font-label-md text-label-md border border-outline-variant">
                  3
                </span>
                Payment Details
              </h2>
              <div className="space-y-stack-md">
                <div>
                  <label
                    className="block font-label-md text-label-md text-on-surface mb-2 font-bold"
                    htmlFor="zcash-address"
                  >
                    Zcash Address (Shielded Preferred)
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-on-surface-variant">
                      <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
                        wallet
                      </span>
                    </span>
                    <input
                      id="zcash-address"
                      type="text"
                      required
                      placeholder="zs1..."
                      value={zcashAddress}
                      onChange={(e) => setZcashAddress(e.target.value)}
                      className="input-field w-full rounded-lg border-[#E4E4E7] bg-white py-3 pl-10 pr-3 font-label-md text-label-md text-on-surface tracking-wider"
                    />
                  </div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant mt-2">
                    Bounty Reward: <strong className="text-primary font-bold">{bounty.reward.toFixed(2)} ZEC</strong>
                  </p>
                </div>
              </div>
            </section>

            {/* Action Buttons Footer */}
            <div className="pt-stack-md border-t border-outline-variant flex justify-end gap-4 items-center">
              <button
                type="button"
                onClick={() => router.push(`/bounty/${bountyId}`)}
                className="btn-secondary font-label-md text-label-md px-6 py-3.5 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary font-label-md text-label-md px-8 py-3.5 rounded-lg transition-colors flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Review
                    <span className="material-symbols-outlined text-[18px]">send</span>
                  </>
                )}
              </button>
            </div>

          </form>
        </div>

      </main>

      {/* Footer */}
      <footer className="w-full py-stack-lg border-t border-outline-variant bg-surface-container-lowest mt-16">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <span className="font-display text-body-lg font-bold text-on-surface block mb-1">
              ZcashBounties
            </span>
            <span className="text-on-surface-variant font-label-sm text-label-sm">
              © 2026 Zcash Bounty Hub. Built for the privacy-first economy.
            </span>
          </div>
          <div className="flex gap-6 font-label-sm text-label-sm">
            <a className="text-on-surface-variant hover:text-on-surface transition-colors" href="#">
              Privacy Policy
            </a>
            <a className="text-on-surface-variant hover:text-on-surface transition-colors" href="#">
              Terms of Service
            </a>
            <a className="text-on-surface-variant hover:text-on-surface transition-colors" href="#">
              Github
            </a>
            <a className="text-on-surface-variant hover:text-on-surface transition-colors" href="#">
              Zcash Foundation
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
