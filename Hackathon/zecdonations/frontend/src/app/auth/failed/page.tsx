import Link from "next/link";

export const dynamic = "force-static";

function getMessage(searchParams: URLSearchParams): string {
  const reason = searchParams.get("reason");
  switch (reason) {
    case "missing_code":
      return "Missing authorization code from Discord.";
    case "backend_error":
      return "The server couldn't complete the login with Discord.";
    case "invalid_response":
      return "The authentication response was invalid.";
    case "exception":
      return "An unexpected error occurred during login.";
    default:
      return "Authentication failed.";
  }
}

export default function AuthFailedPage({ searchParams }: any) {
  const params = new URLSearchParams(
    Object.entries(searchParams).reduce<Record<string, string>>((acc, [k, v]) => {
      if (typeof v === "string") acc[k] = v;
      return acc;
      }, {})
  );
  const message = getMessage(params);

  return (
    <div className="max-w-2xl mx-auto px-6 py-16 text-center">
      <h1 className="text-3xl font-semibold mb-3">Sign in failed</h1>
      <p className="text-muted-foreground mb-8">{message}</p>
      <Link href="/" className="inline-flex items-center px-4 py-2 rounded-md border border-border">
        Return home
      </Link>
    </div>
  );
}


