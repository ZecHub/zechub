import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import RequireAuth from "@/components/dashboard/RequireAuth";

export default function WalletPage() {
  return (
    <RequireAuth>
      <main className="max-w-3xl mx-auto px-6 py-10">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Wallet</CardTitle>
            <CardDescription>Balance and recent transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.34 ZEC</div>
            <div className="mt-4 text-sm text-muted-foreground">Recent transactions will appear here.</div>
            <div className="mt-6 space-y-2 text-sm">
              {[1,2,3].map((i) => (
                <div key={i} className="flex items-center justify-between rounded-md border border-border p-3">
                  <span className="text-muted-foreground">Received</span>
                  <span className="font-medium text-primary">{(Math.random()*2).toFixed(2)} ZEC</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </RequireAuth>
  );
}


