# Paypunk

Multi-chain wallet infrastructure for privacy-preserving commerce on desktop and agentic workflows.

## Language

**Wallet**:
A key manager capable of generating Addresses, checking Balance, building outgoing Transfers, and scanning the chain for incoming funds. Split across three processes: `Keypunkd` actor in keypunkd, `Paypunkd` actor in paypunkd, IPC routing via the ipc crate.
_Avoid_: Vault, safe

**Keypunkd actor**:
An actor (tactix) that holds the decrypted spending key in protected memory. Lives inside `keypunkd`. The security boundary — only accepts `GetEncryptionKey`, `GenerateSeed`, `RestoreSeed`, `PreviewArtifact`, `AuthorizeArtifact`, `ExportViewingKey`, `VerifyPassword`, `BulkExportViewingKeys`, and `ExportMnemonic` messages (defined as `KeypunkdRequest` in `paypunk-types`). Never exposes raw key material. Uses `SignerProtocol` implementations to perform chain-specific signing. Stateless — the seed is derived from the encrypted store on each `AuthorizeArtifact` or `ExportViewingKey` call using the password provided in the request.
_Avoid_: KeyActor, Key Daemon, signer

**Paypunkd actor**:
An actor (tactix) managing non-secret operations: address derivation, LSP sync, balance tracking, transfer construction. Lives inside `paypunkd`. Owns the SQLite wallet state database and `Protocol` implementations. Delegates signing to the `Keypunkd` actor (in `keypunkd`) via IPC when a transfer needs finalization.
_Avoid_: WalletActor, Wallet Daemon

**Seed**:
A 12-word BIP39 mnemonic phrase from which all wallet keys are deterministically derived. Stored at rest in a dedicated file (`seed.enc`), encrypted with an Argon2id-derived key from the user's password (AES-256-GCM). The mnemonic is stored separately in `seed.mnemonic.enc` with the same encryption scheme. The seed file is eventually owned by a different system user than the wallet process for security compartmentalization. The seed is decrypted on-demand for each `AuthorizeArtifact` or `ExportViewingKey` call and held on the stack for the duration of the signing operation.

**Address**:
A unique receiving address derived for each incoming payment. One address per payment — never reused (post-v1 goal; address reuse is acceptable for initial build).
_Avoid_: Reuse

**Intent**:
A strongly-typed enum representing what the user wants to do. One variant per protocol (e.g., `Intent::Zcash(ZcashIntent::Transfer { ... })`, `Intent::Ethereum(EthereumIntent::Transfer { ... })`). Consumed by `Protocol::build()`. All amounts are human-readable strings; addresses are raw protocol-level strings. Constructed by the caller (CLI/TUI), not by the API layer.
_Avoid_: Transaction intent, message

**Transfer**:
An outbound payment from the wallet to a recipient's Address, including an Amount and an optional Memo (Zcash). Initiated by the user or an agent acting on their behalf via an `Intent::Zcash(ZcashIntent::Transfer)` or `Intent::Ethereum(EthereumIntent::Transfer)`.

**Incoming Payment**:
Funds received into the wallet detected via LSP chain scanning of the current Address.
_Avoid_: Receipt

**keypunkd**:
Long-running daemon hosting the `Keypunkd` actor. Responsible for key generation and signing via `SignerProtocol`. Runs as a separate system user for defense-in-depth (file/memory isolation — deployment concern, not enforced by code). IPC auth is per-message Blake2b keyed-hash MAC using X25519 shared secret — any process can connect, but only a client holding the registered keypair can send valid messages. Password is additionally required for sensitive operations (`AuthorizeArtifact`, `ExportViewingKey`, `ExportMnemonic`). See ADR-001.
_Avoid_: Key daemon, KeyActor

**paypunkd**:
Long-running daemon hosting the `Paypunkd` actor, usecases, and service orchestration. Holds the wallet database (`paypunkd.db`, currently plaintext) and `Protocol` implementations for transaction building, proving, and finalizing. Exposes IPC over Unix socket. Runs as the user's login UID. Never holds key material — delegates signing to keypunkd via IPC.
_Avoid_: App daemon, WalletActor

**ipc**:
Library crate providing a tactix actor that carries opaque byte payloads over Unix domain sockets with X25519-based per-message authentication. The communication sender between all processes. api, paypunkd, and keypunkd all use it. Serialization (postcard) is done by the callers, not by the ipc crate.
_Avoid_: Transport, wire

**api**:
Public-facing library that CLI and TUI depend on. Provides high-level functions (`get_balance`, `submit_intent`, `approve_signature`, etc.) that communicate with paypunkd via IPC. Hides IPC/tactix details from consumers when using `Client::connect`. Internally communicates with paypunkd via the ipc crate. Callers construct `Intent` values; the API submits them.
_Avoid_: SDK

**protocols**:
Directory of chain-specific implementation crates (e.g., `protocols/zcash`, `protocols/ethereum`). Each implements `Protocol` and `SignerProtocol` traits from `paypunk-types`.
_Avoid_: adapters

## Architecture

- Single context repo. No CONTEXT-MAP.md needed.
- Three-process architecture: `keypunkd` (key daemon), `paypunkd` (app daemon), and `paypunk` (CLI/TUI). Both daemons are library crates launched via the `paypunk` CLI binary.
- Layers: paypunk (CLI/TUI) → api → ipc → paypunkd → ipc → keypunkd
- IPC: Unix domain socket, postcard serialization (by callers), tactix actor wrapping each connection, X25519 + Blake2b MAC per-message authentication

## Product Layers

**api**: Chain-agnostic library providing the public API. Dispatches to the correct chain backend by `ProtocolId`. Hides IPC and actor details from consumers.

**keypunkd**: Key daemon — hosts `Keypunkd` actor. Seed generation, signing via `SignerProtocol`. Designed to run as a separate system user.

**paypunkd**: App daemon — hosts `Paypunkd` actor, usecases, service orchestration, chain backend injection (`Protocol`).

**paypunk**: CLI binary. Connects to paypunkd via api. Includes TUI mode (ratatui) for interactive use. Also launches both daemons via subcommands.

**TUI** (future Tauri): Terminal-based user interface, ships inside the CLI binary as a library crate. Planned migration to Tauri later.

## Data Model

All entity types are chain-agnostic primitives (strings, numbers, enums). No generics or trait objects on the data types (except `Page<T>`). Chain-specific logic lives inside protocol implementation crates (`protocols/zcash`, `protocols/ethereum`).

**Types**: Address(String), Amount(u128), TransferId(String), BlockHeight(u64), Balance { spendable: Amount, pending: Amount, total: Amount }, TransactionStatus { Pending, Confirmed(BlockHeight), Failed(String) }, TxStatus { Pending, Confirmed { confirmations: u64 }, Failed { reason: String }, NotFound }, Transfer { id: TransferId, from: Address, to: Address, amount: Amount, fee: Amount, memo: Option\<String\>, status: TransactionStatus, created_at: u64 }, HistoryEntry { hash: String, direction: TxDirection, counterparty: Address, amount: Amount, status: TxStatus, timestamp: Option\<u64\> }, Account { id, protocol, derivation_path, name, address, viewing_key: Vec\<u8\>, created_at: u64, birthday_height: Option\<u64\> }, ProtocolMetadata { id: ProtocolId, chain_id, native_asset, ticker, decimals: u8, block_explorer_template }, SyncStatus { is_syncing: bool, current_height: u64, target_height: u64 }, Page\<T\> { items: Vec\<T\>, next_cursor: Option\<String\>, has_more: bool }
