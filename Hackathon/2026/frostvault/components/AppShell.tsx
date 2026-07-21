import { Navbar } from "@/components/Navbar";
import { BackendStatusBanner } from "@/components/BackendStatusBanner";
import { DemoModeBanner } from "@/components/DemoModeBanner";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <DemoModeBanner />
      <BackendStatusBanner />
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
