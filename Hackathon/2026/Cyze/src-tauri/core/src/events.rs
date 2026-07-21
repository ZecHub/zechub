//! Progress events emitted by ceremony tasks. The app layer forwards these
//! to the frontend over Tauri events.

use serde::{Deserialize, Serialize};
use uuid::Uuid;

/// Human-readable description of the transaction a participant is being asked to
/// sign. Sent by the coordinator over the signing package's `aux_msg` side
/// channel so co-signers can review *what* they are signing instead of an
/// opaque 32-byte sighash. This is advisory context for the approval gate; the
/// bytes actually signed are still the FROST message (the sighash).
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SigningContext {
    /// Destination address (unified/orchard or transparent).
    pub recipient: String,
    /// Amount sent to the recipient, in zatoshis.
    pub amount_zatoshis: u64,
    /// Network fee, in zatoshis.
    pub fee_zatoshis: u64,
    /// Optional memo attached to the recipient's shielded output.
    pub memo: Option<String>,
    /// True when the recipient is transparent (an unshield): amount and
    /// recipient become public on-chain.
    pub is_unshield: bool,
    /// Zcash network the transaction targets ("test" or "main").
    pub network: String,
    /// Transaction-plan identifier shared by every per-note signing round of a
    /// single transaction. A multi-note spend runs one FROST round per note,
    /// each in its own session; they all carry the same `plan_id` so a
    /// participant can confirm the separate approval requests they receive all
    /// belong to the *same* transaction rather than to unrelated spends.
    #[serde(default)]
    pub plan_id: String,
    /// 1-based index of the note being signed within this transaction plan.
    #[serde(default)]
    pub spend_index: u32,
    /// Total number of notes (spend-authorization rounds) in this plan.
    #[serde(default)]
    pub spend_total: u32,
    /// The full transaction sighash (hex) that every note in this plan signs.
    /// Identical across all rounds of the plan; lets a participant verify that
    /// each request they approve is signing the one shared transaction.
    #[serde(default)]
    pub tx_sighash: String,
}

#[derive(Debug, Clone, Serialize)]
#[serde(tag = "phase", rename_all = "snake_case")]
pub enum DkgEvent {
    Connecting,
    /// Logged in to the coordination server — the connection is up and
    /// authenticated. `server` is the host:port actually reached (a tunnel URL
    /// when the coordinator exposed one), so the user can confirm they joined
    /// the server they expected.
    Connected { server: String },
    /// Session established; identifiers derived for all participants.
    SessionReady {
        session_id: Uuid,
        num_participants: u16,
    },
    /// Own round 1 package sent; waiting for the others.
    Round1,
    /// Echo-broadcast verification of round 1 packages (3+ participants).
    Round1Broadcast,
    /// Own round 2 packages sent; waiting for the others.
    Round2,
    /// Computing the final key share.
    Finalizing,
}

#[derive(Debug, Clone, Serialize)]
#[serde(tag = "phase", rename_all = "snake_case")]
pub enum CoordinatorEvent {
    Connecting,
    /// Logged in to the coordination server. See [`DkgEvent::Connected`].
    Connected { server: String },
    SessionCreated { session_id: Uuid },
    WaitingForCommitments,
    SigningPackageSent,
    WaitingForShares,
    Aggregating,
    /// A selected signer sent their round-1 commitment — i.e. they have joined
    /// the session and are participating. `pubkey` is their hex comm pubkey.
    /// Used by the session-visibility UI to show live connection status.
    ParticipantJoined { pubkey: String },
    /// A selected signer sent their round-2 signature share — i.e. they have
    /// approved and signed the pending transaction plan. `pubkey` is their hex
    /// comm pubkey.
    ParticipantApproved { pubkey: String },
}

#[derive(Debug, Clone, Serialize)]
#[serde(tag = "phase", rename_all = "snake_case")]
pub enum ParticipantEvent {
    Connecting,
    /// Logged in to the coordinator's server — the connection is established and
    /// authenticated. `server` is the host:port actually reached (a tunnel URL
    /// when the coordinator exposed one), so the signer can confirm they are
    /// talking to the server they were given before approving anything.
    Connected { server: String },
    /// Commitments sent (message-independent round 1).
    CommitmentsSent,
    /// Signing package received — paused until the user approves.
    /// `message_hex` is what will be signed (the raw sighash); show it to the
    /// user. `context`, when present, decodes that sighash into the human-
    /// readable transaction the coordinator says it corresponds to.
    AwaitingApproval {
        message_hex: String,
        #[serde(skip_serializing_if = "Option::is_none")]
        context: Option<SigningContext>,
    },
    /// Share computed and sent to the coordinator.
    ShareSent,
}
