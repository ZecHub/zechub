import { useHashRoute } from './lib/hooks'
import { CreateVault } from './screens/CreateVault'
import { GuardianLinks } from './screens/GuardianLinks'
import { Release } from './screens/Release'
import { VaultHome } from './screens/VaultHome'

export function App() {
  const route = useHashRoute()
  switch (route.name) {
    case 'vault':
      return <VaultHome id={route.id} key={route.id} />
    case 'guardians':
      return <GuardianLinks id={route.id} key={route.id} />
    case 'release':
      return <Release id={route.id} key={route.id} />
    case 'create':
    default:
      return <CreateVault />
  }
}
