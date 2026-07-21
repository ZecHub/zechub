import { LiveCountdown } from "@/components/countdown/LiveCountdown";
import { Accented, Eyebrow, Section, SectionHeading } from "@/components/ui/Section";

export function CountdownSection() {
  return (
    <Section id="countdown">
      <Eyebrow index="01" label="Activation" />

      <SectionHeading
        className="mb-10"
        title={
          <>
            The Orchard pool <Accented>stops taking deposits</Accented>
          </>
        }
        body="Nothing new enters Orchard after the activation height. Value already inside is not frozen and cannot be lost — it leaves only by being spent out, through the turnstile."
      />

      <LiveCountdown />

      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-faint">
        The block height is the truth; the clock is an estimate derived from the 75-second block
        target. Turnstile reads the tip from mainnet every minute — if it cannot, it says so rather
        than showing you a number it made up.
      </p>
    </Section>
  );
}
