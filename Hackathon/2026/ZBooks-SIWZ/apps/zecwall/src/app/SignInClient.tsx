"use client";

import { useState } from "react";
import { MemoSignIn, SignInWithZcash, SignOut, type SnapIdentity } from "@siwz/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Flow = "memo" | "siwz" | "snap";

// Three ways to sign in. ZecWall exists to show each one plainly.
const FLOWS: Record<Flow, { title: string; subtitle: string }> = {
  memo: { title: "Memo challenge", subtitle: "Sign in by sending a tiny shielded payment. Works with every Zcash wallet." },
  siwz: { title: "Signed message", subtitle: "Sign in by pasting a wallet signature (zcash-cli, YWallet)." },
  snap: { title: "MetaMask Snap", subtitle: "Sign in with the ChainSafe Zcash Snap. One click." },
};

export function SignInClient() {
  const router = useRouter();
  const { status } = useSession();
  const [flow, setFlow] = useState<Flow>("memo");
  if (status === "loading") return <div className="opacity-50">Loading…</div>;
  return (
    <div className="flex flex-col gap-3">
      <div className="tabs">
        {(Object.keys(FLOWS) as Flow[]).map((k) => (
          <button
            key={k}
            onClick={() => setFlow(k)}
            className={`tab${flow === k ? " active" : ""}`}
          >
            {FLOWS[k].title}
          </button>
        ))}
      </div>
      <div style={{ fontSize: "0.8rem", opacity: 0.6 }}>{FLOWS[flow].subtitle}</div>
      {flow === "memo" && <MemoFlow />}
      {flow === "siwz" && <ClassicFlow />}
      {flow === "snap" && <SnapFlow onUseDifferentWallet={() => setFlow("siwz")} />}
    </div>
  );
}

function ClassicFlow() {
  const router = useRouter();
  return (
    <SignInWithZcash
      domain={typeof window !== "undefined" ? window.location.host : "localhost:3001"}
      uri={typeof window !== "undefined" ? window.location.origin : "http://localhost:3001"}
      network="mainnet"
      statement="Sign in to the SIWZ reference comments wall."
      expirationSeconds={600}
      getNonce={async () => {
        const r = await fetch("/api/siwz/nonce", { cache: "no-store" });
        const j = (await r.json()) as { nonce: string; token: string };
        (window as unknown as { __siwzNonceToken?: string }).__siwzNonceToken = j.token;
        return j.nonce;
      }}
      submit={async ({ message, signature }) => {
        const nonceToken = (window as unknown as { __siwzNonceToken?: string }).__siwzNonceToken ?? "";
        const r = await signIn("siwz", { message, signature, nonceToken, redirect: false });
        if (!r?.ok) return { ok: false, error: r?.error ?? "rejected" };
        router.refresh();
        return { ok: true };
      }}
      onSuccess={() => router.refresh()}
    />
  );
}

function SnapFlow({ onUseDifferentWallet }: { onUseDifferentWallet: () => void }) {
  const router = useRouter();
  return (
    <SignInWithZcash
      domain={typeof window !== "undefined" ? window.location.host : "localhost:3001"}
      uri={typeof window !== "undefined" ? window.location.origin : "http://localhost:3001"}
      network="mainnet"
      enableSnap
      onUseDifferentWallet={onUseDifferentWallet}
      getNonce={async () => {
        const r = await fetch("/api/siwz/nonce", { cache: "no-store" });
        const j = (await r.json()) as { nonce: string; token: string };
        (window as unknown as { __siwzNonceToken?: string }).__siwzNonceToken = j.token;
        return j.nonce;
      }}
      submit={async ({ message, signature }) => {
        const nonceToken = (window as unknown as { __siwzNonceToken?: string }).__siwzNonceToken ?? "";
        const r = await signIn("siwz", { message, signature, nonceToken, redirect: false });
        if (!r?.ok) return { ok: false, error: r?.error ?? "rejected" };
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
          return { ok: false, error: j.error ?? "envelope rejected" };
        }
        const { envelope } = await envRes.json();
        const r = await signIn("snap", { fingerprint: info.fingerprint, ufvk: info.ufvk, envelope, redirect: false });
        if (!r?.ok) return { ok: false, error: r?.error ?? "snap sign-in rejected" };
        router.refresh();
        return { ok: true };
      }}
      onSuccess={() => router.refresh()}
    />
  );
}

function MemoFlow() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  return (
    <div className="card flex flex-col gap-3">
      <p className="opacity-80 text-sm">
        Sign in by sending a tiny payment from any Zcash wallet. The unique
        amount or memo proves you control the wallet. No password, no custody.
      </p>
      <MemoSignIn
        buttonLabel="Sign in with Zcash"
        onSuccess={async ({ identity, envelope }) => {
          if (!identity || !envelope) {
            setError("server response missing identity or envelope");
            return;
          }
          const r = await signIn("memo", { identity, envelope, redirect: false });
          if (!r?.ok) setError(r?.error ?? "memo sign-in rejected");
          else router.refresh();
        }}
        onError={(msg) => setError(msg)}
      />
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </div>
  );
}

export function SignOutButton() {
  return <SignOut onSignOut={() => signOut({ callbackUrl: "/" })} />;
}
