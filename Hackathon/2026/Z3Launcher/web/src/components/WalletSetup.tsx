import { useMemo, useState } from 'react'
import { createWallet, restoreWallet, type WalletSeed } from '../api'
import { CopyButton, Spinner } from './walletShared'
import { Wallet, KeyRound, ShieldCheck, AlertTriangle, ArrowLeft, Check } from 'lucide-react'

type Mode = 'choose' | 'reveal' | 'confirm' | 'restore'

// WalletSetup is shown when Zallet is enabled but no wallet exists yet. It owns
// the create flow (generate → reveal the 24 words for backup → confirm) and the
// restore-from-seed flow. The seed words are shown exactly once and never
// persisted — backing them up is the only way to recover funds.
export function WalletSetup({ onDone }: { onDone: () => void }) {
  const [mode, setMode] = useState<Mode>('choose')
  const [seed, setSeed] = useState<WalletSeed | null>(null)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  async function handleCreate() {
    setBusy(true)
    setErr(null)
    try {
      setSeed(await createWallet())
      setMode('reveal')
    } catch (e: any) {
      setErr(e.message)
    } finally {
      setBusy(false)
    }
  }

  if (mode === 'reveal' && seed) return <Reveal seed={seed} onContinue={() => setMode('confirm')} />
  if (mode === 'confirm' && seed) return <Confirm seed={seed} onBack={() => setMode('reveal')} onDone={onDone} />
  if (mode === 'restore') return <Restore onBack={() => { setErr(null); setMode('choose') }} onDone={onDone} />

  // choose
  return (
    <div className="z3-card animate-z3-in p-10 text-center">
      <div
        className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-[24px] border"
        style={{ borderColor: 'var(--line)', background: 'var(--gold-soft)' }}
      >
        <Wallet size={32} style={{ color: 'var(--gold-text)' }} strokeWidth={1.6} />
      </div>
      <div className="mb-3 flex items-center justify-center gap-2">
        <span
          className="rounded-[6px] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em]"
          style={{ color: 'var(--gold-text)', background: 'var(--gold-soft)' }}
        >
          Zallet wallet
        </span>
        <span
          className="rounded-[6px] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.06em]"
          style={{ color: 'var(--muted)', background: 'var(--surface-2)' }}
        >
          Alpha
        </span>
      </div>
      <h3 className="mb-2 text-[24px] font-bold tracking-tight" style={{ color: 'var(--fg)' }}>Set up your wallet</h3>
      <p className="mx-auto mb-5 max-w-md text-[15px] font-medium leading-relaxed" style={{ color: 'var(--faint)' }}>
        Create a new Zcash wallet and back up its recovery phrase, or restore one you already have.
      </p>
      <p className="mx-auto mb-8 max-w-md text-[12.5px] font-medium leading-relaxed" style={{ color: 'var(--faint)' }}>
        This is a <span style={{ color: 'var(--muted)' }}>Zallet</span> wallet — Zcash’s full-node wallet, the successor to the <span className="font-mono">zcashd</span> wallet. It’s alpha software, so use testnet or regtest for anything you can’t afford to lose.
      </p>

      <div className="mx-auto flex max-w-sm flex-col gap-3">
        <button onClick={handleCreate} disabled={busy} className="z3-btn z3-btn-primary w-full justify-center py-3">
          {busy ? <Spinner size={16} /> : <KeyRound size={16} strokeWidth={2.2} />}
          Create a new wallet
        </button>
        <button onClick={() => { setErr(null); setMode('restore') }} disabled={busy} className="z3-btn z3-btn-secondary w-full justify-center py-3">
          <ShieldCheck size={16} strokeWidth={2.2} />
          I already have a recovery phrase
        </button>
      </div>
      {err && <ErrorNote text={err} />}
    </div>
  )
}

