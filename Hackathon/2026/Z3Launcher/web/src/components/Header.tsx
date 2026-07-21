import type { Snapshot } from '../types'

export function Header({ snap, connected }: { snap: Snapshot | null; connected: boolean }) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-zinc-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 font-bold text-zinc-950 shadow-lg shadow-white/5">
            Z3
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight text-white">Z3 Launcher</h1>
            <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">
              Control Plane · v0.1.0
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {snap && (
            <div className="hidden rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-bold text-zinc-300 uppercase tracking-widest sm:block">
              {snap.network}
            </div>
          )}
          <div className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
            <div className={`h-2 w-2 rounded-full shadow-sm ${connected ? 'bg-emerald-500 shadow-emerald-500/50' : 'bg-rose-500 shadow-rose-500/50'}`} />
            <span className={`text-xs font-semibold ${connected ? 'text-emerald-400' : 'text-rose-400'}`}>
              {connected ? 'System Live' : 'System Offline'}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
