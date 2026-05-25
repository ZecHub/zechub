
const KEY = 'tournament_code';
const RUN_KEY = 'tournament_levels'; // guarda resultados por nivel

export const API = process.env.NEXT_PUBLIC_API_BASE || 'http://192.168.100.12:3001';

export function setTournamentCode(code: string) {
  try { sessionStorage.setItem(KEY, code); } catch {}
}

export function getTournamentCode(): string | null {
  try { return sessionStorage.getItem(KEY); } catch { return null; }
}

type LevelRecord = { diff: 'beginner' | 'intermediate' | 'advanced'; perfect: boolean };

export function trackLevelResult(diff: string, correct: number, total: number) {
  try {
    const raw = sessionStorage.getItem(RUN_KEY);
    const arr: LevelRecord[] = raw ? JSON.parse(raw) : [];
    const normalized = (diff === 'beginner' || diff === 'intermediate' || diff === 'advanced') ? diff : 'beginner';
    // evita duplicados del mismo nivel
    const others = arr.filter(x => x.diff !== normalized);
    const next = [...others, { diff: normalized, perfect: correct >= total }];
    sessionStorage.setItem(RUN_KEY, JSON.stringify(next));
  } catch {}
}

export function finalizeTournamentLevels(): number {
  try {
    const raw = sessionStorage.getItem(RUN_KEY);
    const arr: LevelRecord[] = raw ? JSON.parse(raw) : [];
    const passed = arr.filter(x => x.perfect).length;
    sessionStorage.removeItem(RUN_KEY);
    return passed;
  } catch {
    return 0;
  }
}

export async function saveTournamentResult(input: {
  code: string;
  score: number;
  levelsPassed: number; // 0..3
  playedAt: string;     // ISO
}) {
  const res = await fetch(`${API}/api/tournament/result`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
    body: JSON.stringify(input),
  });
  return res.ok ? await res.json() : null;
}
