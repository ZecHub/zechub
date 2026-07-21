import type { Metadata } from "next";

import { ReadinessBoard } from "@/components/readiness/ReadinessBoard";
import { ArrowUpRight01Icon, Icon } from "@/components/icons/Icon";
import { AppFrame } from "@/components/layout/AppFrame";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Eyebrow } from "@/components/ui/Section";
import readiness from "@/content/readiness.json";
import type { ReadinessEntry } from "@/lib/types";

export const metadata: Metadata = {
  title: "Ecosystem readiness — Turnstile",
  description:
    "Which Zcash wallets, exchanges and services have publicly stated support for the Ironwood upgrade. Sourced, dated, and honest about what is unknown.",
};

const REPO_URL = "https://github.com/Enoch208/Turnstile";

export default function ReadinessPage() {
  const entries = readiness.entries as ReadinessEntry[];
  const unknown = entries.filter((entry) => entry.status === "unknown").length;
  const declaredReady = entries.filter(
    (entry) => entry.status === "ready" && entry.kind !== "service",
  ).length;

  return (
    <AppFrame>
      <Header />

      <section className="relative z-10 w-full">
        <Eyebrow index="F6" label="Ecosystem readiness" />

        <h1 className="mb-4 max-w-2xl text-4xl font-medium tracking-tighter text-foreground md:text-6xl">
          Who has said anything?
        </h1>

        <p className="mb-6 max-w-2xl text-base leading-relaxed text-muted">
          This board tracks <em>public statements</em> about the Ironwood upgrade — not our guesses
          about them. A row says <strong>ready</strong> only when someone has published something we
          can link to.
        </p>

        <div className="mb-10 max-w-2xl rounded-xl border border-border bg-surface px-5 py-4">
          <p className="mb-3 text-sm leading-relaxed text-foreground">
            {declaredReady === 0 ? (
              <>
                <strong>No wallet or exchange has publicly declared itself ready.</strong> Every
                confirmed-ready row below is infrastructure — a node or an indexer, not something
                you hold funds in.
              </>
            ) : null}
          </p>

          <p className="text-sm leading-relaxed text-muted">
            <strong className="text-foreground">
              {unknown} of {entries.length}
            </strong>{" "}
            have said nothing we could find. That is not a criticism and not a warning — it means we
            do not know, and we would rather say so than colour a square green. Ask them, and send
            us the answer.
          </p>
        </div>

        <ReadinessBoard entries={entries} />

        <a
          href={`${REPO_URL}/blob/main/frontend/content/readiness.json`}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-full border border-border bg-white/[0.03] px-5 py-3 text-sm text-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:text-foreground"
        >
          Correct this board — it is one JSON file
          <Icon icon={ArrowUpRight01Icon} size={15} />
        </a>

        <p className="mt-6 max-w-2xl text-xs leading-relaxed text-faint">
          Last reviewed {readiness.reviewedOn}. Every row carries the source we read and the date we
          read it. If a status is wrong or out of date, open a pull request against
          <code className="mx-1 font-mono text-muted">content/readiness.json</code>— no code
          required.
        </p>
      </section>

      <Footer />
    </AppFrame>
  );
}
