export type StructuralInspection =
  | { kind: "spendingKey" }
  | { kind: "notUnified" }
  | { kind: "malformed"; detail: string }
  | { kind: "wrongNetwork"; network: string }
  | { kind: "valid"; orchard: boolean; sapling: boolean; transparent: boolean };

export interface KeyVerdict {
  blocking: boolean;
  message: string | null;
  pools: { orchard: boolean; sapling: boolean; transparent: boolean } | null;
}

export function describeInspection(inspection: StructuralInspection): KeyVerdict {
  switch (inspection.kind) {
    case "spendingKey":
      return {
        blocking: true,
        message:
          "That is a spending key. It has been cleared and was not sent anywhere — Turnstile never accepts one.",
        pools: null,
      };
    case "notUnified":
      return {
        blocking: true,
        message: "A unified full viewing key starts with uview1.",
        pools: null,
      };
    case "malformed":
      return {
        blocking: true,
        message:
          "This key does not decode — the checksum fails, which usually means a character was mistyped or lost in copying. Nothing was sent.",
        pools: null,
      };
    case "wrongNetwork":
      return {
        blocking: true,
        message: `This is a ${inspection.network} key. Turnstile scans Zcash mainnet.`,
        pools: null,
      };
    case "valid":
      return {
        blocking: false,
        message: inspection.orchard
          ? null
          : "This key carries no Orchard component, so the scan cannot rule on your exposure — the verdict will be “cannot determine”. Export a full UFVK if your wallet offers one.",
        pools: {
          orchard: inspection.orchard,
          sapling: inspection.sapling,
          transparent: inspection.transparent,
        },
      };
  }
}

type WasmModule = { inspect_key: (raw: string) => string };
let wasm: WasmModule | null | undefined;

export async function inspectStructurally(
  key: string,
): Promise<StructuralInspection | null> {
  if (wasm === undefined) {
    try {
      const specifier = "/keycheck/turnstile_keycheck.js";
      const mod = await import(/* webpackIgnore: true */ /* @vite-ignore */ specifier);
      await mod.default("/keycheck/turnstile_keycheck_bg.wasm");
      wasm = mod as unknown as WasmModule;
    } catch {
      wasm = null;
    }
  }

  if (!wasm) return null;

  try {
    return JSON.parse(wasm.inspect_key(key)) as StructuralInspection;
  } catch {
    return null;
  }
}
