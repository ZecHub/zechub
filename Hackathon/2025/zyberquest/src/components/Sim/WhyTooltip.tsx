// components/Sim/WhyTooltip.tsx
'use client'

import * as Tooltip from '@radix-ui/react-tooltip'

type Props = { title?: string; text?: string }
export default function WhyTooltip({ title = 'Why this works', text = 'Stub explanation' }: Props) {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            aria-label="Why?"
            className="px-2 py-1 text-xs rounded border border-white/20 hover:border-[var(--zx-yellow)]"
          >
            Why?
          </button>
        </Tooltip.Trigger>
        <Tooltip.Content sideOffset={6} className="max-w-xs rounded bg-black/90 p-3 text-xs leading-relaxed">
          <div className="text-[var(--zx-yellow)] font-Intermediate mb-1">{title}</div>
          <p className="opacity-90">{text}</p>
          <Tooltip.Arrow className="fill-black/90" />
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}
