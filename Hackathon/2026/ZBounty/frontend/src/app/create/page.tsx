"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

import Link from "next/link";

export default function CreateBountyPage() {
  const router = useRouter();
  const { user } = useAuth();

  if (user && user.role !== "Creator") {
    return (
      <div className="bg-surface min-h-screen pt-24 flex flex-col items-center text-on-surface-variant space-y-4">
        <span className="material-symbols-outlined text-[48px] text-error">lock</span>
        <h3 className="text-lg font-bold font-headline-md text-on-surface">Access Denied</h3>
        <p>Only Creators are authorized to create new bounties.</p>
        <Link href="/explore" className="text-primary hover:underline mt-4">
          Return to Explore
        </Link>
      </div>
    );
  }

  const [fundingMethod, setFundingMethod] = useState<"Transparent" | "Shielded">("Shielded");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  
  // Fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [reward, setReward] = useState("");
  const [deadline, setDeadline] = useState("");
  const [category, setCategory] = useState("Development");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    if (!user) {
      setSubmitError("You must sign in with Google to create a bounty.");
      setIsSubmitting(false);
      return;
    }

    const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    
    try {
      const response = await fetch(`${API_BASE}/api/bounties`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          creatorId: user._id,
          title,
          description,
          reward: parseFloat(reward),
          deadline,
          category,
          tags: [category],
          skillsRequired: [category === "Development" ? "Typescript" : "Technical Writing"],
        }),
      });

      if (!response.ok) throw new Error("Failed to create bounty");
      
      const newBounty = await response.json();
      
      // Simulate the funding API call right after creation
      await fetch(`${API_BASE}/api/bounties/${newBounty._id}/fund`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          txHash: "mock_tx_" + Date.now(),
          privacyLevel: fundingMethod
        })
      });

      router.push("/explore");
    } catch (error) {
      console.error(error);
      setSubmitError("Failed to create bounty. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-surface min-h-screen flex flex-col font-body-md text-body-md text-on-surface pb-16">
      {/* Navigation */}
      <Header showSearch={false} />

      {/* Main Content Layout */}
      <main className="flex-1 w-full max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg mt-6">
        
        {/* Page Header */}
        <div className="mb-stack-lg">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center text-on-surface-variant hover:text-primary transition-colors mb-4 font-label-sm text-label-sm"
          >
            <span className="material-symbols-outlined mr-1" style={{ fontSize: "16px" }}>
              arrow_back
            </span>
            Back
          </button>
          <h1 className="font-headline-lg-mobile md:font-display text-on-surface mb-2 font-bold leading-tight">
            Create a Bounty
          </h1>
          <p className="text-on-surface-variant font-body-lg text-body-lg">
            Fund your task with ZEC. Choose shielded funding to boost your Privacy Score.
          </p>
        </div>

        {/* Error Indicator */}
        {submitError && (
          <div className="mb-6 p-4 rounded-lg bg-error-container border border-error/20 flex items-start gap-3">
            <span className="material-symbols-outlined text-error mt-0.5" style={{ fontSize: "20px" }}>
              error
            </span>
            <p className="font-body-md text-on-error-container">{submitError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-stack-lg">
          
          {/* Details Section */}
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-stack-lg card-shadow space-y-6">
            <h2 className="font-headline-md text-headline-md text-on-surface border-b border-outline-variant pb-2">
              Bounty Details
            </h2>

            <div className="space-y-2">
              <label className="block font-label-md text-label-md text-on-surface font-bold">
                Bounty Title
              </label>
              <input
                type="text"
                required
                placeholder="e.g., Integrate Zcash SDK into Mobile App"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input-field w-full rounded-lg border-[#E4E4E7] bg-white p-3 font-body-md text-body-md text-on-surface"
              />
            </div>

            <div className="space-y-2">
              <label className="block font-label-md text-label-md text-on-surface font-bold">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="input-field w-full rounded-lg border-[#E4E4E7] bg-white p-3 font-body-md text-body-md text-on-surface"
              >
                <option value="Development">Development</option>
                <option value="Content">Content</option>
                <option value="Research">Research</option>
                <option value="Design">Design</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block font-label-md text-label-md text-on-surface font-bold">
                Description
              </label>
              <textarea
                required
                rows={5}
                placeholder="Describe the task, technical requirements, and acceptance criteria..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="input-field w-full rounded-lg border-[#E4E4E7] bg-white p-3 font-body-md text-body-md text-on-surface resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block font-label-md text-label-md text-on-surface font-bold">
                  Reward Amount (ZEC)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant font-bold">
                    ⓩ
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="0.00"
                    value={reward}
                    onChange={(e) => setReward(e.target.value)}
                    className="input-field w-full rounded-lg border-[#E4E4E7] bg-white py-3 pl-10 pr-3 font-label-md text-label-md text-on-surface font-mono"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block font-label-md text-label-md text-on-surface font-bold">
                  Deadline
                </label>
                <input
                  type="date"
                  required
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="input-field w-full rounded-lg border-[#E4E4E7] bg-white p-3 font-body-md text-body-md text-on-surface"
                />
              </div>
            </div>
          </div>

          {/* Privacy Section */}
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-stack-lg card-shadow space-y-6">
            <div className="flex justify-between items-center border-b border-outline-variant pb-2">
              <h2 className="font-headline-md text-headline-md text-on-surface">
                Funding Privacy
              </h2>
              <span className="bg-primary-container/20 text-[#695200] font-label-sm text-label-sm uppercase px-3 py-1 rounded-full flex items-center gap-1 font-bold">
                <span className="material-symbols-outlined text-[14px]">shield</span>
                Affects Privacy Score
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                onClick={() => setFundingMethod("Shielded")}
                className={cn(
                  "p-5 rounded-xl border-2 cursor-pointer transition-all flex flex-col gap-2",
                  fundingMethod === "Shielded"
                    ? "border-primary-container bg-primary-container/10"
                    : "border-outline-variant bg-surface-container-lowest hover:border-[#807660]"
                )}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "material-symbols-outlined text-2xl",
                      fundingMethod === "Shielded" ? "text-primary" : "text-on-surface-variant"
                    )}
                  >
                    shield
                  </span>
                  <span className="font-bold font-headline-md text-base">
                    Shielded Deposit
                  </span>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Fund from a z-address. +40 Privacy Score.
                </p>
              </div>

              <div
                onClick={() => setFundingMethod("Transparent")}
                className={cn(
                  "p-5 rounded-xl border-2 cursor-pointer transition-all flex flex-col gap-2",
                  fundingMethod === "Transparent"
                    ? "border-primary-container bg-primary-container/10"
                    : "border-outline-variant bg-surface-container-lowest hover:border-[#807660]"
                )}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "material-symbols-outlined text-2xl",
                      fundingMethod === "Transparent" ? "text-primary" : "text-on-surface-variant"
                    )}
                  >
                    shield_alert
                  </span>
                  <span className="font-bold font-headline-md text-base">
                    Transparent Deposit
                  </span>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Fund from a t-address. +0 Privacy Score.
                </p>
              </div>
            </div>
          </div>

          {/* Submit Trigger */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-primary-container text-on-primary-container font-label-md text-label-md font-bold rounded-lg hover:bg-inverse-primary transition-all disabled:opacity-50 flex items-center justify-center gap-2 uppercase card-shadow hover:shadow-lg"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing Deposit on Mainnet...
              </>
            ) : (
              <>
                Create & Escrow Funds
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </>
            )}
          </button>

        </form>
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
