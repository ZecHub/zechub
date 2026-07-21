import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { GuideSteps, SafetyNote, UfvkCallout } from "@/components/guides/GuideSteps";
import { ArrowRight02Icon, ArrowUpRight01Icon, Icon } from "@/components/icons/Icon";
import { AppFrame } from "@/components/layout/AppFrame";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ButtonGlyph, ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Section";
import { GUIDE_LIST, getGuide } from "@/content/guides";

interface Params {
  params: Promise<{ wallet: string }>;
}

export function generateStaticParams() {
  return GUIDE_LIST.map((guide) => ({ wallet: guide.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { wallet } = await params;
  const guide = getGuide(wallet);

  if (!guide) return { title: "Guide not found — Turnstile" };

  return {
    title: `${guide.name} — Ironwood migration guide`,
    description: guide.summary,
  };
}

export default async function GuidePage({ params }: Params) {
  const { wallet } = await params;
  const guide = getGuide(wallet);

  if (!guide) notFound();

  return (
    <AppFrame>
      <Header />

      <article className="relative z-10 w-full">
        <Link
          href="/guides"
          className="mb-8 inline-flex cursor-pointer items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-faint transition-colors duration-200 hover:text-foreground"
        >
          <Icon icon={ArrowRight02Icon} size={13} className="rotate-180" />
          All guides
        </Link>

        <Eyebrow index="F3" label={guide.name} />

        <h1 className="mb-4 max-w-2xl text-4xl font-medium tracking-tighter text-foreground md:text-6xl">
          {guide.name}
        </h1>

        <p className="mb-10 max-w-xl text-base leading-relaxed text-muted">{guide.summary}</p>

        <UfvkCallout guide={guide} />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <GuideSteps steps={guide.steps} />
            <SafetyNote />
          </div>

          <aside className="flex flex-col gap-4">
            {guide.canExportUfvk ? (
              <ButtonLink href="/check">
                Check this wallet
                <ButtonGlyph>
                  <Icon icon={ArrowUpRight01Icon} size={16} />
                </ButtonGlyph>
              </ButtonLink>
            ) : (
              <div className="rounded-xl border border-border bg-surface p-5">
                <h3 className="mb-2 font-mono text-[10px] uppercase tracking-widest text-faint">
                  Can Turnstile check this wallet?
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  Not this one — it does not export a viewing key. The steps here read your balance
                  inside the wallet instead. If you use a wallet that does,{" "}
                  <Link href="/check" className="cursor-pointer text-accent hover:underline">
                    check it here
                  </Link>
                  .
                </p>
              </div>
            )}

            <a
              href={guide.source.url}
              target="_blank"
              rel="noreferrer"
              className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-border bg-surface px-5 py-4 text-sm text-muted transition-all duration-200 hover:border-border-strong hover:text-foreground"
            >
              {guide.source.label}
              <Icon icon={ArrowUpRight01Icon} size={15} />
            </a>

            <div className="rounded-xl border border-border bg-surface p-5">
              <h3 className="mb-2 font-mono text-[10px] uppercase tracking-widest text-faint">
                Get alerted before it closes
              </h3>
              <p className="text-sm leading-relaxed text-muted">
                <Link href="/alerts" className="cursor-pointer text-accent hover:underline">
                  Subscribe with a shielded memo
                </Link>{" "}
                — 48 hours before, 1 hour before, and at activation.
              </p>
            </div>
          </aside>
        </div>
      </article>

      <Footer />
    </AppFrame>
  );
}
