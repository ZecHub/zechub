"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Loader2, ShieldCheck, LogOut, Check, X, ClipboardList, ShieldAlert, Mail, Lock, Eye, EyeOff } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface Submission {
  _id: string;
  bountyId: {
    _id: string;
    title: string;
    reward: number;
    status: string;
  };
  contributorId: {
    _id: string;
    username: string;
    email?: string;
    walletAddress?: string;
    avatar?: string;
    reputation?: {
      tasksCompleted: number;
      totalRewardsEarned: number;
    };
  };
  link: string;
  notes: string;
  status: 'Submitted' | 'Accepted' | 'Rejected';
  createdAt: string;
}

export default function SponsorPage() {
  const { user, token, login, logout, isLoading: authLoading } = useAuth();
  const router = useRouter();

  // Authentication State for Sponsor page login
  const [sponsorEmail, setSponsorEmail] = useState("");
  const [sponsorPassword, setSponsorPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Portal State
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [actioningId, setActioningId] = useState<string | null>(null);

  // Redirect Admins to Admin portal
  useEffect(() => {
    if (user && user.role === 'Admin') {
      router.replace('/admin');
    }
  }, [user, router]);

  // Fetch dashboard data
  const fetchData = async () => {
    if (!token || !user || user.role !== 'Creator') return;
    setIsLoadingData(true);
    try {
      const response = await fetch(`${API_BASE}/api/bounties/submissions`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setSubmissions(data);
      } else {
        const errData = await response.json().catch(() => ({}));
        console.error("Submissions fetch failed:", response.status, errData);
        alert(`Failed to load submissions: ${errData.detail || errData.error || response.statusText || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Failed to fetch sponsor data:", err);
      alert("Network error: Failed to connect to server.");
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token, user]);

  const handleSponsorLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsLoggingIn(true);
    try {
      const res = await login(sponsorEmail, sponsorPassword);
      if (res.user.role !== 'Creator') {
        setLoginError("Access denied: Creator role required.");
        logout();
      }
    } catch (err: any) {
      setLoginError(err.message || "Invalid credentials.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleApprove = async (submissionId: string) => {
    if (!token) return;
    setActioningId(submissionId);
    try {
      const response = await fetch(`${API_BASE}/api/bounties/submissions/${submissionId}/approve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      if (response.ok) {
        alert("Submission approved and bounty completed successfully!");
        fetchData();
      } else {
        alert("Failed to approve submission.");
      }
    } catch (err) {
      console.error(err);
      alert("Error approving submission.");
    } finally {
      setActioningId(null);
    }
  };

  const handleReject = async (submissionId: string) => {
    if (!token) return;
    if (!confirm("Are you sure you want to reject this submission? The bounty will return to Open status.")) return;
    setActioningId(submissionId);
    try {
      const response = await fetch(`${API_BASE}/api/bounties/submissions/${submissionId}/reject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      if (response.ok) {
        alert("Submission rejected. Bounty has been reopened.");
        fetchData();
      } else {
        alert("Failed to reject submission.");
      }
    } catch (err) {
      console.error(err);
      alert("Error rejecting submission.");
    } finally {
      setActioningId(null);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-on-surface-variant">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="mt-4 font-medium">Verifying sponsor session...</p>
      </div>
    );
  }

  // 1. If not logged in: Show Sponsor login panel
  if (!user) {
    return (
      <div className="bg-background min-h-screen flex flex-col items-center justify-center p-4">
        <div className="bg-surface border border-outline-variant rounded-2xl p-8 max-w-md w-full shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto border border-primary/20">
              <ShieldCheck className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-display text-3xl font-bold tracking-tight text-on-surface">Sponsor Portal</h1>
            <p className="text-sm text-on-surface-variant font-body-md">Sign in to review and verify contributor deliverables</p>
          </div>

          {loginError && (
            <div className="p-3 bg-error-container/30 border border-error/20 text-error rounded-lg text-sm text-center font-medium font-body-md animate-fade-in">
              {loginError}
            </div>
          )}

          <form onSubmit={handleSponsorLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="block text-sm font-bold text-on-surface font-body-md" htmlFor="sponsor-email">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-on-surface-variant">
                  <Mail className="w-5 h-5 opacity-60" />
                </span>
                <input
                  id="sponsor-email"
                  type="email"
                  required
                  placeholder="sponsor@zcash.org"
                  value={sponsorEmail}
                  onChange={(e) => setSponsorEmail(e.target.value)}
                  className="input-field w-full rounded-lg border-outline-variant bg-white py-3 pl-10 pr-3 font-body-md text-body-md text-on-surface"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-bold text-on-surface font-body-md" htmlFor="sponsor-password">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-on-surface-variant">
                  <Lock className="w-5 h-5 opacity-60" />
                </span>
                <input
                  id="sponsor-password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={sponsorPassword}
                  onChange={(e) => setSponsorPassword(e.target.value)}
                  className="input-field w-full rounded-lg border-outline-variant bg-white py-3 pl-10 pr-10 font-body-md text-body-md text-on-surface"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 opacity-60" />
                  ) : (
                    <Eye className="w-5 h-5 opacity-60" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="btn-primary w-full py-3.5 mt-2 rounded-lg font-bold text-sm tracking-wide transition-all uppercase flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg disabled:opacity-50"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                "Verify & Sign In"
              )}
            </button>
          </form>

          <button
            onClick={() => router.push("/")}
            className="w-full py-3 bg-secondary-container hover:bg-secondary-container/85 text-on-secondary-container font-label-md text-label-md font-bold rounded-lg uppercase transition-colors cursor-pointer"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // 2. If logged in but role is not Creator: Access Denied
  if (user.role !== 'Creator') {
    return (
      <div className="bg-background min-h-screen flex flex-col items-center justify-center p-4 text-center">
        <div className="bg-surface border border-outline-variant rounded-2xl p-8 max-w-md w-full shadow-2xl space-y-6">
          <div className="w-16 h-16 bg-error-container/30 rounded-full flex items-center justify-center mx-auto text-error border border-error/20 animate-pulse">
            <ShieldAlert className="w-9 h-9" />
          </div>
          <h1 className="font-headline-lg text-on-surface font-bold">Access Denied</h1>
          <p className="text-on-surface-variant font-body-md max-w-sm mx-auto leading-relaxed">
            Your account <strong>({user.username})</strong> does not have Creator reviewer privileges.
          </p>
          <div className="flex gap-4">
            <button
              onClick={logout}
              className="btn-primary flex-1 py-3 text-label-md font-bold rounded-lg uppercase"
            >
              Logout & Swap Account
            </button>
            <button
              onClick={() => router.push("/")}
              className="btn-secondary flex-1 py-3 text-label-md font-bold rounded-lg uppercase"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. Creator is logged in: Show solutions review portal
  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col font-body-md antialiased pb-16">
      
      {/* Sponsor Navbar */}
      <header className="px-6 py-4 border-b border-outline-variant flex items-center justify-between sticky top-0 bg-surface/80 backdrop-blur-xl z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-7 h-7 text-primary" />
          <span className="font-space-grotesk font-bold text-2xl tracking-tight text-on-surface">
            Sponsor Portal
          </span>
          <span className="bg-primary-container text-on-primary-container text-[10px] font-bold font-mono px-2 py-0.5 rounded-full uppercase tracking-wider">
            Review Portal
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <img
              alt="Sponsor Profile"
              className="w-8 h-8 rounded-full border border-outline-variant object-cover"
              src={user.avatar || "https://api.dicebear.com/7.x/identicon/svg?seed=sponsor"}
            />
            <span className="text-sm font-bold text-on-surface hidden sm:inline">
              {user.username}
            </span>
          </div>

          <button
            onClick={logout}
            className="p-2 text-on-surface-variant hover:text-error transition-colors rounded-lg hover:bg-surface-container-high"
            title="Log Out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Review Dashboard */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 flex flex-col gap-6">
        
        {/* Banner */}
        <div className="border-b border-outline-variant pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-headline-lg text-on-surface font-extrabold tracking-tight">Review Submissions</h1>
            <p className="text-on-surface-variant font-body-md">
              Verify contributor solutions and release bounty funds to completed tasks.
            </p>
          </div>
        </div>

        {/* Tab Content Canvas */}
        <div className="flex-1">
          {isLoadingData ? (
            <div className="py-24 flex flex-col items-center justify-center text-on-surface-variant space-y-4">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <p className="font-medium">Retrieving submissions...</p>
            </div>
          ) : (
            // ================== Submissions Tab ==================
            <div className="space-y-4">
              {submissions.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {submissions.map((sub) => {
                    const isPending = sub.status === 'Submitted';
                    return (
                      <div
                        key={sub._id}
                        className={`bg-surface-container-lowest border rounded-xl p-6 card-shadow flex flex-col lg:flex-row justify-between gap-6 transition-colors ${
                          isPending ? 'border-primary/30' : 'border-outline-variant opacity-70'
                        }`}
                      >
                        {/* Submission details */}
                        <div className="space-y-4 flex-1">
                          <div className="flex flex-wrap items-center gap-3">
                            <span
                              className={`px-3 py-1 font-label-sm text-label-sm uppercase rounded-full font-bold ${
                                sub.status === 'Submitted'
                                  ? 'bg-primary-container/20 text-[#745b00]'
                                  : sub.status === 'Accepted'
                                  ? 'bg-success/10 text-success'
                                  : 'bg-error/10 text-error'
                              }`}
                            >
                              {sub.status === 'Submitted' ? 'In Review' : sub.status}
                            </span>
                            <span className="font-label-sm text-label-sm text-on-surface-variant">
                              ID: #{sub._id.substring(18)}
                            </span>
                          </div>

                          <div>
                            <h3 className="font-headline-md text-xl font-bold text-on-surface mb-1">
                              Bounty: {sub.bountyId?.title || "Unknown Bounty"}
                            </h3>
                            <p className="text-sm font-bold text-primary font-mono">
                              Reward: {sub.bountyId?.reward?.toFixed(1) || "0.0"} ZEC
                            </p>
                          </div>

                          <div className="bg-surface-container-low rounded-lg p-4 space-y-2 border border-outline-variant/50">
                            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase font-bold">
                              Notes from contributor
                            </p>
                            <p className="font-body-md text-on-surface leading-relaxed whitespace-pre-wrap">
                              {sub.notes || "No notes provided."}
                            </p>
                            <div className="pt-2">
                              <a
                                href={sub.link}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
                              >
                                <span className="material-symbols-outlined text-[16px]">link</span>
                                View Deliverable (Github/Docs)
                              </a>
                            </div>
                          </div>

                          {/* Contributor Card */}
                          <div className="flex items-center gap-3 pt-2">
                            <img
                              alt="Contributor Profile"
                              className="w-10 h-10 rounded-full border border-outline-variant object-cover"
                              src={sub.contributorId?.avatar || "https://api.dicebear.com/7.x/adventurer/svg?seed=" + sub.contributorId?.username}
                            />
                            <div>
                              <p className="font-label-md text-label-md text-on-surface font-bold">
                                Contributor: {sub.contributorId?.username || "Unknown"}
                              </p>
                              <p className="text-xs text-on-surface-variant font-mono truncate max-w-md">
                                Wallet: {sub.contributorId?.walletAddress || "No linked wallet"}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Sponsor Action Buttons */}
                        {isPending && (
                          <div className="flex flex-row lg:flex-col gap-2 justify-end items-stretch lg:w-44 shrink-0">
                            <button
                              onClick={() => handleApprove(sub._id)}
                              disabled={actioningId !== null}
                              className="btn-primary flex-1 lg:flex-none py-3.5 px-4 rounded-lg text-sm font-bold uppercase flex items-center justify-center gap-2 cursor-pointer shadow hover:shadow-md disabled:opacity-50"
                            >
                              {actioningId === sub._id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <>
                                  <Check className="w-4 h-4" />
                                  Approve
                                </>
                              )}
                            </button>
                            <button
                              onClick={() => handleReject(sub._id)}
                              disabled={actioningId !== null}
                              className="btn-secondary flex-1 lg:flex-none py-3.5 px-4 rounded-lg text-sm font-bold uppercase flex items-center justify-center gap-2 cursor-pointer hover:bg-error/5 hover:text-error hover:border-error transition-colors disabled:opacity-50"
                            >
                              {actioningId === sub._id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <>
                                  <X className="w-4 h-4" />
                                  Reject
                                </>
                              )}
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-24 bg-surface-container-lowest rounded-xl border border-outline-variant text-center max-w-xl mx-auto shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center mb-4">
                    <ClipboardList className="w-6 h-6 text-on-surface-variant" />
                  </div>
                  <h3 className="text-lg font-bold font-headline-md mb-2 text-on-surface">No Submissions Found</h3>
                  <p className="text-on-surface-variant max-w-md">
                    There are currently no solutions submitted for your review.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
