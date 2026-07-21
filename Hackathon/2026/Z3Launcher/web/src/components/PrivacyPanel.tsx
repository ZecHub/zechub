import { Shield, Lock, ShieldCheck } from 'lucide-react'

const POINTS: [string, string, typeof Shield][] = [
  ['Private connection', 'Your node binds to 127.0.0.1 only. There is no remote surface — nothing is reachable from another host.', Shield],
  ['No telemetry', 'The launcher never phones home. No analytics, no usage events. The only egress is the chain sync you start.', Lock],
  ['No key custody', 'The launcher never holds wallet keys. If you enable Zallet, it manages keys via its own encrypted store.', ShieldCheck],
]

export function PrivacyPanel() {
  return (
    <div className="flex max-w-[680px] flex-col gap-4">
      <section className="z3-card p-[28px]">
        <div className="flex flex-col gap-[22px]">
          {POINTS.map(([title, desc, Icon]) => (
            <div key={title} className="flex items-start gap-4">
              <div
                className="flex h-[42px] w-[42px] flex-shrink-0 items-center justify-center rounded-[12px]"
                style={{ background: 'var(--green-soft)', color: 'var(--green)' }}
              >
                <Icon size={19} strokeWidth={2} />
              </div>
              <div>
                <h3 className="m-0 text-[16px] font-bold tracking-[-0.01em]" style={{ color: 'var(--fg)' }}>
                  {title}
                </h3>
                <p className="mt-[5px] text-[13.5px] font-medium leading-[1.55]" style={{ color: 'var(--muted)' }}>
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div
        className="flex items-center justify-center gap-[9px] rounded-[14px] border p-4 text-[13px] font-semibold"
        style={{ background: 'var(--green-soft)', borderColor: 'var(--green-soft)', color: 'var(--green)' }}
      >
        <ShieldCheck size={15} />
        Bound to 127.0.0.1 · No telemetry · No key custody
      </div>
    </div>
  )
}
