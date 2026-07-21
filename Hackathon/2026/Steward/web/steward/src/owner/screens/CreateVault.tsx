import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'

import { ApiError, api } from '../api/client'
import type { Network } from '../api/types'
import { Shell } from '../../shared/Shell'
import { addressNetwork, netLabel } from '../lib/address'
import { generateHeartbeatKey, signHeartbeat, storeSecret } from '../lib/heartbeat'
import { navigate, useRootAmbient } from '../lib/hooks'
import { PRESETS } from '../lib/purpose'
import type { Preset } from '../lib/purpose'
import { recordVault } from '../lib/vault-registry'
import { parseShares, saveSeed } from '../lib/vault-store'
import { truncateMiddle } from '../lib/vitals'

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

/** The set of preset default names — used to tell an untouched (default) vault name from
 *  one the owner has edited, so switching presets only re-defaults an untouched name. */
const DEFAULT_NAMES = new Set(PRESETS.map((p) => p.defaultName))

function clamp(v: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, v))
}

/** A restatement lead for the Review step — the purpose in one voice. */
function restateLead(preset: Preset): string {
  switch (preset.id) {
    case 'treasury':
      return 'A DAO treasury'
    case 'family':
      return 'A shared family account'
    case 'personal':
      return 'A personal cold vault'
    case 'custom':
      return 'A custom multisig'
    default:
      return 'A vault'
  }
}

/** The wizard steps, by key. The **Cadence** and **Heir** steps appear only when
 *  inheritance is ON — a plain multisig vault flows Purpose → Network → Guardians → Review;
 *  an inheritance vault flows Purpose → Network → Guardians → Cadence → Heir → Review. */
type StepKey = 'purpose' | 'network' | 'guardians' | 'cadence' | 'heir' | 'review'
const STEP_TITLES: Record<StepKey, string> = {
  purpose: 'Purpose',
  network: 'Network',
  guardians: 'Guardians',
  cadence: 'Cadence',
  heir: 'Heir',
  review: 'Review',
}

