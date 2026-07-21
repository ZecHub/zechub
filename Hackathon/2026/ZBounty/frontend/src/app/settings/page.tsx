"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Check, Loader2, CheckCircle2, XCircle, RefreshCw } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useZcashBalance } from "@/hooks/useZcashBalance";
import { formatZec } from "@/lib/utils";
import { QRCodeSVG } from "qrcode.react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function SettingsPage() {
  const { user, linkWallet, updateProfile } = useAuth();
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [payoutAddress, setPayoutAddress] = useState("");
  const [autoWithdraw, setAutoWithdraw] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  // Inline validation state
  const [validationStatus, setValidationStatus] = useState<"idle" | "validating" | "valid" | "invalid">("idle");
  const [validationError, setValidationError] = useState("");

  // Lightwalletd health
  const [healthStatus, setHealthStatus] = useState<"unknown" | "ok" | "error">("unknown");

  // Live balance for the address being viewed/edited
  const { balance: liveBalance, isLoading: balanceLoading, refresh: refreshLiveBalance } = useZcashBalance(
    validationStatus === "valid" || (payoutAddress && payoutAddress === user?.walletAddress) ? payoutAddress : null,
    20_000
  );

  useEffect(() => {
    if (user) {
      setUsername(user.username || "");
      setBio(user.bio || "");
      setPayoutAddress(user.walletAddress || "");
      // If user already has a wallet linked, mark as valid
      if (user.walletAddress) {
        setValidationStatus("valid");
      }
    }
  }, [user]);

  // Check lightwalletd health
  useEffect(() => {
    fetch(`${API_BASE}/api/zcash/health`)
      .then(res => res.json())
      .then(data => setHealthStatus(data.status === "ok" ? "ok" : "error"))
      .catch(() => setHealthStatus("error"));
  }, []);

  // Debounced validation when address changes
  useEffect(() => {
    if (!payoutAddress.trim()) {
      setValidationStatus("idle");
      setValidationError("");
      return;
    }

    // If it's the same as the already-linked address, skip re-validation
    if (payoutAddress === user?.walletAddress) {
      setValidationStatus("valid");
      setValidationError("");
      return;
    }

    // Client-side pre-check for t-addresses and UAs
    if (payoutAddress.startsWith("t1") || payoutAddress.startsWith("t3") || payoutAddress.startsWith("u1")) {
      setValidationStatus("validating");
      const timeout = setTimeout(async () => {
        try {
          const res = await fetch(`${API_BASE}/api/zcash/validate?address=${encodeURIComponent(payoutAddress.trim())}`);
          const data = await res.json();
          if (data.valid) {
            setValidationStatus("valid");
            setValidationError("");
          } else {
            setValidationStatus("invalid");
            setValidationError(data.error || "Invalid address");
          }
        } catch {
          setValidationStatus("invalid");
          setValidationError("Could not validate address");
        }
      }, 500);
      return () => clearTimeout(timeout);
    }

    // Accept shielded addresses without t-address validation
    if (payoutAddress.startsWith("z") || payoutAddress.startsWith("zs")) {
      setValidationStatus("valid");
      setValidationError("");
      return;
    }

    setValidationStatus("invalid");
    setValidationError("Must be a mainnet t-address (t1.../t3...), shielded z-address, or Unified Address (u1...)");
  }, [payoutAddress, user?.walletAddress]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save profile data (username, bio)
    const profileSuccess = await updateProfile({ username, bio });
    if (!profileSuccess) {
      alert("Failed to update profile data.");
      return;
    }

    // Save wallet address if changed
    if (payoutAddress && payoutAddress !== user?.walletAddress) {
      if (validationStatus !== "valid") {
        alert("Please enter a valid Zcash address.");
        return;
      }
      const success = await linkWallet(payoutAddress);
      if (!success) {
        alert("Failed to link Zcash address.");
        return;
      }
    }
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 3000);
  };

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
                Account Settings
              </h1>
              <p className="font-body-md text-on-surface-variant">
                Configure your freelancer profile, payout settings, and privacy preferences.
              </p>
            </div>
          </header>

          {/* Form Content */}
          <form onSubmit={handleSave} className="max-w-2xl flex flex-col gap-6">
            
            {/* Profile Info Section */}
            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-stack-lg card-shadow space-y-6">
              <h2 className="font-headline-md text-headline-md text-on-surface border-b border-outline-variant pb-2">
                Profile Details
              </h2>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="relative group cursor-pointer">
                  <img
                    alt="Freelancer Avatar"
                    className="w-24 h-24 rounded-full object-cover shadow-sm border border-outline-variant group-hover:opacity-75 transition-opacity"
                    src={user?.avatar || "https://lh3.googleusercontent.com/aida-public/AB6AXuDw39ScrxNa3ZgzehfSnq_YoRqJofZus71SLW3Bb7uZtGBzNwV55CayP5mje1Trt7rMVRtD5X-a74dAPHwUlq3MqhfX7flwAvqOgzv3ovfQJh_UZWcxifC0HJEMI5w9ijaNf9_U_9MlKEHHY85-PRy3DXq2P5WARiDSltoNf1_7QsxWWcaIevld4uD7XoV1Zhm581DkNtbo-FrRbPxihGvZVVlg-nUvq9FcP1tOkfAYu7gueTu3PRLBVBROwBxxllhyJ6i_0BhBGw"}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="material-symbols-outlined text-white text-xl">
                      edit
                    </span>
                  </div>
                </div>

                <div className="flex-1 w-full space-y-4">
                  <div>
                    <label className="block font-label-md text-label-md text-on-surface mb-2 font-bold">
                      Username
                    </label>
                    <input
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="input-field w-full rounded-lg border-[#E4E4E7] bg-white p-3 font-body-md text-body-md text-on-surface"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-label-md text-label-md text-on-surface mb-2 font-bold">
                  Bio / Skills Summary
                </label>
                <textarea
                  rows={4}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="input-field w-full rounded-lg border-[#E4E4E7] bg-white p-3 font-body-md text-body-md text-on-surface resize-none"
                />
              </div>
            </div>

            {/* Zcash Wallet & Payouts Info Section */}
            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-stack-lg card-shadow space-y-6">
              <div className="flex items-center justify-between border-b border-outline-variant pb-2">
                <h2 className="font-headline-md text-headline-md text-on-surface">
                  Payout Settings
                </h2>
                {/* Lightwalletd status */}
                <div className="flex items-center gap-2 text-xs">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      healthStatus === "ok"
                        ? "bg-[#16A34A] balance-live-indicator"
                        : healthStatus === "error"
                        ? "bg-error"
                        : "bg-outline"
                    }`}
                  />
                  <span className="text-on-surface-variant font-label-sm">
                    {healthStatus === "ok" ? "Connected" : healthStatus === "error" ? "Mock mode" : "..."}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block font-label-md text-label-md text-on-surface mb-2 font-bold">
                    Default Zcash Address (t-address preferred for balance lookup)
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-on-surface-variant">
                      <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
                        wallet
                      </span>
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="u1..., zs1..., or t1..."
                      value={payoutAddress}
                      onChange={(e) => setPayoutAddress(e.target.value)}
                      className={`input-field w-full rounded-lg bg-white py-3 pl-10 pr-10 font-label-md text-label-md text-on-surface tracking-wider font-mono text-sm transition-all ${
                        validationStatus === "valid"
                          ? "border-[#16A34A] focus:border-[#16A34A]"
                          : validationStatus === "invalid"
                          ? "border-error focus:border-error"
                          : "border-[#E4E4E7]"
                      }`}
                    />
                    {/* Inline validation indicator */}
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {validationStatus === "validating" && (
                        <Loader2 className="w-4 h-4 text-on-surface-variant animate-spin" />
                      )}
                      {validationStatus === "valid" && (
                        <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                      )}
                      {validationStatus === "invalid" && (
                        <XCircle className="w-4 h-4 text-error" />
                      )}
                    </div>
                  </div>

                  {/* Validation feedback */}
                  {validationStatus === "invalid" && validationError && (
                    <p className="text-xs text-error mt-2">{validationError}</p>
                  )}
                  {validationStatus === "valid" && (
                    <p className="font-label-sm text-label-sm text-[#16A34A] mt-2 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Valid mainnet address
                    </p>
                  )}
                  {validationStatus === "idle" && (
                    <p className="font-label-sm text-label-sm text-on-surface-variant mt-2">
                      Using a t-address or UA enables real-time on-chain balance lookup.
                    </p>
                  )}
                </div>

                {/* Live Balance Readout */}
                {validationStatus === "valid" && (
                  <div className="bg-surface-container-low border border-outline-variant rounded-lg p-4 transition-all">
                    <div className="flex items-center justify-between">
                      <span className="font-label-sm text-on-surface-variant uppercase tracking-wider flex items-center gap-2">
                        Confirmed Balance
                        <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] balance-live-indicator" />
                      </span>
                      <button
                        type="button"
                        onClick={() => refreshLiveBalance()}
                        className="text-on-surface-variant hover:text-primary transition-colors"
                        title="Refresh balance"
                      >
                        {balanceLoading ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <RefreshCw className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                    <div className="mt-2 flex items-baseline gap-2">
                      {liveBalance !== null ? (
                        <>
                          <span className="font-display text-2xl font-bold text-on-surface">
                            {formatZec(liveBalance)}
                          </span>
                          <span className="text-on-surface-variant font-label-md">ZEC</span>
                        </>
                      ) : balanceLoading ? (
                        <span className="text-on-surface-variant font-label-sm animate-pulse">Loading...</span>
                      ) : (
                        <span className="text-on-surface-variant font-label-sm">—</span>
                      )}
                    </div>
                    <p className="text-[10px] text-on-surface-variant mt-2 opacity-75">
                      Confirmed funds only — unconfirmed/mempool transactions excluded · Polling every 20s
                    </p>
                  </div>
                )}

                {/* QR Code Section */}
                {validationStatus === "valid" && payoutAddress && (
                  <div className="bg-surface-container-low border border-outline-variant rounded-lg p-6 flex flex-col sm:flex-row items-center gap-6 mt-6 transition-all">
                    <div className="bg-white p-3 rounded-xl shadow-sm shrink-0">
                      <QRCodeSVG
                        value={payoutAddress}
                        size={140}
                        bgColor={"#ffffff"}
                        fgColor={"#000000"}
                        level={"H"}
                        includeMargin={false}
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <h3 className="font-headline-md text-on-surface font-bold">Receiving QR Code</h3>
                      <p className="text-on-surface-variant font-body-md text-sm">
                        Scan this code with a Zcash wallet to receive funds. Your wallet supports the following pools:
                      </p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {payoutAddress.startsWith('u1') && (
                          <>
                            <span className="bg-[#f0fdf4] text-[#16a34a] border border-[#bbf7d0] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Orchard</span>
                            <span className="bg-[#f0fdf4] text-[#16a34a] border border-[#bbf7d0] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Sapling</span>
                            <span className="bg-surface-variant text-on-surface-variant border border-outline px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Transparent</span>
                          </>
                        )}
                        {(payoutAddress.startsWith('zs') || payoutAddress.startsWith('z')) && !payoutAddress.startsWith('u1') && (
                          <span className="bg-[#f0fdf4] text-[#16a34a] border border-[#bbf7d0] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Sapling</span>
                        )}
                        {(payoutAddress.startsWith('t1') || payoutAddress.startsWith('t3')) && (
                          <span className="bg-surface-variant text-on-surface-variant border border-outline px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Transparent</span>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between border-t border-outline-variant pt-6">
                  <div>
                    <span className="font-body-md text-body-md font-bold text-on-surface block">
                      Auto-withdraw Rewards
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      Automatically transfer ZEC to your address when a claim is approved.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAutoWithdraw(!autoWithdraw)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      autoWithdraw ? "bg-[#745b00]" : "bg-surface-container-high"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        autoWithdraw ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Save button */}
            <div className="flex justify-end items-center gap-4">
              {isSaved && (
                <span className="text-[#16a34a] font-label-md text-label-md flex items-center gap-1">
                  <Check className="w-4 h-4" />
                  Settings saved successfully!
                </span>
              )}
              <button
                type="submit"
                className="btn-primary px-8 py-3.5 rounded-lg font-label-md text-label-md font-bold uppercase transition-colors card-shadow"
              >
                Save Settings
              </button>
            </div>

          </form>

        </main>
      </div>
    </div>
  );
}
