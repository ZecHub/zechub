import { useState } from "react";

export default function Unlock({ onDone }: { onDone: () => void }) {
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    setError(null);
    setBusy(true);
    try {
      await window.pdv.unlock(password);
      onDone();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex h-full flex-col justify-center gap-4">
      <div>
        <h1 className="text-lg font-medium">Unlock</h1>
        <p className="text-sm text-neutral-400">
          Enter the admin password to start the terminal.
        </p>
      </div>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
        autoFocus
        className="rounded-2xl bg-black/40 p-3 text-sm outline-none ring-1 ring-white/10 focus:ring-white/25"
        placeholder="Admin password"
      />
      {error && <p className="text-sm text-red-400">{error}</p>}
      <button
        onClick={submit}
        disabled={busy || !password}
        className="rounded-2xl bg-white/10 py-3.5 text-sm font-medium ring-1 ring-white/15 transition hover:bg-white/15 disabled:opacity-40"
      >
        {busy ? "Unlocking…" : "Unlock"}
      </button>
    </div>
  );
}
