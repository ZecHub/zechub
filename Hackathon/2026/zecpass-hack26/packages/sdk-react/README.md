# @zecpass/sdk-react

React SDK for ZecPass — "Sign in with Zcash" in under 10 minutes.

## Install

```bash
pnpm add @zecpass/sdk-react
```

## Setup

### 1. Wrap your app with ZecPassProvider

```tsx
import { ZecPassProvider } from '@zecpass/sdk-react';

export default function App({ children }) {
  return (
    <ZecPassProvider
      appId="your-app-id"
      redirectUri="https://yourapp.com/auth/callback"
      scope={['identity', 'badges:read']}
      zecpassUrl="https://zecpass.app" // optional, defaults to https://zecpass.app
    >
      {children}
    </ZecPassProvider>
  );
}
```

### 2. Add the ZecPassButton

```tsx
import { ZecPassButton } from '@zecpass/sdk-react';

export function LoginPage() {
  return (
    <ZecPassButton
      onSuccess={(session) => {
        console.log('User ID:', session.zk_proof_hash);
        console.log('Session:', session.session_id);
      }}
      onError={(error) => console.error(error)}
      variant="default"  // 'default' | 'outline' | 'minimal'
      label="Sign in with Zcash"
    />
  );
}
```

### 3. Use the hook for custom UI

```tsx
import { useZecPass } from '@zecpass/sdk-react';

export function Profile() {
  const { session, isAuthenticated, isLoading, login, logout } = useZecPass();

  if (isLoading) return <p>Loading...</p>;
  if (!isAuthenticated) return <button onClick={login}>Sign In</button>;

  return (
    <div>
      <p>Session: {session.session_id}</p>
      <p>Identity: {session.zk_proof_hash.slice(0, 8)}...</p>
      <button onClick={logout}>Sign Out</button>
    </div>
  );
}
```

## API Reference

### ZecPassProvider Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `appId` | `string` | Yes | — | Your registered app ID |
| `redirectUri` | `string` | Yes | — | Post-auth redirect URL |
| `scope` | `string[]` | No | `['identity']` | Requested scopes |
| `zecpassUrl` | `string` | No | `'https://zecpass.app'` | ZecPass server URL |

### ZecPassButton Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onSuccess` | `(session) => void` | — | Called after successful auth |
| `onError` | `(error) => void` | — | Called on auth failure |
| `label` | `string` | `'Sign in with Zcash'` | Button label |
| `variant` | `'default' \| 'outline' \| 'minimal'` | `'default'` | Visual style |

### useZecPass Hook

```typescript
const {
  session,         // ZecPassSession | null
  isAuthenticated, // boolean
  isLoading,       // boolean
  login,           // () => void
  logout,          // () => Promise<void>
  getToken,        // () => string | null
} = useZecPass();
```
