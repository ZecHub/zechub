// lib/simSchemas.ts
import { z } from 'zod'

export const difficultySchema = z.union([
  z.literal('beginner'),
  z.literal('intermediate'),
  z.literal('advanced'),
])
export type Difficulty = z.infer<typeof difficultySchema>

export const xorSchema = z.object({
  id: z.string(),
  type: z.literal('xor'),
  difficulty: difficultySchema,
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  layerA: z.array(z.array(z.number().int().min(0).max(1))),
  layerB: z.array(z.array(z.number().int().min(0).max(1))),
  targetMask: z.array(z.array(z.number().int().min(0).max(1))),
  targetMessage: z.string(),
  timeLimit: z.number().int().positive(),
  hint: z.string().optional(),
})
export type XorPuzzle = z.infer<typeof xorSchema>
