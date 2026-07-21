import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
  cancelCeremony,
  getSettings,
  listContacts,
  sidecarStatus,
  startDkg,
  AppError,
  Ciphersuite,
} from "../ipc/commands";
import { useCeremonies } from "../stores/ceremonies";

const DKG_PHASES: Record<string, string> = {
  connecting: "Connecting to server",
  connected: "Connection established",
  session_ready: "Session established",
  round1: "Round 1: exchanging commitments",
  round1_broadcast: "Round 1: verifying echo broadcast",
  round2: "Round 2: exchanging key shares",
  finalizing: "Computing final key share",
  complete: "Group created",
  failed: "Failed",
};

export default function DkgWizard() {
  const contacts = useQuery({ queryKey: ["contacts"], queryFn: listContacts });
  const settings = useQuery({ queryKey: ["settings"], queryFn: getSettings });
  const sidecar = useQuery({ queryKey: ["sidecar"], queryFn: sidecarStatus });

  const [role, setRole] = useState<"create" | "join">("create");
  const [suite, setSuite] = useState<Ciphersuite>("redpallas");
  const [description, setDescription] = useState("");
  const [threshold, setThreshold] = useState(2);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [pickerOpen, setPickerOpen] = useState(false);
  const [serverUrl, setServerUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const toggleSigner = (pubkey: string, on: boolean) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (on) next.add(pubkey);
      else next.delete(pubkey);
      return next;
    });
  };
  const contactLabel = (pubkey: string) => {
    const c = contacts.data?.find((x) => x.pubkey === pubkey);
    return c ? c.alias || c.name : `${pubkey.slice(0, 10)}…`;
  };

  // The active ceremony id lives in the global store, not local state, so it
  // survives navigating away and back (and even a reload) while the backend
  // ceremony keeps running. Listeners are mounted globally in CeremonyListener.
  const { ceremonies, activeDkgId, setActiveDkg } = useCeremonies();
  const ceremonyId = activeDkgId;
  const ceremony = ceremonyId ? ceremonies[ceremonyId] : undefined;

  // If the last ceremony already finished, reset to the form when the user
  // comes back to this page wanting to start a new DKG. (A still-running
  // ceremony stays attached.)
  useEffect(() => {
    if (activeDkgId && ceremonies[activeDkgId]?.done) setActiveDkg(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const effectiveServer = useMemo(() => {
    if (serverUrl !== null) return serverUrl;
    if (sidecar.data?.running && sidecar.data.port) return `127.0.0.1:${sidecar.data.port}`;
    return settings.data?.server_url ?? "";
  }, [serverUrl, sidecar.data, settings.data]);

  const totalParticipants = selected.size + 1; // others + self

  const begin = async () => {
    setError(null);
    try {
      // The name is what identifies this group everywhere afterwards. A blank one
      // leaves only the group's hex verifying key to show, which is unreadable —
      // so always fall back to something a person can recognise. The joiner's
      // threshold/participant inputs describe the ceremony they are joining, not
      // a group they defined, so don't spell those into their fallback.
      const suiteName = suite === "redpallas" ? "RedPallas" : "Ed25519";
      const groupName =
        description.trim() ||
        (role === "create"
          ? `${suiteName} ${threshold}-of-${totalParticipants}`
          : `${suiteName} group`);
      const id = await startDkg({
        suite,
        description: groupName,
        threshold,
        participants: role === "create" ? [...selected] : [],
        server_url: effectiveServer || null,
        session_id: null,
      });
      setActiveDkg(id, groupName);
    } catch (e) {
      setError((e as AppError).message ?? String(e));
    }
  };

  if (ceremony) {
    const phases = ["connecting", "session_ready", "round1", "round1_broadcast", "round2", "finalizing"];
    const currentIdx = phases.indexOf(ceremony.phase);
    return (
      <div>
        <h2>
          DKG ceremony
          {ceremony.label && (
            <span className="dim" style={{ fontWeight: 400, fontSize: 16, marginLeft: 10 }}>
              — {ceremony.label}
            </span>
          )}
        </h2>
        <div className="card">
          <div className="stepper">
            {phases.map((p, i) => (
              <div
                key={p}
                className={`step ${
                  ceremony.failed && i === currentIdx
                    ? "failed"
                    : ceremony.done || i < currentIdx
                      ? "done"
                      : i === currentIdx
                        ? "active"
                        : ""
                }`}
              >
                <div className="dot" />
                {DKG_PHASES[p]}
              </div>
            ))}
          </div>
          {ceremony.done && !ceremony.failed && (
            <>
              <p className="ok">Group created successfully.</p>
              {ceremony.groupId && (
                <>
                  <label>Group public verifying key</label>
                  <div className="mono">{ceremony.groupId}</div>
                  <Link to={`/groups/${ceremony.groupId}`}>
                    <button style={{ marginTop: 8 }}>
                      Open group — keys &amp; addresses
                    </button>
                  </Link>
                </>
              )}
            </>
          )}
          {ceremony.failed && <p className="error">{ceremony.error}</p>}
          {!ceremony.done && (
            <>
              <p className="dim">
                This ceremony runs in the background — you can leave this screen
                and come back; it stays attached until it finishes.
              </p>
              <div className="row">
                <button
                  className="danger"
                  onClick={async () => {
                    if (ceremonyId) await cancelCeremony(ceremonyId);
                    setActiveDkg(null);
                  }}
                >
                  Cancel ceremony
                </button>
              </div>
            </>
          )}
          {ceremony.done && (
            <button
              className="secondary"
              style={{ marginLeft: 8 }}
              onClick={() => setActiveDkg(null)}
            >
              Start another DKG
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2>New DKG ceremony</h2>

      <div className="card">
        <label>Role</label>
        <div className="row" style={{ marginBottom: 12 }}>
          <button
            className={role === "create" ? "" : "secondary"}
            onClick={() => setRole("create")}
          >
            Create a group (initiator)
          </button>
          <button
            className={role === "join" ? "" : "secondary"}
            onClick={() => setRole("join")}
          >
            Join a ceremony
          </button>
        </div>

        {/* Both roles name the group. A joiner who can't name it ends up with a
            group labelled by its hex verifying key everywhere in the app. The
            name is local to each device (the DKG protocol carries no metadata,
            so it cannot travel from the coordinator), which is exactly why the
            joiner should be told what to type. */}
        <label>Group name</label>
        <input
          type="text"
          placeholder={
            role === "create" ? "e.g. Treasury 2-of-3" : "e.g. Treasury 2-of-3"
          }
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <p className="dim" style={{ marginTop: -4, marginBottom: 12 }}>
          {role === "create"
            ? "How this group appears on your device. Tell the other participants what you called it so everyone refers to it the same way."
            : "How this group appears on your device. Ask the coordinator what they named it and use the same name. Leave it blank and it falls back to a generic label."}
        </p>

        {role === "create" ? (
          <>
            <label>Ciphersuite</label>
            <select value={suite} onChange={(e) => setSuite(e.target.value as Ciphersuite)}>
              <option value="redpallas">
                RedPallas — Zcash Orchard spend authority (Pallas, BLAKE2b-512)
              </option>
              <option value="ed25519">
                Ed25519 — general-purpose Schnorr signatures (SHA-512)
              </option>
            </select>
            <p className="dim" style={{ marginTop: -4, marginBottom: 12 }}>
              These are the two ciphersuites the FROST tooling supports, so
              groups stay compatible with the <span className="code-inline">frost-client</span>{" "}
              CLI. Pick RedPallas for Zcash; Ed25519 for general signing. All
              participants must choose the same one.
            </p>

            <label>Participants (besides you)</label>
            {contacts.data?.length ? (
              <>
                <div className="multiselect">
                  <button
                    type="button"
                    className="secondary multiselect-toggle"
                    onClick={() => setPickerOpen((o) => !o)}
                  >
                    <span>
                      {selected.size
                        ? `${selected.size} participant${selected.size === 1 ? "" : "s"} selected`
                        : "Select participants…"}
                    </span>
                    <span className="dim">{pickerOpen ? "▾" : "▸"}</span>
                  </button>
                  {pickerOpen && (
                    <div className="multiselect-panel">
                      {contacts.data.map((c) => (
                        <label key={c.pubkey} className="multiselect-option">
                          <input
                            type="checkbox"
                            checked={selected.has(c.pubkey)}
                            onChange={(e) => toggleSigner(c.pubkey, e.target.checked)}
                          />
                          <span>{c.alias || c.name}</span>
                          {c.alias && <span className="dim"> ({c.name})</span>}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
                {selected.size > 0 && (
                  <div className="chips">
                    {[...selected].map((pk) => (
                      <span className="chip" key={pk}>
                        {contactLabel(pk)}
                        <button
                          type="button"
                          aria-label="Remove"
                          onClick={() => toggleSigner(pk, false)}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <p className="dim">
                No contacts — <Link to="/contacts">import contacts</Link> first.
              </p>
            )}

            <label style={{ marginTop: 12 }}>
              Threshold ({threshold} of {totalParticipants} must sign)
            </label>
            <input
              type="number"
              min={2}
              max={totalParticipants}
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
            />
          </>
        ) : (
          <>
            <p className="dim">
              You will join the ceremony that an initiator created on the
              server below. Make sure they included your contact as a
              participant, and enter the same threshold they chose — all
              participants must agree on it.
            </p>
            <label>Ciphersuite (must match the initiator)</label>
            <select value={suite} onChange={(e) => setSuite(e.target.value as Ciphersuite)}>
              <option value="redpallas">
                RedPallas — Zcash Orchard spend authority (Pallas, BLAKE2b-512)
              </option>
              <option value="ed25519">
                Ed25519 — general-purpose Schnorr signatures (SHA-512)
              </option>
            </select>
            <label>Threshold (as chosen by the initiator)</label>
            <input
              type="number"
              min={2}
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
            />
          </>
        )}

        <label>Server (host:port)</label>
        {sidecar.data?.running ? (
          <>
            <input
              type="text"
              value={`127.0.0.1:${sidecar.data.port}`}
              disabled
              title="Using your embedded server — manage it on the Server page"
            />
            <p className="dim" style={{ marginTop: -4 }}>
              Using your embedded server. Participants on other machines connect
              via the LAN address or tunnel URL shown on the{" "}
              <Link to="/server">Server</Link> page.
            </p>
          </>
        ) : (
          <input
            type="text"
            value={effectiveServer}
            onChange={(e) => setServerUrl(e.target.value)}
            placeholder="127.0.0.1:2744"
          />
        )}

        {error && <div className="error">{error}</div>}
        <button
          disabled={
            !effectiveServer ||
            threshold < 2 ||
            (role === "create" && (selected.size < 1 || threshold > totalParticipants))
          }
          onClick={begin}
        >
          {role === "create" ? "Start ceremony" : "Join ceremony"}
        </button>
      </div>
    </div>
  );
}
