"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { QRCodeCanvas } from "qrcode.react";
import { buildZecUri } from "@/lib/zec";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { toast } from "sonner";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getCreatorAvatarUrl } from "@/lib/utils";

type Campaign = {
  id: number | string;
  title: string;
  cover?: string;
  receivedZec: number;
  goalZec: number;
  address: string;
  discord_id?: string;
  creator?: {
    name?: string;
    handle?: string;
    avatar?: string; // discord avatar hash or full URL
  };
};

export default function CampaignCard({ campaign }: { campaign: Campaign }) {
  const { copy } = useCopyToClipboard();
  const pct = Math.min(
    100,
    Math.round((campaign.receivedZec / campaign.goalZec) * 100)
  );
  const uri = buildZecUri(campaign.address, undefined, campaign.title);
  const linkuri =
    typeof window !== "undefined"
      ? `${window.location.href}/${campaign.id}`
      : "";
  const getDiscordAvatarUrl = (discordId?: string, avatar?: string) => {
    if (!avatar) return "/default-avatar.png";
    if (avatar.startsWith("http")) return avatar;
    if (!discordId) return "/default-avatar.png";
    const ext = avatar.startsWith("a_") ? "gif" : "png";
    return `https://cdn.discordapp.com/avatars/${discordId}/${avatar}.${ext}?size=64`;
  };
  const avatarUrl = getCreatorAvatarUrl({
    discordId: campaign.discord_id,
    avatar: campaign.creator?.avatar,
    creatorName: campaign.creator?.name,
    creatorHandle: campaign.creator?.handle,
    seedFallback: campaign.id,
  });
  return (
    <Card className="glass-card overflow-hidden h-full flex flex-col">
      <div className="relative h-40 bg-gradient-to-br from-primary/30 to-secondary/30" />
      <CardHeader>
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={avatarUrl}
              alt={campaign.creator?.name || "Creator"}
            />
            <AvatarFallback>
              {(campaign.creator?.name || "?").slice(0, 1).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <CardTitle className="truncate text-base">
              {campaign.title}
            </CardTitle>
            {campaign.creator?.name && (
              <div className="text-xs text-muted-foreground truncate">
                {campaign.creator?.name}
                {campaign.creator?.handle &&
                !campaign.creator?.handle.includes("undefined")
                  ? ` (${campaign.creator?.handle})`
                  : ""}
              </div>
            )}
          </div>
        </div>
        <CardDescription>
          <span className="text-primary font-medium">
            {campaign.receivedZec.toFixed(1)} ZEC
          </span>
          <span className="mx-1">/</span>
          <span>{campaign.goalZec.toFixed(1)} ZEC</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-auto space-y-3">
        <Progress value={pct} />
        <div className="flex gap-2">
          <Link className="flex-1" href={`/campaigns/${campaign.id}`}>
            <Button className="w-full">View Donation</Button>
          </Link>
          <Button
            variant="outline"
            onClick={() => {
              copy(campaign.address);
              toast.success("Address copied");
            }}
          >
            Copy
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary">QR</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Donate via QR</DialogTitle>
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
                      copy(campaign.address);
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
        </div>
      </CardContent>
    </Card>
  );
}
