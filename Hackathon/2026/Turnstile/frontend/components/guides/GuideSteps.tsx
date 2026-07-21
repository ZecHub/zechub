import { Alert02Icon, CheckmarkCircle02Icon, Icon, ViewOffIcon } from "@/components/icons/Icon";
import type { Guide } from "@/content/guides/types";

export function UfvkCallout({ guide }: { guide: Guide }) {
  const canExport = guide.canExportUfvk;

  return (
    <aside
      className={`mb-10 flex items-start gap-4 rounded-2xl border p-6 ${
        canExport
          ? "border-ready/30 bg-ready/[0.06]"
          : "border-partial/30 bg-partial/[0.06]"
      }`}
    >
      <span className={canExport ? "text-ready" : "text-partial"}>
        <Icon icon={canExport ? CheckmarkCircle02Icon : ViewOffIcon} size={20} />
      </span>

      <div>
        <h2
          className={`mb-2 font-mono text-[10px] uppercase tracking-widest ${
            canExport ? "text-ready" : "text-partial"
          }`}
        >
          {canExport ? "Exports a viewing key" : "No viewing key export"}
        </h2>
        <p className="text-sm leading-relaxed text-muted">{guide.ufvkNote}</p>
      </div>
    </aside>
  );
}

export function GuideSteps({ steps }: { steps: Guide["steps"] }) {
  return (
    <ol className="flex flex-col">
      {steps.map((step, index) => (
        <li
          key={step.title}
          className="relative flex cursor-default gap-6 border-l border-border pb-10 pl-8 last:border-transparent last:pb-0"
        >
          <span className="absolute -left-[13px] top-0 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-elevated font-mono text-[10px] text-faint">
            {index + 1}
          </span>

          <div className="-mt-1">
            <h3 className="mb-2 text-lg font-medium tracking-tight text-foreground">
              {step.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted">{step.body}</p>

            {step.command ? (
              <code className="mt-4 block overflow-x-auto rounded-lg border border-border bg-canvas px-4 py-3 font-mono text-xs text-accent">
                {step.command}
              </code>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}

export function SafetyNote() {
  return (
    <aside className="mt-12 flex items-start gap-4 rounded-2xl border border-border bg-surface p-6">
      <span className="text-faint">
        <Icon icon={Alert02Icon} size={18} />
      </span>
      <p className="text-xs leading-relaxed text-faint">
        Educational guidance, not financial advice. Your funds are never frozen and cannot be lost
        by the activation itself — Orchard simply stops accepting new value. If a balance ever
        looks wrong, stop and ask in the ZecHub Discord before moving funds again. Verify every
        step against the official Zcash sources.
      </p>
    </aside>
  );
}
