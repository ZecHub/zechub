import { useEffect, useState } from 'react'

import { navigate } from '../shared/router'
import { parseEnrollLink } from './lib/enroll'
import type { EnrollDraft } from './lib/enroll'
import { clearEnrollment, loadEnrollment } from './lib/storage'
import type { Enrollment } from './lib/storage'
import type { Guardian } from './lib/wasm'
import { Enroll } from './screens/Enroll'
import { Unlock } from './screens/Unlock'
import { Watch } from './screens/Watch'

/** After consuming a `#enroll=…` link, drop the fragment so a refresh doesn't re-prefill
 *  an old share — but stay INSIDE the guardian section (#/guard) so the unified router
 *  keeps rendering this side and the role switch stays on "Vaults I guard". */
function settleToGuard() {
  navigate('#/guard')
}

/**
 * The guardian side of Steward — "Vaults I guard". This is the whole guardian app,
 * unchanged: a share loaded from a paste / a `#enroll=…` link / an imported backup, sealed
 * on-device (argon2id → XChaCha20-Poly1305), unlocked once per session into a wasm
 * `Guardian` handle whose key material never leaves wasm memory, then a watch that co-signs
 * real ceremonies — with the independent, on-device heartbeat gate before any inheritance
 * release. The sealed share persists in `steward.guardian.*`, apart from the owner state.
 */
export function GuardianSection() {
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
    settleToGuard()
  }

  if (!enrollment) {
    return (
      <Enroll
        draft={draft}
        onEnrolled={(e) => {
          setEnrollment(e)
          settleToGuard()
        }}
      />
    )
  }
  if (!guardian) {
    return <Unlock enrollment={enrollment} onUnlocked={setGuardian} onForget={forget} />
  }
  return <Watch enrollment={enrollment} guardian={guardian} onLock={lock} onForget={forget} />
}
