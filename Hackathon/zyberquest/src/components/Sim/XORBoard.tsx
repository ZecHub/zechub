'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useSimStore, type Difficulty } from '@/store/simStore'
import { generateXor } from '@/lib/simGenerators'
import WhyTooltip from './WhyTooltip'
import { WHY } from '@/data/why'

type Grid = number[][]

export default function XORBoard() {
  const difficultyFromStore = useSimStore((s) => s.difficulty)
  const runSeed = useSimStore((s) => s.runSeed)
  const difficulty: Difficulty = (difficultyFromStore ?? 'beginner') as Difficulty
  const { solve, useHint } = useSimStore()
  const hintsLeft = useSimStore((s) => s.hintsLeft)

  const puzzle = useMemo(() => {
    const seed = runSeed ?? 444
    return generateXor(difficulty, seed)
  }, [difficulty, runSeed])

  const { width: W, height: H } = puzzle

  // A (bloqueado) y B (editable)
  const A = useMemo<Grid>(() => puzzle.layerA.map((row) => row.slice()), [puzzle])
  const [B, setB] = useState<Grid>(() => Array.from({ length: H }, () => Array(W).fill(0)))
  const [solved, setSolved] = useState(false)

  // TAMAÑOS (compactos en Intermediate/Advanced)
  const abCell = difficulty === 'advanced' ? 10 : difficulty === 'intermediate' ? 12 : 16
  const abGap = difficulty === 'advanced' ? 2 : difficulty === 'intermediate' ? 3 : 4
  const [resultCell, setResultCell] = useState<number>(
    difficulty === 'advanced' ? 24 : difficulty === 'intermediate' ? 26 : 28
  )
  const resultGap = 4

  useEffect(() => {
    setB(Array.from({ length: H }, () => Array(W).fill(0)))
    setSolved(false)
    setResultCell(difficulty === 'advanced' ? 24 : difficulty === 'intermediate' ? 26 : 28)
  }, [puzzle.id, H, W, difficulty])

  // R = A XOR B
  const R = useMemo<Grid>(() => {
    const out = Array.from({ length: H }, () => Array(W).fill(0))
    for (let r = 0; r < H; r++) for (let c = 0; c < W; c++) out[r][c] = A[r][c] ^ B[r][c]
    return out
  }, [A, B, H, W])

  // Condiciones de victoria
  const { lettersLit, perfectClean } = useMemo(() => {
    let lit = true
    let clean = true
    for (let r = 0; r < H; r++) {
      for (let c = 0; c < W; c++) {
        const t = puzzle.targetMask[r][c]
        const v = R[r][c]
        if (t === 1 && v !== 1) lit = false
        if (t === 0 && v !== 0) clean = false
        if (!lit && !clean) break
      }
      if (!lit && !clean) break
    }
    return { lettersLit: lit, perfectClean: lit && clean }
  }, [R, puzzle.targetMask, H, W])

  useEffect(() => {
    if (!lettersLit) {
      if (solved) setSolved(false)
      return
    }
    if (!solved) {
      setSolved(true)
      solve(perfectClean ? 1 : 0.7, perfectClean ? 'perfect' : 'partial')
    }
  }, [lettersLit, perfectClean, solved, solve])

  const toggle = (r: number, c: number) => {
    setB((prev) => {
      const next = prev.map((row) => row.slice())
      next[r][c] = next[r][c] ^ 1
      return next
    })
  }

  const refs = useRef<Array<Array<HTMLButtonElement | null>>>([])
  const moveFocus = (r: number, c: number, dr: number, dc: number) => {
    const nr = Math.min(H - 1, Math.max(0, r + dr))
    const nc = Math.min(W - 1, Math.max(0, c + dc))
    refs.current[nr]?.[nc]?.focus()
  }

  // Hint: revela una fila correcta
  const onHint = () => {
    const wrongRows: number[] = []
    for (let r = 0; r < H; r++) {
      for (let c = 0; c < W; c++) {
        if ((A[r][c] ^ B[r][c]) !== puzzle.targetMask[r][c]) {
          wrongRows.push(r)
          break
        }
      }
    }
    if (wrongRows.length === 0) return
    const pick = wrongRows[Math.floor(Math.random() * wrongRows.length)]
    setB((prev) => {
      const next = prev.map((row) => row.slice())
      for (let c = 0; c < W; c++) next[pick][c] = A[pick][c] ^ puzzle.targetMask[pick][c]
      return next
    })
    useHint()
  }

  const resetB = () => setB(Array.from({ length: H }, () => Array(W).fill(0)))

  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4 md:p-5">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-[var(--zx-magenta)] font-semibold">Visual XOR</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={onHint}
            disabled={hintsLeft <= 0 || solved}
            className="rounded-md bg-[var(--zx-magenta)] px-3 py-1.5 text-sm font-medium text-black hover:ring-2 hover:ring-[var(--zx-yellow)] focus:outline-none focus:ring-2 focus:ring-[var(--zx-yellow)] disabled:opacity-40"
            aria-disabled={hintsLeft <= 0 || solved}
            title="Reveal one correct row (costs 10 points)"
          >
            Use hint (-10)
          </button>
          <button
            onClick={resetB}
            className="rounded-md border border-white/20 px-3 py-1.5 text-sm hover:border-[var(--zx-yellow)] focus:outline-none focus:ring-2 focus:ring-[var(--zx-yellow)]"
          >
            Reset
          </button>
        </div>
      </header>

      <p className="mt-1 text-sm opacity-85">
        Goal: light up all letter cells. <b>Perfect Clean</b> (100%) if you also clear the rest; otherwise, <b>Decrypted</b> (70%).
      </p>

      {/* A y B arriba */}
      <section className="mt-4 grid gap-4 md:grid-cols-2">
        <Panel
          title="Layer A (fixed)"
          help="Static layer"
          grid={A}
          readOnly
          cellSize={abCell}
          gap={abGap}
          variant="A"
        />

        <Panel
          title="Layer B (editable)"
          help="Use mouse or keyboard (Space/Enter toggles, arrows move)."
          grid={B}
          onToggle={toggle}
          refs={refs}
          cellSize={abCell}
          gap={abGap}
          onArrow={(r, c, dr, dc) => moveFocus(r, c, dr, dc)}
          variant="B"
        />

        {/* Result abajo + zoom */}
        <div className="md:col-span-2">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium text-[var(--zx-magenta)]">Result (A XOR B)</div>
            <label className="flex items-center gap-2 text-xs opacity-80">
              Zoom
              <input
                type="range"
                min={20}
                max={40}
                step={1}
                value={resultCell}
                onChange={(e) => setResultCell(Number(e.target.value))}
                aria-label="Result zoom"
              />
            </label>
          </div>

          <Panel
            title=""
            help={
              solved
                ? perfectClean
                  ? 'Perfect match! All letters lit and background cleared.'
                  : 'Decrypted! Letters lit — extra lit cells outside are allowed.'
                : 'Light up all letter cells. Extra lit cells outside letters won’t block completion.'
            }
            grid={R}
            target={puzzle.targetMask}
            result
            solved={solved}
            cellSize={resultCell}
            gap={resultGap}
            variant="R"
          />

          <div className="mt-2 text-xs opacity-70">
            {solved
              ? perfectClean
                ? 'Perfect Clean achieved.'
                : 'Decrypted achieved (70%).'
              : 'Yellow = letter cell lit; grey tones = background or pending cells.'}
          </div>
        </div>
      </section>

      <div className="mt-3 text-xs opacity-75" aria-live="polite">
        {solved ? '✓ Pattern revealed!' : 'Decryption in progress…'}
      </div>

      {solved && (
        <div className="mt-4">
          <WhyTooltip title={WHY.xor.title} text={WHY.xor.text} />
        </div>
      )}
    </div>
  )
}

