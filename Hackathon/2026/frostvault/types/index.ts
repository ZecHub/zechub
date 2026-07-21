export type ParticipantRole = "owner" | "recovery";

export interface Participant {
  id: string;
  frost_identifier: number;
  name: string;
  role: ParticipantRole;
  has_key_share: boolean;
}

export type VaultStatus = "generating" | "ready" | "failed";

export interface Vault {
  id: string;
  name: string;
  threshold: number;
  total_participants: number;
  status: VaultStatus;
  group_public_key_hex: string | null;
  created_at: string;
  dkg_ceremony_id: string;
  participants: Participant[];
}

export type CeremonyKind = "dkg" | "send" | "recovery";

export type CeremonyPhase =
  | "awaiting_round1"
  | "awaiting_round2"
  | "finalizing"
  | "aggregating"
  | "complete"
  | "failed";

export interface Ceremony {
  id: string;
  vault_id: string;
  kind: CeremonyKind;
  phase: CeremonyPhase;
  signer_participant_ids: string[];
  message: string | null;
  signature_hex: string | null;
  verifying_key_hex: string | null;
  verified: boolean | null;
  error: string | null;
  created_at: string;
  completed_at: string | null;
}

export type TransactionType = "send" | "receive";

export interface Transaction {
  id: string;
  vault_id: string;
  type: TransactionType;
  amount: string;
  counterparty: string;
  ceremony_id: string | null;
  txid_placeholder: string;
  timestamp: string;
}

export interface CreateVaultInput {
  name: string;
  threshold: number;
  participants: { name: string; role: ParticipantRole }[];
}
