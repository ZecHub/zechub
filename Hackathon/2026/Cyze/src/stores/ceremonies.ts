import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CeremonyKind = "dkg" | "signing" | "send";

export interface CeremonyEventPayload {
  ceremony_id: string;
  event?: { phase: string; session_id?: string; [key: string]: unknown };
  group_id?: string;
  signature_hex?: string | null;
  signed_pczt_hex?: string;
  txid?: string;
  error?: string;
}

/** Context for a wallet send, captured when it starts so the UI can show what
 *  the group is signing even after navigating away and back. */
export interface SendMeta {
  groupId: string;
  recipient: string;
  amountZatoshis: number;
  feeZatoshis: number;
  sighashHex: string;
  /** True when this is a self-transfer to consolidate fragmented notes into one. */
  isConsolidation?: boolean;
  /** True when this moves shielded Orchard funds to a transparent address. */
  isUnshield?: boolean;
  /** Optional memo attached to the recipient output (shielded sends only). */
  memo?: string;
  /** Comm pubkeys of the participants who signed this transaction. */
  signers?: string[];
}

export interface CeremonyState {
  kind: CeremonyKind;
  /** Human-readable name for display (e.g. DKG group description, signing message). */
  label?: string;
  phase: string;
  detail?: Record<string, unknown>;
  done: boolean;
  failed: boolean;
  error?: string;
  groupId?: string;
  signatureHex?: string | null;
  /** frostd session id — sticky once seen, so it survives later phases that
   *  no longer carry it. Coordinators share this; participants find it in
   *  their inbox. */
  sessionId?: string;
  /** The server this ceremony actually connected to (host:port, or a tunnel
   *  hostname), from the `connected` event. Sticky, like `sessionId`. Lets a
   *  signer confirm which server they reached before approving anything. */
  server?: string;
  /** Send-only: the signed PCZT produced once the group signature is applied. */
  signedPcztHex?: string;
  /** Send-only: the broadcast transaction id, once on-chain. */
  txid?: string;
  /** Send-only: what is being sent. */
  send?: SendMeta;
  /** Send-only: for a multi-spend tx, which input is currently being signed
   *  (1-based) and how many in total. Sticky across the per-spend ceremonies. */
  spendIndex?: number;
  spendTotal?: number;
  /** Live per-participant status for the session-visibility UI (#4), keyed by
   *  hex comm pubkey. "joined" = sent a round-1 commitment; "approved" = sent a
   *  round-2 signature share (approved the transaction plan). Accumulated across
   *  all parallel note rounds; never downgraded. */
  participants?: Record<string, "joined" | "approved">;
  /** When the ceremony was started (ms epoch), for ordering history. */
  startedAt?: number;
}

interface CeremoniesStore {
  ceremonies: Record<string, CeremonyState>;
  /** The DKG ceremony the user is currently following, if any. Tracked in
   *  the store (not screen-local state) so navigating away and back — or even
   *  reloading — keeps the in-progress ceremony attached to the wizard. */
  activeDkgId: string | null;
  activeSigningId: string | null;
  /** Active send ceremony per group id, so the wallet screen reattaches to an
   *  in-flight send after navigation. */
  activeSendByGroup: Record<string, string>;
  /** txid → signer comm pubkeys; persisted so on-chain rows can show signers
   *  even after the pending ceremony entry has been cleared. */
  txSigners: Record<string, string[]>;
  /** Bumped whenever a ceremony lands funds on-chain (a send we coordinated, or
   *  a signing session we took part in). The wallet screen watches this and runs
   *  a sync, so a signer who just approved a transaction sees it appear instead
   *  of a stale balance that contradicts what they just did.
   *
   *  It is a *signal*, not the sync itself: the wallet screen owns the only
   *  sync, so a second writer can never race the first (SQLite permits one). */
  walletRefreshTick: number;
  /** Ask the wallet screen to re-sync at the next opportunity. */
  requestWalletRefresh: () => void;
  setActiveDkg: (id: string | null, label?: string) => void;
  setActiveSigning: (id: string | null) => void;
  /** Register a freshly-started send so it persists and can be reattached. */
  startSend: (ceremonyId: string, meta: SendMeta) => void;
  /** Drop the active send for a group (e.g. to start a new transaction). */
  clearSend: (groupId: string) => void;
  onProgress: (kind: CeremonyKind, payload: CeremonyEventPayload) => void;
  onComplete: (kind: CeremonyKind, payload: CeremonyEventPayload) => void;
  onFailed: (kind: CeremonyKind, payload: CeremonyEventPayload) => void;
  clear: (ceremonyId: string) => void;
}

