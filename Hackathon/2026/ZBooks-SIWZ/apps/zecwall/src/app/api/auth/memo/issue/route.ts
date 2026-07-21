import { issueMemoHandler } from "@siwz/next-auth/memo";

export const dynamic = "force-dynamic";

export const POST = issueMemoHandler({
  secret: process.env.NEXTAUTH_SECRET ?? "",
  serviceAddress: process.env.SIWZ_SERVICE_ADDRESS ?? "",
  network:
    (process.env.SIWZ_NETWORK as "mainnet" | "testnet" | "regtest") ?? "mainnet",
  label: "SIWZ comments wall",
  message:
    "Sign in to leave a comment. Tiny dust payment proves you control a Zcash wallet.",
  ttlSeconds: 600,
});
