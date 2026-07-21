import { useState } from 'react'
import { inspectSnapshot, attachSnapshot, type InspectResult } from '../api'

export function FastStartPanel() {
  const [path, setPath] = useState('')
  const [result, setResult] = useState<InspectResult | null>(null)
  const [err, setErr] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [attaching, setAttaching] = useState(false)
  const [attached, setAttached] = useState(false)
  const [attachErr, setAttachErr] = useState<string | null>(null)

  async function check() {
    setBusy(true)
    setErr(null)
    setResult(null)
    setAttached(false)
    setAttachErr(null)
    try {
      setResult(await inspectSnapshot(path))
    } catch (e) {
      setErr((e as Error).message)
    } finally {
      setBusy(false)
    }
  }

  async function attach() {
    setAttaching(true)
    setAttachErr(null)
    try {
      await attachSnapshot(path)
      setAttached(true)
    } catch (e) {
      setAttachErr((e as Error).message)
    } finally {
      setAttaching(false)
    }
  }

  return (
    <section className="apple-card p-8">
      <div>
        <h2 className="text-[20px] font-bold tracking-tight">Fast Start</h2>
        <p className="text-[14px] font-medium text-zinc-500">Already have Zcash data? Link it here to skip the wait.</p>
      </div>
      
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <input
          value={path}
          onChange={(e) => setPath(e.target.value)}
          placeholder="/path/to/your/data"
          className="flex-1 rounded-2xl bg-white/5 px-5 py-3 font-mono text-[14px] text-white border border-white/5 focus:border-white/20 outline-none transition-all placeholder:text-zinc-600"
        />
        <button
          disabled={busy || !path}
          onClick={check}
          className="apple-btn-primary min-w-[140px]"
        >
          {busy ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
          ) : (
            'Check Data'
          )}
        </button>
      </div>
      
      {err && (
        <div className="mt-4 rounded-xl bg-[#FF453A]/10 border border-[#FF453A]/20 p-4 text-[13px] font-medium text-[#FF453A]">
          {err}
        </div>
      )}
      
      {result && (
        <div
          className={`mt-6 rounded-2xl border p-6 transition-all duration-500 ${
            result.usable
              ? 'border-[#34C759]/20 bg-[#34C759]/5 text-[#34C759]'
              : 'border-[#FF453A]/20 bg-[#FF453A]/5 text-[#FF453A]'
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className={`h-2 w-2 rounded-full ${result.usable ? 'bg-[#34C759]' : 'bg-[#FF453A]'}`} />
            <p className="text-[15px] font-bold">
              {result.usable ? 'This data works!' : 'This data won\'t work'}
            </p>
          </div>
          
          <p className="text-[14px] font-medium opacity-90 leading-relaxed">{result.message}</p>
          
          <div className="mt-6 grid grid-cols-3 gap-6 border-t border-white/5 pt-6">
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Version</span>
              <span className="text-[14px] font-semibold text-zinc-200">v{result.info.majorVersion}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Network</span>
              <span className="text-[14px] font-semibold text-zinc-200 capitalize">{result.info.network}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Status</span>
              <span className="text-[14px] font-semibold text-zinc-200">{result.usable ? 'Ready' : 'Incompatible'}</span>
            </div>
          </div>
          
          {result.usable && !attached && (
            <div className="mt-6 rounded-xl bg-black/20 p-5 border border-white/5">
              <p className="text-[13px] font-medium text-zinc-300 leading-relaxed mb-4">
                Attach this data and your node remounts onto it — at the chain tip in
                about a minute instead of a full sync.
              </p>
              <button
                disabled={attaching}
                onClick={attach}
                className="apple-btn-primary w-full"
              >
                {attaching ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                ) : (
                  'Attach & Restart'
                )}
              </button>
              {attachErr && (
                <p className="mt-3 text-[13px] font-medium text-[#FF453A]">{attachErr}</p>
              )}
              <details className="mt-4 group">
                <summary className="cursor-pointer text-[11px] font-bold text-zinc-500 uppercase tracking-wider list-none">
                  Prefer the CLI?
                </summary>
                <code className="mt-2 block text-[12px] font-bold text-[#34C759] break-all bg-black/40 p-2 rounded-lg">
                  -faststart {result.info.cacheRoot}
                </code>
              </details>
            </div>
          )}

          {attached && (
            <div className="mt-6 rounded-xl bg-[#34C759]/5 p-5 border border-[#34C759]/20">
              <p className="text-[15px] font-bold text-[#34C759] mb-1">Attaching…</p>
              <p className="text-[13px] font-medium text-zinc-300 leading-relaxed">
                Your node is remounting onto this data. Watch the Overview — Zebra will
                go <span className="font-bold">Starting</span> →{' '}
                <span className="font-bold">Running</span>, already at the chain tip.
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
