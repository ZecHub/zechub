import { useState } from "react";

export default function Register({ onDone }: { onDone: () => void }) {
  const [ufvk, setUfvk] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    setError(null);
    setBusy(true);
    try {
      await window.pdv.register(ufvk.trim(), password, name.trim() || undefined);
      onDone();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-lg font-medium">Register wallet</h1>
        <p className="text-sm text-neutral-400">
          One-time setup. The viewing key is imported into the wallet and stored
          encrypted. It cannot be changed later.
        </p>
      </div>

      <label className="text-xs text-neutral-400">
        UFVK (unified full viewing key)
        <textarea
          value={ufvk}
          onChange={(e) => setUfvk(e.target.value)}
          rows={3}
          className="mt-1 w-full resize-none rounded-2xl bg-black/40 p-3 font-mono text-xs outline-none ring-1 ring-white/10 focus:ring-white/25"
          placeholder="uview1…"
        />
      </label>

      <label className="text-xs text-neutral-400">
        Wallet name (optional)
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full rounded-2xl bg-black/40 p-3 text-sm outline-none ring-1 ring-white/10 focus:ring-white/25"
          placeholder="Front counter"
        />
      </label>

      <label className="text-xs text-neutral-400">
        Admin password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 w-full rounded-2xl bg-black/40 p-3 text-sm outline-none ring-1 ring-white/10 focus:ring-white/25"
          placeholder="Used to encrypt the key"
        />
      </label>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button
        onClick={submit}
        disabled={busy || !ufvk || !password}
        className="mt-1 rounded-2xl bg-white/10 py-3.5 text-sm font-medium ring-1 ring-white/15 transition hover:bg-white/15 disabled:opacity-40"
      >
        {busy ? "Importing…" : "Register wallet"}
      </button>
    </div>
  );
}
