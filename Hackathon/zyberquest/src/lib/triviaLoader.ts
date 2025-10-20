import triviaData from "@/data/trivia-zcash.json";
import { triviaArraySchema, type TriviaQuestion } from "./triviaSchema";

// Fisher–Yates
function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Baraja options y recalcula answerIndex */
function shuffleChoices(q: TriviaQuestion): Pick<TriviaQuestion, "choices" | "answerIndex"> {
  const pairs = q.choices.map((text, idx) => ({ text, idx }));
  const shuffled = shuffle(pairs);
  const choices = shuffled.map(p => p.text);
  const answerIndex = shuffled.findIndex(p => p.idx === q.answerIndex);
  return { choices, answerIndex };
}

type StoreDifficulty = "beginner" | "intermediate" | "advanced";
type JsonLabel = "Beginner" | "Intermediate" | "Advanced";

function toJsonLabel(d: StoreDifficulty): JsonLabel {
  if (d === "beginner") return "Beginner";
  if (d === "intermediate") return "Intermediate";
  return "Advanced";
}

type PrepareOpts = {
  count: number;                 // normalmente 10
  difficulty: StoreDifficulty;   // del store (minúsculas)
};

export function prepareTrivia({ count, difficulty }: PrepareOpts): TriviaQuestion[] {
  // 1) Parse JSON
  const parsed = triviaArraySchema.safeParse(triviaData);
  if (!parsed.success) {
    console.error("[triviaLoader] Invalid trivia JSON:", parsed.error.flatten());
    return [];
  }
  const all = parsed.data as TriviaQuestion[];

  // 2) Filtrar por etiqueta del JSON
  const label = toJsonLabel(difficulty);
  const pool = all.filter(q => q.difficulty === label);
  if (pool.length === 0) {
    console.warn(`[triviaLoader] No questions for difficulty "${label}".`);
    return [];
  }

  // 3) Selección sin duplicados
  const poolShuffled = shuffle(pool);
  const take = Math.min(count, poolShuffled.length);
  const selected = poolShuffled.slice(0, take);

  // 4) Barajar choices y recalcular índice
  const withShuffledChoices = selected.map((q) => {
    const { choices, answerIndex } = shuffleChoices(q);
    return { ...q, choices, answerIndex } as TriviaQuestion;
  });

  // 5) Barajar orden final
  return shuffle(withShuffledChoices);
}
