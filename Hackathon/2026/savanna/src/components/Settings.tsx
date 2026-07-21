import { useState } from "react";
import type { AppSettings } from "../lib/pdv";

export default function Settings({
  settings,
  onChange,
  onClose,
}: {
  settings: AppSettings;
  onChange: (patch: Partial<AppSettings>) => void;
  onClose: () => void;
}) {
  const [local, setLocal] = useState<AppSettings>(settings);

  function update(patch: Partial<AppSettings>) {
    const next = { ...local, ...patch };
    setLocal(next);
    onChange(patch);
  }

  return (
    <div className="fixed inset-2 z-40 flex items-center justify-center rounded-[18px] bg-black/50 backdrop-blur-sm">
      <div className="relative m-4 w-full max-w-sm rounded-2xl bg-ink/95 p-5 ring-1 ring-white/10">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-neutral-500 transition hover:text-neutral-200"
          aria-label="Close"
        >
          ✕
        </button>

        <h2 className="mb-5 text-base font-medium">Settings</h2>

        <div className="flex flex-col gap-5">
          {/* Toggle USD */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-200">Show USD values</p>
              <p className="text-xs text-neutral-500">
                Display dollar amounts next to ZEC
              </p>
            </div>
            <button
              onClick={() => update({ showUsd: !local.showUsd })}
              className={`relative h-6 w-11 rounded-full transition ${
                local.showUsd ? "bg-zcash" : "bg-white/15"
              }`}
              aria-pressed={local.showUsd}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${
                  local.showUsd ? "left-[22px]" : "left-0.5"
                }`}
              />
            </button>
          </div>

          {/* Slider de transparência */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm text-neutral-200">Background opacity</p>
              <span className="font-mono text-xs text-neutral-400">
                {Math.round(local.opacity * 100)}%
              </span>
            </div>
            <input
              type="range"
              min={0.5}
              max={1}
              step={0.02}
              value={local.opacity}
              onChange={(e) => update({ opacity: Number(e.target.value) })}
              className="w-full accent-zcash"
            />
            <p className="mt-1 text-xs text-neutral-500">
              Lower values make the window more transparent
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full rounded-2xl bg-white/10 py-3 text-sm font-medium ring-1 ring-white/15 transition hover:bg-white/15"
        >
          Done
        </button>
      </div>
    </div>
  );
}
