import { invoke } from "@tauri-apps/api/core";

export interface AppError {
  code: string;
  message: string;
}

export interface KeystoreStatus {
  exists: boolean;
  unlocked: boolean;
  recovery_enabled: boolean;
}

export interface ContactDto {
  name: string;
  pubkey: string;
  alias: string | null;
  text: string;
}

export interface GroupSummary {
  id: string;
  description: string;
  ciphersuite: string;
  threshold: number;
  num_participants: number;
  server_url: string | null;
  participants: Record<string, string>;
}

export interface Settings {
  server_url: string | null;
  sidecar_port: number | null;
  trusted_certs: Record<string, string>;
  /** Active session profile: "coordinator" | "participant". */
  session_role: string | null;
  /** Coordinator server exposure: "direct" | "tunnel" | "nginx". */
  coordinator_exposure: string | null;
  /** True once first-run Session Configuration has been saved. */
  session_configured: boolean | null;
}

export interface SidecarStatus {
  running: boolean;
  port: number | null;
  url: string | null;
  cert_fingerprint: string | null;
  lan_addresses: string[];
}

export interface ConnectionTestResult {
  ok: boolean;
  error: string | null;
  /** The server actually reached (host:port, or a tunnel hostname). */
  server: string;
  /** "pinned" (self-signed cert imported) or "public" (real CA, e.g. a tunnel). */
  tls: string;
  /** Round-trip time of the probe, in milliseconds. */
  latency_ms: number | null;
}

export interface TunnelStatus {
  running: boolean;
  public_url: string | null;
  port: number | null;
}

// Keystore
export const keystoreStatus = () => invoke<KeystoreStatus>("keystore_status");
/** Defer the idle auto-lock; called on user activity (throttled). */
export const recordActivity = () => invoke<void>("record_activity");
/** Returns the one-time 12-word recovery phrase to back up. */
export const createKeystore = (passphrase: string) =>
  invoke<string>("create_keystore", { passphrase });
/** Returns the one-time 12-word recovery phrase to back up. */
export const importUpstreamConfig = (path: string | null, passphrase: string) =>
  invoke<string>("import_upstream_config", { path, passphrase });
export const unlockKeystore = (passphrase: string) =>
  invoke<void>("unlock_keystore", { passphrase });
/** Forgotten-passphrase recovery: unlock with the recovery phrase and set a new passphrase. */
export const recoverKeystore = (recoveryPhrase: string, newPassphrase: string) =>
  invoke<void>("recover_keystore", { recoveryPhrase, newPassphrase });
export const lockKeystore = () => invoke<void>("lock_keystore");
export const changePassphrase = (oldPassphrase: string, newPassphrase: string) =>
  invoke<void>("change_passphrase", { oldPassphrase, newPassphrase });
/** Generate a recovery code for a keystore that lacks one. Returns the phrase. */
export const generateRecoveryCode = () =>
  invoke<string>("generate_recovery_code");

export interface Identity {
  username: string | null;
  pubkey: string | null;
}
export const getIdentity = () => invoke<Identity>("get_identity");
export const setUsername = (username: string) =>
  invoke<void>("set_username", { username });

// Zcash wallet (light-client)
export interface WalletConfig {
  network: string; // "test" | "main"
  lightwalletd_url: string;
}
export interface LightwalletdInfo {
  chain_name: string;
  block_height: number;
  estimated_height: number;
  vendor: string;
  version: string;
  /** Consensus branch id the node expects (lowercase hex). */
  consensus_branch_id: string;
  /** Branch id this wallet build would produce at the node's height. */
  wallet_branch_id: string | null;
  /** True when the wallet's branch id matches the node's (sends will validate). */
  branch_supported: boolean | null;
}
export const getWalletConfig = () => invoke<WalletConfig>("get_wallet_config");
export const setWalletConfig = (network: string, lightwalletdUrl: string) =>
  invoke<WalletConfig>("set_wallet_config", { network, lightwalletdUrl });
export const lightwalletdInfo = (url: string | null) =>
  invoke<LightwalletdInfo>("lightwalletd_info", { url });

