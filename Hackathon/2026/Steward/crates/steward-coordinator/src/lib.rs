//! # steward-coordinator
//!
//! Transport-agnostic **FROST signing-session orchestration** for Steward plus the
//! **dead-man's-switch policy gate** — increment A of the guardian-ceremony /
//! coordinator work (PLAN.md P3/P4/P6). It builds *on top of* the tested crypto in
//! [`steward_core`]; it never re-implements FROST and holds **no secret shares**.
//!
//! ## The seam
//! Everything routes through the [`Transport`] trait ([`transport`]), modelled on
//! `frostd` (`docs/PROTOCOL.md` §2/§4). This crate ships an in-process
//! implementation ([`InProcessRelay`]) that runs a coordinator + N guardians in one
//! process; the real `frostd` + Noise client implements the same trait later
//! without any change to the ceremony.
//!
//! ## Modules
//! - [`transport`] — the [`Transport`] trait + the in-process relay.
//! - [`message`]   — the coordinator ↔ guardian wire protocol (`serde_json` of the FROST round structs).
//! - [`guardian`]  — the [`Guardian`] handler (commit / sign; single-use nonce lifecycle).
//! - [`ceremony`]  — the coordinator ([`run_signing_session`]): drive the 2 rounds, aggregate, verify vs `rk`.
//! - [`authz`]     — ceremony purpose + the [`VaultPolicy`] gate over [`steward_core::policy`].
//! - [`http`]      — increment B: an axum relay + control plane, and an [`HttpTransport`] guardian client, over the same [`Transport`] seam.
//! - [`persist`]   — the coordinator's on-disk vault store (**public config only, never secret shares**) so a restart never orphans a vault.
//! - [`error`]     — crate error type.
//!
//! ## Increment B — over the network
//! The ceremony is unchanged; [`http`] adds an [`HttpTransport`] (guardian-side
//! [`Transport`] client) and an axum server that is *its own relay hub* plus a
//! control plane (vaults / heartbeats / propose-ceremony). The coordinator sees the
//! (non-secret) FROST round messages in this MVP; inter-guardian Noise E2E is a
//! later hardening step that swaps only the [`HttpTransport`] body — see the
//! trust-tradeoff note in [`http`].

use std::time::Duration;

pub mod authz;
pub mod ceremony;
pub mod error;
pub mod guardian;
pub mod http;
pub mod message;
pub mod persist;
pub mod signer;
pub mod transport;

pub use authz::{CeremonyPurpose, VaultPolicy};
pub use ceremony::{run_authorized_signing_session, run_signing_session, SigningJob};
pub use error::{CoordinatorError, Result};
pub use guardian::Guardian;
pub use http::{router, AppState, Clock, HttpTransport, MockClock, SystemClock, ID_HEADER};
pub use message::Message;
pub use transport::{
    Endpoint, InProcessRelay, ParticipantId, Recipient, Role, SessionId, Transport,
};

/// Poll cadence for the non-blocking in-process transport loops (both the
/// coordinator's collect loop and each guardian's run loop). Small so tests are
/// fast; the real `frostd` transport replaces polling with its own `/receive`.
pub(crate) const POLL_INTERVAL: Duration = Duration::from_millis(2);