// ---- Reveal: show the 24 words for backup --------------------------------
function Reveal({ seed, onContinue }: { seed: WalletSeed; onContinue: () => void }) {
  const [ack, setAck] = useState(false)
  const phrase = seed.words.join(' ')
  return (
    <div className="z3-card animate-z3-in p-8">
      <div className="mb-5">
        <h3 className="text-[22px] font-bold tracking-tight" style={{ color: 'var(--fg)' }}>Back up your recovery phrase</h3>
        <p className="mt-1 text-[14px] font-medium" style={{ color: 'var(--muted)' }}>
          Write these 24 words down in order and keep them somewhere safe and offline.
        </p>
      </div>

      <div
        className="mb-5 flex items-start gap-3 rounded-xl border p-4"
        style={{ background: 'var(--gold-soft)', borderColor: 'var(--gold-soft)' }}
      >
        <AlertTriangle size={18} style={{ color: 'var(--gold-text)' }} className="mt-0.5 shrink-0" strokeWidth={2.2} />
        <p className="text-[13px] font-semibold leading-relaxed" style={{ color: 'var(--gold-text)' }}>
          This phrase is the only way to recover your funds. It will never be shown again. Anyone with it can spend your ZEC — never share it or store it online.
        </p>
      </div>

      <div className="mb-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        {seed.words.map((w, i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 rounded-lg border px-3 py-2.5"
            style={{ background: 'var(--input)', borderColor: 'var(--line)' }}
          >
            <span className="w-5 select-none text-right text-[11px] font-bold tabular-nums" style={{ color: 'var(--faint)' }}>{i + 1}</span>
            <span className="font-mono text-[14px] font-semibold" style={{ color: 'var(--fg)' }}>{w}</span>
          </div>
        ))}
      </div>

      <div className="mb-6 flex items-center justify-between">
        <span className="font-mono text-[11px]" style={{ color: 'var(--faint)' }}>
          identity: {seed.recipient.slice(0, 16)}…
        </span>
        <CopyButton text={phrase} label="Copy phrase" />
      </div>

      <label className="mb-5 flex cursor-pointer items-center gap-3">
        <button
          type="button"
          onClick={() => setAck((v) => !v)}
          className="flex h-5 w-5 shrink-0 items-center justify-center rounded-[6px] border transition-colors"
          style={{
            background: ack ? 'var(--gold)' : 'transparent',
            borderColor: ack ? 'var(--gold)' : 'var(--line-strong)',
          }}
        >
          {ack && <Check size={13} strokeWidth={3} style={{ color: 'var(--gold-ink)' }} />}
        </button>
        <span className="text-[13.5px] font-medium" style={{ color: 'var(--muted)' }}>
          I’ve written down my recovery phrase and stored it safely.
        </span>
      </label>

      <button onClick={onContinue} disabled={!ack} className="z3-btn z3-btn-primary w-full justify-center py-3">
        Continue
      </button>
    </div>
  )
}

