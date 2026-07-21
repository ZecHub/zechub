import { useQueryClient } from "@tanstack/react-query";
import { useTauriEvent } from "./ipc/events";
import { useCeremonies, CeremonyEventPayload } from "./stores/ceremonies";

/**
 * Subscribes to ceremony progress events at the app root, so updates land in
 * the global store no matter which screen is mounted. Previously the DKG and
 * signing screens each owned their listeners, so navigating away dropped the
 * subscription and the (still-running) backend ceremony appeared to die.
 *
 * Renders nothing; mounted once inside the unlocked layout.
 */
export default function CeremonyListener() {
  const queryClient = useQueryClient();
  const { onProgress, onComplete, onFailed, requestWalletRefresh } = useCeremonies();

  /**
   * A ceremony just moved funds. Re-read the wallet panels from the local db at
   * once, and ask the wallet screen to sync so the on-chain transaction is
   * actually scanned in.
   *
   * This runs for a *signing* completion too, not just a send we coordinated:
   * a participant who approves a transaction never runs the send themselves, so
   * nothing else would ever refresh their wallet — leaving their history openly
   * contradicting the transaction they just signed.
   */
  const refreshWallet = () => {
    for (const key of ["wallet-status", "wallet-history", "wallet-notes"]) {
      queryClient.invalidateQueries({ queryKey: [key] });
    }
    requestWalletRefresh();
  };

  useTauriEvent<CeremonyEventPayload>("dkg:progress", (p) => onProgress("dkg", p));
  useTauriEvent<CeremonyEventPayload>("dkg:complete", (p) => {
    onComplete("dkg", p);
    queryClient.invalidateQueries({ queryKey: ["groups"] });
  });
  useTauriEvent<CeremonyEventPayload>("dkg:failed", (p) => onFailed("dkg", p));

  useTauriEvent<CeremonyEventPayload>("signing:progress", (p) =>
    onProgress("signing", p)
  );
  useTauriEvent<CeremonyEventPayload>("signing:complete", (p) => {
    onComplete("signing", p);
    refreshWallet();
  });
  useTauriEvent<CeremonyEventPayload>("signing:failed", (p) =>
    onFailed("signing", p)
  );

  // Wallet send: a coordinator signing ceremony over a transaction sighash.
  // Captured globally so progress lands even when off the wallet screen.
  useTauriEvent<CeremonyEventPayload>("send:progress", (p) => onProgress("send", p));
  useTauriEvent<CeremonyEventPayload>("send:complete", (p) => {
    onComplete("send", p);
    refreshWallet();
  });
  useTauriEvent<CeremonyEventPayload>("send:failed", (p) => onFailed("send", p));

  return null;
}
