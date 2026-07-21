import { ArrowRight02Icon, ArrowUpRight01Icon, Icon } from "@/components/icons/Icon";
import { LiveBadge } from "@/components/landing/LiveBadge";
import { HeroVisual, type PoolTotals } from "@/components/landing/HeroVisual";
import { LiveTelemetry } from "@/components/countdown/LiveTelemetry";
import { ButtonGlyph, ButtonLink } from "@/components/ui/Button";
import { IRONWOOD_ACTIVATION_HEIGHT } from "@/lib/constants";
import { formatHeight } from "@/lib/format";

export function Hero({ pools }: { pools: PoolTotals | null }) {
  return (
    <section className="relative z-10 grid flex-grow grid-cols-1 items-center gap-12 pb-8 lg:grid-cols-12 lg:gap-20 lg:pb-0">
      <div className="flex flex-col justify-center lg:col-span-7">
        <LiveBadge />

        <h1 className="mb-8 text-5xl font-medium leading-[0.95] tracking-tighter text-foreground lg:text-[5rem]">
          Turnstile
          <br />
          <span className="bg-gradient-to-r from-faint via-foreground to-faint bg-clip-text font-light text-transparent">
            Terminal
          </span>
        </h1>

        <p className="mb-10 max-w-md text-sm font-medium leading-relaxed tracking-wide text-muted">
          Find out where your ZEC sits before block{" "}
          {formatHeight(IRONWOOD_ACTIVATION_HEIGHT)}. Paste a viewing key to read your
          wallet&apos;s pool balances — never a spending key, never stored.
        </p>

        <div className="mb-16 flex flex-col gap-3 sm:flex-row lg:mb-20">
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

        <LiveTelemetry />
      </div>

      <div className="lg:col-span-5">
        <HeroVisual pools={pools} />
      </div>
    </section>
  );
}
