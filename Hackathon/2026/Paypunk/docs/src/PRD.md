# PRD

## Problem Statement

Businesses and individuals want to accept and pay with privacy-preserving cryptocurrencies (Zcash) and other digital assets (Ethereum), but the current focus is on mobile applications and terminal based tooling is mainly linked to running a full node, requires expertise in blockchain infrastructure, and offers poor integration for desktop applications and agentic workflows. There needs to be a simple, secure, non-custodial wallet that works for both human users and autonomous agents, enabling privacy-preserving commerce that is a delight to use without requiring deep protocol knowledge.

## Solution

Build Paypunk Wallet — a multi-chain wallet tool with layered interfaces, targeting Zcash Orchard shielded pool and Ethereum (with Sapling and transparent planned for later):

1. **api** — Chain-agnostic Rust library providing high-level wallet operations. Dispatches to the appropriate chain backend by `ProtocolId`. Hides IPC, actor, and chain-specific details from consumers.
2. **CLI** — Command-line interface using api for scripting and automation. Integrates the TUI as a library for interactive use.
3. **TUI** — Terminal-based user interface (ratatui) for interactive human use. Ships alongside the CLI as a reusable library crate.

The architecture is designed to eventually support a Tauri desktop interface, agent-to-agent commerce flows, and FROST multi-signature workflows where an agent proposes transactions that require human approval.

### Target User (v1)

Individual privacy-conscious users, including developers and agent operators running their own wallet. Businesses raising and paying invoices is the long-term goal (via a sister project) but not the v1 target.

## User Stories

1. As a privacy-conscious wallet user, I want to generate a new wallet with a 12-word BIP39 seed phrase, so that I can back up my keys offline
2. As a privacy-conscious wallet user, I want to restore my wallet from a saved seed phrase and password, so that I can recover my funds on a different device
3. As a privacy-conscious wallet user, I want to check my available ZEC balance at any time, so that I know how much I can spend
4. As a privacy-conscious wallet user, I want to initiate a Transfer to another Zcash address with an amount and optional memo, so that I can pay for goods and services privately
5. As a privacy-conscious wallet user, I want to view my transaction history with confirmation status (pending/confirmed), so that I can track my payments
6. As a privacy-conscious wallet user, I want my seed to be encrypted at rest with Argon2id derived from my password, so that my keys are protected against unauthorized access
7. As a privacy-conscious wallet user, I want my wallet state database to be encrypted separately from my seed encryption, so that there is security compartmentalization
8. As a privacy-conscious wallet user, I want the wallet to scan for Incoming Payments without exposing my view keys to external servers, so that my financial data remains private
9. As a privacy-conscious wallet user, I want the wallet to connect to public lightwalletd endpoints by default, so that I can start using it without running infrastructure
10. As a CLI user, I want to unlock my wallet with a password prompt, environment variable, or mounted secrets file, so that I can use the wallet interactively or non-interactively
11. As a CLI user, I want to create a new wallet from the command line, so that I can script wallet provisioning
12. As a CLI user, I want to generate addresses from the command line, so that I can get payment destinations programmatically
13. As a CLI user, I want to check balance from the command line, so that I can monitor funds via scripts
14. As a CLI user, I want to send Transfers from the command line, so that I can automate payments
15. As a CLI user, I want to view transaction history from the command line, so that I can audit my wallet activity programmatically
16. As a CLI user, I want to sync the wallet chain state on demand, so that I can see recent activity without running a background process
17. As an agent operator, I want to provide my wallet password via a mounted secrets file with restricted permissions, so that my agent can sign Transfers without interactive prompts
18. As an agent, I want to call the wallet API over IPC, so that I can integrate Zcash payments into my workflows
19. As a TUI user, I want to interactively view my balance, addresses, and transaction history in a terminal interface, so that I can manage my wallet without a web browser
20. As a TUI user, I want the wallet to stay synced in the background while I use the interface, so that I always see up-to-date information
21. As a developer, I want the wallet API to be a separate library crate from my CLI and TUI, so that it can be consumed by third-party integrations

## Implementation Decisions

### Architecture

- **Three-process model** — `keypunkd` (key daemon), `paypunkd` (app daemon), `paypunk` (CLI/TUI). Both daemons are library crates launched via the `paypunk` CLI binary. Process separation from v1 enforces the security boundary — neither the CLI nor the application daemon ever hold key material.
- **Key isolation** — The `Keypunkd` actor (in keypunkd) must never expose raw private keys. It accepts sign/prove requests and returns only results (signatures, protocol proofs). The password is required on each `AuthorizeArtifact` and `ExportViewingKey` call — there is no long-lived unlocked session. keypunkd is designed to run as a separate system user (deployment concern, not enforced by the code).
- **IPC** — A tactix actor wrapping Unix domain sockets. The ipc crate carries opaque byte payloads with X25519-based per-message authentication (see ADR-001). Postcard serialization is performed by the callers (paypunkd, keypunkd, api), not by the ipc crate itself.
- **Structured logging** — `tracing` crate with env-filter support. Info-level for operations, debug for scan details, warn/error for failures.

### Crate Layout

- **`types`** (library) — Chain-agnostic domain types (`Address`, `Amount`, `Balance`, `Transfer`, `Intent`, `Protocol`/`SignerProtocol` traits, etc.). No chain-specific logic.
- **`api`** (library) — Chain-agnostic public API. Dispatches to the correct chain backend by `ProtocolId`. Hides IPC/tactix details. CLI and TUI depend on this.
- **`paypunkd`** (library, launched via CLI) — App daemon. Hosts `Paypunkd` actor, usecases, service orchestration, chain backend injection.
- **`keypunkd`** (library, launched via CLI) — Key daemon. Hosts `Keypunkd` actor. Seed generation, signing, proving. Designed to run as separate system user.
- **`ipc`** (library) — Tactix actor sender for interprocess communication. Carries opaque byte payloads with X25519 per-message auth. Used by api, paypunkd, and keypunkd.
- **`protocols/{zcash,ethereum}`** — Chain-specific implementations. Each implements the `Protocol` and `SignerProtocol` traits from `paypunk-types`.
- **`tui`** — Ratatui screens and widgets. Library crate consumed by CLI, also builds as standalone binary. Reusable by future Tauri desktop app.
- **`cli`** (binary) — Links `api` and `tui`. Runs in CLI mode (single command) or TUI mode (interactive session). Also launches daemons via subcommands.

### Passphrase Input

- Currently supports `--password` CLI flag only. Interactive prompt, environment variable, and secrets file support are planned but not yet implemented.

### Configuration

- Data directory (default `~/.local/share/paypunk/`)
- LSP endpoint / lightwalletd host (with defaults per network)
- Secrets file path (for agent mode) — planned, not yet implemented

## Out of Scope

- Invoice generation and payment request processing (planned for sister project)
- Subscription/recurring payments
- FROST multi-signature / agent approval workflows (post-v1)
- n8n integration and merchant invoicing tools (separate product)
- Tauri desktop interface (future migration target)
- OS keyring integration (post-v1 enhancement)
