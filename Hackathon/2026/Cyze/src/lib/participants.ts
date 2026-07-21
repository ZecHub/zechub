import type { ContactDto, Identity } from "../ipc/commands";

export interface ResolvedParticipant {
  /** Friendly label: your username (with "You"), a contact name, or a short key. */
  label: string;
  /** Full hex public key. */
  pubkey: string;
  /** Shortened address for display next to the name. */
  shortPubkey: string;
  isSelf: boolean;
}

/** Resolve a participant public key to a human-friendly label, preferring the
 *  local user's own name, then a saved contact, then a shortened key. */
export function resolveParticipant(
  pubkey: string,
  identity: Identity | undefined,
  contacts: ContactDto[] | undefined
): ResolvedParticipant {
  const shortPubkey = `${pubkey.slice(0, 10)}…${pubkey.slice(-6)}`;
  if (identity?.pubkey && identity.pubkey === pubkey) {
    return {
      label: identity.username ? `${identity.username} (You)` : "You",
      pubkey,
      shortPubkey,
      isSelf: true,
    };
  }
  const contact = contacts?.find((c) => c.pubkey === pubkey);
  return {
    label: contact?.alias || contact?.name || shortPubkey,
    pubkey,
    shortPubkey,
    isSelf: false,
  };
}
