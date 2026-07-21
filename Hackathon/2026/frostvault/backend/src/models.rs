use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ParticipantInput {
    pub name: String,
    pub role: String, // "owner" | "recovery"
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CreateVaultRequest {
    pub name: String,
    pub threshold: u16,
    pub participants: Vec<ParticipantInput>,
}

#[derive(Debug, Clone, Serialize)]
pub struct ParticipantView {
    pub id: String,
    pub frost_identifier: u16,
    pub name: String,
    pub role: String,
    pub has_key_share: bool,
}

#[derive(Debug, Clone, Serialize)]
pub struct VaultView {
    pub id: String,
    pub name: String,
    pub threshold: u16,
    pub total_participants: u16,
    pub status: String, // "generating" | "ready"
    pub group_public_key_hex: Option<String>,
    pub created_at: String,
    pub dkg_ceremony_id: String,
    pub participants: Vec<ParticipantView>,
}

#[derive(Debug, Clone, Serialize)]
pub struct CreateVaultResponse {
    pub vault: VaultView,
}

#[derive(Debug, Clone, Deserialize)]
pub struct SendRequest {
    pub recipient: String,
    pub amount: String,
    /// Optional explicit signer set (participant ids). Defaults to the first
    /// `threshold`-many participants by FROST identifier order.
    pub signer_participant_ids: Option<Vec<String>>,
}

#[derive(Debug, Clone, Deserialize)]
pub struct RecoveryRequest {
    /// Participant ids to use as signers for the recovery proof ceremony.
    /// Must number >= the vault's threshold.
    pub signer_participant_ids: Vec<String>,
}

#[derive(Debug, Clone, Serialize)]
pub struct CeremonyView {
    pub id: String,
    pub vault_id: String,
    pub kind: String, // "dkg" | "send" | "recovery"
    pub phase: String,
    pub signer_participant_ids: Vec<String>,
    pub message: Option<String>,
    pub signature_hex: Option<String>,
    pub verifying_key_hex: Option<String>,
    pub verified: Option<bool>,
    pub error: Option<String>,
    pub created_at: String,
    pub completed_at: Option<String>,
}

#[derive(Debug, Clone, Serialize)]
pub struct StartCeremonyResponse {
    pub ceremony_id: String,
}

#[derive(Debug, Clone, Serialize)]
pub struct TransactionView {
    pub id: String,
    pub vault_id: String,
    #[serde(rename = "type")]
    pub tx_type: String, // "send" | "receive"
    pub amount: String,
    pub counterparty: String,
    pub ceremony_id: Option<String>,
    pub txid_placeholder: String,
    pub timestamp: String,
}

#[derive(Debug, Clone, Deserialize)]
pub struct ReceiveRequest {
    pub amount: String,
    pub from: String,
}
