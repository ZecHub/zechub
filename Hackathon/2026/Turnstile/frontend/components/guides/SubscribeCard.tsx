"use client";

import QRCode from "qrcode";
import { useEffect, useState } from "react";

import { Alert02Icon, CheckmarkCircle02Icon, Copy01Icon, Icon } from "@/components/icons/Icon";
import { Button } from "@/components/ui/Button";
import { isValidTopic, subscriptionMemo, zip321Uri } from "@/lib/zip321";

const SCHEDULE = ["48 hours before", "1 hour before", "At activation"];

export function SubscribeCard({ address }: { address: string | null }) {
  const [topic, setTopic] = useState("");
  const [rendered, setRendered] = useState<{ uri: string; dataUrl: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const valid = isValidTopic(topic);
  const memo = subscriptionMemo(topic || "your-topic");
  const uri = address && valid ? zip321Uri(address, topic) : null;

  useEffect(() => {
    if (!uri) return;

    let cancelled = false;

    QRCode.toDataURL(uri, {
      margin: 2,
      width: 320,
      color: { dark: "#030303", light: "#FAFAFA" },
    })
      .then((dataUrl) => {
        if (!cancelled) setRendered({ uri, dataUrl });
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, [uri]);

  const qr = rendered && rendered.uri === uri ? rendered.dataUrl : null;

  async function copy() {
    if (!uri) return;
    await navigator.clipboard.writeText(uri);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (!address) {
    return (
      <div className="flex items-start gap-3 rounded-2xl border border-partial/30 bg-partial/[0.06] p-6 text-sm leading-relaxed text-partial">
        <Icon icon={Alert02Icon} size={18} />
        Alerts are not configured on this deployment — no Turnstile address is set, so there is
        nowhere to send the memo. The rest of the tool works normally.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 md:p-8">
      <h2 className="mb-2 text-xl font-medium tracking-tight text-foreground">
        Subscribe with a shielded memo
      </h2>
      <p className="mb-6 text-sm leading-relaxed text-muted">
        Pick any topic name. Send {`0.0001`} ZEC to the Turnstile address with the memo below. The
        memo is the signup form — no email, no account, and nothing that identifies you.
      </p>

      <label
        htmlFor="topic"
        className="mb-2 block cursor-pointer font-mono text-[10px] uppercase tracking-widest text-faint"
      >
        Your topic
      </label>

      <input
        id="topic"
        value={topic}
        onChange={(event) => setTopic(event.target.value.replace(/[^A-Za-z0-9_-]/g, ""))}
        placeholder="pick-any-name"
        className="mb-4 w-full cursor-text rounded-lg border border-border bg-canvas px-4 py-3 font-mono text-sm text-foreground placeholder:text-faint focus-visible:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      />

      <div className="mb-6 rounded-lg border border-border bg-canvas px-4 py-3">
        <div className="mb-1 font-mono text-[10px] uppercase tracking-widest text-faint">
          Memo
        </div>
        <code className="font-mono text-sm break-all text-accent">{memo}</code>
      </div>

      {qr ? (
        <div className="mb-6 flex flex-col items-center gap-4 rounded-xl border border-border bg-foreground p-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={qr} alt="ZIP-321 payment request" width={200} height={200} />
          <p className="text-center font-mono text-[10px] uppercase tracking-widest text-canvas/60">
            Scan with any Zcash wallet
          </p>
        </div>
      ) : (
        <div className="mb-6 flex h-[200px] items-center justify-center rounded-xl border border-dashed border-border bg-canvas text-center font-mono text-xs text-faint">
          {topic ? "Topic must be letters, numbers, - or _" : "Enter a topic to generate the QR"}
        </div>
      )}

      <Button onClick={copy} disabled={!uri} variant="secondary" className="w-full">
        {copied ? "Copied" : "Copy payment URI"}
        <Icon icon={copied ? CheckmarkCircle02Icon : Copy01Icon} size={15} />
      </Button>

      <div className="mt-6 flex flex-wrap gap-2 border-t border-border pt-5">
        {SCHEDULE.map((when) => (
          <span
            key={when}
            className="cursor-default rounded-full border border-border bg-white/[0.03] px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted"
          >
            {when}
          </span>
        ))}
      </div>

      <p className="mt-5 text-xs leading-relaxed text-faint">
        Anyone who guesses your topic can read the same alerts, so pick something unguessable if
        that matters to you. Turnstile stores the topic and nothing else.
      </p>
    </div>
  );
}
