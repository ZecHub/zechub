import { Cancel01Icon, CheckmarkCircle02Icon, Icon } from "@/components/icons/Icon";
import { Accented, Eyebrow, Section, SectionHeading } from "@/components/ui/Section";

const CAN_SEE = [
  "The pool balances your viewing key is entitled to decrypt",
  "Transparent, Sapling and Orchard amounts, separately",
  "Public chain data anyone can already read",
];

const CAN_NEVER_SEE = [
  "Your seed phrase — there is no field for one",
  "Your spending keys — no code path accepts them",
  "Your identity, email, or IP-linked history",
];

export function PrivacySplit() {
  return (
    <Section id="privacy">
      <Eyebrow index="04" label="Privacy" />

      <SectionHeading
        className="mb-10"
        title={
          <>
            What Turnstile can and <Accented>cannot see</Accented>
          </>
        }
        body="A viewing key is Zcash selective disclosure working exactly as designed. This is the whole product, so we state it plainly."
      />

      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[2rem] border border-border bg-border lg:grid-cols-2">
        <Panel
          tone="ready"
          heading="What it can see"
          note="Held in memory for the length of the scan, then discarded."
          items={CAN_SEE}
        />
        <Panel
          tone="exposed"
          heading="What it can never see"
          note="Not behind a flag. Not for testing. Not ever."
          items={CAN_NEVER_SEE}
        />
      </div>
    </Section>
  );
}

interface PanelProps {
  tone: "ready" | "exposed";
  heading: string;
  note: string;
  items: string[];
}

function Panel({ tone, heading, note, items }: PanelProps) {
  const isReady = tone === "ready";

  return (
    <div className="flex cursor-default flex-col gap-6 bg-surface p-8 md:p-10">
      <div className="flex items-center gap-3">
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-full border ${
            isReady
              ? "border-ready/25 bg-ready/10 text-ready"
              : "border-exposed/25 bg-exposed/10 text-exposed"
          }`}
        >
          <Icon icon={isReady ? CheckmarkCircle02Icon : Cancel01Icon} size={18} />
        </span>
        <h3 className="text-lg font-medium tracking-tight text-foreground">{heading}</h3>
      </div>

      <ul className="flex flex-col gap-4">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-muted">
            <span
              className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${
                isReady ? "bg-ready" : "bg-exposed"
              }`}
            />
            {item}
          </li>
        ))}
      </ul>

      <p className="mt-auto border-t border-border pt-5 font-mono text-[11px] uppercase tracking-widest text-faint">
        {note}
      </p>
    </div>
  );
}
