# Plan: Integrate Keypunk into Signer with Frontend-Side Encryption

## Architecture

The signer app is a thin wrapper around `Keypunk<FilesystemSeedStore>`. The password
is encrypted in the frontend (TypeScript) using X25519 + Blake2b + AES-256-GCM and
sent to Rust as an already-encrypted blob. Rust command handlers are pure pass-through
— they never see the plaintext password.

## Crypto boundary

```
React (user types password)
  → @noble/curves: generate ephemeral X25519 keypair
  → @noble/curves: X25519(ephemeral_secret, server_public) → shared_secret
  → @noble/hashes: Blake2b-256(shared_secret) → aes_key
  → Web Crypto API: AES-256-GCM encrypt(plaintext, aes_key, random_nonce)
  → encrypted = [nonce: 12B][ciphertext + GCM tag]
  → invoke("generate_seed", { encrypted_password, ephemeral_public_key })
    → Rust passes directly to Keypunk::handle_request()
      → Keypunk decrypts: X25519(server_secret, ephemeral_public) → same shared_secret → AES key → plaintext
```

The frontend also decrypts responses (mnemonic from `generate_seed`, etc.) using the
same ephemeral secret key.

## File manifest

| # | File | Action |
|---|---|---|
| 1 | `signer/src/crypto.ts` | **Create** — X25519 + Blake2b + AES-256-GCM wrapper |
| 2 | `signer/package.json` | **Modify** — add `@noble/curves`, `@noble/hashes` |
| 3 | `signer/src/backend.ts` | **Modify** — add `get_encryption_key`, update mock signatures |
| 4 | `signer/src-tauri/src/lib.rs` | **Modify** — pass-through commands, add `get_encryption_key` |
| 5 | `signer/src-tauri/src/signer.rs` | **Modify** — remove password field, add `restore_seed` |
| 6 | `signer/src/pages/OnboardingPage.tsx` | **Modify** — password input, generate/restore toggle |
| 7 | `signer/src/pages/PreviewPage.tsx` | **Modify** — password input on approve |
| 8 | `signer/src/App.tsx` | **Modify** — fetch encryption key on mount |

---

## 1. `signer/src/crypto.ts` — Frontend crypto module

```typescript
import { x25519 } from '@noble/curves/ed25519';
import { blake2b } from '@noble/hashes/blake2b';

export function generateEphemeralKeypair(): { secret: Uint8Array; public: Uint8Array }
// Generates random X25519 keypair using @noble/curves

export async function encryptToServer(
  plaintext: Uint8Array,
  serverPublicKey: Uint8Array,
  ephemeralSecret: Uint8Array,
): Promise<Uint8Array>
// 1. shared = x25519.getSharedSecret(ephemeralSecret, serverPublicKey)
// 2. aesKey = blake2b(shared, { dkLen: 32 })
// 3. nonce = crypto.getRandomValues(new Uint8Array(12))
// 4. key = await crypto.subtle.importKey('raw', aesKey, 'AES-GCM', false, ['encrypt'])
// 5. ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv: nonce }, key, plaintext)
// 6. return concat(nonce, new Uint8Array(ciphertext))

export async function decryptFromServer(
  encrypted: Uint8Array,
  serverPublicKey: Uint8Array,
  ephemeralSecret: Uint8Array,
): Promise<Uint8Array>
// 1. shared = x25519.getSharedSecret(ephemeralSecret, serverPublicKey)
// 2. aesKey = blake2b(shared, { dkLen: 32 })
// 3. nonce = encrypted.slice(0, 12); ciphertext = encrypted.slice(12)
// 4. key = await crypto.subtle.importKey('raw', aesKey, 'AES-GCM', false, ['decrypt'])
// 5. plaintext = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: nonce }, key, ciphertext)
// 6. return new Uint8Array(plaintext)
```

Matches the Rust `keypunkd::crypto::encrypt` / `decrypt` functions exactly (same
nonce-first blob format, same Blake2b-256 key derivation).

---

## 2. `signer/package.json` — Add dependencies

```json
"dependencies": {
  "@noble/curves": "^1.8.0",
  "@noble/hashes": "^1.7.0",
  // ... existing deps
}
```

---

## 3. `signer/src/backend.ts` — Add `get_encryption_key`

### New types
```typescript
interface ProcessResult {
  mode: "preview" | "response";
  response: string | null;          // base64-encoded bridge response
  raw_artifact_b64?: string;        // present when mode === "preview"
  preview_signature_b64?: string;   // present when mode === "preview"
  derivation_path?: string;         // present when mode === "preview"
}
```