/* ================= Panel genérico (memo) ================= */

type PanelProps = {
  title: string
  help?: string
  grid: Grid
  onToggle?: (r: number, c: number) => void
  refs?: React.MutableRefObject<Array<Array<HTMLButtonElement | null>>>
  readOnly?: boolean
  result?: boolean
  target?: Grid
  solved?: boolean
  cellSize?: number
  onArrow?: (r: number, c: number, dr: number, dc: number) => void
  gap?: number
  variant?: 'A' | 'B' | 'R'
}

const Panel = React.memo(function Panel({
  title,
  help,
  grid,
  onToggle,
  refs,
  readOnly = false,
  result = false,
  target,
  solved = false,
  cellSize = 18,
  onArrow,
  gap = 6,
  variant = 'B',
}: PanelProps) {
  const H = grid.length
  const W = grid[0]?.length ?? 0

  const styleVars = {
    ['--cell' as any]: `${cellSize}px`,
    ['--gap' as any]: `${gap}px`,
  } as React.CSSProperties

  return (
    <div className="rounded-lg border border-white/10 bg-black/40 p-3" style={styleVars}>
      {title && <div className="text-sm font-medium text-[var(--zx-magenta)] mb-1">{title}</div>}
      {help && <div className="text-xs opacity-70 mb-2">{help}</div>}
      <div
        className="grid overflow-auto"
        style={{ gridTemplateColumns: `repeat(${W}, var(--cell))`, gap: 'var(--gap)' }}
        role="grid"
        aria-label={title || 'grid'}
      >
        {grid.map((row, r) =>
          row.map((bit, c) => {
            const key = `${r}-${c}`
            const isOne = bit === 1

            // Colores por variante
            let styleClass = 'bg-transparent'
            if (variant === 'B' && !result) {
              styleClass = isOne ? 'bg-[var(--zx-magenta)]' : 'bg-transparent'
            }

            // RESULT con fondo completo (no letters-only)
            if (variant === 'R' && result && target) {
              const shouldBeOne = target[r][c] === 1
              if (shouldBeOne && isOne) {
                styleClass = 'bg-[var(--zx-yellow)]'     // letra correcta encendida
              } else if (shouldBeOne && !isOne) {
                styleClass = 'bg-white/70'               // letra pendiente
              } else if (!shouldBeOne && !isOne) {
                styleClass = 'bg-white/10'               // fondo correcto apagado
              } else {
                styleClass = 'bg-white/40'               // fondo encendido por error
              }
            }

            // Bordes: A muy sutil; R visible siempre para ver “cuadritos”
            const borderClass =
              variant === 'A' ? 'border-white/5'
              : variant === 'R' ? 'border-white/10'
              : 'border-white/10'

            const common =
              `rounded-sm border ${borderClass} focus:outline-none focus:ring-2 focus:ring-[var(--zx-yellow)]`
            const sizeClass = 'w-[var(--cell)] h-[var(--cell)]'

            if (readOnly) {
              return (
                <div
                  key={key}
                  className={`${sizeClass} ${common} ${styleClass}`}
                  aria-label={`r${r + 1} c${c + 1} value ${bit}`}
                />
              )
            }

            return (
              <button
                key={key}
                ref={(el) => {
                  if (!refs) return
                  if (!refs.current[r]) refs.current[r] = []
                  refs.current[r][c] = el
                }}
                type="button"
                className={`${sizeClass} ${common} ${styleClass}`}
                aria-pressed={isOne}
                aria-label={`Row ${r + 1}, Column ${c + 1}. Value ${bit}. Press to toggle.`}
                onClick={() => onToggle?.(r, c)}
                onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); onToggle?.(r, c) }
                  else if (e.key === 'ArrowLeft')  { e.preventDefault(); onArrow?.(r, c, 0, -1) }
                  else if (e.key === 'ArrowRight') { e.preventDefault(); onArrow?.(r, c, 0, +1) }
                  else if (e.key === 'ArrowUp')    { e.preventDefault(); onArrow?.(r, c, -1, 0) }
                  else if (e.key === 'ArrowDown')  { e.preventDefault(); onArrow?.(r, c, +1, 0) }
                }}
                disabled={result}
              />
            )
          })
        )}
      </div>

      {result && (
        <div className="mt-2 text-xs opacity-70">
          {solved ? 'Pattern revealed!' : 'Make this match the target.'}
        </div>
      )}
    </div>
  )
})
