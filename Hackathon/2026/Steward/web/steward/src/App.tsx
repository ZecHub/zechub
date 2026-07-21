import { useHashRoute } from './shared/router'
import { Landing } from './screens/Landing'
import { OwnerHome } from './owner/screens/OwnerHome'
import { CreateVault } from './owner/screens/CreateVault'
import { VaultHome } from './owner/screens/VaultHome'
import { GuardianLinks } from './owner/screens/GuardianLinks'
import { Send } from './owner/screens/Send'
import { Release } from './owner/screens/Release'
import { GuardianSection } from './guardian/GuardianSection'

/**
 * Steward — the unified reference app. One person is both an OWNER of their own vaults
 * and a GUARDIAN of others', so the app has two sections under a single wordmark:
 *
 *   My vaults      → the owner console screens (create · home · guardian links · release)
 *   Vaults I guard → the guardian screens     (enroll · unlock · watch + co-sign)
 *
 * Owner-held secrets (heartbeat keys `steward.hb.*`, seed shares `steward.seed.*`,
 * the vault index `steward.owner.vaults`) and the guardian's sealed share
 * (`steward.guardian.*`) are namespaced apart in localStorage, so a person can be both
 * on the same device without collision. Every prior flow is preserved unchanged.
 */
export function App() {
  const route = useHashRoute()
  switch (route.name) {
    case 'owner-home':
      return <OwnerHome />
    case 'create':
      return <CreateVault />
    case 'vault':
      return <VaultHome id={route.id} key={route.id} />
    case 'guardians':
      return <GuardianLinks id={route.id} key={route.id} />
    case 'send':
      return <Send id={route.id} key={route.id} />
    case 'release':
      return <Release id={route.id} key={route.id} />
    case 'guard':
      return <GuardianSection />
    case 'landing':
    default:
      return <Landing />
  }
}