### Updated mock signatures
- `generate_seed(encrypted_password: number[], ephemeral_public_key: number[])` → `number[]`
- `restore_seed(encrypted_mnemonic: number[], encrypted_password: number[], ephemeral_public_key: number[])` → `null`
- `approve_and_sign(encrypted_payload: number[], ephemeral_public_key: number[], derivation_path: string)` → `string`
- `get_encryption_key()` → `number[]`
- `has_seed()` → `boolean`
- `process_scanned_qr(qr_data: string)` → `ProcessResult`

---

## 4. `signer/src-tauri/src/lib.rs` — Pass-through commands

### New `AppState` fields
- Remove `get_or_init_signer` helper (signer initialized in setup)
- Signer is always `Some` after setup

### Commands

```rust
#[tauri::command]
fn get_encryption_key(state: State<AppState>) -> Result<[u8; 32], String>
  // Returns signer.keypunk's server public key

#[tauri::command]
fn generate_seed(
  state: State<AppState>,
  encrypted_password: Vec<u8>,
  ephemeral_public_key: [u8; 32],
) -> Result<Vec<u8>, String>
  // Pass-through to SignerState::generate_seed()
  // Returns encrypted_mnemonic Vec<u8> (frontend decrypts)

#[tauri::command]
fn restore_seed(
  state: State<AppState>,
  encrypted_mnemonic: Vec<u8>,
  encrypted_password: Vec<u8>,
  ephemeral_public_key: [u8; 32],
) -> Result<(), String>
  // Pass-through to SignerState::restore_seed()

#[tauri::command]
fn process_scanned_qr(
  state: State<AppState>,
  qr_data: String,
) -> Result<ProcessResult, String>
  // Same IPC frame stripping + ping/pong as current
  // Returns preview data fields in ProcessResult

#[tauri::command]
fn approve_and_sign(
  state: State<AppState>,
  encrypted_payload: Vec<u8>,
  ephemeral_public_key: [u8; 32],
  derivation_path: String,
) -> Result<String, String>
  // encrypted_payload is frontend-constructed [artifact_len|artifact|sig_len|sig|password]
  // Passes to Keypunk::AuthorizeArtifact
  // Returns base64-encoded framed response

#[tauri::command]
fn has_seed(state: State<AppState>) -> Result<bool, String>
  // Calls Keypunk::HasSeed

#[tauri::command]
fn get_preview(state: State<AppState>) -> Result<serde_json::Value, String>
  // Unchanged
```

### ProcessResult struct
```rust
#[derive(Serialize)]
struct ProcessResult {
    mode: String,
    response: Option<String>,
    raw_artifact_b64: Option<String>,
    preview_signature_b64: Option<String>,
    derivation_path: Option<String>,
}
```

---

## 5. `signer/src-tauri/src/signer.rs` — Remove password state

### SignerState changes

| Before | After |
|---|---|
| `password: Option<String>` | **Removed** |
| `password_path()`, `load_password()`, `ensure_password()` | **Removed** |
| `generate_seed(&mut self) -> Result<String, String>` | `generate_seed(&mut self, encrypted_password: Vec<u8>, ephemeral_public_key: [u8; 32]) -> Result<Vec<u8>, String>` |
| (none) | `restore_seed(&mut self, encrypted_mnemonic: Vec<u8>, encrypted_password: Vec<u8>, ephemeral_public_key: [u8; 32]) -> Result<(), String>` |
| `approve_and_sign(&mut self) -> Result<Vec<u8>, String>` | `approve_and_sign(&mut self, encrypted_payload: Vec<u8>, ephemeral_public_key: [u8; 32], derivation_path: String) -> Result<Vec<u8>, String>` |
| `mnemonic()` | **Removed** |

### Method signatures

