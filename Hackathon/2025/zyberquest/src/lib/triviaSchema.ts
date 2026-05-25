import { z } from "zod";

/** Dificultad tal como viene en el JSON */
export const difficultyLabelEnum = z.enum(["Beginner", "Intermediate", "Advanced"]);
export type DifficultyLabel = z.infer<typeof difficultyLabelEnum>; // "Beginner" | "Intermediate" | "Advanced"

/** Esquema de UNA pregunta del banco */
export const triviaSchema = z.object({
  id: z.string(),
  category: z.string(),
  type: z.literal("mcq"),
  question: z.string(),
  // aceptamos string[] de longitud 4 (más tolerante)
  choices: z.array(z.string()).length(4),
  answerIndex: z.number().int().min(0).max(3),
  explain: z.string(),
  difficulty: difficultyLabelEnum, // ← etiquetas del JSON
  tags: z.array(z.string()).optional(),
});

export type TriviaQuestion = z.infer<typeof triviaSchema>;

/** Esquema del banco completo */
export const triviaArraySchema = z.array(triviaSchema);
