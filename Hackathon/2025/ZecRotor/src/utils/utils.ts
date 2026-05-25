export function toYocto(amount: number | string): bigint {
  // convert NEAR decimal string/number to yocto (bigint)
  const [int = "0", frac = ""] = String(amount).split(".");
  const fracPadded = (frac + "0".repeat(24)).slice(0, 24);
  return BigInt(int + fracPadded);
}

export function nsToEpochMinute(ns: string | number): number {
  const sec = Math.floor(Number(ns) / 1e9);
  return Math.floor(sec / 60) * 60; // align to minute
}

export function yoctoFromApi(val: unknown): bigint {
  if (typeof val === 'bigint') return val;

  const s = String(val);
  if (!/e/i.test(s)) return BigInt(s);        // already plain integer string/number

  // Expand scientific notation manually
  // e.g. "1e24" -> "1" + 24 zeros
  const [mantRaw, expRaw] = s.toLowerCase().split('e');
  const exp = parseInt(expRaw, 10);
  const [intPart, fracPart = ""] = mantRaw.split('.');

  if (exp >= 0) {
    const digits = intPart + fracPart;
    const zeros = Math.max(0, exp - fracPart.length);
    return BigInt(digits + '0'.repeat(zeros));
  } else {
    // Negative exponents shouldn't appear for yocto amounts, but handle gracefully
    const shift = -exp;
    const digits = intPart + fracPart;
    if (shift >= digits.length) return 0n;
    return BigInt(digits.slice(0, digits.length - shift)); // drop fractional part
  }
}