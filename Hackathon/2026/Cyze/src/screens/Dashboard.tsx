import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import {
  listContacts,
  listGroups,
  sidecarStatus,
  getSettings,
  tunnelStatus,
} from "../ipc/commands";

interface Step {
  title: string;
  done: boolean;
  detail: string;
  to: string;
  cta: string;
}

export default function Dashboard() {
  const [copied, setCopied] = useState<"app" | "cli" | null>(null);
  const [selectedGroupId, setSelectedGroupId] = useState<string>("");
  const navigate = useNavigate();
  const groups = useQuery({ queryKey: ["groups"], queryFn: listGroups });
  const contacts = useQuery({ queryKey: ["contacts"], queryFn: listContacts });
  const sidecar = useQuery({ queryKey: ["sidecar"], queryFn: sidecarStatus });
  const settings = useQuery({ queryKey: ["settings"], queryFn: getSettings });
  const tunnel = useQuery({ queryKey: ["tunnel"], queryFn: tunnelStatus });

  const hasServer =
    !!sidecar.data?.running || !!settings.data?.server_url;
  const hasContacts = (contacts.data?.length ?? 0) > 0;
  const hasGroups = (groups.data?.length ?? 0) > 0;

  const steps: Step[] = [
    {
      title: "Connect to a server",
      done: hasServer,
      detail: sidecar.data?.running
        ? `Embedded server running at ${sidecar.data.url}`
        : settings.data?.server_url
          ? `Using external server ${settings.data.server_url}`
          : "Run the built-in frostd server or point at an external one. This is how participants coordinate.",
      to: "/server",
      cta: hasServer ? "Manage server" : "Set up server",
    },
    {
      title: "Add your contacts",
      done: hasContacts,
      detail: hasContacts
        ? `${contacts.data!.length} contact${contacts.data!.length === 1 ? "" : "s"} saved`
        : "Exchange contact codes with the people you'll form groups with.",
      to: "/contacts",
      cta: hasContacts ? "Manage contacts" : "Add contacts",
    },
    {
      title: "Create or join a group",
      done: hasGroups,
      detail: hasGroups
        ? `${groups.data!.length} group${groups.data!.length === 1 ? "" : "s"} ready to sign`
        : "Run a DKG ceremony to generate a shared threshold key with your contacts.",
      to: "/dkg",
      cta: hasGroups ? "New ceremony" : "Start DKG",
    },
    {
      title: "Send a transaction",
      done: false,
      detail:
        "Build and sign a Zcash transaction with your threshold group, or approve a send from your inbox.",
      to: hasGroups ? "/groups" : "/inbox",
      cta: hasGroups ? "Go to groups" : "Open inbox",
    },
  ];

  // Orchard groups only — those are the ones with wallets.
  const orchardGroups = (groups.data ?? []).filter((g) =>
    g.ciphersuite.includes("Pallas")
  );

  // The user's current position is the first not-yet-done step.
  const currentIdx = steps.findIndex((s) => !s.done);

  return (
    <div>
      <h2>Dashboard</h2>

      <div className="card">
        <h3>Getting started</h3>
        <div className="checklist">
          {steps.map((step, i) => {
            const isCurrent = i === currentIdx;
            return (
              <div
                key={step.title}
                className={`checkstep ${step.done ? "done" : ""} ${
                  isCurrent ? "current" : ""
                }`}
              >
                <div className="checkstep-dot">{step.done ? "✓" : i + 1}</div>
                <div className="checkstep-body">
                  <div className="checkstep-title">{step.title}</div>
                  <div className="dim">{step.detail}</div>
                </div>
                <Link to={step.to}>
                  <button className={isCurrent ? "" : "secondary"}>
                    {step.cta}
                  </button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {orchardGroups.length > 0 && (
        <div className="card">
          <h3>Send a Transaction</h3>
          <p className="dim" style={{ marginTop: 0 }}>
            Select a group wallet to build and sign a Zcash transaction with the threshold.
          </p>
          <div className="row" style={{ gap: 8, alignItems: "center" }}>
            <select
              value={selectedGroupId}
              onChange={(e) => setSelectedGroupId(e.target.value)}
              style={{ flex: 1 }}
            >
              <option value="">— choose a group —</option>
              {orchardGroups.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.description || g.id.slice(0, 16) + "…"} ({g.threshold}-of-{g.num_participants})
                </option>
              ))}
            </select>
            <button
              disabled={!selectedGroupId}
              onClick={() => selectedGroupId && navigate(`/groups/${selectedGroupId}/wallet`)}
            >
              Open wallet →
            </button>
          </div>
        </div>
      )}

      <div className="card">
        <h3>Your groups</h3>
        {groups.data?.length ? (
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Threshold</th>
                <th>Ciphersuite</th>
              </tr>
            </thead>
            <tbody>
              {groups.data.map((g) => (
                <tr key={g.id}>
                  <td>{g.description || "(unnamed)"}</td>
                  <td>
                    {g.threshold}-of-{g.num_participants}
                  </td>
                  <td>
                    <span className="badge blue">{g.ciphersuite}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="dim">
            No groups yet. Create one with <Link to="/dkg">a DKG ceremony</Link>.
          </p>
        )}
      </div>

      <div className="card">
        <h3>Server</h3>
        {sidecar.data?.running ? (
          <>
            <p>
              <span className="badge green">embedded frostd running</span>{" "}
              <span className="dim">{sidecar.data.url}</span>
            </p>
            {tunnel.data?.running && tunnel.data.public_url && (
              <div style={{ marginTop: 8 }}>
                <label>Public tunnel — share with participants</label>
                <div className="mono">{tunnel.data.public_url}</div>
                {(() => {
                  const fullUrl = tunnel.data.public_url;
                  const bareHost = fullUrl
                    .replace(/^https?:\/\//, "")
                    .replace(/\/+$/, "");
                  const copy = async (which: "app" | "cli", value: string) => {
                    await navigator.clipboard.writeText(value);
                    setCopied(which);
                    setTimeout(() => setCopied(null), 1500);
                  };
                  return (
                    <div className="row" style={{ marginTop: 8 }}>
                      <button onClick={() => copy("app", fullUrl)}>
                        {copied === "app" ? "Copied!" : "Copy for app users"}
                      </button>
                      <button
                        className="secondary"
                        onClick={() => copy("cli", bareHost)}
                      >
                        {copied === "cli" ? "Copied!" : "Copy for CLI users"}
                      </button>
                    </div>
                  );
                })()}
              </div>
            )}
          </>
        ) : settings.data?.server_url ? (
          <p className="dim">External server: {settings.data.server_url}</p>
        ) : (
          <p className="dim">
            No server configured. Set one up in <Link to="/server">Server</Link>.
          </p>
        )}
      </div>
    </div>
  );
}
