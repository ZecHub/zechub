# steward-ffi

The **mobile SDK** for the [Steward protocol](../../docs/SPEC.md) — one Rust crate that
[UniFFI](https://mozilla.github.io/uniffi-rs/) turns into **both** a Kotlin (Android) and a Swift
(iOS) library over [`steward-core`](../steward-core). It mirrors how ZecAuth shipped native SDKs,
but with **one generated surface** instead of hand-written JNI plus a separate Swift port.

It gives a wallet exactly what it needs to *hold a share and co-sign*, *prove liveness*, and *set up
a vault* — with the same on-device posture as the browser guardian
([`steward-guardian-wasm`](../steward-guardian-wasm)): the FROST `KeyPackage` is decrypted **inside**
the `Guardian` object and never crosses the FFI boundary; nonces are single-use; the share is sealed
at rest with Argon2id + XChaCha20-Poly1305.

> Secret material never leaves the device. The relay never holds a share.

---

## The UniFFI approach: proc-macro + library mode

This crate uses the **proc-macro** surface (`#[uniffi::export]`, `#[derive(uniffi::Object|Record|Error)]`,
`uniffi::setup_scaffolding!()`) — **no `.udl` file, no `build.rs`**. Bindings are generated in
**library mode**: `uniffi-bindgen` introspects the compiled `cdylib` (the proc-macros embed the
interface metadata), so the Rust source is the single source of truth and there is no UDL to keep in
sync.

`uniffi-bindgen` is provided as an **in-crate binary** (`src/bin/uniffi-bindgen.rs` →
`uniffi::uniffi_bindgen_main()`), pinned to the same `uniffi` version the crate links, which avoids
the classic "generator version ≠ runtime version" ABI skew.

`crate-type = ["cdylib", "staticlib", "lib"]`: `cdylib` is loaded by the JVM (Android) and generates
bindings; `staticlib` is linked into the iOS XCFramework; `lib` (rlib) keeps the crate usable from
Rust (the host smoke test and the bindgen bin).

### Guardian-handle logic without touching `steward-guardian-wasm`

The guardian state machine + keystore here are a **faithful re-implementation** of the wasm crate's
pure `GuardianCore`, `wire` `Message` mirror, and sealed-blob format — **minus** the `wasm_bindgen`
glue. `steward-guardian-wasm` is left byte-for-byte untouched (its public API and WASM output are a
hard constraint of the web apps). Both crates read from the same `steward-core` FROST primitives and
emit **byte-identical** wire JSON and an **identical `v=1` sealed-blob layout**, so:

- a mobile guardian and a browser guardian can co-sign the **same** ceremony, and
- a share sealed on the web **opens on mobile** and vice-versa.

(The alternative — extracting a shared crate that both depend on — would require editing
`steward-guardian-wasm`'s `Cargo.toml`, which is out of bounds here. Per the "duplicate rather than
break" rule, the handle is reimplemented instead.)

---

## The exposed API (Rust)

All types are UniFFI-compatible (`String`, `u64`, `bool`, `Option`, `Vec`, records, enums, objects).

**Heartbeat** (spec §6 — the dead-man's-switch proof-of-life):

```rust
fn sign_heartbeat(sk_hex: String, vault_id: String, time: u64) -> Result<String, StewardError>;
fn verify_heartbeat(pubkey_hex: String, vault_id: String, time: u64, sig_hex: String) -> bool;
fn heartbeat_pubkey(sk_hex: String) -> Result<String, StewardError>;
fn is_lapsed(latest: u64, interval: u64, grace: u64, now: u64) -> bool;
fn generate_heartbeat_key() -> HeartbeatKey;               // { secret_hex, pubkey_hex }
```

**Keygen** (owner / trusted dealer, spec §4.1):

```rust
fn split_authority(n: u16, t: u16, ask_hex: Option<String>) -> Result<VaultKeygen, StewardError>;
// VaultKeygen { group_ak_hex, public_key_package_json, shares: Vec<GuardianShare> }
// GuardianShare { identifier_hex, secret_share_json }
```

**Guardian keystore + signing** (spec §4.2 / §5):

```rust
fn seal_share(secret_share_json: String, passphrase: String) -> Result<String, StewardError>;
fn open_guardian(sealed_blob: String, passphrase: String) -> Result<Arc<Guardian>, StewardError>;

impl Guardian {
    fn identifier(&self) -> String;
    fn pending_count(&self) -> u32;
    fn round1(&self, session_id: String) -> Result<String, StewardError>;
    fn round2(&self, session_id: String, signing_package_json: String, randomizer_le_hex: String)
        -> Result<String, StewardError>;
    fn handle_relay_message(&self, session_id: String, incoming_msg_hex: String)
        -> Result<RelayAction, StewardError>;   // { action, to, msg_hex, done, kind }
    fn adjourn(&self, session_id: String);
    fn wipe(&self);
}
```

**Coordinator / advanced primitives** (spec §5):

```rust
fn build_signing_package(round1_replies: Vec<String>, sighash_hex: String)
    -> Result<String, StewardError>;
fn aggregate_signature(round2_replies: Vec<String>, signing_package_json: String,
    sighash_hex: String, randomizer_le_hex: String, public_key_package_json: String)
    -> Result<String, StewardError>;               // → 64-byte RedPallas signature hex
fn verify_aggregate(sighash_hex: String, randomizer_le_hex: String,
    public_key_package_json: String, sig_hex: String) -> Result<bool, StewardError>;
fn randomized_verifying_key_hex(randomizer_le_hex: String, public_key_package_json: String)
    -> Result<String, StewardError>;               // rk = ak + [α]G
fn random_randomizer_hex() -> String;              // SIMULATION/TEST ONLY — prod α comes from zcash-sign
```

`StewardError` is a typed enum (`Json`, `Hex`, `Kdf`, `BadPassphrase`, `Frost`, `Format`, `Wiped`,
`NoSession`, `Unexpected`, `Rng`) — a Kotlin `sealed class`/exception and a Swift `enum: Error`.

---

## Generated bindings (verbatim from `uniffi-bindgen`)

`bindings/kotlin/uniffi/steward_ffi/steward_ffi.kt` (package `uniffi.steward_ffi`; `?`/`@Throws`
marked; `u64→ULong`, `u16→UShort`, `u32→UInt`):

```kotlin
fun signHeartbeat(skHex: String, vaultId: String, time: ULong): String                 // @Throws
fun verifyHeartbeat(pubkeyHex: String, vaultId: String, time: ULong, sigHex: String): Boolean
fun heartbeatPubkey(skHex: String): String                                             // @Throws
fun isLapsed(latest: ULong, interval: ULong, grace: ULong, now: ULong): Boolean
fun generateHeartbeatKey(): HeartbeatKey
fun splitAuthority(n: UShort, t: UShort, askHex: String?): VaultKeygen                  // @Throws
fun sealShare(secretShareJson: String, passphrase: String): String                     // @Throws
fun openGuardian(sealedBlob: String, passphrase: String): Guardian                     // @Throws
fun buildSigningPackage(round1Replies: List<String>, sighashHex: String): String       // @Throws
fun aggregateSignature(round2Replies: List<String>, signingPackageJson: String, sighashHex: String,
                       randomizerLeHex: String, publicKeyPackageJson: String): String  // @Throws
fun verifyAggregate(sighashHex: String, randomizerLeHex: String,
                    publicKeyPackageJson: String, sigHex: String): Boolean             // @Throws
fun randomizedVerifyingKeyHex(randomizerLeHex: String, publicKeyPackageJson: String): String // @Throws
fun randomRandomizerHex(): String

interface GuardianInterface {
    fun identifier(): String
    fun pendingCount(): UInt
    fun round1(sessionId: String): String                                                     // @Throws
    fun round2(sessionId: String, signingPackageJson: String, randomizerLeHex: String): String // @Throws
    fun handleRelayMessage(sessionId: String, incomingMsgHex: String): RelayAction             // @Throws
    fun adjourn(sessionId: String)
    fun wipe()
}
open class Guardian : Disposable, AutoCloseable, GuardianInterface

data class HeartbeatKey(var secretHex: String, var pubkeyHex: String)
data class GuardianShare(var identifierHex: String, var secretShareJson: String)
data class VaultKeygen(var groupAkHex: String, var publicKeyPackageJson: String, var shares: List<GuardianShare>)
data class RelayAction(var action: String, var to: String?, var msgHex: String?, var done: Boolean, var kind: String)

sealed class StewardException : Exception {
    class Json(val msg: String); class Hex(val msg: String); class Kdf(val msg: String)
    class BadPassphrase; class Frost(val msg: String); class Format(val msg: String)
    class Wiped; class NoSession; class Unexpected; class Rng(val msg: String)
}
```

`bindings/swift/steward_ffi.swift` (+ `steward_ffiFFI.h`, `steward_ffiFFI.modulemap`;
`u64→UInt64`, `u16→UInt16`, `u32→UInt32`):

```swift
func signHeartbeat(skHex: String, vaultId: String, time: UInt64) throws -> String
func verifyHeartbeat(pubkeyHex: String, vaultId: String, time: UInt64, sigHex: String) -> Bool
func heartbeatPubkey(skHex: String) throws -> String
func isLapsed(latest: UInt64, interval: UInt64, grace: UInt64, now: UInt64) -> Bool
func generateHeartbeatKey() -> HeartbeatKey
func splitAuthority(n: UInt16, t: UInt16, askHex: String?) throws -> VaultKeygen
func sealShare(secretShareJson: String, passphrase: String) throws -> String
func openGuardian(sealedBlob: String, passphrase: String) throws -> Guardian
func buildSigningPackage(round1Replies: [String], sighashHex: String) throws -> String
func aggregateSignature(round2Replies: [String], signingPackageJson: String, sighashHex: String,
                        randomizerLeHex: String, publicKeyPackageJson: String) throws -> String
func verifyAggregate(sighashHex: String, randomizerLeHex: String,
                     publicKeyPackageJson: String, sigHex: String) throws -> Bool
func randomizedVerifyingKeyHex(randomizerLeHex: String, publicKeyPackageJson: String) throws -> String
func randomRandomizerHex() -> String

public protocol GuardianProtocol: AnyObject, Sendable {
    func identifier() -> String
    func pendingCount() -> UInt32
    func round1(sessionId: String) throws -> String
    func round2(sessionId: String, signingPackageJson: String, randomizerLeHex: String) throws -> String
    func handleRelayMessage(sessionId: String, incomingMsgHex: String) throws -> RelayAction
    func adjourn(sessionId: String)
    func wipe()
}
open class Guardian: GuardianProtocol

struct HeartbeatKey  { var secretHex: String; var pubkeyHex: String }
struct GuardianShare { var identifierHex: String; var secretShareJson: String }
struct VaultKeygen   { var groupAkHex: String; var publicKeyPackageJson: String; var shares: [GuardianShare] }
struct RelayAction   { var action: String; var to: String?; var msgHex: String?; var done: Bool; var kind: String }

enum StewardError: Swift.Error {
    case Json(msg: String), Hex(msg: String), Kdf(msg: String), BadPassphrase,
         Frost(msg: String), Format(msg: String), Wiped, NoSession, Unexpected, Rng(msg: String)
}
```

---

## Build & generate bindings (host — no device toolchain needed)

```sh
# 1. Build the host cdylib (also proves the crate compiles).
cargo build -p steward-ffi

# 2. Generate the bindings in library mode (introspects the built cdylib).
cargo run -p steward-ffi --bin uniffi-bindgen -- generate \
    --library target/debug/libsteward_ffi.dylib \
    --language kotlin --out-dir crates/steward-ffi/bindings/kotlin
cargo run -p steward-ffi --bin uniffi-bindgen -- generate \
    --library target/debug/libsteward_ffi.dylib \
    --language swift  --out-dir crates/steward-ffi/bindings/swift

# 3. Host smoke test — drives the FFI surface end-to-end.
cargo test -p steward-ffi
```

(On Linux the library is `libsteward_ffi.so`; on Windows `steward_ffi.dll`.)

---

## Android build path (`cargo-ndk` → `.so` → `.aar`)

Needs the **Android NDK** (`ANDROID_NDK_HOME`) and `cargo-ndk` — *not assumed installed here, so these
are the commands to run, not run output*.

```sh
# one-time
rustup target add aarch64-linux-android armv7-linux-androideabi \
                  i686-linux-android x86_64-linux-android
cargo install cargo-ndk

# 1. Cross-compile the cdylib for every Android ABI, laid out under jniLibs/.
cargo ndk -t arm64-v8a -t armeabi-v7a -t x86_64 -t x86 \
    -o android/steward/src/main/jniLibs build -p steward-ffi --release

# 2. Generate the Kotlin (once; the same .kt works for every ABI).
cargo run -p steward-ffi --bin uniffi-bindgen -- generate \
    --library target/aarch64-linux-android/release/libsteward_ffi.so \
    --language kotlin --out-dir android/steward/src/main/kotlin

# 3. Package as an .aar (a normal Android library module):
#    jniLibs/{arm64-v8a,armeabi-v7a,x86_64,x86}/libsteward_ffi.so
#    + the generated uniffi/steward_ffi/steward_ffi.kt
#    + runtimeOnly("net.java.dev.jna:jna:<ver>@aar")   ← UniFFI's Kotlin runtime uses JNA
#    ./gradlew :steward:assembleRelease   → steward-release.aar
```

`System.loadLibrary("steward_ffi")` happens inside the generated Kotlin; JNA binds it.

## iOS build path (`aarch64-apple-ios` + sim → XCFramework)

Needs **Xcode**. Again, documented commands (not run here).

```sh
# one-time
rustup target add aarch64-apple-ios aarch64-apple-ios-sim x86_64-apple-ios

# 1. Build the staticlib for device + both simulator arches.
cargo build -p steward-ffi --release --target aarch64-apple-ios
cargo build -p steward-ffi --release --target aarch64-apple-ios-sim
cargo build -p steward-ffi --release --target x86_64-apple-ios

# 2. Generate the Swift + the C module (header + modulemap).
cargo run -p steward-ffi --bin uniffi-bindgen -- generate \
    --library target/aarch64-apple-ios/release/libsteward_ffi.a \
    --language swift --out-dir ios/generated
#   → ios/generated/steward_ffi.swift, steward_ffiFFI.h, steward_ffiFFI.modulemap

# 3. Fold the two simulator arches into one fat lib, then build the XCFramework.
mkdir -p ios/sim && lipo -create \
    target/aarch64-apple-ios-sim/release/libsteward_ffi.a \
    target/x86_64-apple-ios/release/libsteward_ffi.a \
    -output ios/sim/libsteward_ffi.a
#   (rename the modulemap to module.modulemap in a headers dir for each slice)
xcodebuild -create-xcframework \
    -library target/aarch64-apple-ios/release/libsteward_ffi.a -headers ios/headers \
    -library ios/sim/libsteward_ffi.a                          -headers ios/headers \
    -output ios/Steward.xcframework
```

Drop `Steward.xcframework` + `steward_ffi.swift` into the app target.

---

## Usage: unlock a share and co-sign + verify a heartbeat

### Kotlin

```kotlin
import uniffi.steward_ffi.*

// --- verify the owner's latest heartbeat before arming an inheritance release ---
val ok = verifyHeartbeat(vault.heartbeatPubkey, vault.id, beat.time, beat.sigHex) &&
         isLapsed(beat.time, vault.intervalSecs, vault.graceSecs, nowUnixSeconds())

// --- unlock the sealed share ONCE (e.g. after biometric unlock) ---
val guardian = openGuardian(sealedBlob, passphrase)   // throws StewardException.BadPassphrase

// --- co-sign loop: the app only moves bytes; the SDK does all the FROST ---
try {
    for ((sessionId, msgHex) in relay.recv()) {
        val a = guardian.handleRelayMessage(sessionId, msgHex)   // RelayAction
        if (a.action == "send") relay.send(sessionId, a.to, a.msgHex!!)
        if (a.done) break
    }
} finally {
    guardian.wipe()          // zeroize on lock/logout
    guardian.destroy()       // release the Rust handle (AutoCloseable)
}
```

### Swift

```swift
import steward_ffi

// --- verify the owner's latest heartbeat before arming an inheritance release ---
let ok = verifyHeartbeat(pubkeyHex: vault.heartbeatPubkey, vaultId: vault.id,
                         time: beat.time, sigHex: beat.sigHex)
      && isLapsed(latest: beat.time, interval: vault.intervalSecs,
                  grace: vault.graceSecs, now: nowUnixSeconds())

// --- unlock the sealed share ONCE ---
let guardian = try openGuardian(sealedBlob: blob, passphrase: pass)   // throws StewardError.BadPassphrase

// --- co-sign loop ---
defer { guardian.wipe() }
for (sessionId, msgHex) in try relay.recv() {
    let a = try guardian.handleRelayMessage(sessionId: sessionId, incomingMsgHex: msgHex)
    if a.action == "send" { try relay.send(sessionId, a.to, a.msgHex!) }
    if a.done { break }
}
```

---

## React Native

React Native wraps this native library through a **turbo/native module**: a thin RN module that (on
Android) loads the `.aar` and forwards to the generated Kotlin, and (on iOS) links the XCFramework and
forwards to the generated Swift, exposing the same functions to JS/TS (with the async ceremony loop
bridged over the event loop). Nothing about `steward-ffi` changes — RN sits *on top* of these exact
bindings. Building that RN module is out of scope for this SDK and is the documented next step (it is
how `@zecauth/react-native` layered over its native cores).

---

## Host smoke test

`cargo test -p steward-ffi` drives the FFI functions directly (see `tests/smoke.rs`): generate a
heartbeat key → sign + verify a beat (incl. the fixed cross-impl known-answer vector) → `split_authority`
a 2-of-3 vault → `seal_share` + `open_guardian` each share → run round 1 / round 2 for two guardians
(both the bare `round1/round2` path and the enveloped `handle_relay_message` path) → `aggregate_signature`
→ `verify_aggregate` against `rk`. This proves the SDK surface works end-to-end on the host even though a
real device build needs the Android NDK / Xcode.

## What needs a real mobile toolchain to finish

- **Android**: the NDK + `cargo-ndk` to cross-compile the `.so`s and Gradle to assemble the `.aar`.
- **iOS**: Xcode to build the device/simulator `staticlib`s and `xcodebuild -create-xcframework`.
- **React Native**: the turbo/native module wrapper (next step).

Everything host-achievable — compile, generate both bindings, and the end-to-end smoke test — is done
and green.
