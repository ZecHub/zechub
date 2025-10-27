import Link from "next/link"

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--color-border)] bg-[var(--color-near-ink)]/50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-center text-sm text-[var(--color-muted-foreground)]">
            ZecRotor is experimental software. Use at your own risk.
          </p>
          <nav className="flex gap-4">
            <Link
              href="#"
              className="text-sm text-[var(--color-muted-foreground)] transition-smooth hover:text-[var(--color-foreground)]"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-sm text-[var(--color-muted-foreground)] transition-smooth hover:text-[var(--color-foreground)]"
            >
              Privacy
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
