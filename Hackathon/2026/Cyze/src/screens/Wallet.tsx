import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getWalletConfig,
  lightwalletdInfo,
  setWalletConfig,
  AppError,
  LightwalletdInfo,
} from "../ipc/commands";

/** Themed confirmation dialog for switching to mainnet — replaces the plain
 *  browser confirm() so it matches the application's design language. */
function SwitchNetworkModal({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.72)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        className="card"
        style={{
          maxWidth: 420,
          width: "90%",
          margin: 0,
          border: "2px solid var(--danger)",
        }}
      >
        <div
          style={{
            borderBottom: "1px solid var(--border)",
            paddingBottom: 12,
            marginBottom: 16,
          }}
        >
          <div className="dim" style={{ fontSize: 11, marginBottom: 4, letterSpacing: "0.06em" }}>
            CYZE · NETWORK SETTINGS
          </div>
          <strong style={{ fontSize: 16 }}>Switching to Mainnet</strong>
        </div>

        <div
          className="callout warn"
          style={{
            border: "1px solid var(--danger)",
            background: "rgba(239,68,68,0.08)",
            marginBottom: 16,
          }}
        >
          <span>
            Mainnet transactions move <strong>real ZEC</strong> and are{" "}
            <strong>irreversible</strong> once broadcast. Only switch if you are
            ready to handle live funds.
          </span>
        </div>

        <p className="dim" style={{ marginTop: 0, fontSize: 13 }}>
          You can switch back to testnet at any time from this page.
        </p>

        <div className="row" style={{ marginTop: 4 }}>
          <button className="danger" onClick={onConfirm}>
            Switch to Mainnet
          </button>
          <button className="secondary" onClick={onCancel}>
            Keep Testnet
          </button>
        </div>
      </div>
    </div>
  );
}

/** Known public lightwalletd endpoints per network (user can also type their own). */
const PRESETS: Record<string, { label: string; url: string }[]> = {
  test: [
    { label: "zec.rocks — testnet", url: "https://testnet.zec.rocks:443" },
    { label: "tz.ombie.cash", url: "https://tz.ombie.cash:443" },
    { label: "tl.ombie.cash", url: "https://tl.ombie.cash:443" },
  ],
  main: [{ label: "zec.rocks", url: "https://zec.rocks:443" }],
};

