import type { Snapshot } from '../types'
import {
  Home, Wallet, SlidersHorizontal, Activity, Shield, Globe, Sun, Moon,
} from 'lucide-react'
import { useTheme, toggleTheme } from '../theme'

export type View = 'dashboard' | 'tools' | 'logs' | 'settings' | 'wallet'

interface SidebarProps {
  currentView: View
  setView: (view: View) => void
  snap: Snapshot | null
  connected: boolean
}

const NAV: { id: View; label: string; icon: typeof Home }[] = [
  { id: 'dashboard', label: 'Overview', icon: Home },
  { id: 'wallet', label: 'Wallet', icon: Wallet },
  { id: 'tools', label: 'Setup', icon: SlidersHorizontal },
  { id: 'logs', label: 'Activity', icon: Activity },
  { id: 'settings', label: 'Privacy', icon: Shield },
]

export function Sidebar({ currentView, setView, snap, connected }: SidebarProps) {
  const theme = useTheme()

  return (
    <aside
      className="flex h-screen w-[252px] flex-shrink-0 flex-col p-[26px_20px] border-r"
      style={{ background: 'var(--sidebar)', borderColor: 'var(--line)' }}
    >
      {/* Brand */}
      <div className="flex items-center gap-3 px-2">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-[11px] text-[13px] font-black tracking-tight"
          style={{ background: 'var(--gold)', color: 'var(--gold-ink)', boxShadow: '0 4px 14px -4px rgba(244,183,40,.5)' }}
        >
          Z3
        </div>
        <div className="flex flex-col leading-[1.15]">
          <span className="text-[14.5px] font-bold tracking-[-0.01em]" style={{ color: 'var(--fg)' }}>
            Z3 Launcher
          </span>
          <span className="text-[11px] font-medium" style={{ color: 'var(--faint)' }}>
            Zcash node
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="mt-[34px] flex flex-col gap-[3px]">
        {NAV.map((item) => {
          const Icon = item.icon
          const active = currentView === item.id
          return (
            <button
              key={item.id}
              data-active={active}
              onClick={() => setView(item.id)}
              className="z3-nav-item"
            >
              <span className="z3-nav-bar" />
              <Icon
                size={18}
                strokeWidth={2}
                style={{ color: active ? 'var(--gold-text)' : 'var(--faint)' }}
              />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="mt-auto flex flex-col gap-[14px]">
        {snap && (
          <div className="z3-card p-[13px_14px]">
            <div className="flex items-center justify-between">
              <span
                className="flex items-center gap-[7px] text-[11px] font-semibold uppercase tracking-[0.06em]"
                style={{ color: 'var(--faint)' }}
              >
                <Globe size={11} className="opacity-80" />
                Network
              </span>
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: 'var(--green)', boxShadow: '0 0 8px var(--green)' }}
              />
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-[13.5px] font-semibold capitalize" style={{ color: 'var(--fg)' }}>
                {snap.network}
              </span>
              <span
                className="flex items-center gap-1.5 text-[11px] font-semibold"
                style={{ color: connected ? 'var(--green)' : 'var(--red)' }}
              >
                <span
                  className={`h-[5px] w-[5px] rounded-full ${connected ? '' : 'animate-z3-pulse'}`}
                  style={{ background: connected ? 'var(--green)' : 'var(--red)' }}
                />
                {connected ? 'Connected' : 'Offline'}
              </span>
            </div>
          </div>
        )}

        <button
          onClick={toggleTheme}
          className="flex w-full items-center justify-center gap-[9px] rounded-[11px] border p-[9px] text-[12.5px] font-semibold transition-colors"
          style={{ borderColor: 'var(--line)', color: 'var(--muted)' }}
        >
          {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          {theme === 'dark' ? 'Light mode' : 'Dark mode'}
        </button>
      </div>
    </aside>
  )
}
