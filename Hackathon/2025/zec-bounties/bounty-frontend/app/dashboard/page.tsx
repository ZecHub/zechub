"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { Navbar } from "@/components/layout/navbar";
import { BountyCard } from "@/components/bounty/bounty-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBounty } from "@/lib/bounty-context";
import { Plus, TrendingUp, Clock, CheckCircle, DollarSign } from "lucide-react";
import { useState } from "react";
import { CreateBountyForm } from "@/components/bounty/create-bounty-form";

export default function DashboardPage() {
  const { bounties, currentUser } = useBounty();
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Filter bounties based on user role
  const userBounties =
    currentUser?.role === "ADMIN"
      ? bounties
      : bounties.filter(
          (b) =>
            b.createdBy === currentUser?.id || b.assignee === currentUser?.id
        );

  const stats = {
    total: userBounties.length,
    inProgress: userBounties.filter((b) => b.status === "IN_PROGRESS").length,
    completed: userBounties.filter((b) => b.status === "DONE").length,
    totalValue: userBounties.reduce((sum, b) => sum + b.bountyAmount, 0),
  };

  const recentBounties = userBounties
    .sort(
      (a, b) =>
        new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
    )
    .slice(0, 3);

  if (showCreateForm) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
          <Navbar />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-6">
              <Button
                variant="outline"
                onClick={() => setShowCreateForm(false)}
                className="mb-4"
              >
                ← Back to Dashboard
              </Button>
            </div>
            <CreateBountyForm
              onSuccess={() => setShowCreateForm(false)}
              onCancel={() => setShowCreateForm(false)}
            />
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                Welcome back, {currentUser?.name}
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                Manage your bounties and track progress
              </p>
            </div>
            <Button
              onClick={() => setShowCreateForm(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Bounty
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Total Bounties
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-slate-600 dark:text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {stats.total}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  In Progress
                </CardTitle>
                <Clock className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {stats.inProgress}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Completed
                </CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {stats.completed}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Total Value
                </CardTitle>
                <DollarSign className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">
                  {stats.totalValue.toFixed(2)} ZEC
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Bounties */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                Recent Bounties
              </h2>
              <Button variant="outline" asChild>
                <a href="/bounties">View All</a>
              </Button>
            </div>

            {recentBounties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentBounties.map((bounty) => (
                  <BountyCard key={bounty.id} bounty={bounty} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <div className="text-slate-400 dark:text-slate-600 mb-4">
                    <TrendingUp className="w-12 h-12" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
                    No bounties yet
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-center mb-4">
                    Create your first bounty to get started with the platform.
                  </p>
                  <Button
                    onClick={() => setShowCreateForm(true)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Bounty
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
