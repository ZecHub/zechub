function formatBbsSoftware(version?: string): string {
  const v = version ?? process.env.NEXT_PUBLIC_BBS_VERSION ?? 'v0.18b';
  return /^ZEC-BBS/i.test(v) ? v : `ZEC-BBS ${v}`;
}

export const BBS_SOFTWARE = formatBbsSoftware();