/** A single pool's balance, split into spendable now / pending / total. */
export interface PoolBalance {
  spendable_zatoshis: number;
  pending_zatoshis: number;
  total_zatoshis: number;
}
export interface WalletStatus {
  initialized: boolean;
  address: string | null;
  /** Aggregate totals (kept for back-compat; equal to the Orchard pool). */
  total_zatoshis: number;
  spendable_zatoshis: number;
  /** Per-pool breakdown. With an Orchard-only group UFVK, sapling & transparent
   *  are 0 — the threshold group cannot hold or spend those pools. */
  orchard: PoolBalance;
  sapling: PoolBalance;
  transparent: PoolBalance;
  synced_height: number;
  chain_tip_height: number;
}
export const walletGroupStatus = (groupId: string) =>
  invoke<WalletStatus>("wallet_group_status", { groupId });
/** Import the group's view-only account; returns the first block it will scan.
 *  `birthdayHeight` sets that first block. Omit it to reuse a previously
 *  recorded birthday — this is what lets a rebuilt wallet database recover its
 *  funds — or, for a brand-new group, to start at the chain tip. Blocks before
 *  the birthday are never scanned. */
export const walletInitAccount = (groupId: string, birthdayHeight?: number) =>
  invoke<number>("wallet_init_account", {
    groupId,
    birthdayHeight: birthdayHeight ?? null,
  });
export const walletSync = (groupId: string) =>
  invoke<WalletStatus>("wallet_sync", { groupId });
/** Cancel a group's in-flight sync (if any). The running `walletSync` returns
 *  promptly, freeing the wallet for a fresh sync. No-op if nothing is syncing. */
export const walletCancelSync = (groupId: string) =>
  invoke<void>("wallet_cancel_sync", { groupId });
/** `[fullyScannedHeight, chainTipHeight]`, readable while a sync is running.
 *  `walletSync` blocks for the whole catch-up, so poll this to show progress. */
export const walletSyncProgress = (groupId: string) =>
  invoke<[number, number]>("wallet_sync_progress", { groupId });

export interface TxRecord {
  txid: string;
  block_height: number | null;
  /** Unix timestamp (seconds) from the mined block; null when unconfirmed. */
  timestamp: number | null;
  /** "receive" | "send" */
  direction: string;
  amount_zatoshis: number;
  fee_zatoshis: number | null;
  memo: string | null;
  /** Recipient unified address for sends; null for self-transfers (consolidation). */
  recipient: string | null;
}
/** On-chain transaction history from the group's local wallet db. */
export const walletHistory = (groupId: string) =>
  invoke<TxRecord[]>("wallet_history", { groupId });

export interface NoteRecord {
  received_txid: string;
  value_zatoshis: number;
  /** "spendable" | "pending" | "spending" */
  status: string;
  received_height: number | null;
  confirmations: number;
  is_change: boolean;
  memo: string | null;
}
/** Unspent Orchard notes comprising the group's balance (Review Notes view). */
export const walletNotes = (groupId: string) =>
  invoke<NoteRecord[]>("wallet_notes", { groupId });

export interface ReceiveAddress {
  address: string;
  index: number;
}
/** The group's current rotating receive address (auto-advances after use). */
export const walletReceiveAddress = (groupId: string) =>
  invoke<ReceiveAddress>("wallet_receive_address", { groupId });
/** Force a fresh receive address for the group (manual rotation). */
export const walletNewReceiveAddress = (groupId: string) =>
  invoke<ReceiveAddress>("wallet_new_receive_address", { groupId });

export interface SpendToSign {
  index: number;
  alpha_hex: string;
}
export interface DraftTransaction {
  pczt_hex: string;
  sighash_hex: string;
  spends: SpendToSign[];
  fee_zatoshis: number;
  amount_zatoshis: number;
  recipient: string;
  /** True when the recipient is a transparent address — this is an unshield
   *  (Orchard → transparent). The amount/recipient become public on-chain. */
  is_unshield: boolean;
  /** Optional memo attached to the recipient's shielded output. Encrypted
   *  on-chain; only readable with the recipient's viewing key. Null for
   *  unshield transfers (transparent outputs carry no memo). */
  memo: string | null;
}
export const walletPrepareSend = (
  groupId: string,
  recipient: string,
  amountZatoshis: number,
  memo?: string,
) =>
  invoke<DraftTransaction>("wallet_prepare_send", {
    groupId,
    recipient,
    amountZatoshis,
    memo: memo ?? null,
  });

