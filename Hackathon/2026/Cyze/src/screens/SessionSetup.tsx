import { useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  getSettings,
  sidecarStatus,
  startSidecar,
  stopSidecar,
  exportSidecarCert,
  tunnelStatus,
  startTunnel,
  stopTunnel,
  setServerUrl,
  setSessionConfig,
  testServerConnection,
  trustServerCert,
  AppError,
} from "../ipc/commands";

type Role = "coordinator" | "participant";
type Exposure = "direct" | "tunnel" | "nginx";

/** A server whose address is not stable across restarts, so it must never be
 *  remembered as a reusable "last-used server". Today that means a TryCloudflare
 *  quick tunnel: `cloudflared` mints a new random hostname on every run and
 *  deregisters the old one. Mirrors `neterr::is_ephemeral_server` in the core. */
export function isEphemeralServer(url: string): boolean {
  const host = url
    .replace(/^https?:\/\//, "")
    .split("/")[0]
    .split(":")[0]
    .toLowerCase();
  return host.endsWith(".trycloudflare.com");
}

/** Reusable security reminder: the transport (tunnel/proxy/direct) only
 *  provides reachability. FROSTd's own Noise layer authenticates and encrypts
 *  every message end-to-end, so it must never be treated as optional just
 *  because a tunnel or TLS proxy is in front. */
function TransportSecurityNote() {
  return (
    <div className="callout warn" style={{ marginTop: 12 }}>
      <span>
        <strong>Transport is not authentication.</strong> However you expose the
        server — direct, tunnel, or reverse proxy — FROSTd messages stay
        end-to-end authenticated and encrypted by the app's own Noise layer
        (participants are verified by their communication public keys). A tunnel
        or TLS proxy only makes the server reachable; it never replaces that
        application-layer security, so keep participant key verification in place
        regardless of the transport you choose.
      </span>
    </div>
  );
}

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      className="secondary"
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
    >
      {copied ? "Copied!" : label}
    </button>
  );
}

export default function SessionSetup() {
  const settings = useQuery({ queryKey: ["settings"], queryFn: getSettings });
  const savedRole = settings.data?.session_role as Role | null | undefined;
  const configured = !!settings.data?.session_configured;

  const [role, setRole] = useState<Role | null>(null);
  // Seed the selection from the saved profile once settings load.
  const effectiveRole = role ?? savedRole ?? null;

  return (
    <div>
      <h2>Session Configuration</h2>
      {!configured ? (
        <div className="callout" style={{ marginBottom: 12 }}>
          <span>
            <strong>Welcome — let's configure your session.</strong> A FROST
            ceremony coordinates through one <span className="mono">frostd</span>{" "}
            server. Choose your role and how you'll connect below, then save it.
            You can change this any time from <em>Zcash → Session Configuration</em>.
          </span>
        </div>
      ) : (
        <p className="dim" style={{ marginTop: 0 }}>
          Your saved profile is{" "}
          <strong>{savedRole === "participant" ? "Participant" : "Coordinator"}</strong>
          . Update it below and save to change it.
        </p>
      )}

      <div className="row" style={{ gap: 12, marginTop: 16, flexWrap: "wrap" }}>
        <RoleCard
          active={effectiveRole === "coordinator"}
          onClick={() => setRole("coordinator")}
          title="I'm coordinating"
          desc="Host the server and share how to reach it. You drive the DKG / signing."
        />
        <RoleCard
          active={effectiveRole === "participant"}
          onClick={() => setRole("participant")}
          title="I'm joining"
          desc="Connect to a coordinator's server using the address they gave you."
        />
      </div>

      {effectiveRole === "coordinator" && (
        <CoordinatorPath savedExposure={settings.data?.coordinator_exposure ?? null} />
      )}
      {effectiveRole === "participant" && <ParticipantPath />}
    </div>
  );
}

