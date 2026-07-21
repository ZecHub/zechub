import { useState } from 'react'

import { Shell } from '../../shared/Shell'
import { navigate } from '../../shared/router'
import { useRootAmbient } from '../lib/hooks'
import { kindBadge } from '../lib/purpose'
import { forgetVault, loadVaults } from '../lib/vault-registry'
import type { VaultRecord } from '../lib/vault-registry'

/** "My vaults" — the owner's home. Lists the vaults sealed on this device (from the local
 *  index) and opens the door to seal another. Every vault's own screens — home, guardian
 *  links, release — are one click away and unchanged. */
export function OwnerHome() {
  // The owner home isn't tied to one vault's life-state; keep the hearth calmly lit.
  useRootAmbient('active')
  const [vaults, setVaults] = useState<VaultRecord[]>(() => loadVaults())

  function forget(id: string) {
    forgetVault(id)
    setVaults(loadVaults())
  }

  return (
    <Shell>
      <div className="owner-home">
        <header className="owner-home-head">
          <p className="eyebrow">Owner</p>
          <h1 className="owner-home-title">My vaults.</h1>
          <p className="lede">
            The vaults you hold today. Each keeps its own heartbeat; should yours lapse, the
            guardians you named can release it to your heir. Seal a new one, or open one to tend
            its pulse, hand out guardian shares, or convene a release.
          </p>
        </header>

        <div className="owner-home-actions">
          <button className="btn btn--primary" onClick={() => navigate('#/owner/create')}>
            Seal a new vault
          </button>
        </div>

        {vaults.length === 0 ? (
          <div className="panel owner-empty">
            <p className="eyebrow">No vaults yet</p>
            <p className="fine">
              You haven&rsquo;t sealed a vault on this device. Sealing one splits a fresh
              spend-authorizing key <span className="data">t-of-n</span> across your guardians and
              starts its heartbeat. (Vaults sealed in another browser aren&rsquo;t listed here, but
              open by id at <span className="data">#/vault/&lt;id&gt;</span>.)
            </p>
          </div>
        ) : (
          <ul className="vault-cards">
            {vaults.map((v) => {
              const inheritance = v.inheritance ?? true
              const name = v.label?.trim() || v.id
              const named = !!v.label?.trim() && v.label.trim() !== v.id
              return (
                <li className="panel vault-card" key={v.id}>
                  <button
                    className="vault-card-open"
                    onClick={() => navigate(`#/vault/${v.id}`)}
                    aria-label={`Open vault ${name}`}
                  >
                    <div className="vault-card-head">
                      <span className="vault-card-kind" data-inheritance={inheritance}>
                        {kindBadge(v.purpose, inheritance)}
                      </span>
                      <span className="vault-card-net data" data-net={v.network}>
                        {v.network === 'main' ? 'Mainnet' : 'Testnet'}
                      </span>
                    </div>

                    <div className="vault-card-name-wrap">
                      <span className="vault-card-name">{name}</span>
                      {named && <span className="vault-card-id data">{v.id}</span>}
                    </div>

                    <div
                      className="vault-card-quorum"
                      aria-label={`${v.threshold} of ${v.n} guardians required to sign`}
                    >
                      <span className="quorum-pips" aria-hidden="true">
                        {Array.from({ length: v.n }).map((_, i) => (
                          <span className="pip" data-filled={i < v.threshold} key={i} />
                        ))}
                      </span>
                      <span className="quorum-label">
                        <span className="data">
                          {v.threshold} of {v.n}
                        </span>{' '}
                        must sign
                      </span>
                    </div>

                    <span className="vault-card-open-hint">Open vault →</span>
                  </button>

                  <dl className="vault-card-facts">
                    <div>
                      <dt>{inheritance ? 'Heir' : 'Switch'}</dt>
                      <dd className="data">
                        {inheritance ? (v.heir ? 'recorded' : 'none') : 'off'}
                      </dd>
                    </div>
                    <div>
                      <dt>Sealed</dt>
                      <dd className="data">{new Date(v.sealedAt).toLocaleDateString()}</dd>
                    </div>
                  </dl>

                  <div className="vault-card-foot">
                    <button
                      className="btn btn--ghost btn--sm"
                      onClick={() => navigate(`#/vault/${v.id}/guardians`)}
                    >
                      Guardian links
                    </button>
                    <button
                      className="btn btn--ghost btn--sm"
                      onClick={() => navigate(`#/vault/${v.id}/release`)}
                    >
                      Release
                    </button>
                    <button
                      className="btn btn--ghost btn--sm vault-card-forget"
                      onClick={() => forget(v.id)}
                      title="Remove from this list. Does not touch the vault on the coordinator."
                    >
                      Forget
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </Shell>
  )
}
