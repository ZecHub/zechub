"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { BountyCard } from "@/components/BountyCard";
import { SearchX, Loader2 } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [bounties, setBounties] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const categories = ["All", "Development", "Content", "Research", "Design"];

  useEffect(() => {
    const fetchBounties = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/bounties`);
        if (response.ok) {
          const data = await response.json();
          setBounties(data);
        }
      } catch (error) {
        console.error("Failed to fetch bounties:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBounties();
  }, []);

  const filteredBounties = bounties.filter((b) => {
    const matchesSearch =
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.tags &&
        b.tags.some((t: string) =>
          t.toLowerCase().includes(searchQuery.toLowerCase())
        ));

    const matchesCategory =
      activeCategory === "All" ||
      b.category?.toLowerCase() === activeCategory.toLowerCase() ||
      (b.tags &&
        b.tags.some(
          (t: string) => t.toLowerCase() === activeCategory.toLowerCase()
        ));

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-surface text-on-surface font-body-md antialiased min-h-screen flex">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col min-h-screen md:ml-64 w-full relative">
        {/* Header with Search Box */}
        <Header
          showSearch={true}
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Main Canvas Scrollable Content */}
        <main className="flex-1 px-margin-mobile md:px-margin-desktop py-stack-lg relative overflow-y-auto">
          <div className="max-w-container-max mx-auto flex flex-col gap-stack-xl">
            {/* Hero Section */}
            <section className="flex flex-col gap-stack-md">
              <div className="flex flex-col gap-2 max-w-2xl">
                <h2 className="font-headline-lg-mobile md:font-headline-lg text-on-surface">
                  Discover Opportunities
                </h2>
                <p className="font-body-lg text-on-surface-variant">
                  Contribute to the privacy-first economy and earn ZEC by solving open bounties.
                </p>
              </div>

              {/* Mobile Search and Filter Chips */}
              <div className="flex flex-col md:flex-row gap-stack-sm w-full mt-stack-sm">
                <div className="relative flex-1 max-w-xl md:hidden mb-4">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">
                    search
                  </span>
                  <input
                    className="w-full pl-12 pr-4 py-3 bg-surface-container-lowest border border-secondary-container rounded-xl font-body-md text-on-surface focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 transition-all soft-shadow"
                    placeholder="Search bounties..."
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`whitespace-nowrap px-4 py-2 font-label-sm text-label-sm rounded-full transition-colors soft-shadow border ${
                        activeCategory === cat
                          ? "bg-primary-container text-on-primary-container font-bold border-primary-container"
                          : "bg-surface-container-lowest border-secondary-container text-on-surface hover:bg-surface-container-low"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* Grid list Section */}
            <section className="pb-12">
              <div className="flex justify-between items-end mb-stack-md border-b border-secondary-container pb-2">
                <h3 className="font-headline-md text-on-surface">Trending Bounties</h3>
                <button className="font-label-md text-label-md text-primary flex items-center gap-1 hover:underline">
                  Sort by: Newest
                  <span className="material-symbols-outlined text-[18px]">expand_more</span>
                </button>
              </div>

              {isLoading ? (
                <div className="py-24 flex flex-col items-center justify-center text-on-surface-variant space-y-4">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  <p className="font-medium">Loading bounties...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
                  {filteredBounties.map((bounty) => (
                    <BountyCard
                      key={bounty._id}
                      id={bounty._id}
                      title={bounty.title}
                      description={bounty.description}
                      reward={bounty.reward}
                      privacyScore={bounty.privacyScore}
                      tags={bounty.tags || []}
                      status={bounty.status}
                      deadline={bounty.deadline}
                      creatorName={bounty.creatorId?.username || "Anonymous"}
                      contributorId={bounty.contributorId}
                    />
                  ))}
                </div>
              )}

              {!isLoading && filteredBounties.length === 0 && (
                <div className="flex flex-col items-center justify-center py-24 bg-surface-container-lowest rounded-xl border border-secondary-container mt-8 text-center px-4">
                  <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center mb-4">
                    <SearchX className="w-6 h-6 text-on-surface-variant" />
                  </div>
                  <h3 className="text-lg font-bold font-headline-md mb-2 text-on-surface">
                    No bounties found
                  </h3>
                  <p className="text-on-surface-variant max-w-md">
                    We couldn't find any bounties matching your criteria. Try adjusting your category or query.
                  </p>
                </div>
              )}

              {!isLoading && filteredBounties.length > 0 && (
                <div className="mt-stack-lg flex justify-center">
                  <button className="px-6 py-3 bg-transparent border border-secondary-container text-on-surface font-label-md text-label-md font-bold rounded-lg hover:bg-surface-container-lowest transition-colors soft-shadow">
                    Load More Bounties
                  </button>
                </div>
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
