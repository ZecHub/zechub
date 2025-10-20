"use client";

import type React from "react";

import { useBounty } from "@/lib/bounty-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export function ProtectedRoute({
  children,
  requireAdmin = false,
}: ProtectedRouteProps) {
  const { currentUser, isLoading } = useBounty();
  const router = useRouter();

  useEffect(() => {
    // Don't redirect while still loading
    if (isLoading) return;

    if (!currentUser) {
      router.push("/login");
      return;
    }

    if (requireAdmin && currentUser.role !== "ADMIN") {
      router.push("/dashboard");
      return;
    }
  }, [currentUser, requireAdmin, router, isLoading]);

  // Show loading while context is initializing
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-slate-600 dark:text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Show loading if no user (about to redirect)
  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Redirecting...
          </p>
        </div>
      </div>
    );
  }

  if (requireAdmin && currentUser.role !== "ADMIN") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400">
            Access denied. Admin privileges required.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
