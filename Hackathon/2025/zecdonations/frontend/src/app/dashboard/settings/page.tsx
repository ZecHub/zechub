import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import RequireAuth from "@/components/dashboard/RequireAuth";

export default function SettingsPage() {
  return (
    <RequireAuth>
      <main className="max-w-2xl mx-auto px-6 py-10">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>Profile & preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Display Name" />
            <Input placeholder="Email" type="email" />
          </CardContent>
        </Card>
      </main>
    </RequireAuth>
  );
}


