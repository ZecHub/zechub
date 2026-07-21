"use client";

import { useState } from "react";
import { SignInWithZcash, SignOut, type SnapIdentity } from "@siwz/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MemoSignIn } from "./MemoSignIn";

const NETWORK = (process.env.NEXT_PUBLIC_SIWZ_NETWORK ?? "mainnet") as
  | "mainnet"
  | "testnet"
  | "regtest";

type Flow = "memo" | "siwz" | "snap";

const FLOW_META: Record<Flow, { title: string; subtitle: string; recommended?: boolean }> = {
  memo: {
    title: "Send a payment to sign in",
    subtitle: "Works with every shielded Zcash wallet. Recommended.",
    recommended: true,
  },
  siwz: {
    title: "Paste a signed message",
    subtitle: "If your wallet supports `signmessage` (zcash-cli, YWallet).",
  },
  snap: {
    title: "MetaMask Zcash Snap",
    subtitle:
      "Currently blocked by ChainSafe's allowlist for local dev; documented for transparency.",
  },
};

export function SignInPanel() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [flow, setFlow] = useState<Flow>("memo");

  if (status === "loading") {
    return <div className="opacity-60">Loading session…</div>;
  }

  if (session?.user) {
    const addr = session.user.address;
    return (
      <div className="rounded-lg border border-black/10 dark:border-white/10 p-4 flex flex-col gap-3">
        <div className="text-sm opacity-70">Signed in as</div>
        <div className="font-mono text-sm break-all">{addr}</div>
        <div className="flex gap-2 flex-wrap">
          <button
            className="rounded-md bg-zcash-yellow text-zcash-dark font-semibold px-3 py-1.5 text-sm"
            onClick={() => router.push("/keys")}
          >
            Open dashboard →
          </button>
          <SignOut
            onSignOut={() => signOut({ callbackUrl: "/" })}
            classNames={{
              root: "",
              button: "rounded-md border border-black/15 dark:border-white/15 px-3 py-1.5 text-sm",
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-1 sm:gap-2 flex-wrap">
        {(Object.keys(FLOW_META) as Flow[]).map((k) => (
          <button
            key={k}
            onClick={() => setFlow(k)}
            className={`text-sm rounded-md px-3 py-1.5 border transition-colors ${
              flow === k
                ? "border-zcash-yellow bg-zcash-yellow/10 font-semibold"
                : "border-black/10 dark:border-white/15 opacity-80 hover:opacity-100"
            }`}
          >
            {FLOW_META[k].title}
            {FLOW_META[k].recommended && (
              <span className="ml-1 text-[10px] uppercase opacity-70">recommended</span>
            )}
          </button>
        ))}
      </div>
      <div className="text-xs opacity-60">{FLOW_META[flow].subtitle}</div>

      {flow === "memo" && <MemoSignIn />}
      {flow === "siwz" && <SiwzClassicPanel />}
      {flow === "snap" && <SnapPanel onUseDifferentWallet={() => setFlow("siwz")} />}
    </div>
  );
}

function SiwzClassicPanel() {
  const router = useRouter();
  return (
    <SignInWithZcash
      domain={typeof window !== "undefined" ? window.location.host : "localhost:3000"}
      uri={typeof window !== "undefined" ? window.location.origin : "http://localhost:3000"}
      network={NETWORK}
      statement="Sign in to ZBooks to manage your team's ZEC accounting."
      expirationSeconds={600}
      getNonce={async () => {
        const res = await fetch("/api/siwz/nonce", { cache: "no-store" });
        if (!res.ok) throw new Error("Could not get nonce from server");
        const json: { nonce: string; token: string } = await res.json();
        (window as unknown as { __siwzNonceToken?: string }).__siwzNonceToken = json.token;
        return json.nonce;
      }}
      submit={async ({ message, signature }) => {
        const nonceToken =
          (window as unknown as { __siwzNonceToken?: string }).__siwzNonceToken ?? "";
        const result = await signIn("siwz", {
          message,
          signature,
          nonceToken,
          redirect: false,
        });
        if (result?.error || !result?.ok) {
          return { ok: false, error: result?.error ?? "Sign-in rejected by server" };
        }
        router.refresh();
        return { ok: true };
      }}
      onSuccess={() => {
        router.refresh();
      }}
    />
  );
}

function SnapPanel({ onUseDifferentWallet }: { onUseDifferentWallet?: () => void }) {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3 text-sm">
        <strong>Heads up:</strong> the ChainSafe Zcash Snap currently restricts
        RPC calls to <code>https://webzjs.chainsafe.dev</code> only. Sign-in
        from localhost / Vercel deployments will fail at the Snap layer. We've
        kept the integration here so it lights up the moment ChainSafe broadens
        the allowlist upstream (or we publish a fork).
      </div>
      <SignInWithZcash
        domain={typeof window !== "undefined" ? window.location.host : "localhost:3000"}
        uri={typeof window !== "undefined" ? window.location.origin : "http://localhost:3000"}
        network={NETWORK}
        enableSnap
        onUseDifferentWallet={onUseDifferentWallet}
        getNonce={async () => {
          const res = await fetch("/api/siwz/nonce", { cache: "no-store" });
          const json: { nonce: string; token: string } = await res.json();
          (window as unknown as { __siwzNonceToken?: string }).__siwzNonceToken = json.token;
          return json.nonce;
        }}
        submit={async ({ message, signature }) => {
          const nonceToken =
            (window as unknown as { __siwzNonceToken?: string }).__siwzNonceToken ?? "";
          const result = await signIn("siwz", { message, signature, nonceToken, redirect: false });
          if (result?.error || !result?.ok) {
            return { ok: false, error: result?.error ?? "Sign-in rejected by server" };
          }
          router.refresh();
          return { ok: true };
        }}
        onSnapAuth={async (info: SnapIdentity) => {
          const envRes = await fetch("/api/auth/snap-envelope", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ fingerprint: info.fingerprint, ufvk: info.ufvk }),
          });
          if (!envRes.ok) {
            const j = await envRes.json().catch(() => ({}));
            return { ok: false, error: j.error ?? "Server rejected Snap credentials" };
          }
          const { envelope } = await envRes.json();
          const result = await signIn("snap", {
            fingerprint: info.fingerprint,
            ufvk: info.ufvk,
            envelope,
            redirect: false,
          });
          if (result?.error || !result?.ok) {
            return { ok: false, error: result?.error ?? "Snap sign-in rejected" };
          }
          router.refresh();
          return { ok: true };
        }}
        onSuccess={() => router.refresh()}
      />
    </div>
  );
}