export default function Wallet() {
  const queryClient = useQueryClient();
  const config = useQuery({ queryKey: ["wallet-config"], queryFn: getWalletConfig });

  const [network, setNetwork] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [info, setInfo] = useState<LightwalletdInfo | null>(null);
  const [testErr, setTestErr] = useState<string | null>(null);
  const [testing, setTesting] = useState(false);
  const [showMainnetModal, setShowMainnetModal] = useState(false);

  // Mainnet is the default (matches the backend), so the app opens on the network
  // it is actually used on rather than quietly pointing at testnet.
  const net = network ?? config.data?.network ?? "main";
  const effectiveUrl = url ?? config.data?.lightwalletd_url ?? "";

  const save = useMutation({
    mutationFn: () => setWalletConfig(net, url ?? effectiveUrl),
    onSuccess: (cfg) => {
      setNetwork(null);
      setUrl(null);
      setInfo(null);
      queryClient.setQueryData(["wallet-config"], cfg);
      // Each network has its own wallet db, so balances/notes/history/addresses
      // must be re-read after switching — otherwise the previous network's
      // numbers linger. Invalidate by prefix so every group's queries refetch.
      for (const key of [
        "wallet-status",
        "wallet-history",
        "wallet-notes",
        "sync-progress",
        "receive-address",
      ]) {
        queryClient.invalidateQueries({ queryKey: [key] });
      }
    },
  });

  const test = async () => {
    setTesting(true);
    setTestErr(null);
    setInfo(null);
    try {
      setInfo(await lightwalletdInfo(effectiveUrl || null));
    } catch (e) {
      setTestErr((e as AppError).message ?? String(e));
    } finally {
      setTesting(false);
    }
  };

  const savedNet = config.data?.network ?? "main";
  const isMainnet = net === "main";

  return (
    <div>
      <h2>Wallet</h2>

      {/* Persistent mainnet danger banner — shown any time the active network
          is main, both here and as a reminder before the user navigates away. */}
      {savedNet === "main" && (
        <div
          className="callout warn"
          style={{
            border: "2px solid var(--danger)",
            background: "rgba(239,68,68,0.08)",
            marginBottom: 16,
          }}
        >
          <span>
            <strong>⚠ You are on Mainnet.</strong> Transactions here move{" "}
            <strong>real ZEC</strong>. Double-check every recipient address and
            amount before signing. Signed transactions are irreversible once
            broadcast.
          </span>
        </div>
      )}

      <p className="dim">
        Cyze syncs Zcash shielded funds as a light client: it scans compact
        blocks locally with your group's viewing key and talks to a configurable{" "}
        <span className="code-inline">lightwalletd</span> server (no full node
        required). Start on <strong>testnet</strong> to try it with faucet funds;
        switch to mainnet once you're ready.
      </p>

      <div className="card">
        <h3>Network</h3>
        <div className="row" style={{ marginBottom: 14 }}>
          <button
            className={net === "test" ? "" : "secondary"}
            onClick={() => {
              setNetwork("test");
              setUrl("");
            }}
          >
            Testnet
          </button>
          <button
            className={isMainnet ? "danger" : "secondary"}
            onClick={() => {
              if (net !== "main") {
                setShowMainnetModal(true);
              }
            }}
          >
            {isMainnet ? "⚠ Mainnet (active)" : "Mainnet"}
          </button>
          <span className={isMainnet ? "error" : "dim"}>
            {isMainnet
              ? "Real ZEC — transactions are irreversible."
              : "Safe for testing with faucet funds."}
          </span>
        </div>

        <label>lightwalletd endpoint</label>
        <select
          value={
            PRESETS[net]?.some((p) => p.url === effectiveUrl) ? effectiveUrl : "custom"
          }
          onChange={(e) => {
            if (e.target.value !== "custom") setUrl(e.target.value);
          }}
        >
          {PRESETS[net]?.map((p) => (
            <option key={p.url} value={p.url}>
              {p.label} — {p.url}
            </option>
          ))}
          <option value="custom">Custom…</option>
        </select>
        <input
          type="text"
          placeholder={net === "main" ? "https://zec.rocks:443" : "https://testnet.zec.rocks:443"}
          value={effectiveUrl}
          onChange={(e) => setUrl(e.target.value)}
        />
        <p className="dim" style={{ marginTop: -6 }}>
          Pick a server above or type your own (a bare <span className="code-inline">host:443</span>{" "}
          works too).
        </p>

        <div className="row" style={{ marginTop: 4 }}>
          <button onClick={() => save.mutate()} disabled={save.isPending}>
            {save.isPending ? "Saving…" : "Save"}
          </button>
          <button className="secondary" onClick={test} disabled={testing}>
            {testing ? "Connecting…" : "Test connection"}
          </button>
        </div>

        {info && (
          <div className="callout" style={{ marginTop: 14 }}>
            <span>
              Connected to <strong>{info.chain_name}</strong> · block height{" "}
              <strong>{info.block_height.toLocaleString()}</strong>
              {info.estimated_height > info.block_height && (
                <> (chain tip ~{info.estimated_height.toLocaleString()})</>
              )}
              <br />
              <span className="dim">
                {info.vendor} · lightwalletd {info.version} · branch{" "}
                {info.consensus_branch_id || "?"}
              </span>
            </span>
          </div>
        )}
        {info && info.branch_supported === false && (
          <div className="callout warn" style={{ marginTop: 10 }}>
            <span>
              <strong>⚠ Network upgrade mismatch — sends will be rejected.</strong>{" "}
              This node expects consensus branch{" "}
              <span className="mono">{info.consensus_branch_id}</span>, but this
              wallet build produces{" "}
              <span className="mono">{info.wallet_branch_id}</span>. The network
              has activated an upgrade (e.g. Ironwood/NU7) whose branch id isn't
              in this build's Zcash libraries yet. Transactions will FROST-sign
              fine but fail at broadcast with "incorrect consensus branch id"
              until the wallet is updated to Ironwood-aware Zcash crates.
              Receiving and syncing are unaffected.
            </span>
          </div>
        )}
        {testErr && <div className="error" style={{ marginTop: 10 }}>{testErr}</div>}
      </div>

      {showMainnetModal && (
        <SwitchNetworkModal
          onConfirm={() => {
            setShowMainnetModal(false);
            setNetwork("main");
            setUrl("");
          }}
          onCancel={() => setShowMainnetModal(false)}
        />
      )}

    </div>
  );
}
