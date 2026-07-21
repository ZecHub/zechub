import { SiwzError } from "./errors.js";
import { parseAddress } from "./address.js";
import type { Network, SiwzFields } from "./types.js";

const ENC = new TextEncoder();

const NONCE_ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

/** Cryptographically random alphanumeric nonce. Default 16 chars (~95 bits). */
export function generateNonce(length = 16): string {
  if (length < 8) throw new Error("nonce length must be >= 8");
  const bytes = new Uint8Array(length);
  if (typeof globalThis.crypto?.getRandomValues === "function") {
    globalThis.crypto.getRandomValues(bytes);
  } else {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { randomFillSync } = require("node:crypto");
    randomFillSync(bytes);
  }
  let out = "";
  for (let i = 0; i < length; i++) {
    out += NONCE_ALPHABET[bytes[i]! % NONCE_ALPHABET.length];
  }
  return out;
}

const ISO_8601_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/;
const DOMAIN_REGEX = /^[A-Za-z0-9.-]+(?::\d+)?$/;
const NONCE_REGEX = /^[A-Za-z0-9]{8,}$/;

/** Canonical SIWZ message. Wire format follows EIP-4361 with "Network:" replacing "Chain ID:". */
export class SiwzMessage implements SiwzFields {
  domain: string;
  address: string;
  statement?: string;
  uri: string;
  version: "1";
  network: Network;
  nonce: string;
  issuedAt: string;
  expirationTime?: string;
  notBefore?: string;
  requestId?: string;
  resources?: string[];

  constructor(fields: Omit<SiwzFields, "version"> & { version?: "1" }) {
    this.domain = fields.domain;
    this.address = fields.address;
    this.statement = fields.statement;
    this.uri = fields.uri;
    this.version = fields.version ?? "1";
    this.network = fields.network;
    this.nonce = fields.nonce;
    this.issuedAt = fields.issuedAt;
    this.expirationTime = fields.expirationTime;
    this.notBefore = fields.notBefore;
    this.requestId = fields.requestId;
    this.resources = fields.resources;
    this.validate();
  }

  /** Validate field-level invariants. Throws SiwzError("INVALID_MESSAGE") on first problem. */
  validate(): void {
    const fail = (msg: string): never => {
      throw new SiwzError("INVALID_MESSAGE", msg);
    };
    if (!DOMAIN_REGEX.test(this.domain)) fail(`Invalid domain: "${this.domain}"`);
    if (!this.uri) fail("URI is required");
    if (this.version !== "1") fail(`Unsupported version: ${this.version}`);
    if (!(["mainnet", "testnet", "regtest"] as const).includes(this.network)) {
      fail(`Invalid network: ${this.network}`);
    }
    if (!NONCE_REGEX.test(this.nonce)) {
      fail(`Nonce must be ≥ 8 alphanumeric chars; got "${this.nonce}"`);
    }
    if (!ISO_8601_REGEX.test(this.issuedAt)) {
      fail(`Invalid issuedAt (must be ISO 8601 with timezone): ${this.issuedAt}`);
    }
    if (this.expirationTime && !ISO_8601_REGEX.test(this.expirationTime)) {
      fail(`Invalid expirationTime: ${this.expirationTime}`);
    }
    if (this.notBefore && !ISO_8601_REGEX.test(this.notBefore)) {
      fail(`Invalid notBefore: ${this.notBefore}`);
    }
    if (this.statement && /[\r\n]/.test(this.statement)) {
      fail("statement must not contain newlines");
    }
    const parsed = parseAddress(this.address);
    if (parsed.network !== this.network) {
      fail(`Address is on ${parsed.network} but message declares ${this.network}`);
    }
  }

