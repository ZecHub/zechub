import Link from "next/link";

export const dynamic = "force-static";

export default function AuthSuccessPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16 text-center">
      <h1 className="text-3xl font-semibold mb-3">You&apos;re signed in 🎉</h1>
      <p className="text-muted-foreground mb-8">
        Authentication succeeded. You will be redirected to your dashboard.
      </p>
      <Link href="/dashboard" className="inline-flex items-center px-4 py-2 rounded-md bg-primary text-primary-foreground">
        Go to dashboard
      </Link>
      <meta httpEquiv="refresh" content="2; url=/dashboard" />
    </div>
  );
}


