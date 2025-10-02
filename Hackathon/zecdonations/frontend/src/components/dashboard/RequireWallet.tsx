"use client";
import { useZecWallet } from "@/hooks/useZecWallet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function RequireWallet({ children }: { children: React.ReactNode }) {
  const { address, connect } = useZecWallet();
  if (!address) {
    return (
      <main className="max-w-2xl mx-auto px-6 py-10">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Connect your ZEC wallet</CardTitle>
            <CardDescription>Authentication requires a connected wallet.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={connect}>Connect Wallet</Button>
          </CardContent>
        </Card>
      </main>
    );
  }
  return <>{children}</>;
}


