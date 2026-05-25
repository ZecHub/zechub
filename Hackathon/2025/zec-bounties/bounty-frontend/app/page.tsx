"use client";

import { useBounty } from "@/lib/bounty-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LoginForm } from "@/components/auth/login-form";

export default function HomePage() {
  const { currentUser } = useBounty();
  const router = useRouter();

  console.log(currentUser);

  useEffect(() => {
    if (currentUser) {
      router.push("/dashboard");
    }
  }, [currentUser, router]);

  if (currentUser) {
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

  return <LoginForm />;
}
