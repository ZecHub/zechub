"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export interface User {
  _id: string;
  username: string;
  email?: string;
  role: 'Freelancer' | 'Creator' | 'Admin';
  walletAddress?: string;
  bio?: string;
  avatar?: string;
  reputation?: {
    bountiesFunded: number;
    completionRate: number;
    tasksCompleted: number;
    totalRewardsEarned: number;
    successRate: number;
  };
  privacyScore?: {
    average: number;
    highest: number;
    championCount: number;
    totalShieldedEarnings: number;
  };
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  balance: number;
  balanceLoading: boolean;
  isLoading: boolean;
  signup: (username: string, email: string, password: string, role?: string) => Promise<boolean>;
  login: (email: string, password: string, role?: string) => Promise<{ needsWallet: boolean; user: User }>;
  loginWithGoogle: (email: string, name: string, picture: string, credential?: string) => Promise<{ needsWallet: boolean; user: User }>;
  linkWallet: (walletAddress: string) => Promise<boolean>;
  updateProfile: (data: { username?: string; bio?: string; avatar?: string }) => Promise<boolean>;
  logout: () => void;
  refreshBalance: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [balance, setBalance] = useState<number>(0);
  const [balanceLoading, setBalanceLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize session from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("zb_user");
    const storedToken = localStorage.getItem("zb_token");
    const storedBalance = localStorage.getItem("zb_balance");

    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedToken) setToken(storedToken);
    if (storedBalance) setBalance(parseFloat(storedBalance));

    setIsLoading(false);
  }, []);

  const refreshBalance = useCallback(async () => {
    if (!user?.walletAddress) return;
    setBalanceLoading(true);
    try {
      // Use the unified zcash balance endpoint (gRPC-backed or mock)
      const response = await fetch(
        `${API_BASE}/api/zcash/balance/${encodeURIComponent(user.walletAddress)}`
      );
      if (response.ok) {
        const data = await response.json();
        setBalance(data.balance);
        localStorage.setItem("zb_balance", data.balance.toString());
      }
    } catch (e) {
      console.error("Failed to refresh ZEC balance:", e);
    } finally {
      setBalanceLoading(false);
    }
  }, [user?.walletAddress]);

  // Sync balance when user wallet changes
  useEffect(() => {
    if (user?.walletAddress) {
      refreshBalance();
      // Periodically refresh balance every 15 seconds
      const interval = setInterval(refreshBalance, 15000);
      return () => clearInterval(interval);
    } else {
      setBalance(0.0);
    }
  }, [user?.walletAddress, refreshBalance]);

  const signup = async (username: string, email: string, password: string, role?: string) => {
    try {
      const response = await fetch(`${API_BASE}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, role }),
      });

      if (!response.ok) {
        let errMsg = "Signup failed";
        try {
          const errData = await response.json();
          errMsg = errData.error || errMsg;
        } catch {
          errMsg = `Signup failed with status code ${response.status}: ${response.statusText || "Internal Server Error"}`;
        }
        throw new Error(errMsg);
      }

      const data = await response.json();
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("zb_user", JSON.stringify(data.user));
      localStorage.setItem("zb_token", data.token);
      return true;
    } catch (error) {
      console.error("Signup Error:", error);
      throw error;
    }
  };

  const login = async (email: string, password: string, role?: string) => {
    try {
      const response = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      if (!response.ok) {
        let errMsg = "Login failed";
        try {
          const errData = await response.json();
          errMsg = errData.error || errMsg;
        } catch {
          errMsg = `Login failed with status code ${response.status}: ${response.statusText || "Internal Server Error"}`;
        }
        throw new Error(errMsg);
      }

      const data = await response.json();
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("zb_user", JSON.stringify(data.user));
      localStorage.setItem("zb_token", data.token);

      return { needsWallet: data.needsWallet, user: data.user };
    } catch (error) {
      console.error("Login Error:", error);
      throw error;
    }
  };

  const loginWithGoogle = async (
    email: string,
    name: string,
    picture: string,
    credential?: string
  ) => {
    try {
      const response = await fetch(`${API_BASE}/api/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, picture, credential }),
      });

      if (!response.ok) throw new Error("Google login failed");

      const data = await response.json();
      
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("zb_user", JSON.stringify(data.user));
      localStorage.setItem("zb_token", data.token);

      return { needsWallet: data.needsWallet, user: data.user };
    } catch (error) {
      console.error("Login Error:", error);
      throw error;
    }
  };

  const linkWallet = async (walletAddress: string) => {
    if (!token) return false;
    try {
      // First, validate the address server-side via the zcash endpoint
      const validateRes = await fetch(
        `${API_BASE}/api/zcash/validate?address=${encodeURIComponent(walletAddress)}`
      );
      if (validateRes.ok) {
        const validateData = await validateRes.json();
        // If it's a t-address that fails validation, reject.
        // Shielded addresses won't pass t-address validation, so we allow them through
        // the auth link-wallet endpoint which does its own checks.
        if (!validateData.valid && walletAddress.startsWith("t")) {
          console.error("Address validation failed:", validateData.error);
          return false;
        }
      }

      const response = await fetch(`${API_BASE}/api/auth/link-wallet`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ walletAddress }),
      });

      if (!response.ok) throw new Error("Failed to link address");

      const data = await response.json();
      
      // Update local state
      const updatedUser = { ...user, walletAddress } as User;
      setUser(updatedUser);
      localStorage.setItem("zb_user", JSON.stringify(updatedUser));
      
      // Trigger instant balance sync
      await refreshBalance();
      return true;
    } catch (error) {
      console.error("Link Wallet Error:", error);
      return false;
    }
  };

  const updateProfile = async (data: { username?: string; bio?: string; avatar?: string }) => {
    if (!token) return false;
    try {
      const response = await fetch(`${API_BASE}/api/auth/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to update profile");

      const responseData = await response.json();
      
      const updatedUser = { ...user, ...responseData.user } as User;
      setUser(updatedUser);
      localStorage.setItem("zb_user", JSON.stringify(updatedUser));
      
      return true;
    } catch (error) {
      console.error("Update Profile Error:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setBalance(0.0);
    localStorage.removeItem("zb_user");
    localStorage.removeItem("zb_token");
    localStorage.removeItem("zb_balance");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        balance,
        balanceLoading,
        isLoading,
        signup,
        login,
        loginWithGoogle,
        linkWallet,
        updateProfile,
        logout,
        refreshBalance,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
