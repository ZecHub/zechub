// lib/simGenerators.ts
import { xorSchema, type XorPuzzle, type Difficulty } from './simSchemas'

export function makeRng(seed = 123456): () => number {
  let s = seed >>> 0
  return () => {
    s ^= s << 13
    s ^= s >>> 17
    s ^= s << 5
    return ((s >>> 0) % 1_000_000) / 1_000_000
  }
}

type Glyph = number[][]
const GLYPHS: Record<string, Glyph> = {
  Z: [[1,1,1,1,1],[0,0,0,1,0],[0,0,1,0,0],[0,1,0,0,0],[1,1,1,1,1]],
  C: [[1,1,1,1,1],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[1,1,1,1,1]],
  A: [[0,1,1,1,0],[1,0,0,0,1],[1,1,1,1,1],[1,0,0,0,1],[1,0,0,0,1]],
  S: [[1,1,1,1,1],[1,0,0,0,0],[1,1,1,1,0],[0,0,0,0,1],[1,1,1,1,1]],
  H: [[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,1],[1,0,0,0,1],[1,0,0,0,1]],
  E: [[1,1,1,1,1],[1,0,0,0,0],[1,1,1,1,0],[1,0,0,0,0],[1,1,1,1,1]],
  ' ': [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],
}

function renderWord(word: string, spaceCols = 1): number[][] {
  const rows = 5
  const colsPerGlyph = 5
  const glyphs = word.split('').map((ch) => GLYPHS[ch] || GLYPHS[' '])
  const totalCols = glyphs.length * colsPerGlyph + Math.max(0, glyphs.length - 1) * spaceCols
  const mask = Array.from({ length: rows }, () => Array(totalCols).fill(0))
  let x = 0
  for (const g of glyphs) {
    for (let r = 0; r < rows; r++) for (let c = 0; c < colsPerGlyph; c++) mask[r][x + c] = g[r][c]
    x += colsPerGlyph + spaceCols
  }
  return mask
}
function wordWidth(word: string, spaceCols = 1) {
  const letters = word.length
  return letters * 5 + Math.max(0, letters - 1) * spaceCols
}
function padMask(mask: number[][], width: number, height: number, rng: () => number): number[][] {
  const out = Array.from({ length: height }, () => Array(width).fill(0))
  const yOff = Math.max(0, Math.floor((height - mask.length) / 2))
  const xOff = Math.max(0, Math.floor((width - mask[0].length) / 2))
  for (let r = 0; r < mask.length; r++) {
    for (let c = 0; c < mask[0].length; c++) {
      const R = r + yOff, C = c + xOff
      if (R >= 0 && R < height && C >= 0 && C < width) out[R][C] = mask[r][c]
    }
  }
  // ligero ruido opcional
  return out
}

const XOR_SIZE: Record<Difficulty, { w: number; h: number }> = {
  beginner:     { w: 16, h: 8 },
  intermediate: { w: 24, h: 12 },
  advanced:     { w: 32, h: 16 },
}
const XOR_TIME: Record<Difficulty, number> = {
  beginner: 90, intermediate: 75, advanced: 60,
}

export function generateXor(difficulty: Difficulty, seed = 20250926): XorPuzzle {
  const rng = makeRng(seed)
  const { w, h } = XOR_SIZE[difficulty]

  // Beginner → ZC, Intermediate → ZEC, Advanced → ZCASH
  const requested = difficulty === 'beginner' ? 'ZC' :
                    difficulty === 'intermediate' ? 'ZEC' : 'ZCASH'
  const fallback = ['ZCASH','ZEC','ZC','Z'].find((wrd) => wordWidth(wrd,1) <= w) ?? 'Z'
  const word = wordWidth(requested,1) <= w ? requested : fallback

  const base = renderWord(word, 1)
  const targetMask = padMask(base, w, h, rng)

  const layerA = Array.from({ length: h }, () => Array.from({ length: w }, () => (Math.random() < 0.5 ? 0 : 1)))
  const layerB = Array.from({ length: h }, () => Array(w).fill(0))

  const puzzle: XorPuzzle = {
    id: `xor-${difficulty}-${seed}`,
    type: 'xor',
    difficulty,
    width: w,
    height: h,
    layerA,
    layerB,
    targetMask,
    targetMessage: word,
    timeLimit: XOR_TIME[difficulty],
    hint:
      difficulty === 'beginner'
        ? 'Try locking full rows/columns; XOR flips bits — even count cancels.'
        : 'Focus on columns forming letters; block-correct parts to reduce search space.',
  }
  return xorSchema.parse(puzzle)
}

// Demos
export const demoXorBeginner = () => generateXor('beginner', 444)
export const demoXorIntermediate = () => generateXor('intermediate', 555)
export const demoXorAdvanced = () => generateXor('advanced', 666)
