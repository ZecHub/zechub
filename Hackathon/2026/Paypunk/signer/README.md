# PayPunk Signer

A **Tauri v2** mobile application — an offline air-gapped cryptographic signer, built with React on NixOS using `devenv`.

The signer is a thin wrapper around `Keypunk<FilesystemSeedStore>` (from the `keypunkd` workspace crate). It receives postcard-serialized `KeypunkdRequest` payloads scanned from QR codes, previews the transaction to the user, then signs on approval. Passwords are encrypted in the frontend (TypeScript) via X25519 + Blake2b + AES-256-GCM before reaching Rust; Rust handlers never see plaintext passwords.

## Quick Start

```bash
# Enter the development environment
devenv shell

# Install frontend dependencies
pnpm install

# ── Browser-only (fast UI iteration, no Tauri runtime) ──
pnpm dev
# Opens at http://localhost:1420 — uses mock data when Tauri is absent.

# ── Desktop webview (full IPC with Rust) ──
cargo tauri dev

# ── Android (physical phone, wireless debugging) ──
adb connect <phone-ip>:<port>
cargo tauri android dev
```

## Project Structure

```
├── devenv.nix              # Nix dev environment (Rust, Node, JDK, Android SDK/NDK)
├── devenv.yaml             # Nix inputs
├── package.json            # Frontend deps (React, Vite, Tailwind, @noble/curves, @ngraveio/bc-ur)
├── vite.config.ts          # Vite config (binds to 0.0.0.0)
├── index.html              # Entry HTML
├── src/
│   ├── main.tsx            # React entry point
│   ├── App.tsx             # Root app with page routing (6 pages)
│   ├── nav.tsx             # Navigation context (page state, scan result)
│   ├── backend.ts          # Tauri IPC abstraction with mock fallback
│   ├── crypto.ts           # Frontend crypto (X25519 + Blake2b + AES-256-GCM)
│   ├── qr-display.ts       # QR display via bc-ur fountain codes (8 fps)
│   ├── qr-scan.ts          # QR scanning via camera + jsQR
│   ├── qr-transport.ts     # bc-ur encoder/decoder wrappers
│   ├── index.css           # Tailwind imports
│   └── pages/
│       ├── OnboardingPage.tsx   # Seed generation / restore
│       ├── ScanPage.tsx         # Camera QR scanner
│       ├── PreviewPage.tsx      # Transaction preview before signing
│       ├── SigningPage.tsx      # Signing in progress
│       ├── ResultPage.tsx       # Signed result + QR display
│       └── RegistrationPage.tsx # Viewing key registration flow
├── src-tauri/
│   ├── Cargo.toml          # Rust deps (tauri, tauri-plugin-store, tauri-plugin-barcode-scanner, keypunkd)
│   ├── tauri.conf.json     # Tauri app config (PayPunk Signer, com.paypunk.signer)
│   ├── capabilities/
│   │   └── default.json    # Permissions (core:default)
│   └── src/
│       ├── main.rs         # Entry point
│       ├── lib.rs          # Tauri commands, AppState, run()
│       └── signer.rs       # SignerState, core signing logic (wraps Keypunk)
└── .github/workflows/
    └── release-android.yml # CI: build signed APK on tag push
```

## Features

### Signing Flow
1. **Onboarding** — generate a new BIP-39 seed or restore from mnemonic. Password is set by the user and encrypted in the frontend before reaching Rust.
2. **Scan** — camera scans QR codes containing postcard-serialized `KeypunkdRequest` payloads (using bc-ur fountain codes for chunked transfer).
3. **Preview** — the parsed transaction is displayed to the user for review (outputs, fee, recipient).
4. **Sign** — on user approval, the artifact is signed with the decrypted seed.
5. **Result** — the signed artifact is displayed as QR codes for the originating wallet to scan back.

### Additional Features
- **Viewing key registration** — handles `RegisterViewingKeys` requests with a challenge/response flow.
- **Session verification** — `VerifySignerSession` signs a challenge with the session keypair.
- **Multi-protocol** — registers both `ZcashSignerProtocol` (TestNetwork/Regtest) and `EthereumSignerProtocol`.
- **Ping/pong test** — built-in connectivity test path.

### Rust Commands (Tauri IPC)
| Command | Purpose |
|---------|---------|
| `get_encryption_key` | Returns the signer's X25519 public key |
| `generate_seed` | Generates a new encrypted seed |
| `restore_seed` | Restores seed from mnemonic |
| `get_signer_status` | Returns current `SignerStatus` |
| `process_scanned_qr` | Handles scanned QR payload (ping/pong, preview, or registration) |
| `approve_and_sign` | Signs the previewed artifact |
| `delete_seed` | Deletes the stored seed |
| `has_seed` | Checks if a seed exists |
| `has_session_key` | Checks if a session key exists |
| `complete_registration` | Completes viewing key registration |
| `get_preview` | Returns the current preview data |
| `get_response` | Returns the last response bytes |

### Browser Fallback
When running in a plain browser (`pnpm dev`), `backend.ts` detects the absence of the Tauri runtime and returns mock data. All features work with mock indicators.

## Running on Android

### Prerequisites
1. Enable **Wireless debugging** on your Android phone (Developer options)
2. Connect: `adb connect <phone-ip>:<port>`
3. Verify: `adb devices`

### Dev mode (live reload)
```bash
TAURI_DEV_HOST=<vm-ip> cargo tauri android dev
```

### Build debug APK
```bash
cargo tauri android build --apk
adb install -r src-tauri/gen/android/app/build/outputs/apk/debug/app-debug.apk
```

## Release Build (Signed APK)

### One-time keystore creation
```bash
keytool -genkeypair -v \
  -keystore release-key.jks \
  -keyalg RSA -keysize 2048 \
  -validity 10000 -alias release
```

### Wire signing
Edit `src-tauri/gen/android/app/build.gradle.kts` to add a `release` signing config reading from `keystore.properties` (generated by `android init` — see Tauri docs for the exact block).

### Build
```bash
KEYSTORE_PASSWORD=<pw> KEY_PASSWORD=<pw> cargo tauri android build --apk
```

### GitHub Releases
Push a `v*` tag to trigger `.github/workflows/release-android.yml`. The workflow:
1. Builds a signed APK
2. Computes SHA-256
3. Attaches the APK to a GitHub Release

Sideloaders should verify the published SHA-256.

## Development Loops

| Loop | Command | Tauri Runtime | Data Source |
|------|---------|---------------|-------------|
| Browser (fast UI) | `pnpm dev` | No | Mock data |
| Desktop webview | `cargo tauri dev` | Yes | Real Rust IPC |
| Android device | `cargo tauri android dev` | Yes | Real Rust IPC |

## Environment

- **OS**: NixOS
- **Dev env**: `devenv` (2.1.2)
- **Rust**: stable with Android targets (aarch64-linux-android, armv7-linux-androideabi, i686-linux-android, x86_64-linux-android)
- **Node**: 22 + pnpm
- **JDK**: 17
- **Android SDK**: API 34, NDK (latest), Build Tools 34.0.0+, Platform Tools
