/**
 * Persistence helpers with an injectable secure backend.
 *
 * The SDK never imports a specific storage module so it stays platform-agnostic and
 * testable. React Native apps pass an adapter backed by `expo-secure-store` (Keychain /
 * Keystore) for the seed vault and `AsyncStorage`/SecureStore for sessions.
 */

/** Minimal async key/value store (matches `expo-secure-store`'s shape). */
export interface SecureStorage {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
}

/** An authenticated dApp connection. */
export interface ZecAuthSession {
  /** Stable id (the dApp domain). */
  id: string;
  domain: string;
  /** The (domain-scoped) public key presented to this dApp. */
  pubkey: string;
  chain: string;
  uri?: string;
  statement?: string;
  /** Labels of the capabilities the dApp requested and the user granted at connect time. */
  capabilities?: string[];
  /** Epoch millis when the session was established. */
  connectedAt: number;
}

const VAULT_KEY = "zecauth.vault.mnemonic";
const SESSIONS_KEY = "zecauth.sessions";

/** Securely stores the wallet's recovery phrase. */
export class WalletVault {
  constructor(private readonly store: SecureStorage, private readonly key = VAULT_KEY) {}

  async hasWallet(): Promise<boolean> {
    return (await this.store.getItem(this.key)) !== null;
  }

  async getMnemonic(): Promise<string | null> {
    return this.store.getItem(this.key);
  }

  async saveMnemonic(mnemonic: string): Promise<void> {
    await this.store.setItem(this.key, mnemonic);
  }

  async clear(): Promise<void> {
    await this.store.removeItem(this.key);
  }
}

/** Tracks the user's active dApp connections. */
export class SessionStore {
  constructor(private readonly store: SecureStorage, private readonly key = SESSIONS_KEY) {}

  async list(): Promise<ZecAuthSession[]> {
    const raw = await this.store.getItem(this.key);
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw) as ZecAuthSession[];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  /** Upsert a session by domain, newest first. */
  async upsert(session: ZecAuthSession): Promise<ZecAuthSession[]> {
    const sessions = (await this.list()).filter((s) => s.id !== session.id);
    sessions.unshift(session);
    await this.persist(sessions);
    return sessions;
  }

  async remove(id: string): Promise<ZecAuthSession[]> {
    const sessions = (await this.list()).filter((s) => s.id !== id);
    await this.persist(sessions);
    return sessions;
  }

  async clear(): Promise<void> {
    await this.store.removeItem(this.key);
  }

  private async persist(sessions: ZecAuthSession[]): Promise<void> {
    await this.store.setItem(this.key, JSON.stringify(sessions));
  }
}
