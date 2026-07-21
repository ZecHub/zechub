"use client";

import { useState } from "react";

/** Click handler for the SignOut component. Wire to your auth layer's sign-out
 *  call, e.g. `() => signOut({ callbackUrl: "/" })` for next-auth, or any
 *  custom session-clearing logic. Return a promise to show the busy state
 *  until it settles. */
export type SignOutHandler = () => Promise<unknown> | unknown;

export interface SignOutProps {
  /** Click handler. Required for the button to do anything useful. */
  onSignOut?: SignOutHandler;
  /** Label when idle. Default: "Sign out". */
  buttonLabel?: string;
  /** Label while the handler is in flight. Default: "Signing out…". */
  busyLabel?: string;
  /** Show a small confirm prompt before signing out. Default: false. */
  confirm?: boolean;
  /** Prompt text shown when `confirm` is true. */
  confirmMessage?: string;
  /** Confirm-yes button label. */
  confirmYesLabel?: string;
  /** Confirm-no / cancel button label. */
  confirmNoLabel?: string;
  /** Visual variant. Sign-out is rarely the primary action; default "secondary". */
  variant?: "primary" | "secondary" | "link";
  /** ClassName overrides per slot. */
  classNames?: Partial<{
    root: string;
    button: string;
    confirm: string;
    confirmYes: string;
    confirmNo: string;
  }>;
  /** Called if onSignOut throws. */
  onError?: (message: string) => void;
}

type Status = "idle" | "confirming" | "busy";

export function SignOut({
  onSignOut,
  buttonLabel = "Sign out",
  busyLabel = "Signing out…",
  confirm = false,
  confirmMessage = "Sign out?",
  confirmYesLabel = "Sign out",
  confirmNoLabel = "Cancel",
  variant = "secondary",
  classNames,
  onError,
}: SignOutProps) {
  const [status, setStatus] = useState<Status>("idle");

  const defaultButtonClass =
    variant === "link"
      ? "siwz-link-btn"
      : variant === "primary"
      ? "siwz-button"
      : "siwz-button siwz-button--secondary";
  const buttonClass = classNames?.button ?? defaultButtonClass;

  const doSignOut = async () => {
    setStatus("busy");
    try {
      await Promise.resolve(onSignOut?.());
    } catch (err) {
      onError?.((err as Error).message);
      setStatus("idle");
    }
  };

  if (status === "confirming") {
    return (
      <div className={classNames?.confirm ?? "siwz-signout-confirm"}>
        <span>{confirmMessage}</span>
        <div className="siwz-signout-confirm-actions">
          <button
            type="button"
            onClick={doSignOut}
            className={classNames?.confirmYes ?? "siwz-button siwz-button--secondary"}
          >
            {confirmYesLabel}
          </button>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className={classNames?.confirmNo ?? "siwz-link-btn"}
          >
            {confirmNoLabel}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={classNames?.root ?? "siwz-signout"}>
      <button
        type="button"
        onClick={() => (confirm ? setStatus("confirming") : doSignOut())}
        disabled={status === "busy"}
        className={buttonClass}
      >
        {status === "busy" ? busyLabel : buttonLabel}
      </button>
    </div>
  );
}
