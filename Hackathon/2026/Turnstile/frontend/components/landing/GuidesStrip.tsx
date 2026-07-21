import Link from "next/link";

import { ArrowUpRight01Icon, Icon } from "@/components/icons/Icon";
import { Accented, Eyebrow, Section, SectionHeading } from "@/components/ui/Section";
import { WALLETS } from "@/lib/constants";

const BLURBS: Record<string, string> = {
  zashi: "Mobile, shielded by default",
  ywallet: "Mobile, advanced pool control",
  zingo: "Desktop, Zingo Labs",
  zallet: "The Zcash Z3 wallet",
  exchange: "Custodied — ask them today",
};

export function GuidesStrip() {
  return (
    <Section id="guides">
      <Eyebrow index="05" label="Migration guides" />

      <SectionHeading
        className="mb-10"
        title={
          <>
            Every step, <Accented>for your wallet</Accented>
          </>
        }
        body="Ten steps or fewer, each ending with a re-check. Adapted from the ZecHub wiki with attribution."
      />

      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[2rem] border border-border bg-border md:grid-cols-3 lg:grid-cols-5">
        {WALLETS.map((wallet) => (
          <Link
            key={wallet.slug}
            href={`/guides/${wallet.slug}`}
            className="group flex cursor-pointer flex-col justify-between gap-10 bg-surface p-8 transition-colors duration-200 hover:bg-elevated"
          >
            <span className="self-end text-border-strong transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent">
              <Icon icon={ArrowUpRight01Icon} size={18} />
            </span>

            <div>
              <h3 className="mb-1 text-base font-medium tracking-tight text-foreground">
                {wallet.name}
              </h3>
              <p className="text-xs leading-relaxed text-faint">{BLURBS[wallet.slug]}</p>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
