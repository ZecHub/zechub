"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { QRCodeCanvas } from "qrcode.react";
import { toast } from "sonner";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { buildZecUri } from "@/lib/zec";
import { Progress } from "@/components/ui/progress";
import { getCreatorAvatarUrl } from "@/lib/utils";
import CampaignCard from "@/components/campaigns/CampaignCard";
import CampaignCardSkeleton from "@/components/campaigns/CampaignCardSkeleton";
import { Input } from "@/components/ui/input";
import WithdrawDialog from "@/components/campaigns/withdrawDialog";

export type CampaignDetail = {
  id: string;
  title: string;
  description: string;
  goalZec: number;
  receivedZec: number;
  address: string;
  status?: string;
  discord_id?: string;
  creator?: {
    name: string;
    handle: string;
    avatar: string;
    email?: string;
  } | null;
  transactions?: Array<{
    id: string;
    amount: number;
    memo?: string;
    timestamp: number;
    txHash: string;
  }>;
  is_user?: boolean;
  wallet_id?: string;
};

export default function CampaignClient({
  data,
  id,
}: {
  data?: CampaignDetail;
  id?: string;
}) {
  const { copy } = useCopyToClipboard();
  const [campaign, setCampaign] = React.useState<CampaignDetail | undefined>(
    data
  );
  const [creator, setCreator] = React.useState(data?.creator);
  const [discordId, setDiscordId] = React.useState<string | undefined>(
    data?.discord_id
  );
  // If no data provided, fetch on client using relative API
  React.useEffect(() => {
    if (!campaign && id) {
      fetch(`/api/campaigns/${id}`)
        .then((r) => r.json())
        .then((payload) => {
          const c = payload?.campaign ?? payload;
          if (c) {
            const mapped: CampaignDetail = {
              id: String(c.id),
              title: c.title || `Campaign #${id}`,
              description: c.description || "",
              goalZec: Number(c.goalZec || c.target_amount || 0),
              receivedZec: Number(c.receivedZec || 0),
              address: c.address || "",
              status: c.status,
              discord_id: c.discord_id || c.discordId,
              creator: c.creator || null,
              transactions: Array.isArray(c.transactions) ? c.transactions : [],
              is_user: c.is_user,
              wallet_id: c.wallet_id,
            };
            setCampaign(mapped);
            setCreator(mapped.creator || undefined);
            setDiscordId(mapped.discord_id);
          }
        })
        .catch(() => {});
    }
  }, [campaign, id]);
  React.useEffect(() => {
    if (data) {
      console.log(data);
      setCampaign(data);
      setCreator(data.creator);
      setDiscordId(data.discord_id);
    }
  }, [data]);

  // Hydrate discordId from list API if missing but avatar hash exists
  React.useEffect(() => {
    const avatar = creator?.avatar || "";
    const hasHashAvatar =
      avatar &&
      !avatar.startsWith("http") &&
      avatar !== "/default-avatar.png" &&
      avatar !== "/default-avatar.svg";
    if (!discordId && hasHashAvatar) {
      fetch("/api/campaigns")
        .then((r) => r.json())
        .then((list) => {
          const match = (list?.campaigns || []).find(
            (x: any) => String(x.id) === String(campaign?.id || id)
          );
          if (match) {
            setDiscordId(match.discord_id || match.discordId);
            if (match.creator) setCreator(match.creator);
          }
        })
        .catch(() => {});
    }
  }, [discordId, creator, campaign?.id, id]);

  const current = campaign as CampaignDetail;

  if (!current) return null;
  const uri = buildZecUri(current.address, undefined, current.title);
  const linkuri =
    typeof window !== "undefined" ? `${window.location.href}` : "";
  const share = async () => {
    try {
      const url =
        typeof window !== "undefined" ? `${window.location.href}` : "";

      // Better device detection
      const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      const canUseNativeShare = isMobile;

      if (canUseNativeShare) {
        // Native share dialog (mobile only)
        await navigator.share({
          title: current.title,
          text: current.description,
          url,
        });
      } else {
        // Fallback for desktop and unsupported mobile
        await copy(url);
        toast.success("Share link copied to clipboard!");
      }
    } catch (error) {
      console.error("Share failed:", error);
    }
  };

  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            {creator && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={getCreatorAvatarUrl({
                  discordId,
                  avatar: creator.avatar,
                  creatorName: creator.name,
                  creatorHandle: creator.handle,
                  seedFallback: current.id,
                })}
                alt={creator.name}
                className="h-8 w-8 rounded-full"
                onError={(e) => {
                  e.currentTarget.src = `https://api.dicebear.com/7.x/personas/svg?seed=${
                    creator?.name || current.id
                  }`;
                }}
              />
            )}
            <span>{current.title || `Campaign #${current.id}`}</span>
          </CardTitle>
          {creator && (
            <CardDescription>
              By {creator.name}
              {creator.handle && !creator.handle.includes("undefined")
                ? ` (${creator.handle})`
                : ""}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-6">
            {current.description && (
              <p className="text-sm text-muted-foreground whitespace-pre-line">
                {current.description}
              </p>
            )}
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span>Progress</span>
                <span className="text-primary font-medium">
                  {current.receivedZec.toFixed(1)} /{" "}
                  {Math.max(0, current.goalZec).toFixed(1)} ZEC
                </span>
              </div>
              <Progress
                value={Math.min(
                  100,
                  current.goalZec > 0
                    ? Math.round((current.receivedZec / current.goalZec) * 100)
                    : 0
                )}
              />
              {current.status && (
                <div className="text-xs text-right mt-1 text-muted-foreground">
                  Status:{" "}
                  {current.status.charAt(0).toUpperCase() +
                    current.status.slice(1)}
                </div>
              )}
            </div>
            {current.status == "ongoing" && (
              <div className="flex flex-wrap gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Show QR</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Scan to Donate</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col items-center justify-center py-4 gap-3">
                      <a
                        href={uri}
                        aria-label="Open in wallet"
                        className="rounded-lg ring-1 ring-white/10 hover:ring-primary/40 transition"
                      >
                        <QRCodeCanvas
                          value={uri}
                          size={240}
                          bgColor="#0D1B2A"
                          fgColor="#00C2A8"
                          includeMargin
                        />
                      </a>
                      <div className="text-xs text-muted-foreground break-all text-center max-w-full px-2">
                        {uri}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          onClick={() => {
                            copy(linkuri);
                            toast.success("Payment URI copied");
                          }}
                        >
                          Copy URI
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            copy(current.address);
                            toast.success("Address copied");
                          }}
                        >
                          Copy Address
                        </Button>
                      </div>
                    </div>
                    <div className="mt-2 flex justify-end">
                      <DialogClose asChild>
                        <Button variant="outline">Close</Button>
                      </DialogClose>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="outline"
                  onClick={() => {
                    copy(current.address);
                    toast.success("Address copied");
                  }}
                >
                  Copy Address
                </Button>
                <Button variant="secondary" onClick={share}>
                  Share
                </Button>
              </div>
            )}

            {current.is_user && current.status != "ongoing" && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Withdraw</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Send Donate to Personal Account</DialogTitle>
                  </DialogHeader>
                  <WithdrawDialog wallet_id={current.wallet_id} />
                </DialogContent>
              </Dialog>
            )}
          </div>
          {Array.isArray(current.transactions) &&
            current.transactions.length > 0 && (
              <div className="mt-8">
                <h3 className="font-semibold mb-3">Recent Activity</h3>
                <div className="space-y-2">
                  {current.transactions.slice(0, 6).map((t, index) => (
                    <div
                      key={t.id}
                      className={`flex items-center justify-between rounded-md border border-border px-3 py-2 text-sm ${
                        index % 2 === 0 ? "bg-muted/30" : ""
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">
                          {new Date(t.timestamp).toLocaleTimeString()}
                        </span>
                        {t.memo && (
                          <span className="text-muted-foreground">
                            • {t.memo}
                          </span>
                        )}
                      </div>
                      <div className="font-medium text-primary">
                        {t.amount.toFixed(2)} ZEC
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
        </CardContent>
      </Card>

      {/* More campaigns */}
      <RelatedCampaigns currentId={current.id} />
    </main>
  );
}

function RelatedCampaigns({ currentId }: { currentId: string }) {
  const [items, setItems] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  React.useEffect(() => {
    setLoading(true);
    fetch(`/api/campaigns?limit=6`)
      .then((r) => r.json())
      .then((d) =>
        setItems(
          (d.campaigns || [])
            .filter((c: any) => String(c.id) !== String(currentId))
            .slice(0, 3)
        )
      )
      .finally(() => setLoading(false));
  }, [currentId]);

  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold mb-4">More campaigns</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <CampaignCardSkeleton key={i} />
            ))
          : items
              .slice(0, 3)
              .map((c) => <CampaignCard key={c.id} campaign={c} />)}
      </div>
    </section>
  );
}