function RoleCard({
  active,
  onClick,
  title,
  desc,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  desc: string;
}) {
  return (
    <button
      onClick={onClick}
      className="card"
      style={{
        flex: "1 1 260px",
        textAlign: "left",
        cursor: "pointer",
        border: active ? "1px solid var(--accent)" : "1px solid var(--border)",
        background: active ? "var(--bg-elevated)" : "var(--bg-card)",
      }}
    >
      <div style={{ fontWeight: 600, color: active ? "var(--accent)" : undefined }}>
        {title}
      </div>
      <div className="dim" style={{ fontSize: 13, marginTop: 6 }}>
        {desc}
      </div>
    </button>
  );
}

/* ── Coordinator ─────────────────────────────────────────────────────────── */

function CoordinatorPath({ savedExposure }: { savedExposure: string | null }) {
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);
  const [exposure, setExposure] = useState<Exposure>(
    (savedExposure as Exposure) ?? "direct"
  );
  const [cert, setCert] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const saveConfig = useMutation({
    mutationFn: () => setSessionConfig("coordinator", exposure),
    onSuccess: () => {
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (e) => setError((e as unknown as AppError).message),
  });

  const sidecar = useQuery({ queryKey: ["sidecar"], queryFn: sidecarStatus });
  const tunnel = useQuery({ queryKey: ["tunnel"], queryFn: tunnelStatus });

  const start = useMutation({
    // Always loopback: remote signers come in over the tunnel/proxy, not the LAN.
    mutationFn: () => startSidecar(null, false),
    onSuccess: () => {
      setError(null);
      queryClient.invalidateQueries({ queryKey: ["sidecar"] });
    },
    onError: (e) => setError((e as unknown as AppError).message),
  });
  const stop = useMutation({
    mutationFn: stopSidecar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sidecar"] });
      queryClient.invalidateQueries({ queryKey: ["tunnel"] });
    },
  });
  const openTunnel = useMutation({
    mutationFn: startTunnel,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tunnel"] }),
    onError: (e) => setError((e as unknown as AppError).message),
  });
  const closeTunnel = useMutation({
    mutationFn: stopTunnel,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tunnel"] }),
  });

  const running = sidecar.data?.running;
  const port = sidecar.data?.port ?? 2744;

  return (
    <div className="card" style={{ marginTop: 18 }}>
      <h3 style={{ marginTop: 0 }}>Step 1 — Start the embedded server</h3>
      {error && <div className="error">{error}</div>}

      {running ? (
        <p>
          <span className="badge green">running</span>{" "}
          <span className="dim">{sidecar.data?.url}</span>
        </p>
      ) : (
        <>
          {/* The server always binds loopback. Cyze coordinates *remote* signers,
              who reach it through a tunnel or reverse proxy rather than over the
              LAN, so exposing 0.0.0.0 bought almost nothing and widened the
              attack surface for anyone who ticked it without needing it. */}
          <p className="dim" style={{ fontSize: 12, marginTop: 0 }}>
            The server listens on loopback only. Remote participants reach it
            through the tunnel or reverse proxy you configure below.
          </p>
          <button onClick={() => start.mutate()} disabled={start.isPending}>
            {start.isPending ? "Starting…" : "Start server"}
          </button>
        </>
      )}

      {running && (
        <div className="row" style={{ gap: 8, marginTop: 8 }}>
          <button className="secondary" onClick={() => stop.mutate()}>
            Stop server
          </button>
        </div>
      )}

      <h3 style={{ marginTop: 24 }}>Step 2 — Choose how participants reach it</h3>
      <div className="row" style={{ gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
        <ExposureTab active={exposure === "direct"} onClick={() => setExposure("direct")} label="Direct URL / IP" />
        <ExposureTab active={exposure === "tunnel"} onClick={() => setExposure("tunnel")} label="Cloudflare Tunnel" />
        <ExposureTab active={exposure === "nginx"} onClick={() => setExposure("nginx")} label="NGINX reverse proxy" />
      </div>

      {exposure === "direct" &&
        (running ? (
          <DirectExposure
            sidecarUrl={sidecar.data?.url ?? null}
            lanAddresses={sidecar.data?.lan_addresses ?? []}
            port={port}
            fingerprint={sidecar.data?.cert_fingerprint ?? null}
            cert={cert}
            onExportCert={async () => setCert(await exportSidecarCert())}
          />
        ) : (
          <p className="dim">
            Start the server (Step 1) to see the URL, fingerprint, and certificate
            to share with participants.
          </p>
        ))}

      {exposure === "tunnel" &&
        (running ? (
          <TunnelExposure
            running={tunnel.data?.running ?? false}
            publicUrl={tunnel.data?.public_url ?? null}
            onOpen={() => openTunnel.mutate()}
            onClose={() => closeTunnel.mutate()}
            pending={openTunnel.isPending}
          />
        ) : (
          <p className="dim">
            Start the server (Step 1), then open the public tunnel here.
          </p>
        ))}

      {exposure === "nginx" && <NginxExposure port={port} />}

      <TransportSecurityNote />

      <div
        style={{
          marginTop: 18,
          borderTop: "1px solid var(--border)",
          paddingTop: 14,
        }}
      >
        <button onClick={() => saveConfig.mutate()} disabled={saveConfig.isPending}>
          {saveConfig.isPending ? "Saving…" : "Save this configuration"}
        </button>
        {saved && (
          <span className="ok" style={{ marginLeft: 10 }}>
            Saved ✓
          </span>
        )}
        <p className="dim" style={{ fontSize: 12, marginTop: 6 }}>
          Saves your <strong>Coordinator</strong> profile and the{" "}
          <strong>{exposure}</strong> method so they're reused on the next launch.
        </p>
      </div>
    </div>
  );
}

function ExposureTab({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "none",
        border: "none",
        borderBottom: active ? "2px solid var(--accent)" : "2px solid transparent",
        color: active ? "var(--accent)" : "inherit",
        padding: "6px 12px",
        cursor: "pointer",
        fontWeight: active ? 600 : 400,
      }}
    >
      {label}
    </button>
  );
}

