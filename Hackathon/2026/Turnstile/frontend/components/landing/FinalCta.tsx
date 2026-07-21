import { ArrowRight02Icon, ArrowUpRight01Icon, Icon } from "@/components/icons/Icon";
import { ButtonGlyph, ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { IRONWOOD_ACTIVATION_HEIGHT } from "@/lib/constants";
import { formatHeight } from "@/lib/format";

export function FinalCta() {
  return (
    <Section className="mt-28">
      <div className="relative overflow-hidden rounded-[2rem] border border-border bg-surface px-8 py-16 text-center md:px-12 md:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_100%_at_50%_100%,rgba(52,211,153,0.14),transparent_70%)]"
        />

        <div className="relative flex flex-col items-center">
          <h2 className="mb-6 max-w-3xl text-4xl font-medium leading-[1.05] tracking-tighter text-foreground md:text-6xl">
            Is your ZEC ready for block {formatHeight(IRONWOOD_ACTIVATION_HEIGHT)}?
          </h2>

          <p className="mb-10 max-w-xl text-base leading-relaxed text-muted">
            Sixty seconds, a viewing key, and a plan. Or run the whole check on your own machine
            and send us nothing at all.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/check">
              Check my wallet
              <ButtonGlyph>
                <Icon
                  icon={ArrowUpRight01Icon}
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </ButtonGlyph>
            </ButtonLink>

            <ButtonLink href="/guides" variant="secondary">
              Run local CLI
              <Icon
                icon={ArrowRight02Icon}
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </ButtonLink>
          </div>
        </div>
      </div>
    </Section>
  );
}
