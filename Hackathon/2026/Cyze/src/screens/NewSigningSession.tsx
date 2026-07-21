import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
  cancelCeremony,
  createSigningSession,
  getIdentity,
  listContacts,
  listGroups,
  AppError,
} from "../ipc/commands";
import { resolveParticipant } from "../lib/participants";
import { useCeremonies } from "../stores/ceremonies";

const PHASES: Record<string, string> = {
  connecting: "Connecting to server",
  connected: "Connection established",
  session_created: "Session created — waiting for participants",
  waiting_for_commitments: "Waiting for participant commitments",
  signing_package_sent: "Signing package sent",
  waiting_for_shares: "Waiting for signature shares",
  aggregating: "Aggregating signature",
};

export default function NewSigningSession() {
  const groups = useQuery({ queryKey: ["groups"], queryFn: listGroups });
  const contacts = useQuery({ queryKey: ["contacts"], queryFn: listContacts });
  const identity = useQuery({ queryKey: ["identity"], queryFn: getIdentity });

  const [groupId, setGroupId] = useState("");
  const [messageMode, setMessageMode] = useState<"text" | "hex">("text");
  const [message, setMessage] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Active coordinator session lives in the global store (listeners are
  // mounted globally in CeremonyListener), so it survives leaving the screen.
  const { ceremonies, activeSigningId, setActiveSigning } = useCeremonies();
  const ceremonyId = activeSigningId;

  const group = groups.data?.find((g) => g.id === groupId);
  const ceremony = ceremonyId ? ceremonies[ceremonyId] : undefined;

  const participantsWithNames = useMemo(() => {
    if (!group) return [];
    return Object.values(group.participants).map((pubkey) => {
      const r = resolveParticipant(pubkey, identity.data, contacts.data);
      return { pubkey, name: r.label, shortPubkey: r.shortPubkey };
    });
  }, [group, contacts.data, identity.data]);

  const messageHex = useMemo(() => {
    if (messageMode === "hex") return message.trim().toLowerCase();
    return [...new TextEncoder().encode(message)]
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }, [message, messageMode]);

  const hexValid = /^([0-9a-f]{2})+$/.test(messageHex);

  const begin = async () => {
    setError(null);
    try {
      const id = await createSigningSession({
        group_id: groupId,
        message_hex: messageHex,
        signers: [...selected],
        server_url: null,
      });
      setActiveSigning(id);
    } catch (e) {
      setError((e as AppError).message ?? String(e));
    }
  };

  if (ceremony) {
    return (
      <div>
        <h2>Signing session</h2>
        <div className="card">
          {!ceremony.done && (
            <>
              <p>
                <span className="badge blue">
                  {PHASES[ceremony.phase] ?? ceremony.phase}
                </span>
              </p>
              {ceremony.detail?.session_id != null && (
                <>
                  <label>Session ID (share with participants if needed)</label>
                  <div className="mono">{String(ceremony.detail.session_id)}</div>
                </>
              )}
              <p className="dim">
                Participants will see this session in their inbox and must
                approve the message before their share is produced.
              </p>
              <button
                className="danger"
                onClick={async () => {
                  if (ceremonyId) await cancelCeremony(ceremonyId);
                  setActiveSigning(null);
                }}
              >
                Cancel session
              </button>
            </>
          )}
          {ceremony.done && !ceremony.failed && ceremony.signatureHex && (
            <>
              <p className="ok">Signature complete and verified.</p>
              <label>Signature (hex)</label>
              <div className="mono">{ceremony.signatureHex}</div>
              <div className="row" style={{ marginTop: 10 }}>
                <button
                  onClick={async () => {
                    await navigator.clipboard.writeText(ceremony.signatureHex!);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1500);
                  }}
                >
                  {copied ? "Copied!" : "Copy signature"}
                </button>
                <button className="secondary" onClick={() => setActiveSigning(null)}>
                  New session
                </button>
              </div>
            </>
          )}
          {ceremony.failed && (
            <>
              <p className="error">{ceremony.error}</p>
              <button className="secondary" onClick={() => setActiveSigning(null)}>
                Back
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2>New signing session</h2>
      <div className="card">
        <label>Group</label>
        <select value={groupId} onChange={(e) => { setGroupId(e.target.value); setSelected(new Set()); }}>
          <option value="">Select a group…</option>
          {groups.data?.map((g) => (
            <option key={g.id} value={g.id}>
              {g.description || g.id.slice(0, 16)} ({g.threshold}-of-{g.num_participants},{" "}
              {g.ciphersuite})
            </option>
          ))}
        </select>
        {!groups.data?.length && (
          <p className="dim">
            No groups — run a <Link to="/dkg">DKG ceremony</Link> first.
          </p>
        )}

        {group && (
          <>
            <label>
              Signers (need at least {group.threshold}; you coordinate and do
              not need to be one of them)
            </label>
            {participantsWithNames.map((p) => (
              <div key={p.pubkey} className="row" style={{ marginBottom: 6 }}>
                <input
                  type="checkbox"
                  style={{ width: "auto" }}
                  checked={selected.has(p.pubkey)}
                  onChange={(e) => {
                    const next = new Set(selected);
                    if (e.target.checked) next.add(p.pubkey);
                    else next.delete(p.pubkey);
                    setSelected(next);
                  }}
                />
                <span>{p.name}</span>
                <span className="dim code-inline">{p.shortPubkey}</span>
              </div>
            ))}

            <label style={{ marginTop: 12 }}>Message</label>
            <div className="row" style={{ marginBottom: 8 }}>
              <button
                className={messageMode === "text" ? "" : "secondary"}
                onClick={() => setMessageMode("text")}
              >
                Text
              </button>
              <button
                className={messageMode === "hex" ? "" : "secondary"}
                onClick={() => setMessageMode("hex")}
              >
                Hex
              </button>
            </div>
            <textarea
              rows={3}
              placeholder={messageMode === "text" ? "Message to sign" : "deadbeef…"}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            {message && !hexValid && (
              <div className="error">Message must be valid hex bytes</div>
            )}

            {error && <div className="error">{error}</div>}
            <button
              disabled={!groupId || selected.size < group.threshold || !hexValid}
              onClick={begin}
            >
              Start signing session
            </button>
          </>
        )}
      </div>
    </div>
  );
}
