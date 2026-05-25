"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useBounty } from "@/lib/bounty-context";
import { LogOut, User, Shield, Wallet } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import Link from "next/link";

export function AdminNavbar() {
  const { currentUser, logout, balance } = useBounty();

  if (!currentUser) return null;

  return (
    <nav className="border-b border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link
              href="/admin/dashboard"
              className="flex items-center space-x-2"
            >
              <div className="flex items-center justify-center">
                <img
                  src="ZecHubBlue.png"
                  alt="ZecHubBlue.png"
                  style={{ height: "3rem" }}
                />
              </div>
              <span className="font-bold text-xl text-slate-900 dark:text-slate-100">
                ZEC Bounties
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-6 ml-8">
              <Link
                href="/admin/dashboard"
                className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 font-medium"
              >
                Dashboard
              </Link>
              <Link
                href="/admin/bounties"
                className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 font-medium"
              >
                Bounties
              </Link>
              {currentUser.role === "ADMIN" && (
                <Link
                  href="/admin"
                  className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 font-medium"
                >
                  Admin
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Admin Balance Display */}
            {currentUser.role === "ADMIN" && (
              <div className="flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <Wallet className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span className="text-sm font-medium text-green-700 dark:text-green-300">
                  {balance !== undefined
                    ? `${(balance / 1e8).toFixed(4)} ZEC`
                    : "Loading..."}
                </span>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg">
                {currentUser.role === "ADMIN" ? (
                  <Shield className="w-4 h-4 text-blue-600" />
                ) : (
                  <User className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                )}
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {currentUser.name}
                </span>
                <Badge
                  variant={
                    currentUser.role === "ADMIN" ? "default" : "secondary"
                  }
                  className="text-xs"
                >
                  {currentUser.role}
                </Badge>
              </div>
            </div>

            <ThemeToggle />

            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
