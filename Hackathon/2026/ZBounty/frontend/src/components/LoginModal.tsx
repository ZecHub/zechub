"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Loader2, Mail, Lock, User as UserIcon, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialIsSignUp?: boolean;
}

export function LoginModal({ isOpen, onClose, initialIsSignUp = false }: LoginModalProps) {
  const { login, signup } = useAuth();
  const [isSignUp, setIsSignUp] = useState(initialIsSignUp);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form Fields
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'Freelancer' | 'Creator'>('Freelancer');

  // Sync state when props change or modal is reopened
  useEffect(() => {
    if (isOpen) {
      setIsSignUp(initialIsSignUp);
      setError(null);
      setUsername("");
      setEmail("");
      setPassword("");
      setShowPassword(false);
      setSelectedRole("Freelancer");
    }
  }, [initialIsSignUp, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (isSignUp) {
        if (!username || !email || !password) {
          setError("All fields are required.");
          setIsLoading(false);
          return;
        }
        await signup(username, email, password, selectedRole);
      } else {
        if (!email || !password) {
          setError("All fields are required.");
          setIsLoading(false);
          return;
        }
        await login(email, password, selectedRole);
      }
      onClose();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Authentication failed. Please check your credentials.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-surface border border-outline-variant rounded-2xl p-8 max-w-md w-full shadow-2xl space-y-6 animate-scale-up">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h3 className="font-display text-3xl font-bold tracking-tight text-on-surface">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h3>
          <p className="text-sm text-on-surface-variant font-body-md">
            {isSignUp 
              ? "Join ZBounty to start earning private rewards" 
              : "Sign in with your email to access your dashboard"}
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3 bg-error-container/30 border border-error/20 text-error rounded-lg text-sm text-center font-medium font-body-md">
            {error}
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role Selector Segmented Control */}
          <div className="space-y-1">
            <label className="block text-sm font-bold text-on-surface font-body-md mb-2">
              Select Your Role
            </label>
            <div className="grid grid-cols-2 gap-2 bg-surface-container border border-outline-variant p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setSelectedRole("Freelancer")}
                className={cn(
                  "py-2 px-4 rounded-lg font-label-md text-label-md font-bold transition-all cursor-pointer text-center",
                  selectedRole === "Freelancer"
                    ? "bg-primary-container text-on-primary-container shadow-sm"
                    : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
                )}
              >
                Freelancer
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole("Creator")}
                className={cn(
                  "py-2 px-4 rounded-lg font-label-md text-label-md font-bold transition-all cursor-pointer text-center",
                  selectedRole === "Creator"
                    ? "bg-primary-container text-on-primary-container shadow-sm"
                    : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
                )}
              >
                Creator
              </button>
            </div>
          </div>

          {isSignUp && (
            <div className="space-y-1">
              <label className="block text-sm font-bold text-on-surface font-body-md" htmlFor="reg-username">
                Username
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-on-surface-variant">
                  <UserIcon className="w-5 h-5 opacity-60" />
                </span>
                <input
                  id="reg-username"
                  type="text"
                  required
                  placeholder="johndoe"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input-field w-full rounded-lg border-outline-variant bg-white py-3 pl-10 pr-3 font-body-md text-body-md text-on-surface"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="block text-sm font-bold text-on-surface font-body-md" htmlFor="auth-email">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-on-surface-variant">
                <Mail className="w-5 h-5 opacity-60" />
              </span>
              <input
                id="auth-email"
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field w-full rounded-lg border-outline-variant bg-white py-3 pl-10 pr-3 font-body-md text-body-md text-on-surface"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-bold text-on-surface font-body-md" htmlFor="auth-password">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-on-surface-variant">
                <Lock className="w-5 h-5 opacity-60" />
              </span>
              <input
                id="auth-password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full py-3.5 mt-2 rounded-lg font-bold text-sm tracking-wide transition-all duration-200 uppercase flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing...
              </>
            ) : (
              isSignUp ? "Sign Up" : "Sign In"
            )}
          </button>
        </form>

        {/* Toggle Mode Footer */}
        <div className="text-center pt-2 border-t border-outline-variant">
          <p className="text-sm font-body-md text-on-surface-variant">
            {isSignUp ? "Already have an account?" : "Don't have an account yet?"}{" "}
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError(null);
              }}
              className="text-primary font-bold hover:underline cursor-pointer"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full py-3 bg-secondary-container hover:bg-secondary-container/85 text-on-secondary-container font-label-md text-label-md font-bold rounded-lg uppercase transition-colors cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