// ---- Confirm: verify the user actually saved the phrase -------------------
function Confirm({ seed, onBack, onDone }: { seed: WalletSeed; onBack: () => void; onDone: () => void }) {
  // Quiz 3 distinct random positions.
  const quiz = useMemo(() => {
    const idx = new Set<number>()
    let s = seed.words.length * 7 + 13 // deterministic-ish seed without Math.random reliance
    while (idx.size < 3) {
      s = (s * 1103515245 + 12345) & 0x7fffffff
      idx.add(s % seed.words.length)
    }
    return [...idx].sort((a, b) => a - b)
  }, [seed])

  const [answers, setAnswers] = useState<Record<number, string>>({})
  const allCorrect = quiz.every((i) => (answers[i] ?? '').trim().toLowerCase() === seed.words[i])
  const anyWrong = quiz.some((i) => (answers[i] ?? '').trim() !== '' && (answers[i] ?? '').trim().toLowerCase() !== seed.words[i])

  return (
    <div className="z3-card animate-z3-in p-8">
      <button onClick={onBack} className="mb-4 flex items-center gap-1.5 text-[12px] font-semibold" style={{ color: 'var(--faint)' }}>
        <ArrowLeft size={13} /> Show phrase again
      </button>
      <h3 className="text-[22px] font-bold tracking-tight" style={{ color: 'var(--fg)' }}>Confirm your backup</h3>
      <p className="mt-1 mb-6 text-[14px] font-medium" style={{ color: 'var(--muted)' }}>
        Enter the following words from your recovery phrase to confirm you saved it.
      </p>

      <div className="mb-6 flex flex-col gap-3">
        {quiz.map((i) => (
          <label key={i} className="flex items-center gap-3">
            <span className="w-16 shrink-0 text-[12px] font-bold uppercase tracking-wide" style={{ color: 'var(--faint)' }}>
              Word {i + 1}
            </span>
            <input
              autoComplete="off"
              spellCheck={false}
              value={answers[i] ?? ''}
              onChange={(e) => setAnswers((a) => ({ ...a, [i]: e.target.value }))}
              className="z3-input flex-1 px-3.5 py-2.5 font-mono text-[14px] font-semibold outline-none"
              style={{ color: 'var(--fg)' }}
              placeholder={`word #${i + 1}`}
            />
          </label>
        ))}
      </div>

      {anyWrong && <ErrorNote text="That doesn’t match your recovery phrase. Go back and check the word order." />}

      <button onClick={onDone} disabled={!allCorrect} className="z3-btn z3-btn-primary w-full justify-center py-3">
        <Check size={16} strokeWidth={2.4} /> Open my wallet
      </button>
    </div>
  )
}

// ---- Restore: import an existing recovery phrase --------------------------
function Restore({ onBack, onDone }: { onBack: () => void; onDone: () => void }) {
  const [phrase, setPhrase] = useState('')
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)
  const wordCount = phrase.trim().split(/\s+/).filter(Boolean).length
  const plausible = [12, 15, 18, 21, 24].includes(wordCount)

  async function submit() {
    setBusy(true)
    setErr(null)
    try {
      await restoreWallet(phrase)
      onDone()
    } catch (e: any) {
      setErr(e.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="z3-card animate-z3-in p-8">
      <button onClick={onBack} className="mb-4 flex items-center gap-1.5 text-[12px] font-semibold" style={{ color: 'var(--faint)' }}>
        <ArrowLeft size={13} /> Back
      </button>
      <h3 className="text-[22px] font-bold tracking-tight" style={{ color: 'var(--fg)' }}>Restore from recovery phrase</h3>
      <p className="mt-1 mb-5 text-[14px] font-medium" style={{ color: 'var(--muted)' }}>
        Enter your 12–24 word recovery phrase, words separated by spaces. Your wallet will rescan the chain.
      </p>

      <textarea
        value={phrase}
        onChange={(e) => setPhrase(e.target.value)}
        rows={4}
        autoComplete="off"
        spellCheck={false}
        placeholder="ribbon umbrella ozone … (your 24 words)"
        className="z3-input mb-3 w-full resize-none px-4 py-3 font-mono text-[14px] leading-relaxed outline-none"
        style={{ color: 'var(--fg)' }}
      />
      <div className="mb-5 flex items-center justify-between text-[12px] font-semibold">
        <span style={{ color: plausible ? 'var(--green)' : 'var(--faint)' }}>{wordCount} words</span>
        <span style={{ color: 'var(--faint)' }}>Spaces between words</span>
      </div>

      {err && <ErrorNote text={err} />}

      <button onClick={submit} disabled={!plausible || busy} className="z3-btn z3-btn-primary w-full justify-center py-3">
        {busy ? <Spinner size={16} /> : <ShieldCheck size={16} strokeWidth={2.2} />}
        Restore wallet
      </button>
    </div>
  )
}

function ErrorNote({ text }: { text: string }) {
  return (
    <div
      className="mt-4 rounded-xl border p-3.5 text-left text-[13px] font-medium"
      style={{ background: 'var(--red-soft)', borderColor: 'var(--red-soft)', color: 'var(--red)' }}
    >
      {text}
    </div>
  )
}