  toString(): string {
    const lines: string[] = [];
    lines.push(`${this.domain} wants you to sign in with your Zcash account:`);
    lines.push(this.address);
    if (this.statement) {
      lines.push("");
      lines.push(this.statement);
    }
    lines.push("");
    lines.push(`URI: ${this.uri}`);
    lines.push(`Version: ${this.version}`);
    lines.push(`Network: ${this.network}`);
    lines.push(`Nonce: ${this.nonce}`);
    lines.push(`Issued At: ${this.issuedAt}`);
    if (this.expirationTime) lines.push(`Expiration Time: ${this.expirationTime}`);
    if (this.notBefore) lines.push(`Not Before: ${this.notBefore}`);
    if (this.requestId) lines.push(`Request ID: ${this.requestId}`);
    if (this.resources && this.resources.length > 0) {
      lines.push("Resources:");
      for (const r of this.resources) lines.push(`- ${r}`);
    }
    return lines.join("\n");
  }

  toBytes(): Uint8Array {
    return ENC.encode(this.toString());
  }

  /** Returns null if currently valid, otherwise the relevant error code. */
  checkTimeValidity(now: Date = new Date()): "EXPIRED" | "NOT_YET_VALID" | null {
    if (this.expirationTime && new Date(this.expirationTime) <= now) return "EXPIRED";
    if (this.notBefore && new Date(this.notBefore) > now) return "NOT_YET_VALID";
    return null;
  }

  /** Strict parser. Guarantees `SiwzMessage.parse(m.toString()).toString() === m.toString()`. */
  static parse(input: string): SiwzMessage {
    if (typeof input !== "string") {
      throw new SiwzError("INVALID_MESSAGE", "message must be a string");
    }
    const lines = input.split("\n");
    if (lines.length < 6) {
      throw new SiwzError("INVALID_MESSAGE", "message too short");
    }

    const header = lines[0]!;
    const m = header.match(/^(\S[^\s]*?) wants you to sign in with your Zcash account:$/);
    if (!m) throw new SiwzError("INVALID_MESSAGE", `bad header line: "${header}"`);
    const domain = m[1]!;

    const address = lines[1]!;
    if (!address) throw new SiwzError("INVALID_MESSAGE", "missing address line");

    // Optional statement sits between blank lines; the heuristic skips lines
    // that already look like "Key: value" to avoid swallowing the first header.
    let cursor = 2;
    let statement: string | undefined;
    if (lines[2] === "" && lines[3] && lines[3] !== "" && !lines[3].includes(": ")) {
      if (lines[4] === "") {
        statement = lines[3];
        cursor = 5;
      }
    }
    if (statement === undefined) {
      if (lines[2] !== "") {
        throw new SiwzError("INVALID_MESSAGE", "expected blank line after address");
      }
      cursor = 3;
    }

    const fields: Record<string, string> = {};
    const resources: string[] = [];
    let inResources = false;

    for (; cursor < lines.length; cursor++) {
      const line = lines[cursor]!;
      if (line === "") {
        if (cursor === lines.length - 1) continue;
        throw new SiwzError("INVALID_MESSAGE", `unexpected blank line at position ${cursor}`);
      }
      if (inResources) {
        if (!line.startsWith("- ")) {
          throw new SiwzError("INVALID_MESSAGE", `expected "- " in resources block, got "${line}"`);
        }
        resources.push(line.slice(2));
        continue;
      }
      if (line === "Resources:") {
        inResources = true;
        continue;
      }
      const idx = line.indexOf(": ");
      if (idx === -1) {
        throw new SiwzError("INVALID_MESSAGE", `expected "key: value" line, got "${line}"`);
      }
      const k = line.slice(0, idx);
      const v = line.slice(idx + 2);
      fields[k] = v;
    }

    const required = ["URI", "Version", "Network", "Nonce", "Issued At"] as const;
    for (const k of required) {
      if (!(k in fields)) {
        throw new SiwzError("INVALID_MESSAGE", `missing required field: ${k}`);
      }
    }

    return new SiwzMessage({
      domain,
      address,
      statement,
      uri: fields["URI"]!,
      version: fields["Version"] as "1",
      network: fields["Network"] as Network,
      nonce: fields["Nonce"]!,
      issuedAt: fields["Issued At"]!,
      expirationTime: fields["Expiration Time"],
      notBefore: fields["Not Before"],
      requestId: fields["Request ID"],
      resources: resources.length > 0 ? resources : undefined,
    });
  }
}