```rust
impl SignerState {
    pub fn create(data_dir: PathBuf) -> Self
    // Generates server Keypair + client Keypair
    // Creates FilesystemSeedStore at {data_dir}/seed.enc
    // Registers Zcash + Ethereum signer protocols
    // Creates Keypunk::new(server_keypair, seed_store, protocols)

    pub fn has_seed(&self) -> bool
    // Calls Keypunk::HasSeed

    pub fn generate_seed(
        &mut self,
        encrypted_password: Vec<u8>,
        ephemeral_public_key: [u8; 32],
    ) -> Result<Vec<u8>, String>
    // Constructs KeypunkdRequest::GenerateSeed { encrypted_password, client_public_key: ephemeral_public_key }
    // Calls Keypunk::handle_request()
    // Returns encrypted_mnemonic from SeedGenerated response

    pub fn restore_seed(
        &mut self,
        encrypted_mnemonic: Vec<u8>,
        encrypted_password: Vec<u8>,
        ephemeral_public_key: [u8; 32],
    ) -> Result<(), String>
    // Constructs KeypunkdRequest::RestoreSeed { encrypted_mnemonic, encrypted_password, client_public_key }
    // Calls Keypunk::handle_request()

    pub fn handle_request(&mut self, request_bytes: &[u8]) -> HandleResult
    // Processes PreviewArtifact from QR payload
    // Returns HandleResult { response_bytes, raw_artifact, preview_signature, derivation_path }

    pub fn approve_and_sign(
        &mut self,
        encrypted_payload: Vec<u8>,
        ephemeral_public_key: [u8; 32],
        derivation_path: String,
    ) -> Result<Vec<u8>, String>
    // Constructs KeypunkdRequest::AuthorizeArtifact { encrypted_payload, ephemeral_public_key, derivation_path }
    // Calls Keypunk::handle_request()
    // Returns signed_artifact

    pub fn server_public_key(&self) -> [u8; 32]
    // Returns the server Keypair's public key

    pub fn status(&self) -> &SignerStatus
    pub fn status_mut(&mut self) -> &mut SignerStatus
}
```

### HandleResult (new return type for handle_request)

```rust
pub struct HandleResult {
    pub response_bytes: Vec<u8>,
    pub raw_artifact: Option<Vec<u8>>,
    pub preview_signature: Option<Vec<u8>>,
    pub derivation_path: Option<String>,
}
```

---

## 6. `signer/src/pages/OnboardingPage.tsx` — Password input + restore

- Add password input field (type="password")
- Add toggle between "Generate" and "Restore" modes
- In restore mode: add mnemonic textarea + password input
- On generate: call `generate_seed` with encrypted password, decrypt response, display mnemonic
- On restore: call `restore_seed` with encrypted mnemonic + password
- Clear password from React state after invoke returns

### State variables
```typescript
const [mode, setMode] = useState<"generate" | "restore">("generate");
const [password, setPassword] = useState("");
const [mnemonicInput, setMnemonicInput] = useState("");
const [generatedMnemonic, setGeneratedMnemonic] = useState<string | null>(null);
const [error, setError] = useState<string | null>(null);
const [busy, setBusy] = useState(false);
```

---

## 7. `signer/src/pages/PreviewPage.tsx` — Password input on approve

- Add password input field above the "Approve & Sign" button
- On approve: construct AuthorizeArtifact payload, encrypt, call `approve_and_sign`
- Clear password from React state after invoke returns

### AuthorizeArtifact payload construction
```typescript
function assembleAuthorizePayload(
  rawArtifact: Uint8Array,
  previewSignature: Uint8Array,
  password: string,
): Uint8Array {
  const pwBytes = new TextEncoder().encode(password);
  const payload = new Uint8Array(4 + rawArtifact.length + 4 + previewSignature.length + pwBytes.length);
  const view = new DataView(payload.buffer);
  view.setUint32(0, rawArtifact.length, true);          // LE u32
  payload.set(rawArtifact, 4);
  view.setUint32(4 + rawArtifact.length, previewSignature.length, true);  // LE u32
  payload.set(previewSignature, 8 + rawArtifact.length);
  payload.set(pwBytes, 12 + rawArtifact.length + previewSignature.length);
  return payload;
}
```

---

## 8. `signer/src/App.tsx` — Fetch encryption key on mount

```typescript
function App() {
  const [serverKey, setServerKey] = useState<Uint8Array | null>(null);

  useEffect(() => {
    (async () => {
      const key = await invoke<number[]>("get_encryption_key");
      setServerKey(new Uint8Array(key));
    })();
  }, []);

  // Pass serverKey to pages via context or prop
}
```

Add `serverKey` to the navigation context so all pages can access it.

---

## Implementation order

1. `crypto.ts` + `package.json` — get the crypto module working
2. `signer.rs` — remove password state, update method signatures
3. `lib.rs` — update commands, add `get_encryption_key`
4. `backend.ts` — update types and mock
5. `OnboardingPage.tsx` — password input + restore flow
6. `PreviewPage.tsx` — password input on approve
7. `App.tsx` — fetch encryption key on mount

---

## What this achieves

| Requirement | How |
|---|---|
| User chooses password | Password from frontend input, never generated |
| No exfiltration from data at rest | Password never written to disk |
| Hard to exfiltrate from memory | Password is ephemeral — held in React useState during input, zeroed after invoke returns; Rust `Zeroizing<String>` drops after use |
| Future biometric path | Biometric integration is a frontend concern — swap password input for biometric-gated key release; Rust API stays the same |
| Architecturally extensible | Same crypto layer works in browser extension context (non-Tauri) where IPC is not trusted |
