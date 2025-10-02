"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function CampaignCardSkeleton() {
  return (
    <Card className="glass-card overflow-hidden h-full animate-pulse">
      <div className="relative h-40 bg-muted/30" />
      <CardHeader>
        <div className="h-5 w-2/3 bg-muted/40 rounded" />
        <div className="mt-2 h-4 w-1/2 bg-muted/30 rounded" />
      </CardHeader>
      <CardContent className="mt-auto space-y-3">
        <div className="h-2 w-full bg-muted/30 rounded" />
        <div className="flex gap-2">
          <div className="h-9 flex-1 bg-muted/30 rounded" />
          <div className="h-9 w-20 bg-muted/30 rounded" />
          <div className="h-9 w-16 bg-muted/30 rounded" />
        </div>
      </CardContent>
    </Card>
  );
}


