import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'

import { ApiError, api } from '../api/client'
import type { Network } from '../api/types'
import { Shell } from '../components/Shell'
import { generateHeartbeatKey, signHeartbeat, storeSecret } from '../lib/heartbeat'
import { navigate, useRootAmbient } from '../lib/hooks'
import { parseShares, saveSeed } from '../lib/vault-store'

const NAME_POOL = [
  'Amara Okoye',
  'Bjorn Vale',
  'Chen Wei',
  'Dara Ibe',
  'Esi Mensah',
  'Femi Adou',
  'Gowon Tal',
]

/** Seconds per unit for the custom-cadence builder. Month = 30 days, matching the
 *  coordinator's arithmetic (trip_at = last_heartbeat + interval_secs + grace_secs). */
const UNIT_SECS = {
  min: 60,
  hour: 3_600,
  day: 86_400,
  week: 604_800,
  month: 2_592_000,
} as const
type Unit = keyof typeof UNIT_SECS
const UNIT_OPTIONS: { id: Unit; label: string }[] = [
  { id: 'min', label: 'Minutes' },
  { id: 'hour', label: 'Hours' },
  { id: 'day', label: 'Days' },
  { id: 'week', label: 'Weeks' },
  { id: 'month', label: 'Months' },
]
const CUSTOM_ID = 'custom'
const MIN_CADENCE_SECS = 60

interface Cadence {
  id: string
  label: string
  interval: number
  grace: number
  note: string
  /** A quiet pill on the tile, e.g. "for testing". */
  tag?: string
}
const CADENCES: Cadence[] = [
  // Real cadences first — a rhythm a person can actually keep for years. Monthly is the default.
  { id: 'weekly', label: 'Weekly', interval: 604_800, grace: 86_400, note: 'A heartbeat every week; if you miss one, your guardians can act after a 1-day grace.' },
  { id: 'monthly', label: 'Monthly', interval: 2_592_000, grace: 259_200, note: 'A heartbeat every month; if you miss one, your guardians can act after a 3-day grace.' },
  { id: 'yearly', label: 'Yearly', interval: 31_536_000, grace: 1_209_600, note: 'A heartbeat every year; if you miss one, your guardians can act after a 2-week grace.' },
  // Short demo cadences — tucked at the bottom, clearly marked, so the flatline can still
  // be rehearsed live without anyone mistaking them for a real stewardship rhythm.
  { id: 'demo', label: 'Demo — trips in 3 min', interval: 120, grace: 60, tag: 'for testing', note: 'The pulse decays live over about three minutes — for rehearsing the flatline and release.' },
  { id: 'rapid', label: 'Rapid — trips in 45 sec', interval: 30, grace: 15, tag: 'for testing', note: 'Trips within a minute, to show the flatline and release in seconds.' },
]

const SPANS: [number, string][] = [
  [2_592_000, 'month'],
  [604_800, 'week'],
  [86_400, 'day'],
  [3_600, 'hour'],
  [60, 'minute'],
  [1, 'second'],
]
/** Break `secs` into its largest clean unit — for the in-voice cadence sentence. */
function splitSpan(secs: number): { n: number; unit: string } {
  for (const [size, unit] of SPANS) {
    if (secs >= size && secs % size === 0) return { n: secs / size, unit }
  }
  for (const [size, unit] of SPANS) {
    if (secs >= size) return { n: Math.round(secs / size), unit }
  }
  return { n: Math.max(0, Math.round(secs)), unit: 'second' }
}
function everyPhrase(secs: number): string {
  const { n, unit } = splitSpan(secs)
  return n === 1 ? unit : `${n} ${unit}s`
}
function gracePhrase(secs: number): string {
  const { n, unit } = splitSpan(secs)
  return `${n}-${unit}`
}
/** The instrument's own words for a cadence: "A heartbeat every month; if you miss
 *  one, your guardians can act after a 3-day grace." */
function humanCadence(interval: number, grace: number): string {
  return `A heartbeat every ${everyPhrase(interval)}; if you miss one, your guardians can act after a ${gracePhrase(grace)} grace.`
}
/** Validate a custom cadence, returning a grave in-voice error or null if sound. */
function validateCustom(interval: number, grace: number): string | null {
  if (!Number.isFinite(interval) || interval < MIN_CADENCE_SECS)
    return 'A heartbeat cadence must be at least one minute. Lengthen the interval.'
  if (!Number.isFinite(grace) || grace < MIN_CADENCE_SECS)
    return 'The grace window must be at least one minute.'
  if (grace >= interval)
    return 'The grace window must be shorter than the interval — grace is the reprieve after a missed heartbeat, not the whole cycle.'
  return null
}

