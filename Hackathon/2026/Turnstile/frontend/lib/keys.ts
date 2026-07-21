const SPENDING_KEY_PREFIXES = ["secret-extended-key", "zxviews", "uskmain", "uskt", "uview1sk"];

export type KeyProblem = "spending-key" | "not-a-ufvk" | "empty";

export function inspectKey(raw: string): KeyProblem | null {
  const key = raw.trim().toLowerCase();

  if (!key) return "empty";
  if (SPENDING_KEY_PREFIXES.some((prefix) => key.startsWith(prefix))) return "spending-key";
  if (!key.startsWith("uview")) return "not-a-ufvk";

  return null;
}

export const KEY_PROBLEM_MESSAGE: Record<KeyProblem, string> = {
  "spending-key":
    "That looks like a spending key. Turnstile never accepts one, and this was not sent anywhere. Paste a unified full viewing key (uview1…).",
  "not-a-ufvk": "A unified full viewing key starts with uview1. Check what you pasted.",
  empty: "Paste a unified full viewing key to scan.",
};

export function isSeedPhrase(raw: string) {
  const words = raw.trim().split(/\s+/);
  return words.length >= 12 && words.every((word) => /^[a-z]+$/.test(word));
}
