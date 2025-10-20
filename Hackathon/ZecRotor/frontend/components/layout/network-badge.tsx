export function NetworkBadge() {
  return (
    <div className="flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-muted)]/50 px-3 py-1.5 text-xs font-medium">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-accent-mint)] opacity-75"></span>
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-accent-mint)]"></span>
      </span>
      <span className="text-[var(--color-foreground)]">Testnet</span>
    </div>
  )
}