interface NetworkChoice {
  id: Network
  label: string
  note: string
}
const NETWORKS: NetworkChoice[] = [
  { id: 'test', label: 'Testnet', note: 'Free coins from a faucet. The safe place to rehearse succession.' },
  { id: 'main', label: 'Mainnet', note: 'The live Zcash chain. A release here sweeps real value to your heir.' },
]

const DEMO_HEIRS: Record<Network, string> = {
  test: 'utest1heir9orchard7demoreceiver2z8k3m5p6q4r7s9t2u4v6w8x',
  main: 'u1heir9orchard7demoreceiver2z8k3m5p6q4r7s9t2u4v6w8x',
}

/** Detect a Zcash address's network from its prefix — Unified (`u1`/`utest1`),
 *  Sapling (`zs1`/`ztestsapling1`), TEX (`tex1`/`textest1`), or transparent
 *  (`t1`,`t3` / `tm`,`t2`). Prefix-only: verifies the NETWORK, not the checksum. */
function addressNetwork(addr: string): Network | 'unknown' {
  const a = addr.trim().toLowerCase()
  if (!a) return 'unknown'
  if (a.startsWith('utest1') || a.startsWith('ztestsapling1') || a.startsWith('textest1')) return 'test'
  if (a.startsWith('u1') || a.startsWith('zs1') || a.startsWith('tex1')) return 'main'
  if (a.startsWith('tm') || a.startsWith('t2')) return 'test'
  if (a.startsWith('t1') || a.startsWith('t3')) return 'main'
  return 'unknown'
}
const netLabel = (n: Network) => (n === 'main' ? 'mainnet' : 'testnet')

function clamp(v: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, v))
}

/** The ceremony, one decision per step. The last step restates every choice before
 *  the single irreversible seal. */
const STEPS = [
  { key: 'network', title: 'Network' },
  { key: 'guardians', title: 'Guardians' },
  { key: 'cadence', title: 'Cadence' },
  { key: 'heir', title: 'Heir' },
  { key: 'review', title: 'Review' },
] as const
const LAST = STEPS.length - 1

