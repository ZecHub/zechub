// Pure helpers for the Docker-install UI state. Kept separate from the React
// component so the mapping is unit-tested (install.test.ts).

export type InstallTone = 'idle' | 'running' | 'success' | 'error'

// installTone maps a backend job state (+ optional error) to a UI tone.
export function installTone(state: string | null | undefined, error?: string): InstallTone {
  if (error) return 'error'
  switch (state) {
    case 'running':
      return 'running'
    case 'succeeded':
      return 'success'
    case 'failed':
      return 'error'
    default:
      return 'idle'
  }
}

export function installLabel(tone: InstallTone): string {
  switch (tone) {
    case 'running':
      return 'Installing Docker…'
    case 'success':
      return 'Docker installed'
    case 'error':
      return 'Install failed'
    default:
      return 'Ready to install'
  }
}
