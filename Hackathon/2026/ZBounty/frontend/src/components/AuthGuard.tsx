"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !user && pathname !== "/" && pathname !== "/admin" && pathname !== "/sponsor") {
      router.push("/");
    }
  }, [user, isLoading, pathname, router]);

  // If loading user state on a protected route, show a loader
  if (isLoading && pathname !== "/" && pathname !== "/admin" && pathname !== "/sponsor") {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-on-surface-variant space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="font-medium">Checking session...</p>
      </div>
    );
  }

  // If not logged in and trying to access protected route, render loader/null while redirecting
  if (!user && pathname !== "/" && pathname !== "/admin" && pathname !== "/sponsor") {
    return null;
  }

  return <>{children}</>;
}