function DirectExposure({
  sidecarUrl,
  lanAddresses,
  port,
  fingerprint,
  cert,
  onExportCert,
}: {
  sidecarUrl: string | null;
  lanAddresses: string[];
  port: number;
  fingerprint: string | null;
  cert: string | null;
  onExportCert: () => void;
}) {
  return (
    <div>
      <p className="dim" style={{ marginTop: 0 }}>
        Give participants the server URL, the certificate fingerprint (to verify),
        and the certificate itself (it's self-signed, so they must trust it once).
      </p>

      {lanAddresses.length === 0 && (
        <div className="callout warn">
          <span>
            The server is bound to loopback, so it is reachable only at{" "}
            <span className="mono">127.0.0.1:{port}</span> on this machine. Remote
            participants cannot reach this address — use the{" "}
            <strong>Cloudflare Tunnel</strong> or <strong>NGINX</strong> path to
            expose it.
          </span>
        </div>
      )}

      <label>Server URL</label>
      <div className="mono">{sidecarUrl ?? `https://127.0.0.1:${port}`}</div>

      {lanAddresses.length > 0 && (
        <>
          <label style={{ marginTop: 8 }}>LAN addresses participants can use</label>
          {lanAddresses.map((ip) => (
            <div className="mono" key={ip}>
              https://{ip}:{port}
            </div>
          ))}
        </>
      )}

      {fingerprint && (
        <>
          <label style={{ marginTop: 8 }}>Certificate fingerprint (SHA-256)</label>
          <div className="mono">{fingerprint}</div>
          <CopyButton text={fingerprint} label="Copy fingerprint" />
        </>
      )}

      <div style={{ marginTop: 12 }}>
        <button className="secondary" onClick={onExportCert}>
          Export certificate (PEM)
        </button>
      </div>
      {cert && (
        <>
          <label style={{ marginTop: 8 }}>Certificate — share with participants</label>
          <textarea rows={6} readOnly value={cert} style={{ width: "100%" }} />
          <CopyButton text={cert} label="Copy certificate" />
        </>
      )}
    </div>
  );
}

function TunnelExposure({
  running,
  publicUrl,
  onOpen,
  onClose,
  pending,
}: {
  running: boolean;
  publicUrl: string | null;
  onOpen: () => void;
  onClose: () => void;
  pending: boolean;
}) {
  return (
    <div>
      <p className="dim" style={{ marginTop: 0 }}>
        Auto-provisions a public <span className="mono">*.trycloudflare.com</span>{" "}
        URL that reaches this server through NAT with no router setup. Cloudflare
        terminates public TLS with a trusted certificate, so participants connect
        with no cert-trust step.
      </p>
      {running && publicUrl ? (
        <>
          <div>
            <span className="badge green">tunnel up</span>
          </div>
          <label style={{ marginTop: 8 }}>Public URL — share with participants</label>
          <div className="mono">{publicUrl}</div>
          <div className="row" style={{ gap: 8, marginTop: 8 }}>
            <CopyButton text={publicUrl} label="Copy URL" />
            <button className="secondary" onClick={onClose}>
              Close tunnel
            </button>
          </div>
          <div className="callout warn" style={{ marginTop: 10 }}>
            <span>
              While the tunnel is open, the server is reachable from the public
              internet. Close it when the ceremony is done.
            </span>
          </div>
        </>
      ) : (
        <button onClick={onOpen} disabled={pending}>
          {pending ? "Opening tunnel…" : "Open public tunnel"}
        </button>
      )}
    </div>
  );
}

function NginxExposure({ port }: { port: number }) {
  const conf = useMemo(
    () =>
      `# Public HTTPS reverse proxy for the embedded FROSTd server.
# nginx terminates TLS for your domain and forwards to the loopback FROSTd.
# FROSTd's Noise layer still authenticates & encrypts every message end-to-end,
# so this proxy only provides reachability + public TLS.
server {
    listen 443 ssl;
    http2 on;
    server_name frost.example.com;              # <-- your domain

    ssl_certificate     /etc/letsencrypt/live/frost.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/frost.example.com/privkey.pem;

    location / {
        proxy_pass https://127.0.0.1:${port};   # embedded FROSTd (self-signed TLS)
        proxy_ssl_verify off;                    # upstream cert is self-signed
        proxy_set_header Host $host;
        proxy_http_version 1.1;
        proxy_read_timeout 3600s;                # signing sessions are long-lived
        proxy_send_timeout 3600s;
    }
}`,
    [port]
  );

  return (
    <div>
      <p className="dim" style={{ marginTop: 0 }}>
        Front the loopback server with your own NGINX + domain + TLS certificate.
        Keep the server bound to loopback (Step 1 unchecked) and run NGINX on the
        same host. Participants connect to your domain with system-trusted TLS —
        no cert-trust step.
      </p>
      <ol className="dim" style={{ fontSize: 13, paddingLeft: 18 }}>
        <li>Point a domain's DNS at this host.</li>
        <li>Obtain a TLS certificate (e.g. Let's Encrypt / certbot).</li>
        <li>Drop the config below into <span className="mono">/etc/nginx/sites-enabled/</span> and reload NGINX.</li>
        <li>Share <span className="mono">https://your-domain</span> with participants.</li>
      </ol>
      <label>nginx site config</label>
      <textarea rows={16} readOnly value={conf} style={{ width: "100%", fontFamily: "var(--mono)", fontSize: 12 }} />
      <CopyButton text={conf} label="Copy config" />
    </div>
  );
}

/* ── Participant ─────────────────────────────────────────────────────────── */

function ParticipantPath() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const settings = useQuery({ queryKey: ["settings"], queryFn: getSettings });
  const savedUrl = settings.data?.server_url ?? "";

  // There is only a manual URL field — no "reuse last server" shortcut. In
  // practice the coordinator exposes the server through a Cloudflare tunnel,
  // whose hostname is regenerated on every restart, so the previously-saved URL
  // is almost always dead and reusing it just connects to nothing. A stable
  // server (DNS or a fixed IP) can still be saved: pre-fill the field with it so
  // it is one keystroke to reuse, but a disposable tunnel URL is not pre-filled.
  const [manualUrl, setManualUrl] = useState(
    isEphemeralServer(savedUrl) ? "" : savedUrl
  );
  const [certPem, setCertPem] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const url = manualUrl.trim();

  const test = useMutation({
    mutationFn: () => testServerConnection(url),
    onSuccess: (r) => {
      if (r.ok) {
        setError(null);
        setStatus("Reachable ✓");
      } else {
        setStatus(null);
        setError(r.error ?? "Could not reach the server.");
      }
    },
    onError: (e) => setError((e as unknown as AppError).message),
  });

  const trust = useMutation({
    mutationFn: () => trustServerCert(url, certPem.trim()),
    onSuccess: (fp) => {
      setError(null);
      setStatus(`Certificate trusted (fingerprint ${fp.slice(0, 16)}…)`);
    },
    onError: (e) => setError((e as unknown as AppError).message),
  });

  const save = useMutation({
    mutationFn: async () => {
      await setServerUrl(url);
      // Persist the Participant profile so it's remembered and the first-run
      // prompt is cleared.
      await setSessionConfig("participant", null);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      setStatus("Saved. You can now join sessions from your Inbox.");
    },
    onError: (e) => setError((e as unknown as AppError).message),
  });

  return (
    <div className="card" style={{ marginTop: 18 }}>
      <h3 style={{ marginTop: 0 }}>Connect to the coordinator's server</h3>
      {error && <div className="error">{error}</div>}
      {status && <div className="callout"><span>{status}</span></div>}

      <label>Server URL</label>
      <input
        value={manualUrl}
        onChange={(e) => setManualUrl(e.target.value)}
        placeholder="https://…"
        style={{ width: "100%" }}
      />
      <div className="dim" style={{ fontSize: 12, marginTop: 6, lineHeight: 1.7 }}>
        Paste the address the coordinator is sharing right now. It looks like one
        of:
        <br />
        • <span className="mono">https://frost.example.com</span>{" "}
        &nbsp;— a domain / NGINX server
        <br />
        • <span className="mono">https://203.0.113.7:2744</span>{" "}
        &nbsp;— a direct IP and port
        <br />
        • <span className="mono">https://long-random-words.trycloudflare.com</span>{" "}
        &nbsp;— a Cloudflare tunnel
        <br />
        A Cloudflare tunnel URL is <strong>disposable</strong>: the coordinator
        gets a new one each time they restart it, so always use the latest.
      </div>

      <div className="row" style={{ gap: 8, marginTop: 12, flexWrap: "wrap" }}>
        <button className="secondary" onClick={() => test.mutate()} disabled={!url || test.isPending}>
          {test.isPending ? "Testing…" : "Test connection"}
        </button>
        <button onClick={() => save.mutate()} disabled={!url || save.isPending}>
          {save.isPending ? "Saving…" : "Save & use this server"}
        </button>
      </div>

      <details style={{ marginTop: 16 }}>
        <summary className="dim" style={{ cursor: "pointer" }}>
          Self-signed server? Trust its certificate
        </summary>
        <p className="dim" style={{ fontSize: 13 }}>
          Only needed for a Direct-URL coordinator (not for a Cloudflare tunnel or
          an NGINX/domain server, which use publicly trusted TLS). Paste the
          certificate PEM the coordinator shared and confirm the fingerprint with
          them out-of-band before trusting it.
        </p>
        <textarea
          rows={6}
          value={certPem}
          onChange={(e) => setCertPem(e.target.value)}
          placeholder="-----BEGIN CERTIFICATE-----"
          style={{ width: "100%" }}
        />
        <button
          className="secondary"
          onClick={() => trust.mutate()}
          disabled={!url || !certPem.trim() || trust.isPending}
        >
          {trust.isPending ? "Trusting…" : "Trust this certificate"}
        </button>
      </details>

      <div className="callout" style={{ marginTop: 16 }}>
        <span>
          Once connected, incoming DKG and signing requests appear in your{" "}
          <button
            className="link"
            style={{ all: "unset", cursor: "pointer", color: "var(--accent)" }}
            onClick={() => navigate("/inbox")}
          >
            Inbox
          </button>
          .
        </span>
      </div>
    </div>
  );
}
