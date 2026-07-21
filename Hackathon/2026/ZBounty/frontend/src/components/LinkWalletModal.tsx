"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { Loader2, ShieldCheck, Wallet, CheckCircle2, XCircle, RefreshCw } from "lucide-react";
import { formatZec } from "@/lib/utils";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface LinkWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LinkWalletModal({ isOpen, onClose }: LinkWalletModalProps) {
  const { linkWallet } = useAuth();
  const [address, setAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Inline validation state
  const [validationStatus, setValidationStatus] = useState<"idle" | "validating" | "valid" | "invalid">("idle");
  const [validationError, setValidationError] = useState("");

  // Balance preview state
  const [previewBalance, setPreviewBalance] = useState<number | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);

  // Lightwalletd health state
  const [healthStatus, setHealthStatus] = useState<"unknown" | "ok" | "error">("unknown");

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Check lightwalletd health on mount
  useEffect(() => {
    if (!isOpen) return;
    fetch(`${API_BASE}/api/zcash/health`)
      .then(res => res.json())
      .then(data => setHealthStatus(data.status === "ok" ? "ok" : "error"))
      .catch(() => setHealthStatus("error"));
  }, [isOpen]);

  // Debounced server-side validation
  useEffect(() => {
    if (!address.trim()) {
      setValidationStatus("idle");
      setValidationError("");
      setPreviewBalance(null);
      return;
    }

    // Client-side pre-check
    if (!address.startsWith("t1") && !address.startsWith("t3")) {
      // Allow shielded addresses through without t-address validation
      if (address.startsWith("z") || address.startsWith("zs")) {
        setValidationStatus("valid");
        setValidationError("");
        fetchBalancePreview(address);
        return;
      }
      setValidationStatus("invalid");
      setValidationError("Must be a mainnet t-address (t1... or t3...) or shielded z-address");
      setPreviewBalance(null);
      return;
    }

    setValidationStatus("validating");
    setPreviewBalance(null);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`${API_BASE}/api/zcash/validate?address=${encodeURIComponent(address.trim())}`);
        const data = await res.json();
        if (data.valid) {
          setValidationStatus("valid");
          setValidationError("");
          fetchBalancePreview(address.trim());
        } else {
          setValidationStatus("invalid");
          setValidationError(data.error || "Invalid address");
          setPreviewBalance(null);
        }
      } catch {
        setValidationStatus("invalid");
        setValidationError("Could not validate address");
        setPreviewBalance(null);
      }
    }, 500);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [address]);

  const fetchBalancePreview = async (addr: string) => {
    setPreviewLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/zcash/balance/${encodeURIComponent(addr)}`);
      if (res.ok) {
        const data = await res.json();
        setPreviewBalance(data.balance);
      }
    } catch {
      // Silently fail — balance preview is optional
    } finally {
      setPreviewLoading(false);
    }
  };

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    const trimmed = address.trim();
    if (!trimmed) {
      setError("Please enter an address");
      return;
    }

    if (validationStatus === "invalid") {
      setError(validationError || "Invalid address");
      return;
    }

    setIsSubmitting(true);
    const success = await linkWallet(trimmed);
    setIsSubmitting(false);

    if (success) {
      setAddress("");
      setValidationStatus("idle");
      setPreviewBalance(null);
      onClose();
    } else {
      setError("Failed to link address. Please try again.");
    }
  };

  const usePreset = (presetAddress: string) => {
    setAddress(presetAddress);
    setError("");
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-lg max-w-md w-full shadow-2xl relative flex flex-col gap-5 animate-scale-up">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center mx-auto mb-2 text-primary">
            <Wallet className="w-6 h-6" />
          </div>
          <h2 className="font-headline-lg text-on-surface font-bold">
            Link Zcash Wallet
          </h2>
          <p className="font-body-md text-on-surface-variant">
            To receive private rewards, link a Zcash address to your Google account.
          </p>
        </div>

        {/* Lightwalletd status indicator */}
        <div className="flex items-center justify-center gap-2 text-xs">
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
            {healthStatus === "ok"
              ? "Lightwalletd connected"
              : healthStatus === "error"
              ? "Lightwalletd unavailable (mock mode)"
              : "Checking connection..."}
          </span>
        </div>

        {/* Error message */}
        {error && (
          <div className="p-3 bg-error-container text-on-error-container border border-error/20 rounded-lg text-body-sm font-body-sm text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block font-label-md text-label-md text-on-surface font-bold">
              Zcash Address (t-address or shielded z-address)
            </label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="t1... or zs1..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={`input-field w-full rounded-lg bg-white p-3 pr-10 font-mono text-sm tracking-wider text-on-surface transition-all ${
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
            {/* Validation message */}
            {validationStatus === "invalid" && validationError && (
              <p className="text-xs text-error mt-1">{validationError}</p>
            )}
            {validationStatus === "valid" && (
              <p className="text-xs text-[#16A34A] mt-1 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                Valid mainnet address
              </p>
            )}
          </div>

          {/* Balance Preview */}
          {validationStatus === "valid" && (
            <div className="bg-surface-container-low border border-outline-variant rounded-lg p-4 transition-all">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-on-surface-variant uppercase tracking-wider">
                  Confirmed Balance
                </span>
                {previewLoading ? (
                  <Loader2 className="w-4 h-4 text-on-surface-variant animate-spin" />
                ) : (
                  <button
                    type="button"
                    onClick={() => fetchBalancePreview(address.trim())}
                    className="text-on-surface-variant hover:text-primary transition-colors"
                    title="Refresh balance"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                {previewBalance !== null ? (
                  <>
                    <span className="font-display text-2xl font-bold text-on-surface">
                      {formatZec(previewBalance)}
                    </span>
                    <span className="text-on-surface-variant font-label-md">ZEC</span>
                  </>
                ) : previewLoading ? (
                  <span className="text-on-surface-variant font-label-sm">Loading...</span>
                ) : (
                  <span className="text-on-surface-variant font-label-sm">—</span>
                )}
              </div>
              <p className="text-[10px] text-on-surface-variant mt-2 opacity-75">
                Confirmed funds only — unconfirmed/mempool transactions are excluded.
              </p>
            </div>
          )}

          {/* Quick presets for testing */}
          <div className="bg-surface-container-low p-4 rounded-lg space-y-2 border border-outline-variant">
            <span className="font-label-sm text-label-sm text-on-surface-variant font-bold block">
              Demo Address Presets (Click to autofill)
            </span>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => usePreset("t1UNiT7M7ioboYTfT6kQCywnJQuKowJPq6Y")}
                className="text-left text-xs bg-white hover:bg-primary-container/20 p-2.5 rounded border border-outline-variant transition-all font-mono text-on-surface-variant flex items-center justify-between"
              >
                <span>t1UNiT7...owJPq6Y (Mainnet t-address)</span>
                <span className="text-[10px] bg-primary-container text-on-primary-container font-bold px-1.5 py-0.5 rounded uppercase">t-address</span>
              </button>
              <button
                type="button"
                onClick={() => usePreset("zs1mockaddresssapling202685749320abcdef")}
                className="text-left text-xs bg-white hover:bg-primary-container/20 p-2.5 rounded border border-outline-variant transition-all font-mono text-on-surface-variant flex items-center justify-between"
              >
                <span>zs1mock... (Shielded demo address)</span>
                <span className="text-[10px] bg-tertiary-container text-on-tertiary-container font-bold px-1.5 py-0.5 rounded uppercase">zs-address</span>
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md font-bold rounded-lg uppercase transition-colors"
            >
              Skip for now
            </button>
            <button
              type="submit"
              disabled={isSubmitting || validationStatus === "validating"}
              className="flex-1 py-3 bg-primary-container text-on-primary-container hover:bg-inverse-primary font-label-md text-label-md font-bold rounded-lg uppercase transition-all flex items-center justify-center gap-2 card-shadow disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Linking...
                </>
              ) : (
                <>
                  Link Wallet
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
