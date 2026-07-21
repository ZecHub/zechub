export interface AppInfo {
  app_name: string;
  app_version: string;
  target_triple: string;
  build_profile: string;
  source: "rust" | "mock";
}

export interface GreetResult {
  message: string;
}

export interface ListItem {
  id: number;
  title: string;
  description: string;
  category: string;
}

export interface Settings {
  theme_preference: string;
  launch_count: number;
  favourite_color: string;
  note: string;
}

export interface TimerTick {
  tick: number;
}

export interface ProcessResult {
  mode: string;
  raw_artifact_b64?: string;
  preview_signature_b64?: string;
  derivation_path?: string;
}

function isTauri(): boolean {
  return typeof window !== "undefined" && "__TAURI_INTERNALS__" in window;
}

async function invoke<T>(cmd: string, args?: Record<string, unknown>): Promise<T> {
  if (isTauri()) {
    const { invoke } = await import("@tauri-apps/api/core");
    return invoke<T>(cmd, args);
  }
  return mockInvoke<T>(cmd, args);
}

async function listen<T>(event: string, handler: (payload: T) => void): Promise<() => void> {
  if (isTauri()) {
    const { listen } = await import("@tauri-apps/api/event");
    return listen<T>(event, (e) => handler(e.payload));
  }
  return mockListen(event, handler);
}

// ── Mock implementations ──────────────────────────────────────────

let mockSettings: Settings = {
  theme_preference: "material",
  launch_count: 0,
  favourite_color: "#ff0000",
  note: "Browser mock — data is not persisted",
};

let mockTimerRunning = false;
const mockListeners: Record<string, Array<(payload: unknown) => void>> = {};

let mockResponse: number[] | null = null;

let mockServerKey: number[] | null = null;
let mockHasSeed = false;

async function mockInvoke<T>(cmd: string, _args?: Record<string, unknown>): Promise<T> {
  switch (cmd) {
    case "get_app_info":
      return {
        app_name: "PayPunk Signer",
        app_version: "0.1.0",
        target_triple: "mock-x86_64-unknown-linux-gnu",
        build_profile: "mock",
        source: "mock",
      } as T;

    case "greet":
      return { message: `Hello, ${_args?.name ?? "stranger"}! (mock)` } as T;

    case "get_list_items":
      return [
        { id: 1, title: "Mock Item Alpha", description: "This is a mock item from the browser fallback", category: "mock" },
        { id: 2, title: "Mock Item Beta", description: "Another mock item for demonstration", category: "mock" },
        { id: 3, title: "Mock Item Gamma", description: "Yet another mock item", category: "mock" },
      ] as T;

    case "get_settings":
      return { ...mockSettings } as T;

    case "save_settings":
      mockSettings = { ...mockSettings, ...(_args as Record<string, unknown>) as unknown as Partial<Settings> };
      return { ...mockSettings } as T;

    case "get_encryption_key":
      if (!mockServerKey) {
        mockServerKey = Array.from({ length: 32 }, () => Math.floor(Math.random() * 256));
      }
      return mockServerKey as T;

    case "generate_seed": {
      const encPw = _args?.encrypted_password as number[];
      if (!encPw || encPw.length === 0) {
        throw new Error("encrypted_password required");
      }
      const mnemonicBytes = new TextEncoder().encode(
        "ribbon velvet ocean puzzle harvest guitar shadow ladder comfort raven spring anchor"
      );
      return Array.from(mnemonicBytes) as T;
    }

    case "restore_seed":
      mockHasSeed = true;
      return null as T;

    case "delete_seed":
      mockHasSeed = false;
      return null as T;

    case "get_signer_status":
      return "idle" as T;

    case "process_scanned_qr": {
      const payload = _args?.payload as number[];
      if (!payload || payload.length === 0) {
        throw new Error("no payload provided");
      }
      const bytes = new Uint8Array(payload);
      const text = new TextDecoder().decode(bytes);
      if (text === "ping") {
        const response = new Uint8Array([0x00, ...new TextEncoder().encode("pong")]);
        mockResponse = Array.from(response);
        return { mode: "response" } as T;
      }
      mockResponse = Array.from(new Uint8Array([0x00, ...new TextEncoder().encode("mock-preview-response")]));
      return {
        mode: "preview",
        raw_artifact_b64: btoa("mock-raw-artifact"),
        preview_signature_b64: btoa("mock-preview-sig"),
        derivation_path: "m/44'/133'/0'",
      } as T;
    }

    case "approve_and_sign": {
      const response = new Uint8Array([0x00, ...new TextEncoder().encode("mock-signed-artifact")]);
      mockResponse = Array.from(response);
      return mockResponse as T;
    }

    case "has_seed":
      return mockHasSeed as T;

    case "has_session_key":
      return false as T;

    case "complete_registration": {
      const pw = _args?.password as string;
      if (!pw) {
        throw new Error("password required");
      }
      const response = new Uint8Array([0x00, ...new TextEncoder().encode("mock-registration-response")]);
      mockResponse = Array.from(response);
      return mockResponse as T;
    }

    case "get_response":
      if (!mockResponse) {
        throw new Error("no response available");
      }
      return mockResponse as T;

    case "get_preview":
      return {
        Zcash: {
          outputs: [{ address: "uregtest1mockaddr", amount: "100000" }],
          fee: "10000",
        },
      } as T;

    default:
      throw new Error(`Unknown mock command: ${cmd}`);
  }
}

async function mockListen<T>(event: string, handler: (payload: T) => void): Promise<() => void> {
  if (!mockListeners[event]) mockListeners[event] = [];
  mockListeners[event].push(handler as (payload: unknown) => void);

  if (event === "timer-tick" && !mockTimerRunning) {
    mockTimerRunning = true;
    let tick = 0;
    const interval = setInterval(() => {
      tick++;
      (mockListeners["timer-tick"] ?? []).forEach((h) => h({ tick }));
    }, 1000);
    return () => {
      clearInterval(interval);
      mockTimerRunning = false;
    };
  }

  return () => {
    const idx = mockListeners[event]?.indexOf(handler as (payload: unknown) => void) ?? -1;
    if (idx >= 0) mockListeners[event]?.splice(idx, 1);
  };
}

export { isTauri, invoke, listen };