export function CreateVault() {
  useRootAmbient('active')

  const [presetId, setPresetId] = useState('inheritance')
  // Custom's explicit dead-man's-switch toggle (only Custom lets the owner choose).
  const [customInherit, setCustomInherit] = useState(false)
  // The owner's chosen NAME for the vault — prefilled from the preset, editable. Empty is
  // allowed (the coordinator falls back to the vault id).
  const [label, setLabel] = useState(
    () => PRESETS.find((p) => p.id === 'inheritance')?.defaultName ?? '',
  )

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

  const preset = useMemo(() => PRESETS.find((p) => p.id === presetId) ?? PRESETS[0], [presetId])
  // Whether the dead-man's-switch is on for the chosen preset (Custom defers to its toggle).
  const inheritanceOn =
    preset.inheritance === true || (preset.inheritance === 'toggle' && customInherit)

  const cadencePreset = useMemo(
    () => CADENCES.find((c) => c.id === cadenceId) ?? CADENCES[0],
    [cadenceId],
  )
  const isCustom = cadenceId === CUSTOM_ID
  const customInterval = (parseInt(ivAmount, 10) || 0) * UNIT_SECS[ivUnit]
  const customGrace = (parseInt(grAmount, 10) || 0) * UNIT_SECS[grUnit]
  const customError = isCustom ? validateCustom(customInterval, customGrace) : null

  // Resolved cadence — the same numbers that go on the wire and read out in Review.
  const intervalSecs = isCustom ? customInterval : cadencePreset.interval
  const graceSecs = isCustom ? customGrace : cadencePreset.grace
  const cadenceLabel = isCustom ? 'Custom cadence' : cadencePreset.label
  const networkChoice = NETWORKS.find((nw) => nw.id === network) ?? NETWORKS[0]

  // All n guardians named — the only gate the old single form enforced.
  const namesFilled = names.length >= n && names.slice(0, n).every((s) => s.trim().length > 0)
  const heirClean = heir.trim()
  const labelClean = label.trim()

  // Heir address must match the vault's network (a testnet vault can't release to a
  // mainnet address, and vice versa). Optional field: empty is fine, and it only matters
  // for an inheritance vault.
  const heirNet = heirClean ? addressNetwork(heirClean) : null
  const heirMismatch =
    inheritanceOn && !!heirNet && heirNet !== 'unknown' && heirNet !== network
  const heirUnknown = heirNet === 'unknown'
  const heirError = heirMismatch
    ? `That is a ${netLabel(heirNet as Network)} address, but this is a ${netLabel(network)} vault — the heir must be a ${netLabel(network)} address.`
    : null

  // The dynamic step list: cadence + heir only when inheritance is on.
  const steps = useMemo<StepKey[]>(() => {
    const s: StepKey[] = ['purpose', 'network', 'guardians']
    if (inheritanceOn) s.push('cadence', 'heir')
    s.push('review')
    return s
  }, [inheritanceOn])
  const LAST = steps.length - 1
  // The preset toggle only lives on step 0, so the list only ever changes while there — clamp
  // defensively so `step` can never point past a now-shorter list.
  const current = steps[Math.min(step, LAST)] ?? 'purpose'

  function isStepValid(key: StepKey): boolean {
    switch (key) {
      case 'purpose':
        return true
      case 'network':
        return true
      case 'guardians':
        return namesFilled
      case 'cadence':
        return !customError
      case 'heir':
        return !heirMismatch
      case 'review':
        return namesFilled && (!inheritanceOn || !customError) && !heirMismatch
    }
  }
  const stepValid = steps.map(isStepValid)
  const canSeal = namesFilled && (!inheritanceOn || !customError) && !heirMismatch && !busy

  /** Choose a use-case preset: set its defaults (quorum + names) and reset to step 0. */
  function choosePreset(p: Preset) {
    setPresetId(p.id)
    // Re-default the vault name ONLY if the owner hasn't typed their own — i.e. it's still
    // empty or one of the preset defaults (mirrors how the heir placeholder swaps on network).
    setLabel((prev) => {
      const t = prev.trim()
      return t === '' || DEFAULT_NAMES.has(t) ? p.defaultName : prev
    })
    const nn = clamp(p.n, 2, 7)
    setN(nn)
    setT(clamp(p.threshold, 1, nn))
    setNames((prev) => {
      const out = prev.slice(0, nn)
      while (out.length < nn) out.push(NAME_POOL[out.length] ?? `Guardian ${out.length + 1}`)
      return out
    })
    setError(null)
  }

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
  /** Jump to step index k. Back is always allowed; forward only over already-valid steps. */
  function goTo(k: number) {
    if (k === step) return
    if (k > step) {
      for (let i = step; i < k; i++) if (!stepValid[i]) return
    }
    setError(null)
    setStep(k)
  }
  /** Jump to a step by key (used by the Review "Edit" links). */
  function goToKey(key: StepKey) {
    const i = steps.indexOf(key)
    if (i >= 0) goTo(i)
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
      goToKey('guardians')
      return
    }
    if (inheritanceOn && isCustom) {
      const err = validateCustom(customInterval, customGrace)
      if (err) {
        setError(err)
        goToKey('cadence')
        return
      }
    }
    if (heirMismatch) {
      setError(heirError)
      goToKey('heir')
      return
    }
    setBusy(true)
    try {
      // For an INHERITANCE vault, generate the owner's Ed25519 heartbeat keypair on THIS device.
      // Only the PUBLIC key is sent; the secret stays in localStorage — the coordinator never
      // sees it, so it can verify proofs-of-life but never forge them. A plain multisig vault
      // generates NO key and sends NO heartbeat fields.
      let publicHex: string | undefined
      let secretHex: string | undefined
      if (inheritanceOn) {
        const kp = await generateHeartbeatKey()
        publicHex = kp.publicHex
        secretHex = kp.secretHex
      }

      const res = await api.seedVault({
        threshold: t,
        n,
        guardian_names: clean,
        interval_secs: inheritanceOn ? intervalSecs : undefined,
        grace_secs: inheritanceOn ? graceSecs : undefined,
        heir: inheritanceOn ? heirClean || undefined : undefined,
        network,
        heartbeat_pubkey: publicHex,
        purpose: preset.purpose,
        label: labelClean || undefined,
      })

      if (inheritanceOn && secretHex) {
        // Persist the heartbeat secret locally (keyed by vault id) so "Send heartbeat" can sign.
        storeSecret(res.vault_id, secretHex)
        // Establish the first signed proof-of-life so guardians have a verifiable bulletin from
        // the start. Sign strictly past the create-time heartbeat to satisfy the monotonic rule.
        try {
          const st = await api.vaultStatus(res.vault_id)
          const now = Math.max(Math.floor(Date.now() / 1000), (st.last_heartbeat ?? 0) + 1)
          const sig_hex = await signHeartbeat(secretHex, res.vault_id, now)
          await api.heartbeat(res.vault_id, { time: now, sig_hex })
        } catch {
          // Non-fatal: the owner can send the first heartbeat from the vault home.
        }
      }

      // Keep the guardian shares this tab saw (the coordinator does not store them),
      // then open the "Distribute guardian shares" step so the owner can hand each
      // guardian their enrollment link.
      saveSeed({
        vaultId: res.vault_id,
        guardianIds: res.guardian_ids,
        shares: parseShares(res.shares_json),
      })
      // Record this vault in the owner's local index so it appears under "My vaults".
      recordVault({
        id: res.vault_id,
        label: labelClean || undefined,
        network,
        threshold: t,
        n,
        heir: Boolean(inheritanceOn && heirClean),
        purpose: preset.purpose,
        inheritance: inheritanceOn,
        sealedAt: Date.now(),
      })
      navigate(`#/vault/${res.vault_id}/guardians`)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : String(err))
      setBusy(false)
    }
  }

  const restatement = inheritanceOn
    ? `An inheritance vault — ${t}-of-${n}, heartbeat every ${everyPhrase(intervalSecs)}${
        heirClean ? `, heir ${truncateMiddle(heirClean, 10, 6)}` : ', no heir yet'
      }.`
    : `${restateLead(preset)} — ${t}-of-${n} multisig, no dead-man’s-switch.`

  return (
    <Shell>
      <form className="create wizard" onSubmit={onSubmit}>
        <header className="create-head">
          <p className="eyebrow">Set the instrument</p>
          <h1 className="create-title">Seal a new vault.</h1>
          <p className="lede">
            {inheritanceOn ? (
              <>
                You hold the vault today. Should your heartbeats lapse, {t} of your {n} guardians
                may release it to your heir. Nothing here can be undone by anyone but you and a
                quorum — so name the people you trust, and set the cadence you can keep.
              </>
            ) : (
              <>
                No one moves this vault alone. {t} of your {n} guardians must co-sign every spend —
                a plain threshold multisig, no dead-man’s-switch. Name the people you trust to hold
                it with you.
              </>
            )}
          </p>
        </header>

        {/* Engraved step marks — a slim indicator, not a progress bar. Click a
            reachable step to move to it; each mark is focusable and keyboard-driven. */}
        <nav className="wiz-steps" aria-label="Sealing a vault">
          <ol className="wiz-steps-list">
            {steps.map((key, i) => {
              const state = i === step ? 'current' : i < step ? 'done' : 'todo'
              const reachable = i <= step || stepValid.slice(step, i).every(Boolean)
              return (
                <li key={key} className="wiz-step" data-state={state}>
                  <button
                    type="button"
                    className="wiz-step-btn"
                    onClick={() => goTo(i)}
                    disabled={!reachable}
                    aria-current={i === step ? 'step' : undefined}
                    aria-label={`Step ${i + 1} of ${steps.length}: ${STEP_TITLES[key]}`}
                  >
                    <span className="wiz-step-mark data" aria-hidden="true">{i + 1}</span>
                    <span className="wiz-step-label eyebrow">{STEP_TITLES[key]}</span>
                  </button>
                </li>
              )
            })}
          </ol>
        </nav>

        <div className="wiz-panel" key={step}>
          {current === 'purpose' && (
            <section className="panel field-group">
              <div className="field-head">
                <p className="eyebrow">What’s this vault for?</p>
                <p className="field-hint">
                  Pick a purpose — it sets sensible defaults. Every option is a t-of-n multisig;
                  only <em>Inheritance</em> adds a dead-man’s-switch.
                </p>
              </div>
              <div className="preset-set" role="radiogroup" aria-label="What’s this vault for?">
                {PRESETS.map((p) => {
                  const on = p.id === presetId
                  const inh =
                    p.inheritance === true || (p.inheritance === 'toggle' && customInherit)
                  return (
                    <label className="preset-opt" key={p.id} data-on={on}>
                      <input
                        type="radio"
                        name="preset"
                        value={p.id}
                        checked={on}
                        onChange={() => choosePreset(p)}
                      />
                      <span className="preset-title">{p.label}</span>
                      <span className="preset-note">{p.line}</span>
                      <span className="preset-meta">
                        <span className="preset-quorum data">{p.threshold}-of-{p.n}</span>
                        <span className="preset-switch" data-on={inh}>
                          {inh ? 'dead-man’s-switch' : 'plain multisig'}
                        </span>
                      </span>
                    </label>
                  )
                })}
              </div>
              {/* Custom's explicit dead-man's-switch toggle — a sibling of the cards (not nested
                  inside the label) so it toggles cleanly, shown only when Custom is selected. */}
              {preset.inheritance === 'toggle' && (
                <label className="inherit-toggle preset-custom-toggle">
                  <input
                    type="checkbox"
                    checked={customInherit}
                    onChange={(e) => setCustomInherit(e.target.checked)}
                  />
                  <span className="inherit-toggle-label">
                    Add a dead-man’s-switch (heartbeat + heir). Off = a plain t-of-n multisig.
                  </span>
                </label>
              )}

              {/* Name this vault — its title everywhere. Prefilled from the preset; editable;
                  may be left empty (the coordinator falls back to the vault id). */}
              <div className="name-field">
                <label className="field">
                  <span className="field-label eyebrow">Vault name</span>
                  <input
                    className="input"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    placeholder={preset.defaultName}
                    maxLength={80}
                    autoComplete="off"
                  />
                </label>
                <p className="fine">
                  A name for this vault — shown as its title everywhere. Optional; leave it and it
                  falls back to the vault id.
                </p>
              </div>
            </section>
          )}

          {current === 'network' && (
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

          {current === 'guardians' && (
            <>
              <section className="panel field-group">
                <div className="field-head">
                  <p className="eyebrow">Quorum</p>
                  <p className="field-hint">
                    {inheritanceOn
                      ? 'How many guardians must agree to release the vault.'
                      : 'How many guardians must co-sign every spend.'}
                  </p>
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
                  <p className="field-hint">The people who can convene to recover, release, or spend from the vault.</p>
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

          {current === 'cadence' && (
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

          {current === 'heir' && (
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

          {current === 'review' && (
            <section className="panel field-group review">
              <div className="field-head">
                <p className="eyebrow">Review &amp; seal</p>
                <p className="field-hint">Read it back before you seal. This cannot be undone.</p>
              </div>
              <p className="review-restate">{restatement}</p>
              <dl className="review-list">
                <ReviewRow label="Name" onEdit={() => goToKey('purpose')}>
                  {labelClean ? (
                    labelClean
                  ) : (
                    <span className="review-note">Unnamed — falls back to the vault id.</span>
                  )}
                </ReviewRow>
                <ReviewRow label="Purpose" onEdit={() => goToKey('purpose')}>
                  {preset.label}
                  <span className="review-note">
                    {' — '}
                    {inheritanceOn ? 'inheritance vault (dead-man’s-switch on)' : 'plain t-of-n multisig'}
                  </span>
                </ReviewRow>
                <ReviewRow label="Network" onEdit={() => goToKey('network')}>
                  {networkChoice.label}
                  <span className="review-note"> — {networkChoice.note}</span>
                </ReviewRow>
                <ReviewRow label="Quorum" onEdit={() => goToKey('guardians')}>
                  <span className="data">{t} of {n}</span>{' '}
                  guardians must sign to {inheritanceOn ? 'release the vault' : 'move funds'}.
                </ReviewRow>
                <ReviewRow label="Guardians" onEdit={() => goToKey('guardians')}>
                  <ul className="review-guardians">
                    {names.slice(0, n).map((nm, i) => (
                      <li key={i}>{nm.trim() || <span className="review-note">Guardian {i + 1} (unnamed)</span>}</li>
                    ))}
                  </ul>
                </ReviewRow>
                {inheritanceOn && (
                  <ReviewRow label="Heartbeat" onEdit={() => goToKey('cadence')}>
                    <span className="review-cadence-label">{cadenceLabel}.</span>{' '}
                    {humanCadence(intervalSecs, graceSecs)}
                  </ReviewRow>
                )}
                {inheritanceOn && (
                  <ReviewRow label="Heir" onEdit={() => goToKey('heir')}>
                    {heirClean
                      ? <span className="data review-heir">{heirClean}</span>
                      : <span className="review-note">No heir recorded.</span>}
                  </ReviewRow>
                )}
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
