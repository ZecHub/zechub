import { useEffect } from "react";
import { listen, UnlistenFn } from "@tauri-apps/api/event";

/** Subscribe to a Tauri event for the lifetime of the component. */
export function useTauriEvent<T>(name: string, handler: (payload: T) => void) {
  useEffect(() => {
    let unlisten: UnlistenFn | undefined;
    let cancelled = false;
    listen<T>(name, (event) => handler(event.payload)).then((fn) => {
      if (cancelled) fn();
      else unlisten = fn;
    });
    return () => {
      cancelled = true;
      unlisten?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);
}
