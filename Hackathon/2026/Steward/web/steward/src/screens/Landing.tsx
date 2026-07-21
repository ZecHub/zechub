import { useEffect } from 'react'

import { Shell } from '../shared/Shell'
import { navigate } from '../shared/router'
import { loadVaults } from '../owner/lib/vault-registry'
import { loadEnrollment } from '../guardian/lib/storage'

/** The door. Steward is one instrument for two roles a real person holds at once — you
 *  KEEP your own vaults, and you GUARD your friends'. The landing names both and lets you
 *  step into either. */
export function Landing() {
  // The landing is the calm, lit hearth — always active.
  useEffect(() => {
    document.documentElement.dataset.state = 'active'
  }, [])

  const vaultCount = loadVaults().length
  const guarding = loadEnrollment()

  return (
    <Shell>
      <div className="landing">
        <header className="landing-head">
          <p className="eyebrow">A shielded vault you pass down</p>
          <h1 className="landing-title">
            You hold what is yours,<br />and you keep watch for others.
          </h1>
          <p className="lede">
            Steward is a <strong>t-of-n</strong> threshold vault for shielded Zcash with a
            dead-man&rsquo;s-switch. A real person is both an <strong>owner</strong> — sealing vaults
            their heirs can inherit — and a <strong>guardian</strong> — holding a share of a friend&rsquo;s
            vault, ready to release it when the time comes. Both live here, in one instrument.
          </p>
        </header>

        <div className="landing-doors">
          <button className="landing-door panel" onClick={() => navigate('#/owner')}>
            <p className="eyebrow">Owner</p>
            <h2 className="landing-door-title">My vaults</h2>
            <p className="landing-door-note">
              Seal a vault, name your guardians and heir, keep the heartbeat, and convene a
              release. The vault answers only to you — until your heartbeats lapse.
            </p>
            <span className="landing-door-cta">
              {vaultCount > 0
                ? `Open my ${vaultCount} vault${vaultCount === 1 ? '' : 's'} →`
                : 'Seal your first vault →'}
            </span>
          </button>

          <button className="landing-door panel" onClick={() => navigate('#/guard')}>
            <p className="eyebrow">Guardian</p>
            <h2 className="landing-door-title">Vaults I guard</h2>
            <p className="landing-door-note">
              Take up a share of someone&rsquo;s vault, sealed on your device. Stand watch, and when
              a request comes, see exactly what you are signing before you co-sign. Your share
              never leaves this browser.
            </p>
            <span className="landing-door-cta">
              {guarding ? 'Return to your watch →' : 'Take up a share →'}
            </span>
          </button>
        </div>

        <p className="fine landing-foot">
          One key insight of the design: nothing you hold as an owner can release a vault by
          itself, and no guardian can act until the owner&rsquo;s own signed heartbeat has lapsed —
          verified independently, on each guardian&rsquo;s device.
        </p>
      </div>
    </Shell>
  )
}
