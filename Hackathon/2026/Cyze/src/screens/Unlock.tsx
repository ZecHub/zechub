import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";
import { useKeystore } from "../stores/keystore";
import {
  createKeystore,
  importUpstreamConfig,
  recoverKeystore,
  setUsername,
  unlockKeystore,
  AppError,
} from "../ipc/commands";

type Mode = "unlock" | "create" | "import" | "recover";

/** One-time display of the recovery phrase, with a serious acknowledgement
 *  gate before the user can proceed into the app. */
function RecoveryBackup({
  phrase,
  onContinue,
}: {
  phrase: string;
  onContinue: () => void;
}) {
  const [acknowledged, setAcknowledged] = useState(false);
  const [copied, setCopied] = useState(false);
  const words = phrase.split(/\s+/);

  return (
    <div className="unlock-wrap">
      <div className="card unlock-card wide">
        <h2>Save your recovery code</h2>
        <div className="recovery-alert">
          <strong>This is the only time these words will ever be shown.</strong>{" "}
          They are the <em>only</em> way to regain access if you forget your
          passphrase. Anyone who obtains them can decrypt your keys. We never
          store them and cannot recover them for you.
        </div>
        <p className="dim">
          Write them down on paper or save them in a password manager, in order.
          Do not screenshot them or store them in plain text on this device.
        </p>

        <div className="mnemonic-grid">
          {words.map((w, i) => (
            <div className="mnemonic-word" key={i}>
              <span className="mnemonic-index">{i + 1}</span>
              {w}
            </div>
          ))}
        </div>

        <div className="row" style={{ marginTop: 12 }}>
          <button
            className="secondary"
            onClick={async () => {
              await navigator.clipboard.writeText(phrase);
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            }}
          >
            {copied ? "Copied to clipboard" : "Copy recovery code"}
          </button>
        </div>

        <label className="ack-checkbox">
          <input
            type="checkbox"
            checked={acknowledged}
            onChange={(e) => setAcknowledged(e.target.checked)}
          />
          <span>
            I have guaranteed that I have made a copy of my encryption code, and
            I understand it cannot be recovered if lost.
          </span>
        </label>

        <button disabled={!acknowledged} onClick={onContinue}>
          I have saved my recovery code — continue
        </button>
      </div>
    </div>
  );
}

