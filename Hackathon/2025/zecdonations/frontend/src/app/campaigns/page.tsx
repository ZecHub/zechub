"use client";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CampaignCard from "@/components/campaigns/CampaignCard";
import { useEffect, useMemo, useState } from "react";
import CampaignCardSkeleton from "@/components/campaigns/CampaignCardSkeleton";

export default function CampaignsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  // keep category in lowercase to match API: general | proposal | birthday | all
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [sort, setSort] = useState<string>("");
  useEffect(() => {
    const params = new URLSearchParams();
    if (activeCategory !== "all") params.set("category", activeCategory);
    if (sort) params.set("sort", sort);
    setLoading(true);
    fetch(`/api/campaigns?${params.toString()}`)
      .then(r => r.json())
      .then(data => setItems(data.campaigns ?? []))
      .finally(() => setLoading(false));
  }, [activeCategory, sort]);

  // derive available categories from items
  const availableCategories = useMemo(() => {
    const set = new Set<string>();
    for (const c of items) {
      const cat = (c.category || "").toString().toLowerCase();
      if (cat) set.add(cat);
    }
    return Array.from(set);
  }, [items]);

  const visibleItems = useMemo(() => {
    if (activeCategory === "all") return items;
    return items.filter((c) => (c.category || "").toLowerCase() === activeCategory);
  }, [items, activeCategory]);

  const titleCase = (v: string) => v ? v.charAt(0).toUpperCase() + v.slice(1) : v;
  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-display font-bold mb-6">Browse Campaigns</h1>
      <div className="mb-6 flex flex-wrap gap-2">
        <Button key="all" variant={activeCategory==="all"?"secondary":"outline"} onClick={() => setActiveCategory("all")}>All</Button>
        {(["proposal","birthday","general"] as const)
          .filter(cat => availableCategories.length === 0 || availableCategories.includes(cat))
          .map((cat) => (
            <Button key={cat} variant={activeCategory===cat?"secondary":"outline"} onClick={() => setActiveCategory(cat)}>{titleCase(cat)}</Button>
          ))}
        <div className="ml-auto flex gap-2">
          <Button variant={sort==="trending"?"secondary":"outline"} onClick={() => setSort("trending")}>Trending</Button>
          <Button variant={sort==="recent"?"secondary":"outline"} onClick={() => setSort("recent")}>Recent</Button>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <CampaignCardSkeleton key={i} />)
          : visibleItems.map((c) => (
              <CampaignCard key={c.id} campaign={c} />
            ))}
      </div>
    </main>
  );
}


