import Link from "next/link"
import { NetworkBadge } from "./network-badge"
import { Github, FileText } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--color-border)] bg-[var(--color-near-ink)]/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 transition-smooth hover:opacity-80">
            <div className="text-2xl font-bold">
              <span className="text-[var(--color-zcash-gold)]">Zec</span>
              <span className="text-[var(--color-snow)]">Rotor</span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <nav className="flex items-center gap-2">
            <Link
              href="#"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-[var(--color-foreground)] transition-smooth hover:bg-[var(--color-muted)]"
            >
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Docs</span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-[var(--color-foreground)] transition-smooth hover:bg-[var(--color-muted)]"
            >
              <Github className="h-4 w-4" />
              <span className="hidden sm:inline">GitHub</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
