"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Loader2, ShieldCheck, LogOut, Users, ClipboardList, ShieldAlert, Mail, Lock, Eye, EyeOff } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface User {
  _id: string;
  username: string;
  email?: string;
  role: 'Freelancer' | 'Creator' | 'Admin';
  walletAddress?: string;
  bio?: string;
  avatar?: string;
  reputation: {
    bountiesFunded: number;
    completionRate: number;
    tasksCompleted: number;
    totalRewardsEarned: number;
    successRate: number;
  };
  privacyScore: {
    average: number;
    highest: number;
    championCount: number;
    totalShieldedEarnings: number;
  };
  createdAt: string;
}

export default function AdminPage() {
  const { user, token, login, logout, isLoading: authLoading } = useAuth();
  const router = useRouter();

  // Authentication State for Admin page login
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Portal State
  const [activeTab, setActiveTab] = useState<'users' | 'bounties'>('users');
  const [users, setUsers] = useState<User[]>([]);
  const [bounties, setBounties] = useState<any[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);

  // Redirect Creators to Sponsor portal
  useEffect(() => {
    if (user && user.role === 'Creator') {
      router.replace('/sponsor');
    }
  }, [user, router]);

  // Fetch dashboard data
  const fetchData = async () => {
    if (!token || !user || user.role !== 'Admin') return;
    setIsLoadingData(true);
    try {
      if (activeTab === 'users') {
        const response = await fetch(`${API_BASE}/api/auth/users`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          const errData = await response.json().catch(() => ({}));
          console.error("Users fetch failed:", response.status, errData);
          alert(`Failed to load users: ${errData.error || response.statusText || "Forbidden"}`);
        }
      } else if (activeTab === 'bounties') {
        const response = await fetch(`${API_BASE}/api/bounties`);
        if (response.ok) {
          const data = await response.json();
          setBounties(data);
        } else {
          console.error("Bounties fetch failed:", response.status);
          alert("Failed to load bounties.");
        }
      }
    } catch (err) {
      console.error("Failed to fetch admin data:", err);
      alert("Network error: Failed to connect to server.");
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab, token, user]);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsLoggingIn(true);
    try {
      const res = await login(adminEmail, adminPassword);
      if (res.user.role !== 'Admin') {
        setLoginError("Access denied: Admin role required.");
        logout();
      }
    } catch (err: any) {
      setLoginError(err.message || "Invalid credentials.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-on-surface-variant">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="mt-4 font-medium">Verifying admin session...</p>
      </div>
    );
  }

  // 1. If not logged in: Show Admin login panel
  if (!user) {
    return (
      <div className="bg-background min-h-screen flex flex-col items-center justify-center p-4">
        <div className="bg-surface border border-outline-variant rounded-2xl p-8 max-w-md w-full shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto border border-primary/20">
              <ShieldCheck className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-display text-3xl font-bold tracking-tight text-on-surface">Admin Portal</h1>
            <p className="text-sm text-on-surface-variant font-body-md">Sign in to the platform administrator portal</p>
          </div>

          {loginError && (
            <div className="p-3 bg-error-container/30 border border-error/20 text-error rounded-lg text-sm text-center font-medium font-body-md animate-fade-in">
              {loginError}
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="block text-sm font-bold text-on-surface font-body-md" htmlFor="admin-email">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-on-surface-variant">
                  <Mail className="w-5 h-5 opacity-60" />
                </span>
                <input
                  id="admin-email"
                  type="email"
                  required
                  placeholder="admin@zbounty.org"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="input-field w-full rounded-lg border-outline-variant bg-white py-3 pl-10 pr-3 font-body-md text-body-md text-on-surface"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-bold text-on-surface font-body-md" htmlFor="admin-password">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-on-surface-variant">
                  <Lock className="w-5 h-5 opacity-60" />
                </span>
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
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

  // 2. If logged in but role is not Admin: Access Denied
  if (user.role !== 'Admin') {
    return (
      <div className="bg-background min-h-screen flex flex-col items-center justify-center p-4 text-center">
        <div className="bg-surface border border-outline-variant rounded-2xl p-8 max-w-md w-full shadow-2xl space-y-6">
          <div className="w-16 h-16 bg-error-container/30 rounded-full flex items-center justify-center mx-auto text-error border border-error/20 animate-pulse">
            <ShieldAlert className="w-9 h-9" />
          </div>
          <h1 className="font-headline-lg text-on-surface font-bold">Access Denied</h1>
          <p className="text-on-surface-variant font-body-md max-w-sm mx-auto leading-relaxed">
            Your account <strong>({user.username})</strong> does not have administrator privileges.
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

  // 3. Admin is logged in: Show administrator dashboard
  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col font-body-md antialiased pb-16">
      
      {/* Admin Navbar */}
      <header className="px-6 py-4 border-b border-outline-variant flex items-center justify-between sticky top-0 bg-surface/80 backdrop-blur-xl z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-7 h-7 text-primary" />
          <span className="font-space-grotesk font-bold text-2xl tracking-tight text-on-surface">
            ZBounty Admin
          </span>
          <span className="bg-primary-container text-on-primary-container text-[10px] font-bold font-mono px-2 py-0.5 rounded-full uppercase tracking-wider">
            Admin Portal
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <img
              alt="Admin Profile"
              className="w-8 h-8 rounded-full border border-outline-variant object-cover"
              src={user.avatar || "https://api.dicebear.com/7.x/identicon/svg?seed=admin"}
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

      {/* Main Admin Dashboard */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 flex flex-col gap-6">
        
        {/* Banner */}
        <div className="border-b border-outline-variant pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-headline-lg text-on-surface font-extrabold tracking-tight">Platform Overview</h1>
            <p className="text-on-surface-variant font-body-md">
              Inspect user reputation profiles, Zcash shielding metrics, and inspect all active sponsor-funded bounties.
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 bg-surface-container rounded-lg p-1 border border-outline-variant self-start sm:self-center">
            <button
              onClick={() => setActiveTab('users')}
              className={`flex items-center gap-2 px-4 py-2 font-label-sm text-label-sm rounded-md transition-colors ${
                activeTab === 'users'
                  ? 'bg-surface-container-lowest text-primary font-bold shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <Users className="w-4 h-4" />
              Users ({users.length})
            </button>
            <button
              onClick={() => setActiveTab('bounties')}
              className={`flex items-center gap-2 px-4 py-2 font-label-sm text-label-sm rounded-md transition-colors ${
                activeTab === 'bounties'
                  ? 'bg-surface-container-lowest text-primary font-bold shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <ClipboardList className="w-4 h-4" />
              Sponsor Bounties ({bounties.length})
            </button>
          </div>
        </div>

        {/* Tab Content Canvas */}
        <div className="flex-1">
          {isLoadingData ? (
            <div className="py-24 flex flex-col items-center justify-center text-on-surface-variant space-y-4">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <p className="font-medium">Retrieving database data...</p>
            </div>
          ) : activeTab === 'users' ? (
            // ================== Users Tab ==================
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden card-shadow">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container font-label-sm text-label-sm uppercase text-on-surface-variant border-b border-outline-variant">
                      <th className="p-4 font-bold">User</th>
                      <th className="p-4 font-bold">Email</th>
                      <th className="p-4 font-bold">Role</th>
                      <th className="p-4 font-bold">Zcash Wallet Address</th>
                      <th className="p-4 font-bold text-center">Bounties Solved</th>
                      <th className="p-4 font-bold text-right">Shielded Earnings</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant font-body-md text-on-surface">
                    {users.map((u) => (
                      <tr key={u._id} className="hover:bg-surface-container-low transition-colors">
                        <td className="p-4 flex items-center gap-3">
                          <img
                            alt="Avatar"
                            className="w-9 h-9 rounded-full object-cover border border-outline-variant bg-surface"
                            src={u.avatar || "https://api.dicebear.com/7.x/adventurer/svg?seed=" + u.username}
                          />
                          <div>
                            <div className="font-bold text-on-surface">{u.username}</div>
                            <div className="text-xs text-on-surface-variant">Joined {new Date(u.createdAt).toLocaleDateString()}</div>
                          </div>
                        </td>
                        <td className="p-4 text-sm text-on-surface-variant font-mono">
                          {u.email || "—"}
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-2 py-0.5 text-[10px] font-bold font-mono uppercase rounded-full tracking-wider ${
                              u.role === 'Admin'
                                ? 'bg-primary-container text-on-primary-container border border-primary/20'
                                : 'bg-surface-variant text-on-surface-variant'
                            }`}
                          >
                            {u.role}
                          </span>
                        </td>
                        <td className="p-4 text-xs font-mono text-on-surface-variant max-w-xs truncate" title={u.walletAddress}>
                          {u.walletAddress || "—"}
                        </td>
                        <td className="p-4 text-center font-bold">
                          {u.reputation?.tasksCompleted || 0}
                        </td>
                        <td className="p-4 text-right font-bold text-primary font-mono">
                          {u.privacyScore?.totalShieldedEarnings?.toFixed(2) || "0.00"} ZEC
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            // ================== Sponsor Bounties Tab ==================
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden card-shadow">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container font-label-sm text-label-sm uppercase text-on-surface-variant border-b border-outline-variant">
                      <th className="p-4 font-bold">Bounty Title</th>
                      <th className="p-4 font-bold">Sponsor (Creator)</th>
                      <th className="p-4 font-bold">Category</th>
                      <th className="p-4 font-bold text-center">Reward</th>
                      <th className="p-4 font-bold text-center">Status</th>
                      <th className="p-4 font-bold text-right">Created Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant font-body-md text-on-surface">
                    {bounties.map((b) => (
                      <tr key={b._id} className="hover:bg-surface-container-low transition-colors">
                        <td className="p-4 font-bold text-on-surface">
                          {b.title}
                        </td>
                        <td className="p-4 flex items-center gap-3">
                          <img
                            alt="Sponsor Avatar"
                            className="w-8 h-8 rounded-full object-cover border border-outline-variant bg-surface"
                            src={b.creatorId?.avatar || "https://api.dicebear.com/7.x/identicon/svg?seed=" + (b.creatorId?.username || "sponsor")}
                          />
                          <span className="font-bold">{b.creatorId?.username || "Unknown Sponsor"}</span>
                        </td>
                        <td className="p-4">
                          <span className="bg-surface-variant text-on-surface-variant px-2.5 py-1 rounded text-xs">
                            {b.category}
                          </span>
                        </td>
                        <td className="p-4 text-center font-bold text-primary font-mono">
                          {b.reward?.toFixed(1) || "0.0"} ZEC
                        </td>
                        <td className="p-4 text-center">
                          <span
                            className={`px-2.5 py-0.5 text-[10px] font-bold font-mono uppercase rounded-full tracking-wider ${
                              b.status === 'Completed'
                                ? 'bg-success/10 text-success border border-success/20'
                                : b.status === 'Open'
                                ? 'bg-info/10 text-info border border-info/20'
                                : b.status === 'In Review'
                                ? 'bg-warning/10 text-warning border border-warning/20'
                                : 'bg-surface-variant text-on-surface-variant'
                            }`}
                          >
                            {b.status}
                          </span>
                        </td>
                        <td className="p-4 text-right text-sm text-on-surface-variant">
                          {new Date(b.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