export default function Unlock() {
  const { exists, loaded, refresh, setUnlocked } = useKeystore();
  const [mode, setMode] = useState<Mode | null>(null);
  const [passphrase, setPassphrase] = useState("");
  const [confirm, setConfirm] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [importPath, setImportPath] = useState("");
  const [recoveryInput, setRecoveryInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [pendingPhrase, setPendingPhrase] = useState<string | null>(null);
  const navigate = useNavigate();

  if (!loaded) return null;
  const effectiveMode: Mode = mode ?? (exists ? "unlock" : "create");

  const enter = async () => {
    setUnlocked(true);
    await refresh();
    navigate("/");
  };

  // After create/import, hold here until the recovery code is acknowledged.
  if (pendingPhrase) {
    return <RecoveryBackup phrase={pendingPhrase} onContinue={enter} />;
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const settingNewPass =
      effectiveMode === "create" ||
      effectiveMode === "import" ||
      effectiveMode === "recover";
    if (settingNewPass && passphrase !== confirm) {
      setError("Passphrases do not match");
      return;
    }
    if (settingNewPass && passphrase.length < 8) {
      setError("Use at least 8 characters");
      return;
    }
    setBusy(true);
    try {
      if (effectiveMode === "unlock") {
        await unlockKeystore(passphrase);
        await enter();
      } else if (effectiveMode === "recover") {
        await recoverKeystore(recoveryInput.trim(), passphrase);
        await enter();
      } else if (effectiveMode === "create") {
        const phrase = await createKeystore(passphrase);
        if (displayName.trim()) await setUsername(displayName.trim());
        setPendingPhrase(phrase); // show the backup gate before entering
      } else {
        const phrase = await importUpstreamConfig(
          importPath.trim() || null,
          passphrase
        );
        if (displayName.trim()) await setUsername(displayName.trim());
        setPendingPhrase(phrase);
      }
    } catch (err) {
      const e = err as AppError;
      setError(e.message ?? String(err));
    } finally {
      setBusy(false);
    }
  };

  const title =
    effectiveMode === "unlock"
      ? "Unlock keystore"
      : effectiveMode === "create"
        ? "Create keystore"
        : effectiveMode === "recover"
          ? "Recover with your code"
          : "Import frost-client config";

  return (
    <div className="unlock-wrap">
      <div className="card unlock-card">
        <div className="unlock-brand">
          <Logo markSize={32} showTagline />
        </div>
        <h2>{title}</h2>
        {effectiveMode === "create" && (
          <p className="dim">
            A new communication keypair will be generated and stored in a
            passphrase-encrypted keystore. You'll then be shown a one-time
            recovery code to back up.
          </p>
        )}
        {effectiveMode === "import" && (
          <p className="dim">
            Imports an existing plaintext frost-client credentials.toml (leave
            the path empty for the default location) into an encrypted keystore.
            You'll then be shown a one-time recovery code to back up.
          </p>
        )}
        {effectiveMode === "recover" && (
          <p className="dim">
            Enter your 12-word recovery code and choose a new passphrase. This
            works only if you saved your recovery code when you set up the app.
          </p>
        )}
        <form onSubmit={submit}>
          {effectiveMode === "import" && (
            <>
              <label>Path to credentials.toml (optional)</label>
              <input
                type="text"
                placeholder="~/.config/frost/credentials.toml"
                value={importPath}
                onChange={(e) => setImportPath(e.target.value)}
              />
            </>
          )}
          {effectiveMode === "recover" && (
            <>
              <label>Recovery code (12 words)</label>
              <textarea
                rows={3}
                placeholder="word1 word2 word3 …"
                value={recoveryInput}
                onChange={(e) => setRecoveryInput(e.target.value)}
              />
            </>
          )}
          {(effectiveMode === "create" || effectiveMode === "import") && (
            <>
              <label>Display name</label>
              <input
                type="text"
                placeholder="e.g. Alice — shown to you in groups and signer lists"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </>
          )}
          <label>
            {effectiveMode === "recover" ? "New passphrase" : "Passphrase"}
          </label>
          <input
            type="password"
            autoFocus
            value={passphrase}
            onChange={(e) => setPassphrase(e.target.value)}
          />
          {effectiveMode !== "unlock" && (
            <>
              <label>Confirm passphrase</label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
            </>
          )}
          {error && <div className="error">{error}</div>}
          <div className="row">
            <button
              type="submit"
              disabled={
                busy ||
                !passphrase ||
                (effectiveMode === "recover" && !recoveryInput.trim())
              }
            >
              {busy
                ? "Working…"
                : effectiveMode === "unlock"
                  ? "Unlock"
                  : effectiveMode === "create"
                    ? "Create"
                    : effectiveMode === "recover"
                      ? "Recover"
                      : "Import"}
            </button>
          </div>
        </form>
        <p className="dim" style={{ marginTop: 16 }}>
          {exists && effectiveMode === "unlock" && (
            <a href="#" onClick={() => setMode("recover")}>
              Forgot your passphrase? Recover with your code
            </a>
          )}
          {exists && effectiveMode === "recover" && (
            <a href="#" onClick={() => setMode("unlock")}>
              Back to unlock
            </a>
          )}
          {exists &&
            effectiveMode !== "unlock" &&
            effectiveMode !== "recover" && (
              <a href="#" onClick={() => setMode("unlock")}>
                Unlock existing keystore
              </a>
            )}
          {!exists && effectiveMode !== "import" && (
            <a href="#" onClick={() => setMode("import")}>
              Import existing frost-client config instead
            </a>
          )}
          {!exists && effectiveMode === "import" && (
            <a href="#" onClick={() => setMode("create")}>
              Create a fresh keystore instead
            </a>
          )}
        </p>
      </div>
    </div>
  );
}
