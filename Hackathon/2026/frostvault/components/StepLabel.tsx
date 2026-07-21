export function StepLabel({ number, title }: { number: number; title: string }) {
  return (
    <div className="mb-2 flex items-center gap-2">
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-signal/15 font-mono text-[10px] font-medium text-signal [.demo-mode_&]:h-7 [.demo-mode_&]:w-7 [.demo-mode_&]:text-sm">
        {number}
      </span>
      <span className="text-sm font-medium text-foreground [.demo-mode_&]:text-lg">{title}</span>
    </div>
  );
}
