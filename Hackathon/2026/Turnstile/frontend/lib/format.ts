import { ZATOSHI_PER_ZEC } from "@/lib/constants";

export function zatoshiToZec(zatoshi: number) {
  return zatoshi / ZATOSHI_PER_ZEC;
}

export function formatZec(zatoshi: number) {
  const zec = zatoshiToZec(zatoshi);
  return zec
    .toFixed(8)
    .replace(/0+$/, "")
    .replace(/\.$/, "");
}

export function formatPool(zatoshi: number | null) {
  if (zatoshi === null) return "not visible to this key";
  return `${formatZec(zatoshi)} ZEC`;
}

export function formatHeight(height: number) {
  return height.toLocaleString("en-US");
}

export function formatCountdown(totalSeconds: number) {
  const days = Math.floor(totalSeconds / 86_400);
  const hours = Math.floor((totalSeconds % 86_400) / 3_600);
  const minutes = Math.floor((totalSeconds % 3_600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
}

export function truncateKey(key: string, lead = 8, tail = 6) {
  if (key.length <= lead + tail + 1) return key;
  return `${key.slice(0, lead)}…${key.slice(-tail)}`;
}
