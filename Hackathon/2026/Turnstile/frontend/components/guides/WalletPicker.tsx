import Link from "next/link";

import { ArrowUpRight01Icon, Icon } from "@/components/icons/Icon";
import { GUIDE_LIST } from "@/content/guides";

const KIND_LABEL: Record<string, string> = {
  mobile: "Mobile",
  desktop: "Desktop",
  cli: "Command line",
  custodial: "Custodial",
};

export function WalletPicker() {
  return (
    <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[2rem] border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
      {GUIDE_LIST.map((guide) => (
        <Link
          key={guide.slug}
          href={`/guides/${guide.slug}`}
          className="group flex cursor-pointer flex-col justify-between gap-8 bg-surface p-8 transition-colors duration-200 hover:bg-elevated"
        >
          <div className="flex items-start justify-between">
            <span className="font-mono text-[10px] uppercase tracking-widest text-faint">
              {KIND_LABEL[guide.kind]}
            </span>
            <span className="text-border-strong transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent">
              <Icon icon={ArrowUpRight01Icon} size={18} />
            </span>
          </div>

          <div>
            <h2 className="mb-2 text-xl font-medium tracking-tight text-foreground">
              {guide.name}
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-muted">{guide.summary}</p>

            <span
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-widest ${
                guide.canExportUfvk
                  ? "border-ready/30 bg-ready/10 text-ready"
                  : "border-partial/30 bg-partial/10 text-partial"
              }`}
            >
              {guide.canExportUfvk ? "Checkable in Turnstile" : "Check inside the wallet"}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