export function CreateVault() {
  useRootAmbient('active')

  const [n, setN] = useState(3)
  const [t, setT] = useState(2)
  const [names, setNames] = useState<string[]>(() => NAME_POOL.slice(0, 3))
  const [cadenceId, setCadenceId] = useState('monthly')
  // Custom-cadence builder (interval + grace, each a number × unit). Amounts are held
  // as strings so the fields stay editable; they parse to seconds via UNIT_SECS.
  const [ivAmount, setIvAmount] = useState('1')
  const [ivUnit, setIvUnit] = useState<Unit>('month')
  const [grAmount, setGrAmount] = useState('3')
  const [grUnit, setGrUnit] = useState<Unit>('day')
  const [network, setNetwork] = useState<Network>('test')
  const [heir, setHeir] = useState(DEMO_HEIRS.test)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [step, setStep] = useState(0)

  const preset = useMemo(
    () => CADENCES.find((c) => c.id === cadenceId) ?? CADENCES[0],
    [cadenceId],
  )
  const isCustom = cadenceId === CUSTOM_ID
  const customInterval = (parseInt(ivAmount, 10) || 0) * UNIT_SECS[ivUnit]
  const customGrace = (parseInt(grAmount, 10) || 0) * UNIT_SECS[grUnit]
  const customError = isCustom ? validateCustom(customInterval, customGrace) : null

  // Resolved cadence — the same numbers that go on the wire and read out in Review.
  const intervalSecs = isCustom ? customInterval : preset.interval
  const graceSecs = isCustom ? customGrace : preset.grace
  const cadenceLabel = isCustom ? 'Custom cadence' : preset.label
  const networkChoice = NETWORKS.find((nw) => nw.id === network) ?? NETWORKS[0]

  // All n guardians named — the only gate the old single form enforced.
  const namesFilled = names.length >= n && names.slice(0, n).every((s) => s.trim().length > 0)
  const heirClean = heir.trim()

  // Heir address must match the vault's network (a testnet vault can't release to a
  // mainnet address, and vice versa). Optional field: empty is fine.
  const heirNet = heirClean ? addressNetwork(heirClean) : null
  const heirMismatch = !!heirNet && heirNet !== 'unknown' && heirNet !== network
  const heirUnknown = heirNet === 'unknown'
  const heirError = heirMismatch
    ? `That is a ${netLabel(heirNet as Network)} address, but this is a ${netLabel(network)} vault — the heir must be a ${netLabel(network)} address.`
    : null

  // Per-step validity. Network is always chosen; the heir is optional (as before);
  // Review can seal only once the real constraints hold.
  const stepValid = [
    true, // 0 Network
    namesFilled, // 1 Guardians & threshold (t is clamped to 1..n)
    !customError, // 2 Heartbeat cadence
    !heirMismatch, // 3 Heir — optional, but if given it must match the network
    namesFilled && !customError && !heirMismatch, // 4 Review & seal
  ]
  const canSeal = namesFilled && !customError && !heirMismatch && !busy

  function setGuardianCount(next: number) {
    const nn = clamp(next, 2, 7)
    setN(nn)
    setT((prev) => clamp(prev, 1, nn))
    setNames((prev) => {
      const out = prev.slice(0, nn)
      while (out.length < nn) out.push(NAME_POOL[out.length] ?? `Guardian ${out.length + 1}`)
      return out
    })
  }

  function setName(i: number, value: string) {
    setNames((prev) => prev.map((v, k) => (k === i ? value : v)))
  }

  /** Switch network; if the heir is still an untouched demo placeholder, swap it to
   *  the matching network's placeholder so the default never reads as a mismatch. */
  function changeNetwork(next: Network) {
    setNetwork(next)
    setHeir((h) => (h === DEMO_HEIRS.test || h === DEMO_HEIRS.main ? DEMO_HEIRS[next] : h))
  }

  function back() {
    setError(null)
    setStep((s) => Math.max(0, s - 1))
  }
  function next() {
    if (!stepValid[step]) return
    setError(null)
    setStep((s) => Math.min(LAST, s + 1))
  }
  /** Jump to step k. Back is always allowed; forward only over already-valid steps. */
  function goTo(k: number) {
    if (k === step) return
    if (k > step) {
      for (let i = step; i < k; i++) if (!stepValid[i]) return
    }
    setError(null)
    setStep(k)
  }

  // Enter (in any field) advances while valid; on the final step it seals.
  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (step < LAST) {
      next()
      return
    }
    void seal()
  }

  async function seal() {
    setError(null)
    const clean = names.slice(0, n).map((s) => s.trim())
    if (clean.filter(Boolean).length !== n) {
      setError(`Name all ${n} guardians before sealing the vault.`)
      setStep(1)
      return
    }
    if (isCustom) {
      const err = validateCustom(customInterval, customGrace)
      if (err) {
        setError(err)
        setStep(2)
        return
      }
    }
    if (heirMismatch) {
      setError(heirError)
      setStep(3)
      return
    }
    setBusy(true)
    try {
      // Generate the owner's Ed25519 heartbeat keypair on THIS device. Only the PUBLIC key is
      // sent; the secret stays in localStorage — the coordinator never sees it, so it can
      // verify proofs-of-life but never forge them.
      const { secretHex, publicHex } = await generateHeartbeatKey()

      const res = await api.seedVault({
        threshold: t,
        n,
        guardian_names: names.slice(0, n).map((s) => s.trim()),
        interval_secs: intervalSecs,
        grace_secs: graceSecs,
        heir: heirClean || undefined,
        network,
        heartbeat_pubkey: publicHex,
      })
      // Persist the heartbeat secret locally (keyed by vault id) so "Send heartbeat" can sign.
      storeSecret(res.vault_id, secretHex)

      // Establish the first signed proof-of-life so guardians have a verifiable bulletin from
      // the start. Sign strictly past the create-time heartbeat to satisfy the monotonic rule.
      try {
        const st = await api.vaultStatus(res.vault_id)
        const now = Math.max(Math.floor(Date.now() / 1000), st.last_heartbeat + 1)
        const sig_hex = await signHeartbeat(secretHex, res.vault_id, now)
        await api.heartbeat(res.vault_id, { time: now, sig_hex })
      } catch {
        // Non-fatal: the owner can send the first heartbeat from the vault home.
      }

      // Keep the guardian shares this tab saw (the coordinator does not store them),
      // then open the "Distribute guardian shares" step so the owner can hand each
      // guardian their enrollment link.
      saveSeed({
        vaultId: res.vault_id,
        guardianIds: res.guardian_ids,
        shares: parseShares(res.shares_json),
      })
      navigate(`#/vault/${res.vault_id}/guardians`)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : String(err))
      setBusy(false)
    }
  }

  return (
    <Shell>
      <form className="create wizard" onSubmit={onSubmit}>
        <header className="create-head">
          <p className="eyebrow">Set the instrument</p>
          <h1 className="create-title">Seal a new vault.</h1>
          <p className="lede">
            You hold the vault today. Should your heartbeats lapse, {t} of your {n} guardians
            may release it to your heir. Nothing here can be undone by anyone but you and a
            quorum — so name the people you trust, and set the cadence you can keep.
          </p>
        </header>

        {/* Engraved step marks — a slim indicator, not a progress bar. Click a
            reachable step to move to it; each mark is focusable and keyboard-driven. */}
        <nav className="wiz-steps" aria-label="Sealing a vault">
          <ol className="wiz-steps-list">
            {STEPS.map((s, i) => {
              const state = i === step ? 'current' : i < step ? 'done' : 'todo'
              const reachable = i <= step || stepValid.slice(step, i).every(Boolean)
              return (
                <li key={s.key} className="wiz-step" data-state={state}>
                  <button
                    type="button"
                    className="wiz-step-btn"
                    onClick={() => goTo(i)}
                    disabled={!reachable}
                    aria-current={i === step ? 'step' : undefined}
                    aria-label={`Step ${i + 1} of ${STEPS.length}: ${s.title}`}
                  >
                    <span className="wiz-step-mark data" aria-hidden="true">{i + 1}</span>
                    <span className="wiz-step-label eyebrow">{s.title}</span>
                  </button>
                </li>
              )
            })}
          </ol>
        </nav>

        <div className="wiz-panel" key={step}>
          {step === 0 && (
            <section className="panel field-group">
              <div className="field-head">
                <p className="eyebrow">Network</p>
                <p className="field-hint">Which Zcash chain this vault holds value on.</p>
              </div>
              <div className="network-set" role="radiogroup" aria-label="Network">
                {NETWORKS.map((nw) => (
                  <label className="cadence-opt network-opt" key={nw.id} data-on={nw.id === network}>
                    <input
                      type="radio"
                      name="network"
                      value={nw.id}
                      checked={nw.id === network}
                      onChange={() => changeNetwork(nw.id)}
                    />
                    <span className="cadence-label">{nw.label}</span>
                    <span className="cadence-note">{nw.note}</span>
                  </label>
                ))}
              </div>
              {network === 'main' && (
                <p className="notice notice--caution" role="note">
                  Mainnet moves real ZEC. Fund and release with care.
                </p>
              )}
            </section>
          )}

          {step === 1 && (
            <>
              <section className="panel field-group">
                <div className="field-head">
                  <p className="eyebrow">Quorum</p>
                  <p className="field-hint">How many guardians must agree to release the vault.</p>
                </div>
                <div className="quorum-set">
                  <Stepper label="Threshold" value={t} min={1} max={n} onChange={(v) => setT(clamp(v, 1, n))} />
                  <span className="quorum-of data">of</span>
                  <Stepper label="Guardians" value={n} min={2} max={7} onChange={setGuardianCount} />
                  <div className="quorum-read">
                    <span className="data quorum-read-val">{t} of {n}</span>
                    <span className="eyebrow">must sign</span>
                  </div>
                </div>
              </section>

              <section className="panel field-group">
                <div className="field-head">
                  <p className="eyebrow">Guardians</p>
                  <p className="field-hint">The people who can convene to recover or release the vault.</p>
                </div>
                <div className="guardian-inputs">
                  {names.slice(0, n).map((name, i) => (
                    <label className="field" key={i}>
                      <span className="field-label eyebrow">Guardian {i + 1}</span>
                      <input
                        className="input"
                        value={name}
                        onChange={(e) => setName(i, e.target.value)}
                        placeholder="Name"
                        autoComplete="off"
                      />
                    </label>
                  ))}
                </div>
                {!namesFilled && (
                  <p className="field-hint">Name all {n} guardians to continue.</p>
                )}
              </section>
            </>
          )}

          {step === 2 && (
            <section className="panel field-group">
              <div className="field-head">
                <p className="eyebrow">Heartbeat cadence</p>
                <p className="field-hint">How often you prove you’re still here.</p>
              </div>
              <div className="cadence-set" role="radiogroup" aria-label="Heartbeat cadence">
                {CADENCES.filter((c) => !c.tag).map((c) => (
                  <label className="cadence-opt" key={c.id} data-on={c.id === cadenceId}>
                    <input
                      type="radio"
                      name="cadence"
                      value={c.id}
                      checked={c.id === cadenceId}
                      onChange={() => setCadenceId(c.id)}
                    />
                    <span className="cadence-label">{c.label}</span>
                    <span className="cadence-note">{c.note}</span>
                  </label>
                ))}

                <label className="cadence-opt" data-on={isCustom}>
                  <input
                    type="radio"
                    name="cadence"
                    value={CUSTOM_ID}
                    checked={isCustom}
                    onChange={() => setCadenceId(CUSTOM_ID)}
                  />
                  <span className="cadence-label">Custom cadence</span>
                  <span className="cadence-note">Set your own interval and grace — a rhythm you can actually keep.</span>
                </label>

                <div className="cadence-divider" aria-hidden="true">
                  <span className="eyebrow">For testing</span>
                </div>
                {CADENCES.filter((c) => c.tag).map((c) => (
                  <label className="cadence-opt" key={c.id} data-on={c.id === cadenceId}>
                    <input
                      type="radio"
                      name="cadence"
                      value={c.id}
                      checked={c.id === cadenceId}
                      onChange={() => setCadenceId(c.id)}
                    />
                    <span className="cadence-label">
                      {c.label}
                      {c.tag && <span className="cadence-tag">{c.tag}</span>}
                    </span>
                    <span className="cadence-note">{c.note}</span>
                  </label>
                ))}
              </div>

              {isCustom && (
                <div className="cadence-custom">
                  <div className="cadence-custom-row">
                    <div className="field cadence-dur">
                      <span className="field-label eyebrow">Heartbeat every</span>
                      <div className="dur">
                        <input
                          className="input dur-num"
                          type="number"
                          min={1}
                          inputMode="numeric"
                          value={ivAmount}
                          onChange={(e) => setIvAmount(e.target.value)}
                          aria-label="Interval amount"
                          aria-invalid={Boolean(customError)}
                        />
                        <select
                          className="input select dur-unit"
                          value={ivUnit}
                          onChange={(e) => setIvUnit(e.target.value as Unit)}
                          aria-label="Interval unit"
                        >
                          {UNIT_OPTIONS.map((u) => (
                            <option key={u.id} value={u.id}>{u.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="field cadence-dur">
                      <span className="field-label eyebrow">Grace window</span>
                      <div className="dur">
                        <input
                          className="input dur-num"
                          type="number"
                          min={1}
                          inputMode="numeric"
                          value={grAmount}
                          onChange={(e) => setGrAmount(e.target.value)}
                          aria-label="Grace amount"
                          aria-invalid={Boolean(customError)}
                        />
                        <select
                          className="input select dur-unit"
                          value={grUnit}
                          onChange={(e) => setGrUnit(e.target.value as Unit)}
                          aria-label="Grace unit"
                        >
                          {UNIT_OPTIONS.map((u) => (
                            <option key={u.id} value={u.id}>{u.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  {customError ? (
                    <p className="notice notice--grave cadence-custom-msg" role="alert">{customError}</p>
                  ) : (
                    <p className="fine cadence-custom-msg">{humanCadence(customInterval, customGrace)}</p>
                  )}
                </div>
              )}
            </section>
          )}

          {step === 3 && (
            <section className="panel field-group">
              <div className="field-head">
                <p className="eyebrow">Heir</p>
                <p className="field-hint">The shielded address the vault passes to.</p>
              </div>
              <label className="field">
                <span className="field-label eyebrow">Shielded receiving address</span>
                <input
                  className="input input--mono"
                  value={heir}
                  onChange={(e) => setHeir(e.target.value)}
                  placeholder={network === 'main' ? 'u1…' : 'utest1…'}
                  autoComplete="off"
                  spellCheck={false}
                  aria-invalid={heirMismatch || undefined}
                />
              </label>
              {heirMismatch && (
                <p className="notice notice--grave" role="alert">{heirError}</p>
              )}
              {heirClean && heirUnknown && (
                <p className="notice notice--caution" role="note">
                  <span className="notice-title">Unrecognized</span>
                  That doesn’t read as a Zcash address — double-check it before sealing.
                </p>
              )}
              {heirClean && heirNet === network && (
                <p className="fine">Reads as a {netLabel(network)} address.</p>
              )}
            </section>
          )}

          {step === LAST && (
            <section className="panel field-group review">
              <div className="field-head">
                <p className="eyebrow">Review &amp; seal</p>
                <p className="field-hint">Read it back before you seal. This cannot be undone.</p>
              </div>
              <dl className="review-list">
                <ReviewRow label="Network" onEdit={() => goTo(0)}>
                  {networkChoice.label}
                  <span className="review-note"> — {networkChoice.note}</span>
                </ReviewRow>
                <ReviewRow label="Quorum" onEdit={() => goTo(1)}>
                  <span className="data">{t} of {n}</span> guardians must sign to release the vault.
                </ReviewRow>
                <ReviewRow label="Guardians" onEdit={() => goTo(1)}>
                  <ul className="review-guardians">
                    {names.slice(0, n).map((nm, i) => (
                      <li key={i}>{nm.trim() || <span className="review-note">Guardian {i + 1} (unnamed)</span>}</li>
                    ))}
                  </ul>
                </ReviewRow>
                <ReviewRow label="Heartbeat" onEdit={() => goTo(2)}>
                  <span className="review-cadence-label">{cadenceLabel}.</span>{' '}
                  {humanCadence(intervalSecs, graceSecs)}
                </ReviewRow>
                <ReviewRow label="Heir" onEdit={() => goTo(3)}>
                  {heirClean
                    ? <span className="data review-heir">{heirClean}</span>
                    : <span className="review-note">No heir recorded.</span>}
                </ReviewRow>
              </dl>
              {network === 'main' && (
                <p className="notice notice--caution" role="note">
                  Mainnet moves real ZEC. Fund and release with care.
                </p>
              )}
            </section>
          )}
        </div>

        {error && <p className="notice notice--grave" role="alert">{error}</p>}

        <div className="wiz-nav">
          <button
            type="button"
            className="btn btn--ghost"
            onClick={back}
            disabled={step === 0 || busy}
          >
            ← Back
          </button>
          {step < LAST ? (
            <button type="submit" className="btn btn--primary" disabled={!stepValid[step]}>
              Next →
            </button>
          ) : (
            <button type="submit" className="btn btn--primary" disabled={!canSeal}>
              {busy ? 'Sealing the vault…' : 'Seal the vault'}
            </button>
          )}
        </div>

        {step === LAST && (
          <p className="fine">
            A fresh spend-authorizing key is split {t}-of-{n} at the coordinator, then the
            monolithic key is discarded.
          </p>
        )}
      </form>
    </Shell>
  )
}

/** A single restated choice on the Review step, with an Edit jump back to its step. */
function ReviewRow({
  label,
  onEdit,
  children,
}: {
  label: string
  onEdit: () => void
  children: React.ReactNode
}) {
  return (
    <div className="review-row">
      <dt className="eyebrow review-dt">{label}</dt>
      <dd className="review-dd">{children}</dd>
      <button type="button" className="btn btn--ghost btn--sm review-edit" onClick={onEdit}>
        Edit
      </button>
    </div>
  )
}

function Stepper({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  onChange: (v: number) => void
}) {
  return (
    <div className="stepper">
      <span className="field-label eyebrow">{label}</span>
      <div className="stepper-row">
        <button
          type="button"
          className="stepper-btn"
          aria-label={`decrease ${label}`}
          onClick={() => onChange(value - 1)}
          disabled={value <= min}
        >
          −
        </button>
        <span className="stepper-val data">{value}</span>
        <button
          type="button"
          className="stepper-btn"
          aria-label={`increase ${label}`}
          onClick={() => onChange(value + 1)}
          disabled={value >= max}
        >
          +
        </button>
      </div>
    </div>
  )
}
