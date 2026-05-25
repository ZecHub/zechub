"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import RequireAuth from "@/components/dashboard/RequireAuth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, ChangeEvent } from "react";
import { useCampaigns, type CampaignData } from "@/hooks/useCampaigns";
import { buildZecUri } from "@/lib/zec";
import { getAuthToken } from "@/lib/utils";

export default function CreateCampaignPage() {
  const { addCampaign } = useCampaigns();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [target_amount, setTargetAmount] = useState<number>(10);
  const [category, setCategory] = useState<"general" | "proposal" | "birthday">(
    "general"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  // Reset form after successful submission
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setTargetAmount(10);
    setCategory("general");
  };

  async function onCreate() {
    // Validate form
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/campaigns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAuthToken()}`,
        },
        credentials: "include",
        body: JSON.stringify({
          title,
          description,
          target_amount: target_amount,
          category,
        }),
      });

      const data = await response.json();

      // Check for both 200 OK and 201 Created status codes
      if (response.ok) {
        setSuccess(true);
        resetForm();
        // Redirect to dashboard after a brief success message
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1500);
      } else {
        setError(data.error || "Failed to create campaign");
      }
    } catch (e) {
      console.error(e);
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <RequireAuth>
      <main className="max-w-2xl mx-auto px-6 py-10">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Create Campaign</CardTitle>
            <CardDescription>
              Start a new fundraising campaign with Zcash privacy
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {success && (
              <div
                className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <strong className="font-bold">Success!</strong>
                <span className="block sm:inline">
                  {" "}
                  Campaign created successfully. Redirecting to dashboard...
                </span>
              </div>
            )}

            {error && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <strong className="font-bold">Error!</strong>
                <span className="block sm:inline"> {error}</span>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input
                placeholder="Enter campaign title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <textarea
                className="w-full min-h-[100px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Describe your campaign"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Funding Goal (ZEC)</label>
              <Input
                placeholder="10"
                type="number"
                step="0.01"
                value={target_amount}
                onChange={(e) =>
                  setTargetAmount(parseFloat(e.target.value) || 0)
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <select
                className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
              >
                <option value="general">General</option>
                <option value="proposal">Proposal</option>
                <option value="birthday">Birthday</option>
              </select>
            </div>

            <Button
              onClick={onCreate}
              disabled={isLoading || success}
              className="w-full"
            >
              {isLoading ? "Creating..." : "Create Campaign"}
            </Button>
          </CardContent>
        </Card>
      </main>
    </RequireAuth>
  );
}
