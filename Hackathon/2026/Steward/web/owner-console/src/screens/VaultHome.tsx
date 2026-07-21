import { useMemo, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'

import { ApiError, api } from '../api/client'
import type { Network } from '../api/types'
import { CopyButton, copyText } from '../components/CopyButton'
import { PulseLine } from '../components/PulseLine'
import { Shell, StateChip } from '../components/Shell'
import { loadSecret, signHeartbeat } from '../lib/heartbeat'
import { navigate, usePrefersReducedMotion, useRootAmbient, useVault } from '../lib/hooks'
import type { Ambient } from '../lib/vitals'
import { formatCountdown, formatZec, isClose, truncateMiddle, vitals } from '../lib/vitals'

const STATE_COPY: Record<string, { chip: string; word: string; sub: string }> = {
  active: { chip: 'Active', word: 'Active', sub: 'Heartbeats are current. The vault answers only to you.' },
  waning: { chip: 'Waning', word: 'Waning', sub: 'Inside the grace window. Send a heartbeat, or the switch will trip.' },
  recoverable: { chip: 'Recoverable', word: 'Lapsed', sub: 'The heartbeats have lapsed. Guardians may now release the vault.' },
}

export function VaultHome({ id }: { id: string }) {
  const { status, error, loading, nowSecs, refresh } = useVault(id)
  const reduced = usePrefersReducedMotion()
  const [beating, setBeating] = useState(false)
  const [hbError, setHbError] = useState<string | null>(null)

  const v = status ? vitals(status, nowSecs) : null
  useRootAmbient(v?.ambient ?? null)

  async function sendHeartbeat() {
    setHbError(null)
    const secret = loadSecret(id)
    if (!secret) {
      setHbError(
        'No heartbeat key on this device. The signing secret lives only in the browser that ' +
          'sealed the vault — send heartbeats from there (or re-seal the vault).',
      )
      return
    }
    setBeating(true)
    try {
      // Sign a proof-of-life for (vault_id, now) with the LOCAL secret; post only the signature.
      // Bump strictly past the last recorded heartbeat so a same-second re-tap stays monotonic.
      const now = Math.max(
        Math.floor(Date.now() / 1000),
        (status?.last_heartbeat ?? 0) + 1,
      )
      const sig_hex = await signHeartbeat(secret, id, now)
      await api.heartbeat(id, { time: now, sig_hex })
      await refresh()
    } catch (e) {
      setHbError(e instanceof ApiError ? e.message : String(e))
    } finally {
      window.setTimeout(() => setBeating(false), 900)
    }
  }

  if (loading && !status) {
    return (
      <Shell>
        <p className="lede">Reading the instrument…</p>
      </Shell>
    )
  }

  if (!status || !v) {
    return (
      <Shell>
        <div className="panel notice notice--grave" role="alert">
          <p className="eyebrow">No signal</p>
          <p>{error ?? `No such vault: ${id}`}</p>
          <button className="btn" onClick={() => navigate('#/')}>Seal a new vault</button>
        </div>
      </Shell>
    )
  }

  const copy = STATE_COPY[v.ambient]
  const close = isClose(v.remaining)

  return (
    <Shell aside={<StateChip label={copy.chip} tone={v.ambient} />}>
      <div className="home">
        <div className="home-id">
          <span className="eyebrow">Vault</span>
          <span className="data home-id-val">{status.vault_id}</span>
        </div>

        {/* SIGNATURE 1 — the proof-of-life pulse */}
        <section className="monitor" data-state={v.ambient}>
          <div className="monitor-head">
            <span className="eyebrow">Proof of life</span>
            <span className="monitor-state" data-state={v.ambient}>
              {v.flat ? 'flatline' : `${v.pulsePeriod.toFixed(1)}s cadence`}
            </span>
          </div>
          <PulseLine period={v.pulsePeriod} amp={v.pulseAmp} flat={v.flat} reduced={reduced} />
          <div className="monitor-foot">
            <span className="monitor-word" data-state={v.ambient}>{copy.word}</span>
            <span className="monitor-sub">{copy.sub}</span>
          </div>
        </section>

        <section className="ledger">
          <div className="countdown-block panel">
            <p className="eyebrow">{v.flat ? 'Switch tripped' : 'Time to trip'}</p>
            <p className="countdown" data-close={close} data-state={v.ambient}>
              {formatCountdown(v.remaining)}
            </p>
            <p className="fine">
              {v.flat
                ? 'The dead-man’s-switch has engaged.'
                : close
                  ? 'Counting down — send a heartbeat to reset the switch.'
                  : `Next heartbeat resets the deadline by ${humanSpan(status.interval_secs)}.`}
            </p>
            <div className="countdown-actions">
              <button className="btn btn--primary" onClick={sendHeartbeat} disabled={beating} data-beat={beating}>
                {beating ? 'Heartbeat sent' : 'Send heartbeat'}
              </button>
            </div>
            {hbError && <p className="notice notice--grave" role="alert">{hbError}</p>}
          </div>

          <div className="cards">
            <article className="panel card">
              <p className="eyebrow">Quorum</p>
              <p className="card-lead data">{status.threshold} of {status.guardians.length}</p>
              <ul className="guardian-list">
                {status.guardians.map((g) => (
                  <li key={g} className="guardian-row">
                    <span className="guardian-mark" aria-hidden="true" />
                    <span className="data guardian-id">{g}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="panel card">
              <p className="eyebrow">Heir</p>
              {status.heir ? (
                <>
                  <p className="card-lead data card-lead--addr" title={status.heir}>
                    {truncateMiddle(status.heir, 12, 8)}
                  </p>
                  <p className="fine">The shielded address the vault would release to.</p>
                </>
              ) : (
                <p className="fine">No heir recorded.</p>
              )}
            </article>
          </div>
        </section>

        <OnChain
          id={id}
          network={status.network}
          address={status.receiving_address}
          zatoshis={status.balance.zatoshis}
          ambient={v.ambient}
          refresh={refresh}
        />

        <div className="home-foot">
          <button className="btn btn--ghost" onClick={() => navigate(`#/vault/${id}/guardians`)}>
            Guardian links →
          </button>
          <button className="btn btn--ghost" onClick={() => navigate(`#/vault/${id}/release`)}>
            Convene a release →
          </button>
          <span className="fine">
            Distribute enrollment links to your guardians, or convene a recovery sweep (owner) or
            inheritance release (heir). The release is gated by this same switch.
          </span>
        </div>
      </div>
    </Shell>
  )
}

/**
 * The vault's on-chain ledger: its derived receiving address, its last-synced balance,
 * a real network Sync (~15s), and a network-appropriate way to fund it. Holds its own
 * sync state; `refresh` re-reads GET /vault/:id so the balance reflects the sync.
 */
function OnChain({
  id,
  network,
  address,
  zatoshis,
  ambient,
  refresh,
}: {
  id: string
  network: Network
  address: string | null
  zatoshis: number | null
  ambient: Ambient
  refresh: () => Promise<void>
}) {
  const [syncing, setSyncing] = useState(false)
  const [syncError, setSyncError] = useState<string | null>(null)
  const [tip, setTip] = useState<number | null>(null)

  const netLabel = network === 'main' ? 'Mainnet' : 'Testnet'

  // The QR paints with real colors — SVG cannot read CSS custom properties as
  // attributes — so we resolve the tokens once: ironwood-ink modules on a bone tile.
  const qrFg = useMemo(() => readToken('--ironwood', '#1A1411'), [])
  const qrBg = useMemo(() => readToken('--bone', '#ECE1D0'), [])

  async function sync() {
    setSyncError(null)
    setSyncing(true)
    try {
      const res = await api.sync(id)
      setTip(res.tip_height)
      await refresh()
    } catch (e) {
      setSyncError(e instanceof ApiError ? e.message : String(e))
    } finally {
      setSyncing(false)
    }
  }

  async function getTestnetCoins() {
    if (address) await copyText(address)
    window.open('https://fauzec.com', '_blank', 'noopener,noreferrer')
  }

  return (
    <section className="onchain panel" data-state={ambient}>
      <div className="onchain-head">
        <p className="eyebrow">On-chain</p>
        <span className="onchain-net data" data-net={network}>{netLabel}</span>
      </div>

      {/* Balance + a real network scan of the vault's viewing key. */}
      <div className="onchain-balance-row">
        <div className="onchain-balance">
          <p className="field-label eyebrow">Balance</p>
          {zatoshis === null ? (
            <p className="onchain-zec onchain-zec--muted">Not synced yet</p>
          ) : (
            <>
              <p className="onchain-zec">
                <span className="data onchain-zec-num">{formatZec(zatoshis)}</span>
                <span className="onchain-zec-unit"> ZEC</span>
              </p>
              <p className="fine onchain-zat data">{zatoshis.toLocaleString('en-US')} zat</p>
            </>
          )}
          {tip !== null && (
            <p className="fine">synced to block {tip.toLocaleString('en-US')}</p>
          )}
        </div>
        <button
          className="btn onchain-sync"
          onClick={sync}
          disabled={syncing}
          data-scanning={syncing}
        >
          {syncing ? 'Scanning the chain…' : zatoshis === null ? 'Sync' : 'Re-sync'}
        </button>
      </div>

      {/* Fund this vault: the way value comes under guardianship is to send ZEC to the
          vault's own address — from any wallet, on either network. */}
      {address ? (
        <div className="fund">
          <div className="fund-head">
            <p className="eyebrow">Fund this vault</p>
            <p className="fund-lede">
              Send ZEC to this address from any wallet to bring it under guardianship.
            </p>
          </div>
          <div className="fund-body">
            <figure className="qr">
              <div className="qr-frame">
                <QRCodeSVG
                  value={address}
                  size={148}
                  level="M"
                  marginSize={2}
                  bgColor={qrBg}
                  fgColor={qrFg}
                  title={`${netLabel} receiving address, as a QR code`}
                />
              </div>
              <figcaption className="fine qr-cap">Scan from a phone wallet</figcaption>
            </figure>

            <div className="fund-detail">
              <p className="field-label eyebrow">{netLabel} receiving address</p>
              <p className="data fund-addr">{address}</p>
              <div className="fund-actions">
                <CopyButton
                  className="btn fund-copy"
                  text={address}
                  label={`${netLabel} receiving address`}
                >
                  Copy address
                </CopyButton>
                {network === 'test' && (
                  <button className="btn onchain-fund" onClick={getTestnetCoins}>
                    Get testnet coins →
                  </button>
                )}
              </div>
              {network === 'test' && (
                <p className="fine fund-note">
                  “Get testnet coins” copies this address and opens Fauzec — solve the
                  captcha there, then Sync.
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p className="fine onchain-nosigner">
          No address yet — the signer binary isn’t built, so this vault’s address can’t
          be derived. Build it with{' '}
          <span className="data">cargo build --manifest-path crates/steward-signer/Cargo.toml</span>,
          then reopen the instrument.
        </p>
      )}

      {syncError && (
        <p className="notice notice--grave onchain-error" role="alert">
          {syncError}
        </p>
      )}
    </section>
  )
}

/** Resolve a design token to its concrete value so the QR can paint with real colors
 *  (an SVG `fill` attribute can't read a CSS custom property). Falls back to the
 *  tokens.css value if the document isn't ready. */
function readToken(name: string, fallback: string): string {
  if (typeof document === 'undefined') return fallback
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return v || fallback
}

function humanSpan(secs: number): string {
  if (secs % 86_400 === 0) return `${secs / 86_400}d`
  if (secs % 3600 === 0) return `${secs / 3600}h`
  if (secs % 60 === 0) return `${secs / 60} min`
  return `${secs}s`
}
