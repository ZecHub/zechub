import { useEffect, useState } from 'react'

import { parseEnrollLink } from './lib/enroll'
import type { EnrollDraft } from './lib/enroll'
import { clearEnrollment, loadEnrollment } from './lib/storage'
import type { Enrollment } from './lib/storage'
import type { Guardian } from './lib/wasm'
import { Enroll } from './screens/Enroll'
import { Unlock } from './screens/Unlock'
import { Watch } from './screens/Watch'

/** Strip a consumed `#enroll=…` link so a refresh doesn't re-prefill an old share. */
function dropHash() {
  if (window.location.hash) {
    window.history.replaceState(null, '', window.location.pathname + window.location.search)
  }
}

export function App() {
  const [enrollment, setEnrollment] = useState<Enrollment | null>(() => loadEnrollment())
  const [guardian, setGuardian] = useState<Guardian | null>(null)
  // Read any per-guardian enrollment link once, on load.
  const [draft] = useState<Partial<EnrollDraft> | null>(() => parseEnrollLink(window.location.hash))

  // Best-effort: zeroize key material if the tab is hidden/closed while unlocked.
  useEffect(() => {
    if (!guardian) return
    const onLeave = () => {
      try {
        guardian.wipe()
      } catch {
        /* already inert */
      }
    }
    window.addEventListener('pagehide', onLeave)
    return () => window.removeEventListener('pagehide', onLeave)
  }, [guardian])

  function lock() {
    try {
      guardian?.wipe()
    } catch {
      /* already inert */
    }
    setGuardian(null)
  }

  function forget() {
    lock()
    clearEnrollment()
    setEnrollment(null)
    dropHash()
  }

  if (!enrollment) {
    return (
      <Enroll
        draft={draft}
        onEnrolled={(e) => {
          setEnrollment(e)
          dropHash()
        }}
      />
    )
  }
  if (!guardian) {
    return <Unlock enrollment={enrollment} onUnlocked={setGuardian} onForget={forget} />
  }
  return <Watch enrollment={enrollment} guardian={guardian} onLock={lock} onForget={forget} />
}
