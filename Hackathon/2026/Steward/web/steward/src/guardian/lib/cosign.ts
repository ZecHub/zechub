import type { Client } from '../api/client'
import type { Guardian, RelayAction } from './wasm'

/** The guardian's own progress through the ceremony it is co-signing. */
export type CoSignStep = 'connecting' | 'round1' | 'round2' | 'sealed' | 'adjourned'

/** How the ceremony ended for this guardian. */
export type CoSignOutcome = 'sealed' | 'adjourned'

const POLL_MS = 350
const OVERALL_TIMEOUT_MS = 95_000

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

/**
 * Drive the relay loop for one session. This is the whole co-sign: poll
 * `/session/{id}/recv`, feed each returned `msg_hex` to the wasm
 * `handleRelayMessage` (which runs the right FROST round entirely on-device), and
 * POST whatever it says to send. The TypeScript never parses FROST — it only moves
 * opaque hex and reports progress.
 *
 * Resolves `'sealed'` once this guardian produced its round-2 share, or `'adjourned'`
 * if the coordinator selected a different quorum. Rejects on timeout, transport
 * failure, or a wasm error (e.g. a mid-ceremony message swap the round-2 check
 * refuses).
 */
export async function runCoSign(
  client: Client,
  sessionId: string,
  guardianId: string,
  guardian: Guardian,
  onStep: (step: CoSignStep) => void,
  isCancelled: () => boolean,
): Promise<CoSignOutcome> {
  onStep('connecting')
  const deadline = Date.now() + OVERALL_TIMEOUT_MS

  while (Date.now() < deadline) {
    if (isCancelled()) throw new Error('cancelled')

    const { messages } = await client.recv(sessionId, guardianId)
    for (const m of messages) {
      let action: RelayAction
      try {
        action = guardian.handleRelayMessage(sessionId, m.msg_hex) as RelayAction
      } catch (e) {
        throw new Error(e instanceof Error ? e.message : String(e))
      }

      if (action.action === 'send' && action.msg_hex) {
        await client.send(sessionId, guardianId, { to: action.to, msg_hex: action.msg_hex })
      }
      if (action.kind === 'round1') onStep('round1')
      else if (action.kind === 'round2') onStep('round2')

      if (action.done) {
        const outcome: CoSignOutcome = action.kind === 'round2' ? 'sealed' : 'adjourned'
        onStep(outcome)
        return outcome
      }
    }

    await sleep(POLL_MS)
  }
  throw new Error('The coordinator did not complete the ceremony in time.')
}
