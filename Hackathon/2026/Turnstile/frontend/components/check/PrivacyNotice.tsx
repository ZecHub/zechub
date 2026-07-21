import { Cancel01Icon, CheckmarkCircle02Icon, Icon } from "@/components/icons/Icon";

const CAN_SEE = ["Pool balances your key can decrypt", "Nothing else"];

const CAN_NEVER_SEE = ["Your seed phrase", "Your spending keys"];

export function PrivacyNotice() {
  return (
    <aside className="rounded-2xl border border-border bg-surface p-6">
      <h2 className="mb-5 font-mono text-[10px] uppercase tracking-widest text-faint">
        What happens to your key
      </h2>

      <ul className="mb-6 flex flex-col gap-3">
        <Line tone="ready" text="Held in memory for the scan, then discarded" />
        <Line tone="ready" text="Never logged, never stored, never in a URL" />
        <Line tone="exposed" text="A spending key is refused — there is no field for one" />
      </ul>

      <div className="grid grid-cols-2 gap-4 border-t border-border pt-5">
        <Column heading="Can see" items={CAN_SEE} tone="ready" />
        <Column heading="Can never see" items={CAN_NEVER_SEE} tone="exposed" />
      </div>

      <p className="mt-6 border-t border-border pt-5 text-xs leading-relaxed text-faint">
        A viewing key cannot spend. It can read your balances and history, so paste it nowhere you
        do not trust — including here. To send us nothing at all, run the CLI locally.
      </p>
    </aside>
  );
}

function Line({ tone, text }: { tone: "ready" | "exposed"; text: string }) {
  const isReady = tone === "ready";

  return (
    <li className="flex items-start gap-3 text-xs leading-relaxed text-muted">
      <span className={isReady ? "text-ready" : "text-exposed"}>
        <Icon icon={isReady ? CheckmarkCircle02Icon : Cancel01Icon} size={14} />
      </span>
      {text}
    </li>
  );
}

function Column({
  heading,
  items,
  tone,
}: {
  heading: string;
  items: string[];
  tone: "ready" | "exposed";
}) {
  const isReady = tone === "ready";

  return (
    <div className="cursor-default">
      <h3
        className={`mb-2 font-mono text-[10px] uppercase tracking-widest ${
          isReady ? "text-ready" : "text-exposed"
        }`}
      >
        {heading}
      </h3>
      <ul className="flex flex-col gap-1.5">
        {items.map((item) => (
          <li key={item} className="text-xs leading-relaxed text-faint">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
