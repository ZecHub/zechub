"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import RequireAuth from "@/components/dashboard/RequireAuth";
import CampaignCard from "@/components/campaigns/CampaignCard";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import CampaignCardSkeleton from "@/components/campaigns/CampaignCardSkeleton";
import { getAuthToken } from "@/lib/utils";

export default function DashboardPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setLoading(true);
    fetch("/api/campaigns/my-campaigns", {
      headers: {
        "Authorization": `Bearer ${getAuthToken()}`,
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((data) => setItems(data.campaigns ?? []))
      .finally(() => setLoading(false));
  }, []);
  return (
    <RequireAuth>
      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-6 flex items-center gap-4">
          <h1 className="text-3xl font-display font-bold">My Campaigns</h1>
          <div className="ml-auto">
            <Link href="/dashboard/create">
              <Button>Create Campaign</Button>
            </Link>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <CampaignCardSkeleton key={i} />
              ))
            : items.map((c: any) => (
                <CampaignCard
                  key={c.campaign.id}
                  campaign={c.campaign as any}
                />
              ))}
        </div>
      </main>
    </RequireAuth>
  );
}
