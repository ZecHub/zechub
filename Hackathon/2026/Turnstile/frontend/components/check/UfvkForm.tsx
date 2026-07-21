"use client";

import { useEffect, useState } from "react";

import { Alert02Icon, ArrowUpRight01Icon, CheckmarkCircle02Icon, Icon } from "@/components/icons/Icon";
import { Button, ButtonGlyph } from "@/components/ui/Button";
import { ORCHARD_ACTIVATION_HEIGHT } from "@/lib/constants";
import { type KeyVerdict, describeInspection, inspectStructurally } from "@/lib/keycheck";
import { KEY_PROBLEM_MESSAGE, inspectKey, isSeedPhrase } from "@/lib/keys";

interface UfvkFormProps {
  onScan: (ufvk: string, birthday: number) => void;
  disabled?: boolean;
}

export function UfvkForm({ onScan, disabled }: UfvkFormProps) {
  const [ufvk, setUfvk] = useState("");
  const [birthday, setBirthday] = useState("");
  const [problem, setProblem] = useState<string | null>(null);
  const [structural, setStructural] = useState<KeyVerdict | null>(null);

  useEffect(() => {
    const key = ufvk.trim();
    let cancelled = false;

    const timer = setTimeout(async () => {
      if (key.length < 20) {
        if (!cancelled) setStructural(null);
        return;
      }
      const inspection = await inspectStructurally(key);
      if (!cancelled) setStructural(inspection ? describeInspection(inspection) : null);
    }, 250);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [ufvk]);

  function submit(event: React.FormEvent) {
    event.preventDefault();

    if (isSeedPhrase(ufvk)) {
      setUfvk("");
      setProblem(
        "That looks like a seed phrase. It has been cleared and was not sent anywhere. Turnstile never accepts one.",
      );
      return;
    }

    const issue = inspectKey(ufvk);
    if (issue) {
      if (issue === "spending-key") setUfvk("");
      setProblem(KEY_PROBLEM_MESSAGE[issue]);
      return;
    }

    setProblem(null);
    onScan(ufvk.trim(), Number(birthday) || ORCHARD_ACTIVATION_HEIGHT);
  }

  return (
    <form onSubmit={submit} className="rounded-2xl border border-border bg-surface p-6 md:p-8">
      <label
        htmlFor="ufvk"
        className="mb-2 block cursor-pointer font-mono text-[10px] uppercase tracking-widest text-faint"
      >
        Unified full viewing key
      </label>

      <textarea
        id="ufvk"
        value={ufvk}
        onChange={(event) => {
          setUfvk(event.target.value);
          if (problem) setProblem(null);
        }}
        placeholder="uview1…"
        rows={4}
        spellCheck={false}
        autoComplete="off"
        disabled={disabled}
        className="w-full cursor-text resize-none rounded-lg border border-border bg-canvas px-4 py-3 font-mono text-sm text-foreground placeholder:text-faint focus-visible:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-50"
      />

      {structural ? (
        <div
          className={`mt-3 flex items-start gap-2.5 rounded-lg border px-3.5 py-2.5 text-xs leading-relaxed ${
            structural.blocking
              ? "border-exposed/40 bg-exposed/10 text-exposed"
              : structural.message
                ? "border-partial/40 bg-partial/10 text-partial"
                : "border-ready/30 bg-ready/[0.07] text-muted"
          }`}
        >
          <Icon
            icon={structural.blocking ? Alert02Icon : CheckmarkCircle02Icon}
            size={14}
            className={structural.blocking ? "" : structural.message ? "text-partial" : "text-ready"}
          />
          <span>
            {structural.pools ? (
              <>
                <span className="text-foreground">
                  Valid mainnet key, parsed in your browser
                </span>{" "}
                — sees{" "}
                <PoolChip name="Orchard" present={structural.pools.orchard} />
                {", "}
                <PoolChip name="Sapling" present={structural.pools.sapling} />
                {", "}
                <PoolChip name="transparent" present={structural.pools.transparent} />
                {structural.message ? (
                  <>
                    <br />
                    {structural.message}
                  </>
                ) : null}
              </>
            ) : (
              structural.message
            )}
          </span>
        </div>
      ) : null}

      <label
        htmlFor="birthday"
        className="mt-6 mb-2 block cursor-pointer font-mono text-[10px] uppercase tracking-widest text-faint"
      >
        Birthday height <span className="text-border-strong">(optional)</span>
      </label>

      <input
        id="birthday"
        value={birthday}
        onChange={(event) => setBirthday(event.target.value.replace(/[^0-9]/g, ""))}
        placeholder={String(ORCHARD_ACTIVATION_HEIGHT)}
        inputMode="numeric"
        disabled={disabled}
        className="w-full cursor-text rounded-lg border border-border bg-canvas px-4 py-3 font-mono text-sm text-foreground placeholder:text-faint focus-visible:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-50"
      />

      <p className="mt-2 text-xs leading-relaxed text-faint">
        The block your wallet was created at. Leave it blank and Turnstile scans from Orchard
        activation — always correct, just slower.
      </p>

      {problem ? (
        <div
          role="alert"
          className="mt-6 flex items-start gap-3 rounded-lg border border-exposed/40 bg-exposed/10 px-4 py-3 text-xs leading-relaxed text-exposed"
        >
          <Icon icon={Alert02Icon} size={15} />
          {problem}
        </div>
      ) : null}

      <Button type="submit" disabled={disabled} className="mt-6 w-full sm:w-auto">
        {disabled ? "Scanning…" : "Check my wallet"}
        <ButtonGlyph>
          <Icon icon={ArrowUpRight01Icon} size={16} />
        </ButtonGlyph>
      </Button>
    </form>
  );
}

function PoolChip({ name, present }: { name: string; present: boolean }) {
  return (
    <span className={present ? "text-ready" : "text-faint line-through decoration-1"}>
      {name}
    </span>
  );
}
