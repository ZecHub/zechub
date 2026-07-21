"use client";

import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";
import { ThemeProvider } from "@/components/ThemeToggle";
import { ConfirmProvider } from "@/components/ConfirmDialog";
import { ToastProvider } from "@/components/Toast";
import { BackgroundSync } from "@/components/BackgroundSync";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <ToastProvider>
          <ConfirmProvider>
            {children}
            <BackgroundSync />
          </ConfirmProvider>
        </ToastProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
