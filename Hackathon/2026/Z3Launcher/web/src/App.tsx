import { useEffect, useState, useRef } from 'react'
import type { Snapshot } from './types'
import { subscribeStatus } from './api'
import { etaSeconds, type Sample } from './format'
import { Sidebar, type View } from './components/Sidebar'
import { ServiceCard } from './components/ServiceCard'
import { SyncProgress } from './components/SyncProgress'
import { Controls } from './components/Controls'
import { EndpointPanel } from './components/EndpointPanel'
import { LogViewer } from './components/LogViewer'
import { PrivacyPanel } from './components/PrivacyPanel'
import { FastStartPanel } from './components/FastStartPanel'
import { PreflightBanner } from './components/PreflightBanner'
import { RegtestSeeder } from './components/RegtestSeeder'
import { ClimaxPanel } from './components/ClimaxPanel'
import { ActionErrorBanner } from './components/ActionErrorBanner'
import { WalletDashboard } from './components/WalletDashboard'

const KNOWN_VIEWS: View[] = ['dashboard', 'wallet', 'tools', 'logs', 'settings']

function viewFromHash(): View {
  const h = window.location.hash.replace('#', '') as View
  return KNOWN_VIEWS.includes(h) ? h : 'dashboard'
}

const HEADERS: Record<View, { title: string; subtitle: string }> = {
  dashboard: { title: 'Overview', subtitle: 'Your Zcash node, at a glance.' },
  wallet: { title: 'Wallet', subtitle: 'Send, receive, and manage your accounts.' },
  tools: { title: 'Setup', subtitle: 'Get to a ready node, faster.' },
  logs: { title: 'Activity', subtitle: 'Live output from your services.' },
  settings: { title: 'Privacy & security', subtitle: 'Local-only by design.' },
}

export default function App() {
  const [snap, setSnap] = useState<Snapshot | null>(null)
  const [connected, setConnected] = useState(false)
  const [eta, setEta] = useState<number | null>(null)
  const [currentView, setViewState] = useState<View>(viewFromHash)
  const prevSample = useRef<Sample | null>(null)

  const setView = (v: View) => {
    setViewState(v)
    if (window.location.hash !== `#${v}`) window.location.hash = v
  }

  useEffect(() => {
    const onHash = () => setViewState(viewFromHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    const unsub = subscribeStatus(
      (s) => {
        setSnap(s)
        setConnected(true)
        const zebra = s.services.find((svc) => svc.service === 'zebra')
        if (zebra && zebra.state === 'syncing') {
          const cur: Sample = { height: zebra.height, t: Date.now() }
          if (prevSample.current) {
            const e = etaSeconds(prevSample.current, cur, zebra.tip)
            if (e !== null) setEta(e)
          }
          prevSample.current = cur
        } else {
          setEta(null)
          prevSample.current = null
        }
      },
      () => {
        setConnected(false)
        setSnap(null)
        setEta(null)
      },
    )
    return unsub
  }, [])

  const zebra = snap?.services.find((s) => s.service === 'zebra')
  const header = HEADERS[currentView]

  return (
    <div className="flex h-screen" style={{ background: 'var(--bg)', color: 'var(--fg)' }}>
      <Sidebar currentView={currentView} setView={setView} snap={snap} connected={connected} />

      <main className="custom-scrollbar relative flex-1 overflow-auto" style={{ background: 'var(--bg)' }}>
        <div className="mx-auto max-w-[1060px] px-[52px] py-[44px] pb-[90px]">
          {!snap ? (
            <div className="flex h-[70vh] flex-col items-center justify-center text-center">
              <div
                className="mb-8 h-12 w-12 animate-spin rounded-full border-4"
                style={{ borderColor: 'var(--line)', borderTopColor: 'var(--gold)' }}
              />
              <h2 className="text-[24px] font-bold tracking-tight" style={{ color: 'var(--fg)' }}>
                Connecting…
              </h2>
              <p className="mt-2 text-[16px] font-medium" style={{ color: 'var(--faint)' }}>
                Just a moment while we reach your node.
              </p>
            </div>
          ) : (
            <div className="animate-z3-in">
              {/* Page header */}
              <div className="mb-[34px]">
                <h1 className="m-0 text-[33px] font-bold tracking-[-0.025em]" style={{ color: 'var(--fg)' }}>
                  {header.title}
                </h1>
                <p className="mt-[7px] text-[15.5px] font-medium" style={{ color: 'var(--muted)' }}>
                  {header.subtitle}
                </p>
              </div>

              {currentView === 'dashboard' && (
                <div className="flex flex-col gap-[18px]">
                  <ActionErrorBanner snapshot={snap} />
                  <PreflightBanner />
                  {zebra && <SyncProgress zebra={zebra} eta={eta} />}
                  <Controls snap={snap} />
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {snap.services.map((s) => (
                      <ServiceCard key={s.service} svc={s} />
                    ))}
                  </div>
                  <EndpointPanel endpoints={snap.endpoints} />
                </div>
              )}

              {currentView === 'wallet' && <WalletDashboard />}

              {currentView === 'tools' && (
                <div className="flex flex-col gap-4">
                  <FastStartPanel />
                  {snap?.network === 'regtest' && <RegtestSeeder />}
                  <ClimaxPanel />
                </div>
              )}

              {currentView === 'logs' && <LogViewer />}

              {currentView === 'settings' && <PrivacyPanel />}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
