import { ArrowUpRight01Icon, Icon, Notification01Icon } from "@/components/icons/Icon";
import { ButtonGlyph, ButtonLink } from "@/components/ui/Button";
import { Accented, Eyebrow, Section, SectionHeading } from "@/components/ui/Section";

const SCHEDULE = ["T-48h", "T-1h", "At activation"];

export function AlertBand() {
  return (
    <Section id="alerts">
      <Eyebrow index="06" label="Alerts" />

      <div className="relative overflow-hidden rounded-[2rem] border border-border bg-surface p-8 md:p-12">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_80%_at_100%_0%,rgba(52,211,153,0.12),transparent_70%)]"
        />

        <div className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              className="mb-8"
              title={
                <>
                  A shielded memo <Accented>is the signup form</Accented>
                </>
              }
              body="Send any amount over 0.0001 ZEC to the Turnstile address with a memo naming your alert topic. No email. No account. No PII, ever."
            />

            <ButtonLink href="/alerts">
              Subscribe with a memo
              <ButtonGlyph>
                <Icon
                  icon={ArrowUpRight01Icon}
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </ButtonGlyph>
            </ButtonLink>
          </div>

          <div className="flex flex-col gap-4 rounded-2xl border border-border bg-canvas p-6">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <span className="font-mono text-[10px] uppercase tracking-widest text-faint">
                Memo format
              </span>
              <span className="text-accent">
                <Icon icon={Notification01Icon} size={16} />
              </span>
            </div>

            <code className="block font-mono text-sm text-accent">
              TURNSTILE:SUB:
              <span className="text-muted">&lt;your-topic&gt;</span>
            </code>

            <p className="text-xs leading-relaxed text-faint">
              The server reads the memo from the encrypted transaction, registers the topic, and
              pushes you an instant confirmation.
            </p>

            <div className="mt-2 flex flex-wrap gap-2 border-t border-border pt-4">
              {SCHEDULE.map((when) => (
                <span
                  key={when}
                  className="cursor-default rounded-full border border-border bg-white/[0.03] px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted"
                >
                  {when}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
