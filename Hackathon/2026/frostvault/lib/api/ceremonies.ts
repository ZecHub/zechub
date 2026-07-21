import { apiGet, apiPost } from "./client";
import type { Ceremony } from "@/types";

export async function getCeremony(id: string): Promise<Ceremony> {
  const { ceremony } = await apiGet<{ ceremony: Ceremony }>(`/ceremonies/${id}`);
  return ceremony;
}

export async function startSend(
  vaultId: string,
  recipient: string,
  amount: string,
): Promise<string> {
  const { ceremony_id } = await apiPost<{ ceremony_id: string }>(
    `/vaults/${vaultId}/send`,
    { recipient, amount },
  );
  return ceremony_id;
}

export async function startRecovery(
  vaultId: string,
  signerParticipantIds: string[],
): Promise<string> {
  const { ceremony_id } = await apiPost<{ ceremony_id: string }>(
    `/vaults/${vaultId}/recovery`,
    { signer_participant_ids: signerParticipantIds },
  );
  return ceremony_id;
}

const TERMINAL_PHASES = new Set(["complete", "failed"]);

/**
 * Polls a ceremony until it reaches a terminal phase, invoking `onUpdate`
 * after every fetch so callers can animate live phase transitions.
 */
export async function pollCeremony(
  id: string,
  onUpdate: (ceremony: Ceremony) => void,
  intervalMs = 400,
): Promise<Ceremony> {
  for (;;) {
    const ceremony = await getCeremony(id);
    onUpdate(ceremony);
    if (TERMINAL_PHASES.has(ceremony.phase)) {
      return ceremony;
    }
    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }
}
