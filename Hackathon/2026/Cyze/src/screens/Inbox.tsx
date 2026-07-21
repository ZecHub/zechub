import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  joinSigningSession,
  listGroups,
  listPendingSessions,
  respondToSigning,
  AppError,
} from "../ipc/commands";
import { useCeremonies } from "../stores/ceremonies";

/** Signer-side ceremony phases, as a human would say them. */
const SIGNER_PHASES: Record<string, string> = {
  connecting: "Connecting to the coordinator's server",
  connected: "Connection established",
  commitments_sent: "Commitments sent — waiting for the signing package",
  share_sent: "Signature share sent",
};

function hexToUtf8(hex: string): string {
  try {
    const bytes = new Uint8Array(hex.match(/.{2}/g)!.map((b) => parseInt(b, 16)));
    return new TextDecoder("utf-8", { fatal: false }).decode(bytes);
  } catch {
    return "(not valid UTF-8)";
  }
}

/** Transaction context the coordinator attaches to a signing request so the
 *  approver sees what they are signing (mirrors core::events::SigningContext). */
interface SigningContext {
  recipient: string;
  amount_zatoshis: number;
  fee_zatoshis: number;
  memo: string | null;
  is_unshield: boolean;
  network: string;
  /** Shared across every note-signing round of one transaction (#2). */
  plan_id?: string;
  /** 1-based index of the note being signed within the transaction plan. */
  spend_index?: number;
  /** Total notes in this transaction plan. */
  spend_total?: number;
  /** The shared transaction sighash every note in the plan signs. */
  tx_sighash?: string;
}

/** Format zatoshis as a ZEC amount (1 ZEC = 100,000,000 zatoshis). */
function formatZec(zatoshis: number): string {
  return `${(zatoshis / 1e8).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 8,
  })} ZEC`;
}

