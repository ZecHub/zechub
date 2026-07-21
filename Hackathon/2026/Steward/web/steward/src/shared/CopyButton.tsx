import { useEffect, useRef, useState } from 'react'

/** Copy `text` to the clipboard, with a legacy fallback for non-secure origins. */
export async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    // fall through to the legacy path
  }
  try {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.setAttribute('readonly', '')
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(ta)
    return ok
  } catch {
    return false
  }
}

/** A copy button that confirms with a brief "Copied" then reverts. `label` names
 *  what is copied for screen readers (e.g. "enrollment link for amara"). */
export function CopyButton({
  text,
  label,
  children,
  className = 'btn btn--sm',
}: {
  text: string
  label: string
  children?: React.ReactNode
  className?: string
}) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle')
  const timer = useRef<number | null>(null)

  useEffect(() => () => {
    if (timer.current !== null) window.clearTimeout(timer.current)
  }, [])

  async function onClick() {
    const ok = await copyText(text)
    setState(ok ? 'copied' : 'failed')
    if (timer.current !== null) window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setState('idle'), 1600)
  }

  return (
    <button
      type="button"
      className={className}
      onClick={onClick}
      data-copied={state === 'copied'}
      aria-label={
        state === 'copied' ? `Copied ${label}` : state === 'failed' ? `Could not copy ${label}` : `Copy ${label}`
      }
    >
      {state === 'copied' ? 'Copied' : state === 'failed' ? 'Copy failed' : (children ?? 'Copy')}
    </button>
  )
}
