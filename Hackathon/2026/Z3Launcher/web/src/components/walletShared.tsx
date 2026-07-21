import { useState, type ReactNode } from 'react'
import { Copy, Check, X } from 'lucide-react'

// Spinner — small inline loading indicator matching the dashboard style.
export function Spinner({ size = 14 }: { size?: number }) {
  return (
    <div
      className="animate-spin rounded-full border-2 border-current border-t-transparent"
      style={{ width: size, height: size }}
    />
  )
}

// CopyButton — copies text to the clipboard and flashes a check.
export function CopyButton({ text, label, className = '' }: { text: string; label?: string; className?: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      onClick={() => {
        navigator.clipboard?.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 1400)
      }}
      className={`flex items-center gap-1.5 text-[11px] font-semibold transition-colors ${copied ? 'text-[#34C759]' : 'text-zinc-500 hover:text-white'} ${className}`}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {label ?? (copied ? 'Copied' : 'Copy')}
    </button>
  )
}

// Modal — centered overlay sheet with a blurred backdrop. Used for Send/Receive.
export function Modal({ title, subtitle, onClose, children }: { title: string; subtitle?: string; onClose: () => void; children: ReactNode }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6 animate-in fade-in duration-200"
      onMouseDown={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="apple-card relative w-full max-w-[460px] max-h-[88vh] overflow-auto custom-scrollbar p-7 animate-in zoom-in-95 slide-in-from-bottom-2 duration-200"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h3 className="text-[22px] font-bold tracking-tight">{title}</h3>
            {subtitle && <p className="mt-0.5 text-[13px] font-medium text-zinc-500">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-500 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

// Field — labeled form control wrapper.
export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="text-[12px] font-semibold text-zinc-400">{label}</span>
        {hint && <span className="text-[11px] font-medium text-zinc-600">{hint}</span>}
      </div>
      {children}
    </label>
  )
}

// accountLabel — display name for an account (account 0 with empty name → "Main").
export function accountLabel(name: string, index: number): string {
  if (name && name.trim()) return name
  return index === 0 ? 'Main Account' : `Account ${index}`
}

export const inputClass =
  'w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-[14px] font-medium text-white placeholder:text-zinc-600 focus:border-[#007AFF]/60 focus:bg-white/[0.07] focus:outline-none transition-all'