export default function Inbox() {
  const groups = useQuery({ queryKey: ["groups"], queryFn: listGroups });
  const sessions = useQuery({
    queryKey: ["pending-sessions"],
    queryFn: () => listPendingSessions(null),
    refetchInterval: 10_000,
    retry: false,
  });

  const [joined, setJoined] = useState<Record<string, string>>({}); // session -> ceremony
  const [error, setError] = useState<string | null>(null);

  // Listeners are mounted globally in CeremonyListener; just read the store.
  const { ceremonies } = useCeremonies();

  const join = async (sessionId: string, groupId: string) => {
    setError(null);
    try {
      const ceremonyId = await joinSigningSession({
        group_id: groupId,
        session_id: sessionId,
        server_url: null,
      });
      setJoined((j) => ({ ...j, [sessionId]: ceremonyId }));
    } catch (e) {
      setError((e as AppError).message ?? String(e));
    }
  };

  return (
    <div>
      <h2>Inbox</h2>
      <p className="dim">
        Signing sessions on your configured server where someone else is the
        coordinator. Joining sends your commitments; your signature share is
        only produced after you approve the exact message below.
      </p>
      {sessions.isError && (
        <div className="card">
          <p className="error">
            Could not reach the server — check your server settings.
          </p>
        </div>
      )}
      {error && <div className="error">{error}</div>}

      {sessions.data?.length ? (
        sessions.data.map((s) => {
          const ceremonyId = joined[s.session_id];
          const ceremony = ceremonyId ? ceremonies[ceremonyId] : undefined;
          const awaiting =
            ceremony?.phase === "awaiting_approval"
              ? (ceremony.detail?.message_hex as string | undefined)
              : undefined;
          const txContext =
            ceremony?.phase === "awaiting_approval"
              ? (ceremony.detail?.context as SigningContext | undefined)
              : undefined;
          return (
            <div className="card" key={s.session_id}>
              <div className="row" style={{ justifyContent: "space-between" }}>
                <h3 style={{ margin: 0 }}>
                  Session from {s.coordinator ?? "(unknown contact)"}
                </h3>
                <span className="badge">{s.session_id.slice(0, 8)}…</span>
              </div>

              {!ceremony && (
                <>
                  {s.matching_groups.length ? (
                    s.matching_groups.map((gid) => {
                      const g = groups.data?.find((x) => x.id === gid);
                      return (
                        <div className="row" key={gid} style={{ marginTop: 10 }}>
                          <span className="dim">
                            {g?.description || gid.slice(0, 16)}
                          </span>
                          <button onClick={() => join(s.session_id, gid)}>
                            Join with this group
                          </button>
                        </div>
                      );
                    })
                  ) : (
                    <p className="dim">
                      Coordinator does not match any of your groups.
                    </p>
                  )}
                </>
              )}

              {ceremony && !awaiting && !ceremony.done && (
                <p>
                  <span className="badge blue">
                    {SIGNER_PHASES[ceremony.phase] ?? ceremony.phase}
                  </span>
                </p>
              )}

              {/* Confirm which server we actually reached. A signer is handed a
                  URL (often an opaque tunnel hostname) by the coordinator, so
                  show that the connection is up and to whom — before they
                  approve anything. Sticky, so it stays visible past `connected`. */}
              {ceremony?.server && !ceremony.done && (
                <p className="ok" style={{ marginTop: 4 }}>
                  ✓ Connection established — <span className="mono">{ceremony.server}</span>
                </p>
              )}

              {awaiting && ceremonyId && (
                <div style={{ marginTop: 10 }}>
                  <p className="error" style={{ fontWeight: 600 }}>
                    Review carefully — approving produces your signature share.
                  </p>

                  {txContext?.plan_id &&
                    (txContext.spend_total ?? 1) > 1 && (
                      <div
                        className="card"
                        style={{
                          marginBottom: 10,
                          padding: "8px 12px",
                          background: "var(--bg-elevated)",
                          fontSize: 12,
                        }}
                      >
                        <div>
                          <span className="badge blue">
                            Note {txContext.spend_index} of {txContext.spend_total}
                          </span>{" "}
                          of one transaction
                        </div>
                        <div className="dim" style={{ marginTop: 4 }}>
                          This transaction spends {txContext.spend_total} notes; you
                          will receive one approval request per note. All share
                          transaction plan{" "}
                          <span className="mono">{txContext.plan_id.slice(0, 8)}…</span>{" "}
                          and sign the same transaction — approve all of them, or
                          none.
                        </div>
                      </div>
                    )}

                  {txContext ? (
                    <>
                      <label>You are approving this transaction</label>
                      <table className="kv" style={{ width: "100%", marginTop: 4 }}>
                        <tbody>
                          <tr>
                            <td className="dim">Type</td>
                            <td>
                              {txContext.is_unshield ? (
                                <span className="badge" style={{ color: "#f4b728" }}>
                                  Unshield → transparent (public)
                                </span>
                              ) : (
                                <span className="badge">Shielded send</span>
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td className="dim">Amount</td>
                            <td style={{ fontWeight: 600 }}>
                              {formatZec(txContext.amount_zatoshis)}
                            </td>
                          </tr>
                          <tr>
                            <td className="dim">Fee</td>
                            <td>{formatZec(txContext.fee_zatoshis)}</td>
                          </tr>
                          <tr>
                            <td className="dim">To</td>
                            <td className="mono" style={{ wordBreak: "break-all" }}>
                              {txContext.recipient}
                            </td>
                          </tr>
                          <tr>
                            <td className="dim">Network</td>
                            <td>{txContext.network === "main" ? "Mainnet" : "Testnet"}</td>
                          </tr>
                          {txContext.memo && (
                            <tr>
                              <td className="dim">Memo</td>
                              <td style={{ fontStyle: "italic", wordBreak: "break-word" }}>
                                {txContext.memo}
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                      <p className="dim" style={{ fontSize: 11, marginTop: 6 }}>
                        Details are supplied by the coordinator. Approve only if
                        they match what you agreed to sign.
                      </p>
                    </>
                  ) : (
                    <p className="dim" style={{ fontSize: 12 }}>
                      No transaction details were supplied with this request — you
                      are signing a raw message. Only approve if you trust the
                      coordinator and know what this signs.
                    </p>
                  )}

                  <details style={{ marginTop: 8 }}>
                    <summary className="dim" style={{ cursor: "pointer" }}>
                      Raw message (sighash)
                    </summary>
                    <label style={{ marginTop: 6 }}>Message (hex)</label>
                    <div className="mono" style={{ wordBreak: "break-all" }}>{awaiting}</div>
                    <label style={{ marginTop: 8 }}>Message (as UTF-8)</label>
                    <div className="mono">{hexToUtf8(awaiting)}</div>
                  </details>

                  <div className="row" style={{ marginTop: 12 }}>
                    <button onClick={() => respondToSigning(ceremonyId, true)}>
                      Approve and sign
                    </button>
                    <button
                      className="danger"
                      onClick={() => respondToSigning(ceremonyId, false)}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              )}

              {ceremony?.done && !ceremony.failed && (
                <p className="ok">Share sent — the coordinator completes the signature.</p>
              )}
              {ceremony?.failed && <p className="error">{ceremony.error}</p>}
            </div>
          );
        })
      ) : (
        <div className="card">
          <p className="dim">
            {sessions.isLoading ? "Checking server…" : "No pending sessions."}
          </p>
        </div>
      )}
    </div>
  );
}