/** Build, FROST-sign, and (next) broadcast a transfer. Returns the ceremony id;
 *  progress arrives via send:progress / send:complete / send:failed events. */
export const walletSend = (args: {
  group_id: string;
  recipient: string;
  amount_zatoshis: number;
  signers: string[];
  memo?: string | null;
}) => invoke<string>("wallet_send", { args });

/** Re-broadcast a signed transaction whose first broadcast failed, without
 *  re-running the signing ceremony. Returns the broadcast txid. */
export const walletRebroadcast = (groupId: string, ceremonyId: string) =>
  invoke<string>("wallet_rebroadcast", { groupId, ceremonyId });

// Contacts
export const listContacts = () => invoke<ContactDto[]>("list_contacts");
export const addContact = (text: string, alias?: string) =>
  invoke<ContactDto>("add_contact", { text, alias: alias ?? null });
export const removeContact = (pubkey: string) => invoke<void>("remove_contact", { pubkey });
export const setContactAlias = (pubkey: string, alias: string) =>
  invoke<void>("set_contact_alias", { pubkey, alias });
export const exportMyContact = (name: string) =>
  invoke<ContactDto>("export_my_contact", { name });

// Groups
export interface OrchardKeys {
  address: string;
  ufvk: string;
}
export const listGroups = () => invoke<GroupSummary[]>("list_groups");
export const groupOrchardKeys = (id: string) =>
  invoke<OrchardKeys | null>("group_orchard_keys", { id });
export const removeGroup = (id: string) => invoke<void>("remove_group", { id });
export const renameGroup = (id: string, description: string) =>
  invoke<void>("rename_group", { id, description });

// Server / sidecar
export const getSettings = () => invoke<Settings>("get_settings");
export const setServerUrl = (url: string) => invoke<void>("set_server_url", { url });
/** Save the first-run session configuration (role + coordinator exposure). */
export const setSessionConfig = (role: string, exposure?: string | null) =>
  invoke<void>("set_session_config", { role, exposure: exposure ?? null });
/** Switch the active session profile (coordinator/participant). */
export const setSessionRole = (role: string) =>
  invoke<void>("set_session_role", { role });
export const testServerConnection = (url: string) =>
  invoke<ConnectionTestResult>("test_server_connection", { url });
export const trustServerCert = (url: string, certPem: string) =>
  invoke<string>("trust_server_cert", { url, certPem });
export const startSidecar = (port: number | null, bindLan?: boolean) =>
  invoke<SidecarStatus>("start_sidecar", { port, bindLan: bindLan ?? null });
export const stopSidecar = () => invoke<void>("stop_sidecar");
export const sidecarStatus = () => invoke<SidecarStatus>("sidecar_status");
export const exportSidecarCert = () => invoke<string>("export_sidecar_cert");
export const startTunnel = () => invoke<TunnelStatus>("start_tunnel");
export const stopTunnel = () => invoke<void>("stop_tunnel");
export const tunnelStatus = () => invoke<TunnelStatus>("tunnel_status");

// Ceremonies
export type Ciphersuite = "ed25519" | "redpallas";

export interface StartDkgArgs {
  suite: Ciphersuite;
  description: string;
  threshold: number;
  participants: string[];
  server_url: string | null;
  session_id: string | null;
}

export interface PendingSession {
  session_id: string;
  coordinator: string | null;
  coordinator_pubkey: string;
  matching_groups: string[];
}

export const startDkg = (args: StartDkgArgs) => invoke<string>("start_dkg", { args });
export const cancelCeremony = (ceremonyId: string) =>
  invoke<void>("cancel_ceremony", { ceremonyId });
export const createSigningSession = (args: {
  group_id: string;
  message_hex: string;
  signers: string[];
  server_url: string | null;
}) => invoke<string>("create_signing_session", { args });
export const joinSigningSession = (args: {
  group_id: string;
  session_id: string;
  server_url: string | null;
}) => invoke<string>("join_signing_session", { args });
export const respondToSigning = (ceremonyId: string, approve: boolean) =>
  invoke<void>("respond_to_signing", { ceremonyId, approve });
export const listPendingSessions = (serverUrl: string | null) =>
  invoke<PendingSession[]>("list_pending_sessions", { serverUrl });