export const useCeremonies = create<CeremoniesStore>()(
  persist(
    (set) => ({
      ceremonies: {},
      activeDkgId: null,
      activeSigningId: null,
      activeSendByGroup: {},
      txSigners: {},
      walletRefreshTick: 0,
      requestWalletRefresh: () =>
        set((s) => ({ walletRefreshTick: s.walletRefreshTick + 1 })),
      setActiveDkg: (id, label) =>
        set((s) => {
          if (!id) return { activeDkgId: null };
          const prev = s.ceremonies[id];
          const seeded: CeremonyState = prev ?? {
            kind: "dkg",
            phase: "connecting",
            done: false,
            failed: false,
          };
          return {
            activeDkgId: id,
            ceremonies: {
              ...s.ceremonies,
              [id]: { ...seeded, label: label ?? seeded.label },
            },
          };
        }),
      setActiveSigning: (id) => set({ activeSigningId: id }),
      startSend: (ceremonyId, meta) =>
        set((s) => ({
          activeSendByGroup: { ...s.activeSendByGroup, [meta.groupId]: ceremonyId },
          ceremonies: {
            ...s.ceremonies,
            [ceremonyId]: {
              kind: "send",
              phase: "connecting",
              done: false,
              failed: false,
              groupId: meta.groupId,
              send: meta,
              startedAt: Date.now(),
            },
          },
        })),
      clearSend: (groupId) =>
        set((s) => {
          const { [groupId]: _removed, ...rest } = s.activeSendByGroup;
          return { activeSendByGroup: rest };
        }),
      onProgress: (kind, payload) =>
        set((s) => {
          const prev = s.ceremonies[payload.ceremony_id];
          const phase = payload.event?.phase;

          // Accumulate per-participant status (#4). "approved" (round-2 share)
          // outranks "joined" (round-1 commitment) and is never downgraded, so
          // the roster only advances forward across the parallel note rounds.
          let participants = prev?.participants;
          if (phase === "participant_joined" || phase === "participant_approved") {
            const pubkey = payload.event?.pubkey as string | undefined;
            if (pubkey) {
              const next = phase === "participant_approved" ? "approved" : "joined";
              const cur = participants?.[pubkey];
              if (cur !== "approved") {
                participants = { ...(participants ?? {}), [pubkey]: next };
              }
            }
          }

          // Per-participant events are status pings, not real phase changes:
          // keep the ceremony's displayed phase on the last substantive event.
          const isParticipantPing =
            phase === "participant_joined" || phase === "participant_approved";
          return {
            ceremonies: {
              ...s.ceremonies,
              [payload.ceremony_id]: {
                ...prev,
                kind,
                phase: isParticipantPing ? prev?.phase ?? "working" : phase ?? "working",
                detail: isParticipantPing ? prev?.detail : payload.event,
                participants,
                // Keep the session id once it appears; later phases omit it.
                sessionId: payload.event?.session_id ?? prev?.sessionId,
                // Sticky like the session id: the `connected` event names the
                // server we actually reached, and later phases omit it.
                server: (payload.event?.server as string | undefined) ?? prev?.server,
                // Multi-spend marker is sticky across the per-spend ceremonies.
                spendIndex:
                  (payload.event?.spend as number | undefined) ?? prev?.spendIndex,
                spendTotal:
                  (payload.event?.total as number | undefined) ?? prev?.spendTotal,
                done: false,
                failed: false,
              },
            },
          };
        }),
      onComplete: (kind, payload) =>
        set((s) => {
          const prev = s.ceremonies[payload.ceremony_id];
          const txid = payload.txid ?? prev?.txid;
          const signers = prev?.send?.signers;
          return {
            ceremonies: {
              ...s.ceremonies,
              [payload.ceremony_id]: {
                ...prev,
                kind,
                phase: "complete",
                done: true,
                failed: false,
                groupId: payload.group_id ?? prev?.groupId,
                signatureHex: payload.signature_hex,
                signedPcztHex: payload.signed_pczt_hex ?? prev?.signedPcztHex,
                txid,
              },
            },
            // Index signers by txid so on-chain rows can look them up later.
            txSigners:
              txid && signers
                ? { ...s.txSigners, [txid]: signers }
                : s.txSigners,
          };
        }),
      onFailed: (kind, payload) =>
        set((s) => ({
          ceremonies: {
            ...s.ceremonies,
            [payload.ceremony_id]: {
              ...s.ceremonies[payload.ceremony_id],
              kind,
              phase: "failed",
              done: true,
              failed: true,
              error: payload.error,
            },
          },
        })),
      clear: (ceremonyId) =>
        set((s) => {
          const { [ceremonyId]: _removed, ...rest } = s.ceremonies;
          const activeSendByGroup = Object.fromEntries(
            Object.entries(s.activeSendByGroup).filter(([, id]) => id !== ceremonyId)
          );
          return {
            ceremonies: rest,
            activeDkgId: s.activeDkgId === ceremonyId ? null : s.activeDkgId,
            activeSigningId:
              s.activeSigningId === ceremonyId ? null : s.activeSigningId,
            activeSendByGroup,
          };
        }),
    }),
    {
      name: "frost-ceremonies",
      partialize: (s) => ({
        ceremonies: s.ceremonies,
        activeDkgId: s.activeDkgId,
        activeSigningId: s.activeSigningId,
        activeSendByGroup: s.activeSendByGroup,
        txSigners: s.txSigners,
      }),
    }
  )
);

/** True when a DKG ceremony is running (tracked active id, not yet done). */
export function selectDkgInProgress(s: CeremoniesStore): boolean {
  const id = s.activeDkgId;
  return !!id && !!s.ceremonies[id] && !s.ceremonies[id].done;
}

/** The active send ceremony for a group, if one is registered. */
export function selectActiveSend(
  s: CeremoniesStore,
  groupId: string
): CeremonyState | undefined {
  const id = s.activeSendByGroup[groupId];
  return id ? s.ceremonies[id] : undefined;
}
